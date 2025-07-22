<template>
  <PageWrapper>
    <a-descriptions
      v-if="data"
      title="协议与政策"
      :column="1"
      bordered
      :labelStyle="{ width: '150px' }"
    >
      <template #extra>
        <a-button
          v-has="'Btn.Protocol.Update'"
          type="primary"
          @click="edit.show(data)"
        >
          修改
        </a-button>
      </template>
      <a-descriptions-item label="用户协议">
        {{ data.yonghuxieyi }}
      </a-descriptions-item>
      <a-descriptions-item label="隐私政策">
        {{ data.yinsizhengce }}
      </a-descriptions-item>
    </a-descriptions>
    <div v-else>
      <a-empty>
        <template #description>
          <span>未上传用户协议与隐私政策</span>
        </template>
        <a-button v-has="'Btn.Protocol.Add'" type="primary" @click="add.show()">
          现在添加
        </a-button>
      </a-empty>
    </div>

    <Add ref="add" @success="getDate()" />

    <Edit ref="edit" @success="getDate()" />
  </PageWrapper>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { reqSearch } from '@/api/AppConfig/Protocol'
import Add from './modules/Add.vue'
import Edit from './modules/Edit.vue'

defineOptions({ name: 'Protocol' })

const data = ref()

onMounted(async () => {
  getDate()
})

const getDate = async () => {
  const res: any = await reqSearch(1)
  if (res.code == 0) {
    data.value = res.data
  }
}

const add = ref()
const edit = ref()
</script>

<style></style>
