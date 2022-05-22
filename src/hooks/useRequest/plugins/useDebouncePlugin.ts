/*
 * @Author: huangkangrui 1505207242@qq.com
 * @Date: 2022-05-16 15:23:55
 * @LastEditors: CodeDragon 1505207242@qq.com
 * @LastEditTime: 2022-05-22 22:35:53
 * @FilePath: \vue-hooks\src\hooks\useRequest\plugins\useDebouncePlugin.ts
 * @Description:
 */
import type { DebouncedFunc, DebounceSettings } from "lodash";
import debounce from "lodash/debounce";
import { watchEffect } from "vue";
import type { Plugin } from "../types";

const useDebouncePlugin: Plugin<any, any[]> = (
  fetchInstance,
  {
    debounceWait,
    debounceLeading = false,
    debounceTrailing = true,
    debounceMaxWait,
  }
) => {
  if (!debounceWait) {
    return {};
  }
  let debounced: DebouncedFunc<any>;
  watchEffect((onInvalidate) => {
    const options: DebounceSettings = {};
    if (debounceWait) {
      if (debounceLeading !== undefined) {
        options.leading = debounceLeading;
      }
      if (debounceTrailing !== undefined) {
        options.trailing = debounceTrailing;
      }
      if (debounceMaxWait !== undefined) {
        options.maxWait = debounceMaxWait;
      }
      const _originRunAsync = fetchInstance.runAsync.bind(fetchInstance);

      debounced = debounce(
        (callback) => {
          callback();
        },
        debounceWait,
        options
      );
      fetchInstance.runAsync = (...args) => {
        return new Promise((resolve, reject) => {
          debounced(() => {
            _originRunAsync(...args)
              .then(resolve)
              .catch(reject);
          });
        });
      };
      onInvalidate(() => {
        debounced.cancel();
        fetchInstance.runAsync = _originRunAsync;
      });
    }
  });

  return {
    onCancel: () => {
      debounced?.cancel();
    },
  };
};

export default useDebouncePlugin;
