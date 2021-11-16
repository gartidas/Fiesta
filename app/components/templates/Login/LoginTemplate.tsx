import { useState } from 'react'
import { useRouter } from 'next/router'
import useTranslation from 'next-translate/useTranslation'

import Divider from '@elements/Divider'
import Button from '@elements/Button/Button'
import FormInput from '@elements/HookForm/FormInput'
import { useAuth } from '@contextProviders/AuthProvider'
import Form, { IFormProps } from '@elements/HookForm/Form'
import GoogleLoginButton from '@elements/GoogleLoginButton'
import { PageMinHeightWrapper } from '@elements/PageMinHeightWrapper'
import ConfirmEmailDialog from './ConfirmEmailDialog/ConfirmEmailDialog'
import ForgotPasswordDialog from './ForgotPasswordDialog/ForgotPasswordDialog'
import { loginWithEmailAndPassword } from 'services/authService'
import { combineValidators, minLengthValidator, requiredValidator } from 'utils/validators'

import { FormContent, StyledCard, StyledForgotPasswordButton } from './LoginTemplate.styled'

interface IFormValues {
  emailOrUsername: string
  password: string
}

const defaultValues: IFormValues = {
  emailOrUsername: '',
  password: ''
}

const LoginTemplate = () => {
  const { t } = useTranslation('common')
  const { fetchUser } = useAuth()
  const router = useRouter()
  const [submitting, setSubmitting] = useState(false)
  const [emailToConfirm, setEmailToConfirm] = useState<string>()
  const [showResetPasswordDialog, setShowResetPasswordDialog] = useState(false)

  const handleSubmit: IFormProps<IFormValues>['onSubmit'] = async (values, { setError }) => {
    setSubmitting(true)
    const successOrError = await loginWithEmailAndPassword(values)

    if (successOrError !== true) {
      setSubmitting(false)
      if (successOrError === 'emailIsNotVerified') setEmailToConfirm(values.emailOrUsername)
      return setError('emailOrUsername', { message: t(`validator.${successOrError}`) })
    }

    await fetchUser()
    router.replace((router.query.redirectedFrom as string) || '/home')
  }

  return (
    <PageMinHeightWrapper center>
      <StyledCard>
        <Form onSubmit={handleSubmit} defaultValues={defaultValues}>
          <FormContent>
            <FormInput
              name='emailOrUsername'
              label={t('emailOrUserName')}
              validate={combineValidators([requiredValidator])}
            />
            <FormInput
              name='password'
              label={t('password')}
              type='password'
              validate={combineValidators([requiredValidator, minLengthValidator(6)])}
            />

            <Button type='submit' loading={submitting}>
              {t('login')}
            </Button>
          </FormContent>
        </Form>

        <StyledForgotPasswordButton
          variant='text'
          color='secondary'
          onClick={() => setShowResetPasswordDialog(true)}
        >
          {t('login:forgotPassword')}?
        </StyledForgotPasswordButton>

        <Divider />

        <GoogleLoginButton text={t('login:loginWithGoogle')} />
      </StyledCard>

      {emailToConfirm && (
        <ConfirmEmailDialog email={emailToConfirm} onClose={() => setEmailToConfirm(undefined)} />
      )}

      {showResetPasswordDialog && (
        <ForgotPasswordDialog onClose={() => setShowResetPasswordDialog(false)} />
      )}
    </PageMinHeightWrapper>
  )
}

export default LoginTemplate
