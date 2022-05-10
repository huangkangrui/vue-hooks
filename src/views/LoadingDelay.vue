<template>
  <div class="about">
    <button @click="trigger">请求</button>
    <h1>
      {{ normalRequestLoading ? "loading" : normalRequestData }}
    </h1>
    <h1>
      {{ loadingDelayRequestLoading ? "loading" : loadingDelayRequestData }}
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
    }, 500);
  });
}
export default defineComponent({
  name: "HomeView",
  setup() {
    const normalRequest = useRequest(getFullName, {});
    const loadingDelayRequest = useRequest(getFullName, {
      loadingDelay: 300,
    });
    const trigger = () => {
      normalRequest.run();
      loadingDelayRequest.run();
    };
    return {
      normalRequestLoading: normalRequest.loading,
      loadingDelayRequestLoading: loadingDelayRequest.loading,
      normalRequestData: normalRequest.data,
      loadingDelayRequestData: loadingDelayRequest.data,
      trigger,
    };
  },
});
</script>
