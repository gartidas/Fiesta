import useTranslation from 'next-translate/useTranslation'
import { Controller, useFormContext } from 'react-hook-form'

import { Validator } from '@elements/HookForm/types'
import SearchableDropdown from '@elements/SearchableDropdown/SearchableDropdown'
import { ISearchableDropdownProps } from '@elements/SearchableDropdown/types'

interface IFormSearchableDropdownProps<TValue, TFormatted>
  extends Omit<ISearchableDropdownProps<TValue, TFormatted>, 'value' | 'onChange' | 'error'> {
  name: string
  validate?: Validator
}

const FormSearchableDropdown = <
  TValue extends { [key: string]: any } = any,
  TFormatted extends { [key: string]: any } = TValue
>({
  name,
  disabled,
  validate: initialValidate,
  ...rest
}: IFormSearchableDropdownProps<TValue, TFormatted>) => {
  const form = useFormContext()
  const { t } = useTranslation('common')
  const { errors } = form

  const validate = initialValidate ? (value: string) => initialValidate(value, t, form) : undefined

  return (
    <Controller
      name={name}
      rules={{ validate }}
      render={({ value, onChange }) => (
        <SearchableDropdown
          {...rest}
          value={value}
          onChange={onChange}
          error={errors[name]?.message}
          disabled={disabled || form.formState.isSubmitting}
        />
      )}
    />
  )
}

export default FormSearchableDropdown
