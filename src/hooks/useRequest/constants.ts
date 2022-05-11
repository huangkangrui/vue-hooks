import { ref } from "vue";
import { Options } from "./types";

export const DefaultOptions: Options<any, any> = {
  // refreshDeps: undefined,
  manual: false,
  onSuccess: () => { },
  onError: () => { },
  onFinally: () => { },

  loadingDelay: 0,

  pollingInterval: 0,
  pollingWhenHidden: true,

  defaultParams: [] as any[],
  ready: ref(true),
  refreshDeps: [],
  refreshOnWindowFocus: false,
  onBefore: () => { },
  refreshDepsAction: () => { },
  focusTimespan: 0,
  debounceWait: 0,
  debounceLeading: false,
  debounceTrailing: false,
  debounceMaxWait: 0,
  throttleWait: 0,
  throttleLeading: false,
  throttleTrailing: false,
  cacheKey: "",
  cacheTime: 0,
  staleTime: 0,
  retryCount: 0,
  retryInterval: 0
};