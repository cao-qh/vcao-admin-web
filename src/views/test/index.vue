<template>
  <PageWrapper>
    <AddressSelector v-model:value="value" />
    <a-button @click="onClick">输出</a-button>
  </PageWrapper>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import AddressSelector from '@/components/AddressSelector/index.vue'

defineOptions({
  name: 'Test',
})

const value = ref('河南省 焦作市 山阳区 华融国际大厦')

const onClick = () => {
  console.log(value.value)
}
</script>
<style>
.text {
  font-size: 20px;
}
</style>
