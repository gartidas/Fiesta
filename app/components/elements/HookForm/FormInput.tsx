import { Controller, useFormContext } from 'react-hook-form'
import useTranslation from 'next-translate/useTranslation'

import { Validator } from '@elements/HookForm/types'
import TextBox, { TextBoxProps } from '@elements/TextBox/TextBox'

interface IFormInputProps extends Omit<TextBoxProps, 'value' | 'onChange'> {
  name: string
  label?: string
  type?: string
  placeholder?: string
  validate?: Validator<any>
}

const FormInput = ({
  name,
  label,
  type,
  disabled,
  validate: initialValidate,
  ...rest
}: IFormInputProps) => {
  const form = useFormContext()
  const { t } = useTranslation('common')
  const { errors } = form

  const validate = initialValidate ? (value: string) => initialValidate(value, t, form) : undefined

  const getParsingOnChangeFunction = (onChange: (x: any) => void) => (value: string) => {
    if (type === 'number') return onChange(Number(value))
    return onChange(value)
  }

  return (
    <Controller
      name={name}
      rules={{ validate }}
      render={({ onChange, ...innerRest }) => (
        <TextBox
          {...innerRest}
          {...rest}
          type={type}
          label={label}
          error={errors[name]?.message}
          onChange={getParsingOnChangeFunction(onChange)}
          disabled={disabled || form.formState.isSubmitting}
        />
      )}
    />
  )
}

export default FormInput
