import { TextBoxProps } from '@elements/TextBox/TextBox'
import { ReactNode } from 'react'

export interface IFetchOptions<T, TFormatted> {
  url: string
  params?: any
  formatter?: (value: T) => TFormatted
}

export interface ISearchableDropdownProps<TValue, TFormatted> {
  options: TFormatted[] | IFetchOptions<TValue, TFormatted>
  value?: TFormatted
  keyProp?: string
  valueProp?: string
  label?: string
  error?: string
  icon?: ReactNode
  disabled?: boolean
  variant?: TextBoxProps['variant']
  maxHeight?: string
  className?: string
  onChange: (value?: TFormatted) => void
  optionRenderer?: (value: TFormatted) => ReactNode
}
