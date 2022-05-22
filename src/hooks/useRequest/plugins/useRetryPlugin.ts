/*
 * @Author: CodeDragon 1505207242@qq.com
 * @Date: 2022-05-22 12:57:11
 * @LastEditors: CodeDragon 1505207242@qq.com
 * @LastEditTime: 2022-05-22 13:52:53
 * @FilePath: \vue-hooks\src\hooks\useRequest\plugins\useRetryPlugin.ts
 * @Description:
 */
import type { Plugin, Timeout } from "../types";

const useRetryPlugin: Plugin<any, any[]> = (
  fetchInstance,
  { retryInterval, retryCount }
) => {
  if (!retryCount) {
    return {};
  }
  let timer: Timeout;
  let count = 0;

  let triggerByRetry = false;

  return {
    onBefore: () => {
      if (!triggerByRetry) {
        count = 0;
      }
      triggerByRetry = false;
      // 当在计时时手动触发了一次，则取消计时
      if (timer) {
        clearTimeout(timer);
      }
    },
    onSuccess: () => {
      count = 0;
    },
    onError: () => {
      count += 1;
      if (retryCount === -1 || count <= retryCount) {
        // Exponential backoff
        const timeout = retryInterval ?? Math.min(1000 * 2 ** count, 30000);
        timer = setTimeout(() => {
          triggerByRetry = true;
          fetchInstance.refresh();
        }, timeout);
      } else {
        count = 0;
      }
    },
    onCancel: () => {
      count = 0;
      if (timer) {
        clearTimeout(timer);
      }
    },
  };
};

export default useRetryPlugin;
