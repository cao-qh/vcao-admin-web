<template>
  <a-modal
    title="添加"
    :open="open"
    @ok="submit"
    @cancel="open = false"
    :width="880"
    :bodyStyle="{ height: '500px', overflow: 'auto' }"
    :maskClosable="false"
  >
    <a-form ref="formRef" :model="formState" :rules="rules" v-bind="layout">
      <a-row>
        <a-col :xs="24" :sm="12">
          <a-form-item label="产品名称" name="mingcheng">
            <a-input v-model:value="formState.mingcheng" placeholder="请输入" />
          </a-form-item>
        </a-col>
        <a-col :xs="24" :sm="12">
          <a-form-item label="上级产品名称" name="shangjiMingcheng">
            <a-input
              v-model:value="formState.shangjiMingcheng"
              placeholder="请输入"
            />
          </a-form-item>
        </a-col>
        <a-col :xs="24" :sm="12">
          <a-form-item label="上级产品编号" name="shangjiBianma">
            <a-input
              v-model:value="formState.shangjiBianma"
              placeholder="请输入"
            />
          </a-form-item>
        </a-col>
        <a-col :xs="24" :sm="12">
          <a-form-item label="运营商" name="yunyingshang">
            <a-select
              v-model:value="formState.yunyingshang"
              placeholder="请选择"
            >
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
          <a-form-item label="归属地" name="guishudi">
            <a-input v-model:value="formState.guishudi" placeholder="请输入" />
          </a-form-item>
        </a-col>
        <a-col :xs="24" :sm="12">
          <a-form-item label="订购价格" name="dinggoujiage">
            <a-input-number
              :min="0"
              v-model:value="formState.dinggoujiage"
              placeholder="请输入"
            />
          </a-form-item>
        </a-col>

        <a-col :xs="24" :sm="12">
          <a-form-item label="渠道商" name="qudaoshangBianma">
            <a-input
              v-model:value="formState.qudaoshangBianma"
              placeholder="请输入"
            />
          </a-form-item>
        </a-col>
        <a-col :xs="24" :sm="12">
          <a-form-item label="产品详情" name="chanpinXiangqing">
            <a-textarea
              v-model:value="formState.chanpinXiangqing"
              placeholder="请输入"
            />
          </a-form-item>
        </a-col>
        <a-col :xs="24" :sm="12">
          <a-form-item label="返佣详情" name="fanyongshuoming">
            <a-textarea
              v-model:value="formState.fanyongshuoming"
              placeholder="请输入"
            />
          </a-form-item>
        </a-col>
        <a-col :xs="24" :sm="12">
          <a-form-item label="启禁用" name="qijinyong">
            <a-select v-model:value="formState.qijinyong" placeholder="请选择">
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
          <a-form-item label="上下架" name="shangxiajia">
            <a-select
              v-model:value="formState.shangxiajia"
              placeholder="请选择"
            >
              <a-select-option
                v-for="item in shangxiajia"
                :key="item.value"
                :value="item.value"
              >
                {{ item.label }}
              </a-select-option>
            </a-select>
          </a-form-item>
        </a-col>
      </a-row>
    </a-form>
  </a-modal>
</template>
<script lang="ts" setup>
import { reactive, ref } from 'vue'
import { message } from 'ant-design-vue'
import { reqAdd } from '@/api/admin/goods'

defineOptions({ name: 'Add' })
// 属性
withDefaults(
  defineProps<{
    del: any
    shangxiajia: any
    fanyongStatus: any
    operate: any
    phonePool: any
    province: any
  }>(),
  {
    del: () => [],
    shangxiajia: () => [],
    fanyongStatus: () => [],
    operate: () => [],
    phonePool: () => [],
    province: () => [],
  },
)

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

const rules = {
  shangjiMingcheng: [{ required: true, message: '不能为空' }],
  shangjiBianma: [{ required: true, message: '不能为空' }],
  mingcheng: [{ required: true, message: '不能为空' }],
  yunyingshang: [{ required: true, message: '请选择' }],
  guishudi: [{ required: true, message: '不能为空' }],
  dinggoujiage: [{ required: true, message: '不能为空' }],
  qudaoshangBianma: [{ required: true, message: '不能为空' }],
  chanpinXiangqing: [{ required: true, message: '不能为空' }],
  fanyongshuoming: [{ required: true, message: '不能为空' }],
  qijinyong: [{ required: true, message: '请选择' }],
  shangxiajia: [{ required: true, message: '请选择' }],
}

const show = () => {
  open.value = true
  Object.assign(formState, {
    shangjiMingcheng: '',
    shangjiBianma: '',
    mingcheng: '',
    goodsName: '',
    del: '',
    shangxiajia: '',
    fanyongId: '',
    yunyingshang: '',
    fanyongStatus: '',
    goodsSku: '',
    goodsPrice: '',
    picjudge: '',
    phonelibs: '',
    tPhonepoolId: '',
    goodsFile: '',
    provinceId: '',
    goodsDe: '',
    maidDetail: '',
    noAddress: '',
    maxAge: '',
    minAge: '',
    maiDian: '',
    remark: '',
    ziliaokuUrl: '',
    price: '',
  })
  formRef.value?.clearValidate()
}

const submit = async () => {
  try {
    await formRef.value.validate()
    console.log('formState :>> ', formState)

    const formData = new FormData()
    formData.append('shangjiMingcheng', formState.shangjiMingcheng)
    formData.append('shangjiBianma', formState.shangjiBianma)
    formData.append('mingcheng', formState.mingcheng)
    formData.append('goodsName', formState.goodsName)
    formData.append('del', formState.del)
    formData.append('shangxiajia', formState.shangxiajia)
    formData.append('fanyongId', formState.fanyongId)
    formData.append('yunyingshang', formState.yunyingshang)
    formData.append('fanyongStatus', formState.fanyongStatus)
    formState.goodsSku && formData.append('goodsSku', formState.goodsSku)
    formData.append('goodsPrice', formState.goodsPrice)
    formData.append('price', formState.price)
    formData.append('picjudge', formState.picjudge)
    formData.append('phonelibs', formState.phonelibs)
    formState.tPhonepoolId &&
      formData.append('tPhonepoolId', formState.tPhonepoolId)
    formState.goodsFile && formData.append('goodsFile', formState.goodsFile)
    formData.append('provinceId', formState.provinceId)
    formState.goodsDe && formData.append('goodsDe', formState.goodsDe)
    formState.maidDetail && formData.append('maidDetail', formState.maidDetail)
    formState.noAddress && formData.append('noAddress', formState.noAddress)
    formState.maxAge && formData.append('maxAge', formState.maxAge)
    formState.minAge && formData.append('minAge', formState.minAge)
    formState.maiDian && formData.append('maiDian', formState.maiDian)
    formState.remark && formData.append('remark', formState.remark)
    formState.ziliaokuUrl &&
      formData.append('ziliaokuUrl', formState.ziliaokuUrl)

    const res = await reqAdd(formData)
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
