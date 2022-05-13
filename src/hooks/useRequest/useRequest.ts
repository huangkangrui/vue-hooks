
import useAutoRunPlugin from './plugins/useAutoRunPlugin';
import useLoadingDelayPlugin from './plugins/useLoadingDelayPlugin';
import usePollingPlugin from './plugins/usePollingPlugin';
import useRefreshOnWindowFocusPlugin from './plugins/useRefreshOnWindowFocusPlugin';
import type { Options, Plugin, Service } from './types';
import useRequestImplement from './useRequestImplement';
function useRequest<TData, TParams extends any[]>(
  service: Service<TData, TParams>,
  options: Partial<Options<TData, TParams>> = {},
  plugins?: Plugin<TData, TParams>[],
) {
  return useRequestImplement<TData, TParams>(service, options, [
    ...(plugins || []),
    useLoadingDelayPlugin,
    usePollingPlugin,
    useAutoRunPlugin,
    useRefreshOnWindowFocusPlugin,
  ] as Plugin<TData, TParams>[]);
}

export default useRequest;
