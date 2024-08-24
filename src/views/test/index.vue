<template>
  <PageWrapper>
    <SunMoon v-model="layoutSettingStore.dark" />
  </PageWrapper>
</template>

<script setup lang="ts">
import SunMoon from '@/components/SunMoon/index.vue'
import useLayoutSettingStore from '@/store/modules/setting'
const layoutSettingStore = useLayoutSettingStore()
</script>
