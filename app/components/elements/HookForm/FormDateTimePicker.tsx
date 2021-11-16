import DateTimePicker, { DateTimePickerProps } from '@elements/DateTimePicker/DateTimePicker'
import useTranslation from 'next-translate/useTranslation'
import { Controller, useFormContext } from 'react-hook-form'
import { Validator } from '@elements/HookForm/types'

interface IFormDateTimePickerProps extends Omit<DateTimePickerProps, 'onChange' | 'value'> {
  name: string
  label: string
  validate?: Validator
}

const FormDateTimePicker = ({
  name,
  disabled,
  validate: initialValidate,
  ...rest
}: IFormDateTimePickerProps) => {
  const form = useFormContext()
  const { t } = useTranslation('common')
  const { errors } = form

  const validate = initialValidate ? (value: string) => initialValidate(value, t, form) : undefined

  return (
    <Controller
      name={name}
      rules={{ validate }}
      render={({ value, onChange, ref, ...other }) => (
        <DateTimePicker
          {...rest}
          {...other}
          value={value}
          onChange={onChange}
          error={errors[name]?.message}
          disabled={disabled || form.formState.isSubmitting}
        />
      )}
    />
  )
}

export default FormDateTimePicker
