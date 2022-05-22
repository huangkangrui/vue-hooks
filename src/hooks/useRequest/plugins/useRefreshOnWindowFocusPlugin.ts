import { onUnmounted, watchEffect } from 'vue';
import type { Plugin } from '../types';
import limit from '../utils/limit';
import subscribeFocus from '../utils/subscribeFocus';

const useRefreshOnWindowFocusPlugin: Plugin<any, any[]> = (
  fetchInstance,
  { refreshOnWindowFocus, focusTimespan = 5000 },
) => {
  let unsubscribe;

  const stopSubscribe = () => {
    unsubscribe?.();
  };

  watchEffect(() => {
    // 在refreshOnWindowFocus和focusTimespan改变时,清除上一次订阅
    stopSubscribe?.();
    if (refreshOnWindowFocus) {
      const limitRefresh = limit(fetchInstance.refresh.bind(fetchInstance), focusTimespan);
      unsubscribe = subscribeFocus(() => {
        limitRefresh();
      });
    }
  })

  onUnmounted(() => {
    stopSubscribe();
  })

  return {};
};

export default useRefreshOnWindowFocusPlugin;
