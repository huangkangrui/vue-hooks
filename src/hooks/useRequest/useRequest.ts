/*
 * @Author: huangkangrui 1505207242@qq.com
 * @Date: 2022-05-10 10:03:43
 * @LastEditors: huangkangrui 1505207242@qq.com
 * @LastEditTime: 2022-05-16 17:36:16
 * @FilePath: \vue-hooks\src\hooks\useRequest\useRequest.ts
 * @Description: 
 */

import useAutoRunPlugin from './plugins/useAutoRunPlugin';
import useDebouncePlugin from './plugins/useDebouncePlugin';
import useLoadingDelayPlugin from './plugins/useLoadingDelayPlugin';
import usePollingPlugin from './plugins/usePollingPlugin';
import useRefreshOnWindowFocusPlugin from './plugins/useRefreshOnWindowFocusPlugin';
import useRetryPlugin from './plugins/useRetryPlugin';
import useThrottlePlugin from './plugins/useThrottlePlugin';
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
    useDebouncePlugin,
    useThrottlePlugin,
    useRetryPlugin,
  ] as Plugin<TData, TParams>[]);
}

export default useRequest;
