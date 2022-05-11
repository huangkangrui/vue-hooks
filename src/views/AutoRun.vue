<template>
  <div class="about">
    <button @click="run">开始请求</button>
    <button @click="cancel">停止请求</button>
    <button @click="triggerReady">触发ready</button>
    <button @click="triggerDeps">触发deps{{num}}</button>

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
    }, 500);
  });
}
export default defineComponent({
  name: "HomeView",
  setup() {
    const ready = ref(false);
    const num = ref(1);
    const { data, loading, cancel, run } = useRequest(getFullName, {
      ready: ready,
      refreshDeps: [num],
    });
    const triggerReady = () => {
      ready.value = !ready.value;
    };
    const triggerDeps = () => {
      num.value += 1;
    };

    return {
      data,
      loading,
      cancel,
      run,
      triggerReady,
      triggerDeps,
      num,
    };
  },
});
</script>
