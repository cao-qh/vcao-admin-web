<template>
  <a-modal
    title="添加套餐"
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
          <a-form-item label="套餐佣金" name="goodsPrice">
            <a-input
              v-model:value="formState.goodsPrice"
              placeholder="请输入"
            />
          </a-form-item>
        </a-col>
        <a-col :xs="24" :sm="12">
          <a-form-item label="套餐价格" name="price">
            <a-input v-model:value="formState.price" placeholder="请输入" />
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
        <!-- <a-col :xs="24" :sm="12">
          <a-form-item label="是否选号" name="phonelibs">
            <a-select v-model:value="formState.phonelibs" placeholder="请选择">
              <a-select-option :value="1">是</a-select-option>
              <a-select-option :value="2">否</a-select-option>
            </a-select>
          </a-form-item>
        </a-col> -->
        <!-- <a-col :xs="24" :sm="12" v-if="formState.phonelibs == 1">
          <a-form-item label="关联号池表ID" name="tPhonepoolId">
            <a-select v-model:value="formState.phonePool" placeholder="请选择">
              <a-select-option
                v-for="item in phonePool"
                :key="item.id"
                :value="item.id"
              >
                {{ item.name }}
              </a-select-option>
            </a-select>
          </a-form-item>
        </a-col> -->
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
          <a-form-item label="套餐图片" name="goodsFile">
            <UploadImage v-model:value="formState.goodsFile" />
          </a-form-item>
        </a-col>
        <a-col :xs="24" :sm="12">
          <a-form-item label="套餐介绍" name="goodsDe">
            <a-textarea
              v-model:value="formState.goodsDe"
              placeholder="请输入"
            ></a-textarea>
          </a-form-item>
        </a-col>
        <a-col :xs="24" :sm="12">
          <a-form-item label="禁用平台" name="maidDetail">
            <a-input
              v-model:value="formState.maidDetail"
              placeholder="请输入"
            ></a-input>
          </a-form-item>
        </a-col>
        <a-col :xs="24" :sm="12">
          <a-form-item label="不发货地区" name="noAddress">
            <a-textarea
              v-model:value="formState.noAddress"
              placeholder="请输入"
            ></a-textarea>
          </a-form-item>
        </a-col>
        <a-col :xs="24" :sm="12">
          <a-form-item label="最高年龄" name="maxAge">
            <a-input-number
              v-model:value="formState.maxAge"
              placeholder="请输入"
              style="width: 100%"
            ></a-input-number>
          </a-form-item>
        </a-col>
        <a-col :xs="24" :sm="12">
          <a-form-item label="最低年龄" name="minAge">
            <a-input-number
              v-model:value="formState.minAge"
              placeholder="请输入"
              style="width: 100%"
            ></a-input-number>
          </a-form-item>
        </a-col>
        <a-col :xs="24" :sm="12">
          <a-form-item label="卖点" name="maiDian">
            <a-input
              v-model:value="formState.maiDian"
              placeholder="请输入"
              style="width: 100%"
            ></a-input>
          </a-form-item>
        </a-col>
        <a-col :xs="24" :sm="12">
          <a-form-item label="商品备注" name="remark">
            <a-textarea
              v-model:value="formState.remark"
              placeholder="请输入"
            ></a-textarea>
          </a-form-item>
        </a-col>
        <a-col :xs="24" :sm="12">
          <a-form-item label="资料库链接" name="ziliaokuUrl">
            <a-input
              v-model:value="formState.ziliaokuUrl"
              placeholder="请输入"
            ></a-input>
          </a-form-item>
        </a-col>
      </a-row>
    </a-form>
  </a-modal>
</template>
<script lang="ts" setup>
import { reactive, ref } from 'vue'
import { message } from 'ant-design-vue'
import { reqAdd } from '@/api/goods'
import UploadImage from '@/components/UploadImage/index.vue'

defineOptions({ name: 'Add' })
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
  packageNickcode: [{ required: true, message: '不能为空' }],
  packageNickname: [{ required: true, message: '不能为空' }],
  goodsCode: [{ required: true, message: '不能为空' }],
  goodsName: [{ required: true, message: '不能为空' }],
  del: [{ required: true, message: '不能为空' }],
  shangXiaJia: [{ required: true, message: '不能为空' }],
  fanyongId: [{ required: true, message: '不能为空' }],
  operateId: [{ required: true, message: '不能为空' }],
  fanyongStatus: [{ required: true, message: '不能为空' }],
  goodsPrice: [{ required: true, message: '不能为空' }],
  picjudge: [{ required: true, message: '不能为空' }],
  phonelibs: [{ required: true, message: '不能为空' }],
  provinceId: [{ required: true, message: '不能为空' }],
  price: [{ required: true, message: '不能为空' }],
}

const show = () => {
  open.value = true
  Object.assign(formState, {
    packageNickcode: '',
    packageNickname: '',
    goodsCode: '',
    goodsName: '',
    del: '',
    shangXiaJia: '',
    fanyongId: '',
    operateId: '',
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
    formData.append('packageNickcode', formState.packageNickcode)
    formData.append('packageNickname', formState.packageNickname)
    formData.append('goodsCode', formState.goodsCode)
    formData.append('goodsName', formState.goodsName)
    formData.append('del', formState.del)
    formData.append('shangXiaJia', formState.shangXiaJia)
    formData.append('fanyongId', formState.fanyongId)
    formData.append('operateId', formState.operateId)
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
