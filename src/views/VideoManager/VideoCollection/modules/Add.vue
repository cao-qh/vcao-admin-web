<template>
  <a-modal
    title="添加"
    :open="open"
    @ok="submit"
    @cancel="open = false"
    :width="880"
    :bodyStyle="{ height: '500px', overflow: 'auto' }"
  >
    <a-form ref="formRef" :model="formState" :rules="rules" v-bind="layout">
      <a-row>
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
          <a-form-item label="权重(%)" name="quanzhong">
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
          <a-form-item label="演员导演" name="yanyuan">
            <a-select
              v-model:value="formState.yanyuan"
              placeholder="请选择"
              mode="multiple"
            >
              <a-select-option
                v-for="item in actorRoleList"
                :key="item.bm"
                :value="item.bm"
              >
                {{ item.mc }}
              </a-select-option>
            </a-select>
          </a-form-item>
        </a-col>
        <a-col :xs="24" :sm="12">
          <a-form-item label="类别" name="xiaolei">
            <a-select
              v-model:value="formState.xiaolei"
              placeholder="请选择"
              mode="multiple"
            >
              <a-select-option
                v-for="item in smallClassList"
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
          <a-form-item label="上下架" name="shangxiajia">
            <a-radio-group v-model:value="formState.shangxiajia">
              <a-radio-button
                v-for="item in shangxiajia"
                :key="item.value"
                :value="item.value"
              >
                {{ item.label }}
              </a-radio-button>
            </a-radio-group>
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
import { reqAdd } from '@/api/VideoManager/VideoCollection'
import UploadImage from '@/components/UploadImage/index.vue'

defineOptions({ name: 'Add' })

defineProps({
  shangxiajia: {
    type: Array<any>,
    default: () => [],
  },
  updateStatus: {
    type: Array<any>,
    default: () => [],
  },
  recommend: {
    type: Array<any>,
    default: () => [],
  },
  actorRoleList: {
    type: Array<any>,
    default: () => [],
  },
  smallClassList: {
    type: Array<any>,
    default: () => [],
  },
})

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
  mingcheng: [{ required: true, message: '请输入' }],
  fileSLT: [{ required: true, message: '请选择' }],
  pujia: [{ required: true, message: '请输入' }],
  huiyuanjia: [{ required: true, message: '请输入' }],
  tuijian: [{ required: true, message: '请选择' }],
  jianjie: [{ required: true, message: '请输入' }],
  juqingjieshao: [{ required: true, message: '请输入' }],
  shangxiajia: [{ required: true, message: '请选择' }],
  dianzan: [{ required: true, message: '请输入' }],
  zhuanfa: [{ required: true, message: '请输入' }],
  liulanshu: [{ required: true, message: '请输入' }],
  quanzhong: [{ required: true, message: '请输入' }],
  zongjishu: [{ required: true, message: '请输入' }],
  gengxinzhuangtai: [{ required: true, message: '请选择' }],
  yanyuan: [{ required: true, message: '请输入' }],
  xiaolei: [{ required: true, message: '请输入' }],
}

const show = () => {
  open.value = true
  Object.assign(formState, {
    mingcheng: '',
    fileSLT: '',
    pujia: null,
    huiyuanjia: '',
    tuijian: null,
    jianjie: '',
    juqingjieshao: '',
    shangxiajia: 1,
    dianzan: '',
    zhuanfa: '',
    liulanshu: '',
    quanzhong: '',
    zongjishu: '',
    gengxinzhuangtai: null,
    yanyuan: [],
    xiaolei: [],
  })
  formRef.value?.clearValidate()
}

const submit = async () => {
  try {
    await formRef.value.validate()

    const formData = new FormData()
    formData.append('mingcheng', formState.mingcheng)
    formData.append('fileSLT', formState.fileSLT)
    formData.append('pujia', formState.pujia)
    formData.append('huiyuanjia', formState.huiyuanjia)
    formData.append('tuijian', formState.tuijian)
    formData.append('jianjie', formState.jianjie)
    formData.append('juqingjieshao', formState.juqingjieshao)
    formData.append('shangxiajia', formState.shangxiajia)
    formData.append('dianzan', formState.dianzan)
    formData.append('zhuanfa', formState.zhuanfa)
    formData.append('liulanshu', formState.liulanshu)
    formData.append('quanzhong', formState.quanzhong)
    formData.append('zongjishu', formState.zongjishu)
    formData.append('gengxinzhuangtai', formState.gengxinzhuangtai)
    formData.append('yanyuan', formState.yanyuan)
    formData.append('xiaolei', formState.xiaolei)

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
