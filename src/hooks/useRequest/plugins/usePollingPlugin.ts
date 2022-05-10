import type { Plugin, Timeout } from '../types';

const usePollingPlugin: Plugin<any, any[]> = (
  fetchInstance,
  { pollingInterval },
) => {
  if (!pollingInterval) {
    return {};
  }
  let timerRef:Timeout;

  const stopPolling = () => {
    if (timerRef) {
      clearTimeout(timerRef);
    }
  };

  return {
    onBefore: () => {
      // run和runAsync被触发时停止当前的轮询
      stopPolling();
    },
    onFinally: () => {
      timerRef = setTimeout(() => {
        fetchInstance.refresh();
      }, pollingInterval);
    },
    onCancel: () => {
      stopPolling();
    },
  };
};

export default usePollingPlugin;
