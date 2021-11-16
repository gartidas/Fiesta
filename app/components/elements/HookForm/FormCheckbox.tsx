import useTranslation from 'next-translate/useTranslation'
import { Controller, useFormContext } from 'react-hook-form'

import { Validator } from './types'
import Checkbox, { ICheckboxProps } from '@elements/Checkbox/Checkbox'

interface IFormCheckboxProps extends Omit<ICheckboxProps, 'checked' | 'onChange'> {
  label?: string
  name: string
  validate?: Validator<any>
}

const FormCheckbox = ({ name, validate: initialValidate, ...rest }: IFormCheckboxProps) => {
  const form = useFormContext()
  const { t } = useTranslation('common')
  const { errors } = form

  const validate = initialValidate ? (value: string) => initialValidate(value, t, form) : undefined

  return (
    <Controller
      name={name}
      rules={{ validate }}
      render={({ value, ...controllerRest }) => (
        <Checkbox {...rest} {...controllerRest} checked={value} error={errors[name]?.message} />
      )}
    />
  )
}

export default FormCheckbox
