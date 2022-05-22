import { ref, watch } from "vue";
import type { Plugin } from "../types";

// support refreshDeps & ready
const useAutoRunPlugin: Plugin<any, any[]> = (
  fetchInstance,
  { manual, ready = ref(true), defaultParams = [], refreshDeps = [] }
) => {
  let hasAutoRun = false;
  watch(ready, () => {
    if (!manual && ready.value) {
      hasAutoRun = true;
      fetchInstance.run(...defaultParams);
    }
  });

  watch(refreshDeps, () => {
    if (hasAutoRun) {
      return;
    }
    if (!manual) {
      // 在请求期间依赖再次改变时不做请求
      hasAutoRun = true;
      fetchInstance.refresh();
    }
  });

  return {
    onBefore: () => {
      if (!ready) {
        return {
          stopNow: true,
        };
      }
    },
    onCancel: () => {
      hasAutoRun = false;
    },
    onFinally: () => {
      hasAutoRun = false;
    },
  };
};

useAutoRunPlugin.onInit = ({ ready, manual }) => {
  return {
    loading: !manual && ready?.value,
  };
};

export default useAutoRunPlugin;
