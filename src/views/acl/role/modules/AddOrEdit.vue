<template>
  <a-modal
    :open="open"
    @cancel="open = false"
    :title="title"
    :confirmLoading="loading"
    @ok="submit"
  >
    <a-spin :spinning="loading">
      <a-form
        ref="formRef"
        :label-col="{ span: 6 }"
        :wrapper-col="{ span: 16 }"
        :model="roleParams"
        :rules="rules"
      >
        <a-form-item label="角色名称" name="roleName">
          <a-input
            v-model:value="roleParams.roleName"
            placeholder="请输入角色名称"
          />
        </a-form-item>
      </a-form>
    </a-spin>
  </a-modal>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import type { RoleData } from '@/api/acl/role/type'
import { reqAddOrUpdateRole } from '@/api/acl/role'
import { message } from 'ant-design-vue'

defineOptions({ name: 'AddOrEdit' })
const emit = defineEmits(['success'])

const open = ref<boolean>(false)
const loading = ref<boolean>(false)
const title = ref<string>('')
const roleParams = reactive<RoleData>({
  roleName: '',
})
const rules = {
  roleName: [
    {
      required: true,
      message: '角色名不能为空',
      trigger: 'change',
    },
  ],
}
const formRef = ref<any>()

const show = (row: RoleData) => {
  open.value = true
  Object.assign(roleParams, {
    id: 0,
    roleName: '',
  })
  formRef.value?.clearValidate()
  if (row) {
    title.value = '修改角色'
    Object.assign(roleParams, row)
  } else {
    title.value = '添加角色'
  }
}

const submit = async () => {
  try {
    await formRef.value.validate()
    loading.value = true
    const res = await reqAddOrUpdateRole(roleParams)
    loading.value = false
    if (res.code == 200) {
      open.value = false
      message.success(roleParams.id ? '修改成功' : '添加成功')
      emit('success', roleParams.id ? false : true)
    } else {
      message.error(roleParams.id ? '修改失败' : '添加失败')
    }
  } catch (error) {
    console.log('error :>> ', error)
  }
}

defineExpose({
  show,
})
</script>

<style></style>
