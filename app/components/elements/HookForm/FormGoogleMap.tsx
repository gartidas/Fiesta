import Snackbar from '@elements/Snackbar/Snackbar'
import Map from '@modules/Map/Map'
import useTranslation from 'next-translate/useTranslation'
import { Controller, useFormContext } from 'react-hook-form'
import { Validator } from '@elements/HookForm/types'

interface IFormGoogleMapProps {
  name: string
  validate?: Validator<any>
}

const FormGoogleMap = ({ name, validate: initialValidate }: IFormGoogleMapProps) => {
  const form = useFormContext()
  const { t } = useTranslation('common')

  const validate = initialValidate ? (value: string) => initialValidate(value, t, form) : undefined
  const error = form.errors[name]?.message

  return (
    <>
      <Controller
        name={name}
        rules={{ validate }}
        render={({ onChange, value }) => <Map onChange={onChange} value={value} />}
      />

      {error && <Snackbar severity='error' onClose={() => form.clearErrors(name)} text={error} />}
    </>
  )
}

export default FormGoogleMap
