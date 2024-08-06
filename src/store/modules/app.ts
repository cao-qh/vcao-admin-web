import { defineStore } from 'pinia'
import { ref } from 'vue'

const useAppStore = defineStore('appStore', () => {
  const pageLoading = ref(false)

  return {
    pageLoading,
  }
})

export default useAppStore
