/*
 * @Author: CodeDragon 1505207242@qq.com
 * @Date: 2022-05-20 22:49:57
 * @LastEditors: CodeDragon 1505207242@qq.com
 * @LastEditTime: 2022-05-22 20:40:46
 * @FilePath: \vue-hooks\src\hooks\useRequest\plugins\useThrottlePlugin.ts
 * @Description: 
 */
import { watchEffect } from "@vue/runtime-dom";
import type { DebouncedFunc, ThrottleSettings } from "lodash";
import throttle from "lodash/throttle";
import type { Plugin } from "../types";

const useThrottlePlugin: Plugin<any, any[]> = (
  fetchInstance,
  { throttleWait, throttleLeading = true, throttleTrailing = true }
) => {
  if (!throttleWait) {
    return {};
  }
  let throttled: DebouncedFunc<any>;

  watchEffect(() => {
    const options: ThrottleSettings = {};
    if (throttleLeading !== undefined) {
      options.leading = throttleLeading;
    }
    if (throttleTrailing !== undefined) {
      options.trailing = throttleTrailing;
    }
    if (throttleWait) {
      const _originRunAsync = fetchInstance.runAsync.bind(fetchInstance);

      throttled = throttle(
        (callback) => {
          callback();
        },
        throttleWait,
        options
      );

      fetchInstance.runAsync = (...args) => {
        return new Promise((resolve, reject) => {
          throttled(() => {
            _originRunAsync(...args)
              .then(resolve)
              .catch(reject);
          });
        });
      };

      return () => {
        fetchInstance.runAsync = _originRunAsync;
        throttled.cancel();
      };
    }
  });

  return {
    onCancel: () => {
      throttled?.cancel();
    },
  };
};

export default useThrottlePlugin;
