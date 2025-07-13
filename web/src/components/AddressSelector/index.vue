<template>
  <div>
    <a-form-item-rest>
      <a-cascader
        style="width: 100%"
        :options="addressData"
        :fieldNames="fieldNames"
        :show-search="{ filter }"
        placeholder="省 市 区"
        :displayRender="displayRender"
        v-model:value="SSQ"
        @change="triggerChange"
      />
      <a-input
        style="margin-top: 5px"
        placeholder="详细地址"
        allowClear
        v-model:value="detail"
        @change="triggerChange"
      />
    </a-form-item-rest>
  </div>
</template>
<script lang="ts" setup>
import { ref, watch } from 'vue'
import addressData from './address.json'
import type { ShowSearchType } from 'ant-design-vue/es/cascader'
import { Form } from 'ant-design-vue'

defineOptions({
  name: 'AddressSelector',
})

// 取值
const getValue = (
  keys: string[],
  keysField: string,
  valueField: string,
): string[] => {
  const values: string[] = []

  if (keys.length < 1) {
    return values
  }

  const province: any = addressData.find((item: any) => {
    return item[keysField] === keys[0]
  })

  if (province) {
    values.push(province[valueField])

    if (keys.length < 2) {
      return values
    }

    const city = province.list?.find((item: any) => {
      return item[keysField] === keys[1]
    })

    if (city) {
      values.push(city[valueField])

      if (keys.length < 3) {
        return values
      }

      const area = city.list?.find((item: any) => {
        return item[keysField] === keys[2]
      })

      if (area) {
        values.push(area[valueField])
      }
    }
  }

  return values
}

const formItemContext = Form.useInjectFormItemContext()

const fieldNames = {
  label: 'label',
  value: 'code',
  children: 'list',
}

const model = defineModel<string>('value')
const SSQ = ref<string[]>([])
const detail = ref<string>('')

watch(
  model,
  () => {
    if (model.value) {
      const arr = model.value.split(' ')
      SSQ.value = getValue(arr, 'label', 'code')
      detail.value = arr[arr.length - 1]
    } else {
      SSQ.value = []
      detail.value = ''
    }
  },
  { immediate: true },
)

const filter: ShowSearchType['filter'] = (inputValue, path) => {
  return path.some(
    (option) =>
      option.label.toLowerCase().indexOf(inputValue.toLowerCase()) > -1,
  )
}

const displayRender = ({ labels }: { labels: string[] }) => {
  return labels.join(' ')
}

const triggerChange = () => {
  const temp = getValue(SSQ.value || [], 'code', 'label')
  model.value = `${temp.join(' ')} ${detail.value}`
  formItemContext.onFieldChange()
}
</script>
