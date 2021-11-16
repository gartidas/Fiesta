import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { CardContent } from '@material-ui/core'
import useTranslation from 'next-translate/useTranslation'
import { ArrowForward, KeyboardArrowRight } from '@material-ui/icons'

import Modal from '@elements/Modal'
import Form from '@elements/HookForm/Form'
import Button from '@elements/Button/Button'
import FormInput from '@elements/HookForm/FormInput'
import { createRepeatPasswordValidator } from 'utils/validators'
import { PageMinHeightWrapper } from '@elements/PageMinHeightWrapper'

import { StyledCard, SuccessResetDialogCard } from './ResetPasswordTemplate.styled'
import { useSubmitForm } from '@elements/HookForm/hooks/useSubmitForm'

export interface IFormValues {
  newPassword: string
  repeatPassword: string
}

const defaultValues: IFormValues = {
  newPassword: '',
  repeatPassword: ''
}

const ResetPasswordTemplate = () => {
  const { query } = useRouter()
  const { t } = useTranslation('common')
  const [success, setSuccess] = useState(false)

  const { onSubmit, submitting } = useSubmitForm<IFormValues>({
    url: '/auth/reset-password',
    formatter: ({ newPassword }) => ({ newPassword, email: query.email, token: query.token }),
    successCallback: () => setSuccess(true),
    errorCallback: err => {
      if (err.errorDetails.length === 0)
        alert('Something went wrong: ' + JSON.stringify(err, null, 2))
    }
  })

  return (
    <PageMinHeightWrapper center>
      <StyledCard>
        <h1>{t('setUpNewPassword')}</h1>

        <Form defaultValues={defaultValues} onSubmit={onSubmit}>
          <FormInput
            fullWidth
            type='password'
            color='secondary'
            name='newPassword'
            variant='outlined'
            label={t('newPassword')}
          />

          <FormInput
            fullWidth
            type='password'
            color='secondary'
            variant='outlined'
            name='repeatPassword'
            label={t('repeatPassword')}
            validate={createRepeatPasswordValidator('newPassword')}
          />

          <Button size='large' type='submit' loading={submitting} endIcon={<KeyboardArrowRight />}>
            {t('submit')}
          </Button>
        </Form>
      </StyledCard>

      <Modal open={success}>
        <SuccessResetDialogCard>
          <CardContent>
            <h1>{t('success')}</h1>

            <Link href='/login'>
              <Button endIcon={<ArrowForward />}>{t('login')}</Button>
            </Link>
          </CardContent>
        </SuccessResetDialogCard>
      </Modal>
    </PageMinHeightWrapper>
  )
}

export default ResetPasswordTemplate
