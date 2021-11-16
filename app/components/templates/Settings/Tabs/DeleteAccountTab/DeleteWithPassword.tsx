import useTranslation from 'next-translate/useTranslation'

import Button from '@elements/Button/Button'
import FormInput from '@elements/HookForm/FormInput'
import { useAuthorizedUser } from '@contextProviders/AuthProvider'
import Form from '@elements/HookForm/Form'
import { requiredValidator } from 'utils/validators'
import { useSubmitForm } from '@elements/HookForm/hooks/useSubmitForm'
import { successToast } from 'services/toastService'

interface IFormValues {
  password: string
}

const defaultValues: IFormValues = {
  password: ''
}

const DeleteWithPassword = () => {
  const { t } = useTranslation('common')
  const { logout } = useAuthorizedUser()

  const { onSubmit, submitting } = useSubmitForm<IFormValues>({
    url: '/auth/delete-account-with-password',
    method: 'delete',
    successCallback: async () => {
      await logout(false)
      successToast(t('accountDeleted'))
    },
    errorCallback: (err, { setError }) => {
      if (err.errorDetails.length === 0)
        setError('password', { message: t(`validator.${err.errorMessage}`) })
    }
  })

  return (
    <Form defaultValues={defaultValues} onSubmit={onSubmit}>
      <FormInput
        fullWidth
        name='password'
        type='password'
        label={t('password')}
        validate={requiredValidator}
      />
      <Button variant='outlined' type='submit' loading={submitting}>
        {t('delete')}
      </Button>
    </Form>
  )
}
export default DeleteWithPassword
