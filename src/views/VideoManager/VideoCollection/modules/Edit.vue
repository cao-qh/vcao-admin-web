<template>
  <a-modal
    title="修改"
    :open="open"
    @ok="submit"
    @cancel="open = false"
    :width="880"
    :bodyStyle="{ height: '500px', overflow: 'auto' }"
  >
    <a-form ref="formRef" :model="formState" v-bind="layout" :rules="rules">
      <a-row>
        <a-col :xs="24" :sm="12">
          <a-form-item label="编码" name="bianma">
            <a-input
              v-model:value.trim="formState.bianma"
              placeholder="请输入"
              disabled
            />
          </a-form-item>
        </a-col>
        <a-col :xs="24" :sm="12">
          <a-form-item label="名称" name="mingcheng">
            <a-input
              v-model:value.trim="formState.mingcheng"
              placeholder="请输入"
            />
          </a-form-item>
        </a-col>
        <a-col :xs="24" :sm="12">
          <a-form-item label="普通价格" name="pujia">
            <a-input-number
              :min="0"
              v-model:value.trim="formState.pujia"
              placeholder="请输入"
              style="width: 100%"
            />
          </a-form-item>
        </a-col>
        <a-col :xs="24" :sm="12">
          <a-form-item label="会员价格" name="huiyuanjia">
            <a-input-number
              :min="0"
              v-model:value.trim="formState.huiyuanjia"
              placeholder="请输入"
              style="width: 100%"
            />
          </a-form-item>
        </a-col>
        <a-col :xs="24" :sm="12">
          <a-form-item label="推荐" name="tuijian">
            <a-select v-model:value="formState.tuijian" placeholder="请选择">
              <a-select-option
                v-for="item in recommend"
                :key="item.value"
                :value="item.value"
              >
                {{ item.label }}
              </a-select-option>
            </a-select>
          </a-form-item>
        </a-col>
        <a-col :xs="24" :sm="12">
          <a-form-item label="点赞数" name="dianzan">
            <a-input-number
              :min="0"
              v-model:value.trim="formState.dianzan"
              placeholder="请输入"
              style="width: 100%"
            />
          </a-form-item>
        </a-col>
        <a-col :xs="24" :sm="12">
          <a-form-item label="转发数" name="zhuanfa">
            <a-input-number
              :min="0"
              v-model:value.trim="formState.zhuanfa"
              placeholder="请输入"
              style="width: 100%"
            />
          </a-form-item>
        </a-col>
        <a-col :xs="24" :sm="12">
          <a-form-item label="浏览数" name="liulanshu">
            <a-input-number
              :min="0"
              v-model:value.trim="formState.liulanshu"
              placeholder="请输入"
              style="width: 100%"
            />
          </a-form-item>
        </a-col>
        <a-col :xs="24" :sm="12">
          <a-form-item label="权重" name="quanzhong">
            <a-input-number
              :min="0"
              v-model:value.trim="formState.quanzhong"
              placeholder="请输入"
              style="width: 100%"
            />
          </a-form-item>
        </a-col>
        <a-col :xs="24" :sm="12">
          <a-form-item label="总集数" name="zongjishu">
            <a-input-number
              :min="0"
              v-model:value.trim="formState.zongjishu"
              placeholder="请输入"
              style="width: 100%"
            />
          </a-form-item>
        </a-col>
        <a-col :xs="24" :sm="12">
          <a-form-item label="更新状态" name="gengxinzhuangtai">
            <a-select
              v-model:value="formState.gengxinzhuangtai"
              placeholder="请选择"
            >
              <a-select-option
                v-for="item in updateStatus"
                :key="item.value"
                :value="item.value"
              >
                {{ item.label }}
              </a-select-option>
            </a-select>
          </a-form-item>
        </a-col>
        <a-col :xs="24" :sm="12">
          <a-form-item label="简介" name="jianjie">
            <a-textarea
              v-model:value.trim="formState.jianjie"
              placeholder="请输入"
            />
          </a-form-item>
        </a-col>
        <a-col :xs="24" :sm="12">
          <a-form-item label="剧情介绍" name="juqingjieshao">
            <a-textarea
              v-model:value.trim="formState.juqingjieshao"
              placeholder="请输入"
            />
          </a-form-item>
        </a-col>
        <a-col :xs="24" :sm="12">
          <a-form-item label="缩略图" name="fileSLT">
            <UploadImage v-model:value="formState.fileSLT" />
          </a-form-item>
        </a-col>
      </a-row>
    </a-form>
  </a-modal>
</template>
<script lang="ts" setup>
import { reactive, ref } from 'vue'
import { message } from 'ant-design-vue'
import { reqEdit } from '@/api/VideoManager/VideoCollection'
import UploadImage from '@/components/UploadImage/index.vue'

defineOptions({ name: 'Edit' })

defineProps({
  updateStatus: {
    type: Array<any>,
    default: () => [],
  },
  recommend: {
    type: Array<any>,
    default: () => [],
  },
})

// 定义方法
const $emit = defineEmits(['success'])
const baseUrl = import.meta.env.VITE_SERVE
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

const rules = {
  id: [{ required: true, message: '请输入' }],
  bianma: [{ required: true, message: '请输入' }],
  mingcheng: [{ required: true, message: '请输入' }],
  fileSLT: [{ required: true, message: '请选择' }],
  pujia: [{ required: true, message: '请输入' }],
  huiyuanjia: [{ required: true, message: '请输入' }],
  tuijian: [{ required: true, message: '请选择' }],
  jianjie: [{ required: true, message: '请输入' }],
  juqingjieshao: [{ required: true, message: '请输入' }],
  dianzan: [{ required: true, message: '请输入' }],
  zhuanfa: [{ required: true, message: '请输入' }],
  liulanshu: [{ required: true, message: '请输入' }],
  quanzhong: [{ required: true, message: '请输入' }],
  zongjishu: [{ required: true, message: '请输入' }],
  gengxinzhuangtai: [{ required: true, message: '请选择' }],
}

const formRef = ref()
const formState = reactive<any>({})

const show = async (row: any) => {
  open.value = true
  formState.id = row.id
  formState.bianma = row.bianma
  formState.mingcheng = row.mingcheng
  formState.fileSLT = baseUrl + row.suoluetu
  formState.pujia = row.pujia
  formState.huiyuanjia = row.huiyuanjia
  formState.tuijian = row.tuijian
  formState.jianjie = row.jianjie
  formState.juqingjieshao = row.juqingjieshao
  formState.dianzan = row.dianzan
  formState.zhuanfa = row.zhuanfa
  formState.liulanshu = row.liulanshu
  formState.quanzhong = row.quanzhong
  formState.zongjishu = row.zongjishu
  formState.gengxinzhuangtai = row.gengxinzhuangtai
}

const submit = async () => {
  try {
    await formRef.value.validate()

    const formData = new FormData()
    formData.append('id', formState.id)
    formData.append('bianma', formState.bianma)
    formData.append('mingcheng', formState.mingcheng)
    formData.append('fileSLT', formState.fileSLT)
    formData.append('pujia', formState.pujia)
    formData.append('huiyuanjia', formState.huiyuanjia)
    formData.append('tuijian', formState.tuijian)
    formData.append('jianjie', formState.jianjie)
    formData.append('juqingjieshao', formState.juqingjieshao)
    formData.append('dianzan', formState.dianzan)
    formData.append('zhuanfa', formState.zhuanfa)
    formData.append('liulanshu', formState.liulanshu)
    formData.append('quanzhong', formState.quanzhong)
    formData.append('zongjishu', formState.zongjishu)
    formData.append('gengxinzhuangtai', formState.gengxinzhuangtai)

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
