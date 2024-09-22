<template>
  <a-form style="margin-bottom: 10px">
    <a-row :gutter="32">
      <template v-for="(item, index) in formItems" :key="item.filed">
        <a-col
          v-if="(index < 3 || advanced) && !item.hidden"
          :xs="24"
          :md="8"
          :xl="6"
        >
          <a-form-item :label="item.label">
            <a-input
              v-if="item.type === 'input'"
              v-model:value="item.value"
              :placeholder="item.placeholder"
              :allowClear="item.allowClear === false ? false : true"
            />
            <a-select
              v-if="item.type === 'select'"
              v-model:value="item.value"
              :placeholder="item.placeholder"
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
                <a-select-option
                  v-for="option in promiseOptionsResult[item.filed]"
                  :key="option.value"
                  :label="option.label"
                >
                  <span class="ant-select-option-item">{{ option.label }}</span>
                </a-select-option>
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
            />
          </a-form-item>
        </a-col>
      </template>
      <a-col>
        <a-space>
          <a-button type="primary" @click="$emit('search')">查询</a-button>
          <a-button @click="layoutSettingStore.refresh = true">重置</a-button>
          <a
            v-if="formItems.length > 3"
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
import { ref, reactive, onMounted } from 'vue'
import useLayoutSettingStore from '@/store/modules/setting'
import type { SearchFormProps } from './type'

const advanced = ref(true)

defineEmits(['search'])

defineOptions({
  name: 'SearchForm',
})

const props = withDefaults(defineProps<SearchFormProps>(), {
  formItems: () => [
    {
      type: 'input',
      label: '用户名',
      filed: 'username',
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
        promiseOptionsResult[item.filed] = res
      })
    }
  })
})
</script>

<style lang="scss" scoped>
.ant-select-option-item {
  white-space: normal;
  word-wrap: break-all;
}
</style>
