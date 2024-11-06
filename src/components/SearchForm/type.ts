import dayjs from 'dayjs'

export interface SearchFormProps {
  formItems?: FormItems
}

interface FormItem {
  hidden?: boolean
  field: string
  label: string
  type: string
  placeholder?: string
  value: string | number | null | dayjs.Dayjs | Array<string>
  options?: SelectOption[] | (() => Promise<SelectOptions>)
  defaultOption?: SelectOption
  mode?: string
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
