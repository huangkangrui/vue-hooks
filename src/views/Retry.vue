<!--
 * @Author: huangkangrui 1505207242@qq.com
 * @Date: 2022-05-16 15:56:27
 * @LastEditors: CodeDragon 1505207242@qq.com
 * @LastEditTime: 2022-05-22 13:48:45
 * @FilePath: \vue-hooks\src\views\Retry.vue
 * @Description: 
-->
<template>
  <div class="about">
    <button @click="run">开始请求</button>
    <button @click="cancel">停止请求</button>
    <h1>
      {{ loading ? "loading" : data ?? error }}
    </h1>
  </div>
</template>
<script lang="ts">
import useRequest from "@/hooks/useRequest/useRequest";
import { defineComponent } from "vue";
function getFullName(): Promise<string> {
  console.log("发起请求");
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      reject(Math.random().toString(36).slice(2));
    }, 2000);
  });
}
export default defineComponent({
  name: "RetryView",
  setup() {
    const { data, loading, cancel, run, error } = useRequest(getFullName, {
        retryCount:5,
        retryInterval: 1000,
    });

    return {
      data,
      loading,
      cancel,
      run,
      error,
    };
  },
});
</script>
