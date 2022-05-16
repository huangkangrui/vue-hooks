<!--
 * @Author: huangkangrui 1505207242@qq.com
 * @Date: 2022-05-13 09:27:02
 * @LastEditors: huangkangrui 1505207242@qq.com
 * @LastEditTime: 2022-05-16 15:57:04
 * @FilePath: \vue-hooks\src\views\RefreshOnWindowFocus.vue
 * @Description: 
-->
<template>
  <div class="about">
    <button @click="run">开始请求</button>
    <button @click="cancel">停止请求</button>
    <h1>
      {{ loading ? "loading" : data }}
    </h1>
  </div>
</template>
<script lang="ts">
import useRequest from "@/hooks/useRequest/useRequest";
import { defineComponent } from "vue";
function getFullName(): Promise<string> {
  console.log("发起请求");

  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(Math.random().toString(36).slice(2));
    }, 2000);
  });
}
export default defineComponent({
  name: "RefreshOnWindowFocus",
  setup() {
    const { data, loading, cancel, run } = useRequest(getFullName, {
      refreshOnWindowFocus: true,
    });

    return {
      data,
      loading,
      cancel,
      run,
    };
  },
});
</script>
