import { ref } from "vue"
import { Plugin, Timeout } from "../types"



const useLoadingDelayPlugin: Plugin<any, any[]> = (fetchInstance, { loadingDelay }) => {
  const timer = ref<Timeout>()
  if (!loadingDelay) {
    return {}
  }
  const cancelTimeout = () => {
    if (timer.value) {
      clearTimeout(timer.value)
    }
  }
  return {
    onBefore: () => {
      cancelTimeout()
      timer.value = setTimeout(() => {
        fetchInstance.setState({ loading: true })
      }, loadingDelay);
      return {
        loading: false
      }
    },
    onCancel: () => {
      cancelTimeout()
    },
    onFinally: () => {
      cancelTimeout()
    }

  }
}

export default useLoadingDelayPlugin