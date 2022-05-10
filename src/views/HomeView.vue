<template>
  <div class="home" @click="run">全名{{ loading ? "loading" : data }}</div>
  <div class="home" @click="mutate(1234)">改名{{ loading ? "loading" : data }}</div>
  <div class="home" @click="cancel">取消{{ loading ? "loading" : data }}</div>
  <div class="home" @click="cancel">取消后{{ data }}</div>
</template>

<script lang="ts">
import useRequest from "@/hooks/useRequest/useRequest";
import { defineComponent } from "vue";
function getFullName(): Promise<string> {
  console.log("发起请求");

  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(Math.random().toString(36).slice(2));
    }, 2.5 * 1000);
  });
}
export default defineComponent({
  name: "HomeView",
  setup() {
    const { run, data, loading, mutate, cancel } = useRequest(getFullName, {
      manual: false,
    });
    return { run, data, loading, mutate, cancel };
  },
});
</script>
