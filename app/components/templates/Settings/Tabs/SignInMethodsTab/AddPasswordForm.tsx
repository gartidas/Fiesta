import useTranslation from 'next-translate/useTranslation'

import FormInput from '@elements/HookForm/FormInput'
import { useAuth } from '@contextProviders/AuthProvider'
import SubmitButton from '@elements/HookForm/SubmitButton'
import Form from '@elements/HookForm/Form'
import { useSubmitForm } from '@elements/HookForm/hooks/useSubmitForm'
import {
  combineValidators,
  createRepeatPasswordValidator,
  minLengthValidator,
  requiredValidator
} from 'utils/validators'

interface IFormValues {
  password: string
  repeatPassword: string
}

const defaultValues: IFormValues = {
  password: '',
  repeatPassword: ''
}

const AddPasswordForm = () => {
  const { t } = useTranslation('common')
  const { fetchUser } = useAuth()

  const { onSubmit } = useSubmitForm<IFormValues>({
    url: '/auth/add-password',
    successCallback: fetchUser
  })

  return (
    <Form defaultValues={defaultValues} onSubmit={onSubmit}>
      <FormInput
        fullWidth
        name='password'
        type='password'
        label={t('password')}
        validate={combineValidators([requiredValidator, minLengthValidator(6)])}
      />
      <FormInput
        fullWidth
        type='password'
        name='repeatPassword'
        label={t('repeatPassword')}
        validate={createRepeatPasswordValidator('password')}
      />
      <SubmitButton variant='outlined'>{t('add')}</SubmitButton>
    </Form>
  )
}

export default AddPasswordForm
