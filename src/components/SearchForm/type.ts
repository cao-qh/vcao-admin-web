import dayjs from 'dayjs'

export interface SearchFormProps {
  formItems?: FormItems
}

interface FormItem {
  filed: string
  label: string
  type: string
  placeholder?: string
  value: string | number | null | dayjs.Dayjs
  options?: SelectOption[] | (() => Promise<SelectOptions>)
  defaultOption?: SelectOption
  showTime?: boolean
  valueFormat?: string
  allowClear?: boolean
  onChange?: (value: any) => void
  disabledDate?: (current: dayjs.Dayjs) => boolean
}

export type FormItems = FormItem[]

interface SelectOption {
  label: string
  value: string | number
}

export type SelectOptions = SelectOption[]
