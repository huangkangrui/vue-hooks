import { ref, Ref } from 'vue';
import type { FetchState, Options, PluginReturn, Service } from './types';

export default class Fetch<TData, TParams extends any[]> {
  pluginImpls: PluginReturn<TData, TParams>[] = [];

  count = 0;

  // state: FetchState<TData, TParams> = {
  loading = ref<boolean>(false);
  params = ref<TParams>();
  data = ref<TData>();
  error = ref<Error>();

  constructor(
    public serviceRef: Ref<Service<TData, TParams>>,
    public options: Partial<Options<TData, TParams>>,
    public initState: Partial<FetchState<TData, TParams>> = {},
  ) {
    this.setState({ loading: !options.manual })
  }

  setState(state: FetchState<TData, TParams>) {
    const newState: FetchState<TData, TParams> = {
      params: this.params.value,
      data: this.data.value,
      error: this.error.value,
      loading: this.loading.value,
      ...state
    }
    this.loading.value = !!newState.loading
    this.params.value = newState.params
    this.data.value = newState.data
    this.error.value = newState.error
  }

  runPluginHandler(event: keyof PluginReturn<TData, TParams>, ...rest: any[]) {
    // @ts-ignore
    const r = this.pluginImpls.map((i) => i[event]?.(...rest)).filter(Boolean);
    return Object.assign({}, ...r);
  }

  async runAsync(...params: TParams): Promise<TData> {
    console.log('run了');
    this.count += 1;
    const currentCount = this.count;
    const {
      stopNow = false,
      returnNow = false,
      ...state
    } = this.runPluginHandler('onBefore', params);

    // stop request
    if (stopNow) {
      return new Promise(() => { });
    }

    this.setState({
      loading: true,
      params,
      ...state
    })
    // return now
    if (returnNow) {
      return Promise.resolve(state.data);
    }

    this.options.onBefore?.(params);

    try {
      // replace service
      let { servicePromise } = this.runPluginHandler('onRequest', this.serviceRef.value, params);

      if (!servicePromise) {
        servicePromise = this.serviceRef.value(...params);
      }

      const res = await servicePromise;

      if (currentCount !== this.count) {
        // prevent run.then when request is canceled
        return new Promise(() => { });
      }

      this.data.value = res;
      this.error.value = undefined;
      this.loading.value = false;

      this.options.onSuccess?.(res, params);
      this.runPluginHandler('onSuccess', res, params);

      this.options.onFinally?.(params, res, undefined);

      if (currentCount === this.count) {
        this.runPluginHandler('onFinally', params, res, undefined);
      }

      return res;
    } catch (error) {
      if (currentCount !== this.count) {
        return new Promise(() => { });
      }

      this.setState({
        error,
        loading: false,
      });

      this.options.onError?.(error, params);
      this.runPluginHandler('onError', error, params);

      this.options.onFinally?.(params, undefined, error);

      if (currentCount === this.count) {
        this.runPluginHandler('onFinally', params, undefined, error);
      }

      throw error;
    }
  }

  run(...params: TParams) {
    this.runAsync(...params).catch((error) => {
      if (!this.options.onError) {
        console.error(error);
      }
    });
  }

  cancel() {
    this.count += 1;
    this.setState({
      loading: false,
    });

    this.runPluginHandler('onCancel');
  }

  refresh() {
    // @ts-ignore
    this.run(...(this.params || []));
  }

  refreshAsync() {
    // @ts-ignore
    return this.runAsync(...(this.state.params || []));
  }

  mutate(data?: TData | ((oldData?: TData) => TData | undefined)) {
    let targetData: TData | undefined;
    if (typeof data === 'function') {
      // @ts-ignore
      targetData = data(this.state.data);
    } else {
      targetData = data;
    }

    this.runPluginHandler('onMutate', targetData);
    this.setState({ data: targetData })
  }
}
