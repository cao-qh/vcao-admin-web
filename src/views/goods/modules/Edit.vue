<template>
  <a-modal
    title="修改套餐"
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
          <a-form-item label="自拟套餐编码" name="packageNickcode">
            <a-input
              v-model:value="formState.packageNickcode"
              placeholder="请输入"
            />
          </a-form-item>
        </a-col>
        <a-col :xs="24" :sm="12">
          <a-form-item label="自拟套餐名称" name="packageNickname">
            <a-input
              v-model:value="formState.packageNickname"
              placeholder="请输入"
            />
          </a-form-item>
        </a-col>
        <a-col :xs="24" :sm="12">
          <a-form-item label="上级套餐编码" name="goodsCode">
            <a-input v-model:value="formState.goodsCode" placeholder="请输入" />
          </a-form-item>
        </a-col>
        <a-col :xs="24" :sm="12">
          <a-form-item label="上级套餐名称" name="goodsName">
            <a-input v-model:value="formState.goodsName" placeholder="请输入" />
          </a-form-item>
        </a-col>
        <a-col :xs="24" :sm="12">
          <a-form-item label="状态" name="del">
            <a-select v-model:value="formState.del" placeholder="请选择">
              <a-select-option
                v-for="item in del"
                :key="item.value"
                :value="item.value"
              >
                {{ item.label }}
              </a-select-option>
            </a-select>
          </a-form-item>
        </a-col>
        <a-col :xs="24" :sm="12">
          <a-form-item label="上下架" name="shangXiaJia">
            <a-select
              v-model:value="formState.shangXiaJia"
              placeholder="请选择"
            >
              <a-select-option
                v-for="item in shangXiaJia"
                :key="item.value"
                :value="item.value"
              >
                {{ item.label }}
              </a-select-option>
            </a-select>
          </a-form-item>
        </a-col>
        <a-col :xs="24" :sm="12">
          <a-form-item label="返佣类型" name="fanyongId">
            <a-select v-model:value="formState.fanyongId" placeholder="请选择">
              <a-select-option
                v-for="item in fanyongStatus"
                :key="item.value"
                :value="item.value"
              >
                {{ item.label }}
              </a-select-option>
            </a-select>
          </a-form-item>
        </a-col>
        <a-col :xs="24" :sm="12">
          <a-form-item label="运营商" name="operateId">
            <a-select v-model:value="formState.operateId" placeholder="请选择">
              <a-select-option
                v-for="item in operate"
                :key="item.value"
                :value="item.value"
              >
                {{ item.label }}
              </a-select-option>
            </a-select>
          </a-form-item>
        </a-col>
        <a-col :xs="24" :sm="12">
          <a-form-item label="返佣状态" name="fanyongStatus">
            <a-select
              v-model:value="formState.fanyongStatus"
              placeholder="请选择"
            >
              <a-select-option :value="1">首充</a-select-option>
              <a-select-option :value="2">激活</a-select-option>
            </a-select>
          </a-form-item>
        </a-col>
        <a-col :xs="24" :sm="12">
          <a-form-item label="抓单sku编码" name="goodsSku">
            <a-input v-model:value="formState.goodsSku" placeholder="请输入" />
          </a-form-item>
        </a-col>
        <a-col :xs="24" :sm="12">
          <a-form-item label="是否需要证件照" name="picjudge">
            <a-select v-model:value="formState.picjudge" placeholder="请选择">
              <a-select-option :value="1">是</a-select-option>
              <a-select-option :value="2">否</a-select-option>
            </a-select>
          </a-form-item>
        </a-col>
        <a-col :xs="24" :sm="12">
          <a-form-item label="是否选号" name="phonelibs">
            <a-select v-model:value="formState.phonelibs" placeholder="请选择">
              <a-select-option :value="1">是</a-select-option>
              <a-select-option :value="2">否</a-select-option>
            </a-select>
          </a-form-item>
        </a-col>
        <a-col v-if="formState.phonelibs == 1" :xs="24" :sm="12">
          <a-form-item label="关联号池表ID" name="tPhonepoolId">
            <a-select
              v-model:value="formState.tPhonepoolId"
              placeholder="请选择"
            >
              <a-select-option
                v-for="item in phonePool"
                :key="item.id"
                :value="item.id"
              >
                {{ item.name }}
              </a-select-option>
            </a-select>
          </a-form-item>
        </a-col>
        <a-col :xs="24" :sm="12">
          <a-form-item label="省份" name="provinceId">
            <a-select v-model:value="formState.provinceId" placeholder="请选择">
              <a-select-option
                v-for="item in province"
                :key="item.value"
                :value="item.value"
              >
                {{ item.label }}
              </a-select-option>
            </a-select>
          </a-form-item>
        </a-col>
        <a-col :xs="24" :sm="12">
          <a-form-item label="套餐价格" name="price">
            <a-input v-model:value="formState.price" placeholder="请输入" />
          </a-form-item>
        </a-col>
        <a-col :xs="24" :sm="12">
          <a-form-item label="套餐图片" name="goodsFile">
            <UploadImage v-model:value="formState.goodsFile" />
          </a-form-item>
        </a-col>
      </a-row>
    </a-form>
  </a-modal>
</template>
<script lang="ts" setup>
import { reactive, ref } from 'vue'
import { message } from 'ant-design-vue'
import { reqEdit } from '@/api/goods'
import UploadImage from '@/components/UploadImage/index.vue'

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
    operate: () => [],
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
