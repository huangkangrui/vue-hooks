/*
 * @Author: huangkangrui 1505207242@qq.com
 * @Date: 2022-05-16 15:23:55
 * @LastEditors: huangkangrui 1505207242@qq.com
 * @LastEditTime: 2022-05-17 09:09:32
 * @FilePath: \vue-hooks\src\hooks\useRequest\plugins\useDebouncePlugin.ts
 * @Description: 
 */
import type { DebouncedFunc, DebounceSettings } from 'lodash';
import debounce from 'lodash/debounce';
import { watchEffect } from 'vue';
import type { Plugin } from '../types';

const useDebouncePlugin: Plugin<any, any[]> = (
    fetchInstance,
    { debounceWait, debounceLeading, debounceTrailing, debounceMaxWait },
) => {
    if (!debounceWait) {
        return {};
    }
    let debounced: DebouncedFunc<any>;

    watchEffect(() => {
        const options: DebounceSettings = {};
        if (debounceWait) {
            if (debounceLeading) {
                options.leading = debounceLeading;
            }
            if (debounceTrailing) {
                options.trailing = debounceTrailing;
            }
            if (debounceMaxWait) {
                options.maxWait = debounceMaxWait;
            }
            const _originRunAsync = fetchInstance.runAsync.bind(fetchInstance);

            debounced = debounce(
                (callback) => {
                    callback();
                },
                debounceWait,
                options,
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

            return () => {
                debounced.cancel();
                fetchInstance.runAsync = _originRunAsync;
            };
        }
    });



    return {
        onCancel: () => {
            debounced?.cancel();
        },
    };
};

export default useDebouncePlugin;
