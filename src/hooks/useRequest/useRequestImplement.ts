import { computed, onMounted, onUnmounted, readonly, ref } from "vue";
import Fetch from "./Fetch";
import type { Options, Plugin, Result, Service, Subscribe } from "./types";

function useRequestImplement<TData, TParams extends any[]>(
  service: Service<TData, TParams>,
  options: Options<TData, TParams> = {},
  plugins: Plugin<TData, TParams>[] = []
) {
  
  const { manual = false, ...rest } = options;
  const loading = ref<boolean>(false);
  const data = ref<TData>();
  const error = ref<Error>();
  // @ts-ignore
  const params = ref<TParams>(options.defaultParams ?? []);
  const fetchOptions = {
    manual,
    ...rest,
  };

  const serviceRef = ref(service);

  const update: Subscribe<TData, TParams> = (state) => {
    loading.value = state.loading
    data.value = state.data
    error.value = state.error
    params.value = state.params
  };
  const fetchInstance = computed(() => {
    const initState = plugins
      .map((p) => p?.onInit?.(fetchOptions))
      .filter(Boolean);
    return new Fetch<TData, TParams>(
      serviceRef,
      fetchOptions,
      update,
      Object.assign({}, ...initState)
    );
  }).value; 
  fetchInstance.options = fetchOptions;
  // run all plugins hooks
  fetchInstance.pluginImpls = plugins.map((p) =>
    p(fetchInstance, fetchOptions)
  );


  onMounted(() => {
    if (!manual) {
      // useCachePlugin can set fetchInstance.state.params from cache when init
      const params = fetchInstance.state.params || options.defaultParams || [];
      // @ts-ignore
      fetchInstance.run(...params);
    }
  });

  onUnmounted(() => {
    fetchInstance.cancel();
  });

  return {
    loading: readonly(loading),
    data: readonly(data),
    error: readonly(error),
    params: readonly(params),
    cancel: fetchInstance.cancel.bind(fetchInstance),
    refresh: fetchInstance.refresh.bind(fetchInstance),
    refreshAsync: fetchInstance.refreshAsync.bind(fetchInstance),
    run: fetchInstance.run.bind(fetchInstance),
    runAsync: fetchInstance.runAsync.bind(fetchInstance),
    mutate: fetchInstance.mutate.bind(fetchInstance),
  } as Result<TData, TParams>;
}

export default useRequestImplement;
