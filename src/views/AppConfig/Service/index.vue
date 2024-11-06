<template>
  <PageWrapper>
    <a-flex v-if="data" vertical gap="small" style="width: 200px">
      <a-image :src="baseUrl + data.erweima" />
      <a-button type="primary" @click="addOrEdit.show(data)">修改</a-button>
    </a-flex>

    <div v-else>
      <a-empty>
        <template #description>
          <span>未上传上传客服二维码</span>
        </template>
        <a-button
          v-has="'Btn.Service.Add'"
          type="primary"
          @click="addOrEdit.show()"
        >
          现在添加
        </a-button>
      </a-empty>
    </div>

    <AddOrEdit ref="addOrEdit" @success="getDate()" />
  </PageWrapper>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { reqSearch } from '@/api/AppConfig/Service'
import AddOrEdit from './modules/AddOrEdit.vue'

defineOptions({ name: 'Protocol' })

const baseUrl = import.meta.env.VITE_SERVE
const data = ref()

onMounted(async () => {
  getDate()
})

const getDate = async () => {
  const res: any = await reqSearch()
  if (res.code == 0) {
    data.value = res.data
  }
}

const addOrEdit = ref()
</script>

<style></style>
