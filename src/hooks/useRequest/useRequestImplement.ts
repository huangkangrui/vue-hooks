import { computed, onMounted, onUnmounted, readonly, ref } from "vue";
import { DefaultOptions } from "./constants";
import Fetch from "./Fetch";
import type { Options, Plugin, Result, Service } from "./types";

function useRequestImplement<TData, TParams extends any[]>(
  service: Service<TData, TParams>,
  options: Partial<Options<TData, TParams>>,
  plugins: Plugin<TData, TParams>[] = []
) {
  
  const { manual = false, ...rest } = options;
  const fetchOptions = {
    manual,
    ...rest,
  };

  const serviceRef = ref(service);

  const fetchInstance = computed(() => {
    const initState = plugins
      .map((p) => p?.onInit?.({...DefaultOptions,...fetchOptions}))
      .filter(Boolean);
    return new Fetch<TData, TParams>(
      serviceRef,
      {...DefaultOptions,...fetchOptions},
      Object.assign({}, ...initState)
    );
  }).value;
  /**
   * TODO: vue的hook和react的hook不一样, 这里赋值只会赋一次,当fetchOptions改变时不会覆盖
   * 需要改成watch监听
   */
  // fetchInstance.options = fetchOptions;
  // run all plugins hooks
  fetchInstance.pluginImpls = plugins.map((p) =>
    p(fetchInstance, {...DefaultOptions,...fetchOptions})
  );


  onMounted(() => {
    if (!manual) {
      // useCachePlugin can set fetchInstance.state.params from cache when init
      const params = fetchInstance.params || options.defaultParams || [];
      // @ts-ignore
      fetchInstance.run(...params);
    }
  });

  onUnmounted(() => {
    fetchInstance.cancel();
  });

  return {
    loading: readonly(fetchInstance.loading),
    data: readonly(fetchInstance.data),
    error: readonly(fetchInstance.error),
    params: readonly(fetchInstance.params),
    cancel: fetchInstance.cancel.bind(fetchInstance),
    refresh: fetchInstance.refresh.bind(fetchInstance),
    refreshAsync: fetchInstance.refreshAsync.bind(fetchInstance),
    run: fetchInstance.run.bind(fetchInstance),
    runAsync: fetchInstance.runAsync.bind(fetchInstance),
    mutate: fetchInstance.mutate.bind(fetchInstance),
  } as Result<TData, TParams>;
}

export default useRequestImplement;
