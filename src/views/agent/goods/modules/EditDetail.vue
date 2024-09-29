<template>
  <a-modal
    title="修改详情"
    :open="open"
    @ok="submit"
    @cancel="open = false"
    :maskClosable="false"
  >
    <a-form ref="formRef" :model="formState" v-bind="layout">
      <a-form-item label="禁用平台" name="maidDetail">
        <!-- <a-input v-model:value="formState.maidDetail" /> -->
        <a-select
          v-model:value="formState.maidDetail"
          mode="multiple"
          style="width: 100%"
          placeholder="请选择"
          :options="disPlatform"
        ></a-select>
      </a-form-item>

      <a-form-item label="最高年龄" name="maxAge">
        <a-input-number
          v-model:value="formState.maxAge"
          :max="120"
          style="width: 100%"
        />
      </a-form-item>
      <a-form-item label="最低年龄" name="minAge">
        <a-input-number
          v-model:value="formState.minAge"
          :min="1"
          style="width: 100%"
        />
      </a-form-item>
      <a-form-item label="资料库链接" name="ziliaokuUrl">
        <a-input v-model:value="formState.ziliaokuUrl" />
      </a-form-item>
      <a-form-item label="套餐介绍" name="goodsDe">
        <a-textarea v-model:value="formState.goodsDe"></a-textarea>
      </a-form-item>
      <a-form-item label="不发货地区" name="noAddress">
        <a-textarea v-model:value="formState.noAddress"></a-textarea>
      </a-form-item>
      <a-form-item label="卖点" name="maiDian">
        <a-textarea v-model:value="formState.maiDian"></a-textarea>
      </a-form-item>
      <a-form-item label="商品备注" name="remark">
        <a-textarea v-model:value="formState.remark"></a-textarea>
      </a-form-item>

      <a-form-item label="套餐详情图" name="goodsDetailFile">
        <UploadImage v-model:value="formState.goodsDetailFile" />
      </a-form-item>
    </a-form>
  </a-modal>
</template>
<script lang="ts" setup>
import { reactive, ref } from 'vue'
import { message } from 'ant-design-vue'
import { reqDetail, reqEditDetail } from '@/api/agent/goods/index'
import UploadImage from '@/components/UploadImage/index.vue'

defineOptions({ name: 'EditDetail' })

defineProps<{
  disPlatform: any
}>()

// 定义方法
const $emit = defineEmits(['success'])

const open = ref<boolean>(false)

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
const baseUrl = import.meta.env.VITE_SERVE

const show = async (row: any) => {
  const res: any = await reqDetail({ goodsId: row.id })
  if (res.code == 0) {
    open.value = true
    formState.id = res.data.id
    formState.goodsDe = res.data.goodsDe
    formState.maidDetail = res.data.maidDetail
    formState.noAddress = res.data.noAddress
    formState.maxAge = res.data.maxAge
    formState.minAge = res.data.minAge
    formState.maiDian = res.data.maiDian
    formState.remark = res.data.remark
    formState.ziliaokuUrl = res.data.ziliaokuUrl
    if (res.data.goodsDetailPic) {
      formState.goodsDetailFile = baseUrl + res.data.goodsDetailPic
    } else {
      formState.goodsDetailFile = ''
    }
    formState.goodsId = res.data.goodsId
  } else {
    message.error(res.message)
  }
}

const submit = async () => {
  try {
    await formRef.value.validate()

    const formData = new FormData()
    formData.append('id', formState.id)
    formData.append('goodsDe', formState.goodsDe)
    formData.append('maidDetail', formState.maidDetail)
    formData.append('noAddress', formState.noAddress)
    formData.append('maxAge', formState.maxAge)
    formData.append('minAge', formState.minAge)
    formData.append('maiDian', formState.maiDian)
    formData.append('remark', formState.remark)
    formData.append('ziliaokuUrl', formState.ziliaokuUrl)
    if (
      formState.goodsDetailFile &&
      typeof formState.goodsDetailFile === 'object'
    ) {
      formData.append('goodsDetailFile', formState.goodsDetailFile)
    }
    formData.append('goodsId', formState.goodsId)

    const res = await reqEditDetail(formData)
    if (res.code == 0) {
      $emit('success')
      open.value = false
      message.success('修改成功')
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
