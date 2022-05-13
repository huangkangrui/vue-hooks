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
import { defineComponent, ref } from "vue";
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
