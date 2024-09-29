<template>
  <a-modal
    title="修改"
    :open="open"
    @ok="submit"
    @cancel="open = false"
    :width="880"
    :bodyStyle="{ height: '500px', overflow: 'auto' }"
    :maskClosable="false"
  >
    <a-form ref="formRef" :model="formState" v-bind="layout">
      <a-row>
        <a-col :xs="24" :sm="12">
          <a-form-item label="上级编码" name="packageNickcode">
            <a-input
              v-model:value="formState.packageNickcode"
              placeholder="请输入"
            />
          </a-form-item>
        </a-col>
        <a-col :xs="24" :sm="12">
          <a-form-item label="上级名称" name="packageNickname">
            <a-input
              v-model:value="formState.packageNickname"
              placeholder="请输入"
            />
          </a-form-item>
        </a-col>
        <a-col :xs="24" :sm="12">
          <a-form-item label="产品月费" name="goodsCode">
            <a-input v-model:value="formState.goodsCode" placeholder="请输入" />
          </a-form-item>
        </a-col>
        <a-col :xs="24" :sm="12">
          <a-form-item label="运营商" name="operateId">
            <a-select v-model:value="formState.operateId" placeholder="请选择">
              <a-select-option
                v-for="(value, key) in operate"
                :key="key"
                :value="key"
              >
                {{ value }}
              </a-select-option>
            </a-select>
          </a-form-item>
        </a-col>
        <a-col :xs="24" :sm="12">
          <a-form-item label="归属地" name="goodsName">
            <a-input v-model:value="formState.goodsName" placeholder="请输入" />
          </a-form-item>
        </a-col>
      </a-row>
    </a-form>
  </a-modal>
</template>
<script lang="ts" setup>
import { reactive, ref } from 'vue'
import { message } from 'ant-design-vue'
import { reqEdit } from '@/api/agent/goods/index'

defineOptions({ name: 'Edit' })

const baseUrl = import.meta.env.VITE_SERVE

// 属性
withDefaults(
  defineProps<{
    del: any
    shangXiaJia: any
    fanyongStatus: any
    operate: any
    phonePool: any
    province: any
  }>(),
  {
    del: () => [],
    shangXiaJia: () => [],
    fanyongStatus: () => [],
    operate: () => ({}),
    phonePool: () => [],
    province: () => [],
  },
)

// 定义方法
const $emit = defineEmits(['success'])

const open = ref<boolean>(false)

// const rules = {
//   packageNickcode: [{ required: true, message: '不能为空' }],
//   packageNickname: [{ required: true, message: '不能为空' }],
//   goodsCode: [{ required: true, message: '不能为空' }],
//   goodsName: [{ required: true, message: '不能为空' }],
//   del: [{ required: true, message: '不能为空' }],
//   shangXiaJia: [{ required: true, message: '不能为空' }],
//   fanyongId: [{ required: true, message: '不能为空' }],
//   operateId: [{ required: true, message: '不能为空' }],
//   fanyongStatus: [{ required: true, message: '不能为空' }],
//   picjudge: [{ required: true, message: '不能为空' }],
//   phonelibs: [{ required: true, message: '不能为空' }],
//   provinceId: [{ required: true, message: '不能为空' }],
// }

// 表单布局
const layout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 7 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 13 },
  },
}

const formRef = ref()
const formState = reactive<any>({})

const show = async (row: any) => {
  open.value = true
  formState.id = row.id
  formState.packageNickcode = row.packageNickcode
  formState.packageNickname = row.packageNickname
  formState.goodsCode = row.goodsCode
  formState.goodsName = row.goodsName
  formState.del = row.del
  formState.shangXiaJia = row.shangXiaJia
  formState.fanyongId = row.fanyongId
  formState.operateId = row.operateId
  formState.fanyongStatus = row.fanyongStatus
  formState.picjudge = row.picjudge
  formState.provinceId = row.provinceId
  formState.phonelibs = row.phonelibs
  formState.goodsSku = row.goodsSku
  formState.goodsFile = baseUrl + row.goodspic
  formState.tPhonepoolId = row.tPhonepoolId
  formState.price = row.price
}

const submit = async () => {
  try {
    await formRef.value.validate()

    const formData = new FormData()
    formData.append('id', formState.id)
    formState.packageNickcode &&
      formData.append('packageNickcode', formState.packageNickcode)
    formState.packageNickname &&
      formData.append('packageNickname', formState.packageNickname)
    formState.goodsCode && formData.append('goodsCode', formState.goodsCode)
    formState.goodsName && formData.append('goodsName', formState.goodsName)
    formState.del && formData.append('del', formState.del)
    formState.shangXiaJia &&
      formData.append('shangXiaJia', formState.shangXiaJia)
    formState.fanyongId && formData.append('fanyongId', formState.fanyongId)
    formState.operateId && formData.append('operateId', formState.operateId)
    formState.fanyongStatus &&
      formData.append('fanyongStatus', formState.fanyongStatus)
    formState.goodsSku && formData.append('goodsSku', formState.goodsSku)
    formState.picjudge && formData.append('picjudge', formState.picjudge)
    formState.phonelibs && formData.append('phonelibs', formState.phonelibs)
    formState.tPhonepoolId &&
      formData.append('tPhonepoolId', formState.tPhonepoolId)
    formState.provinceId && formData.append('provinceId', formState.provinceId)
    formState.price && formData.append('price', formState.price)

    if (formState.goodsFile && typeof formState.goodsFile === 'object') {
      formData.append('goodsFile', formState.goodsFile)
    }

    const res = await reqEdit(formData)
    if (res.code == 0) {
      $emit('success')
      open.value = false
      message.success(res.msg)
    } else {
      message.error(res.msg)
    }
  } catch (error) {
    console.log('error :>> ', error)
  }
}

defineExpose({
  show,
})
</script>
