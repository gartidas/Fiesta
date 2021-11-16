import { Translate } from 'next-translate'
import { UseFormMethods } from 'react-hook-form'

export type Validator<TFormValues = any, TValue = any> = (
  value: TValue,
  t: Translate,
  form: UseFormMethods<TFormValues>
) => string | undefined

export type SubmitFormatter<T> = (values: T, form: UseFormMethods<T>) => Record<string, any>
