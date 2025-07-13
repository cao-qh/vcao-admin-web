<template>
  <a-form style="margin-bottom: 10px">
    <a-row :gutter="32">
      <template
        v-for="(item, index) in formItems.filter((item) => !item.hidden)"
        :key="item.field"
      >
        <a-col v-if="index < 3 || advanced" :xs="24" :md="8" :xl="6">
          <a-form-item :label="item.label">
            <a-input
              v-if="item.type === 'input'"
              v-model:value.trim="item.value"
              :placeholder="item.placeholder"
              :allowClear="item.allowClear === false ? false : true"
            />
            <a-select
              v-if="item.type === 'select'"
              v-model:value="item.value"
              :placeholder="item.placeholder"
              :mode="item.mode"
              :allowClear="item.allowClear === false ? false : true"
              showSearch
              :filterOption="filterOption"
              @change="item.onChange"
            >
              <a-select-option
                v-if="item.defaultOption"
                :value="item.defaultOption.value"
                :label="item.defaultOption.label"
              >
                {{ item.defaultOption.label }}
              </a-select-option>
              <template v-if="Array.isArray(item.options)">
                <a-select-option
                  v-for="option in item.options"
                  :key="option.value"
                  :label="option.label"
                >
                  <span class="ant-select-option-item">{{ option.label }}</span>
                </a-select-option>
              </template>
              <template v-else>
                <template
                  v-for="option in promiseOptionsResult[item.field]"
                  :key="option.value"
                >
                  <a-select-option
                    v-if="option.value"
                    :label="option.label"
                    :value="option.value"
                  >
                    <span class="ant-select-option-item">
                      {{ option.label }}
                    </span>
                  </a-select-option>
                  <a-select-opt-group
                    v-else-if="option.options"
                    :label="option.label"
                  >
                    <a-select-option
                      v-for="option2 in option.options"
                      :key="option2.value"
                      :label="option2.label"
                    >
                      <span class="ant-select-option-item">
                        {{ option2.label }}
                      </span>
                    </a-select-option>
                  </a-select-opt-group>
                </template>
              </template>
            </a-select>
            <a-date-picker
              v-if="item.type === 'datePicker'"
              inputReadOnly
              style="width: 100%"
              v-model:value="item.value"
              :showTime="item.showTime"
              :valueFormat="item.valueFormat"
              :disabledDate="item.disabledDate"
              :allowClear="item.allowClear === false ? false : true"
              @change="item.onChange"
            />
          </a-form-item>
        </a-col>
      </template>
      <a-col>
        <a-space>
          <a-button type="primary" @click="$emit('search')">查询</a-button>
          <a-button @click="handleReset">重置</a-button>
          <a
            v-if="formItems.filter((item) => !item.hidden).length > 3"
            @click="toggleAdvanced"
            style="margin-left: 8px"
          >
            {{ advanced ? '收起' : '展开' }}
            <UpOutlined v-if="advanced" />
            <DownOutlined v-else />
          </a>
        </a-space>
      </a-col>
    </a-row>
  </a-form>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted, useAttrs } from 'vue'
import useLayoutSettingStore from '@/store/modules/setting'
import type { SearchFormProps } from './type'

const advanced = ref(true)
const attrs = useAttrs()

defineEmits(['search'])

defineOptions({
  name: 'SearchForm',
  inheritAttrs: false,
})

const handleReset = () => {
  if (attrs.onReset) {
    const onReset = attrs.onReset as () => void
    onReset()
  } else {
    layoutSettingStore.refresh = true
  }
}

const props = withDefaults(defineProps<SearchFormProps>(), {
  formItems: () => [
    {
      type: 'input',
      label: '用户名',
      field: 'username',
      value: '',
      placeholder: '请输入用户名',
    },
  ],
})
const layoutSettingStore = useLayoutSettingStore()

const filterOption = (input: string, option: any) => {
  return option.label.toLowerCase().indexOf(input.toLowerCase()) >= 0
}

const toggleAdvanced = () => {
  advanced.value = !advanced.value
}

// 把options是返回promise的函数，执行，获取结果
const promiseOptionsResult = reactive<Record<string, any>>({})
onMounted(() => {
  props.formItems.forEach((item) => {
    if (typeof item.options === 'function') {
      item.options().then((res) => {
        promiseOptionsResult[item.field] = res
      })
    }
  })
})

// 获取某个表单项
const getFormItem = (field: string) => {
  const item = props.formItems.find((item) => item.field === field)
  if (item) {
    return item
  }
}

// 获取全部表单项的值
const getFormValues = () => {
  const values: any = {}
  props.formItems.forEach((item) => {
    if (
      item.value !== '' &&
      item.value !== undefined &&
      item.value !== null &&
      !item.hidden
    ) {
      values[item.field] = item.value
    }
  })
  return values
}

defineExpose({
  getFormItem,
  getFormValues,
})
</script>

<style lang="scss" scoped>
.ant-select-option-item {
  white-space: normal;
  word-wrap: break-all;
}
</style>
