import Link from 'next/link'
import Trans from 'next-translate/Trans'
import { CardContent } from '@material-ui/core'
import useTranslation from 'next-translate/useTranslation'

import Modal from '@elements/Modal'
import Button from '@elements/Button/Button'

import { StyledCard, Title } from './SignupSuccessDialog.styled'

interface ISignupSuccessDialogProps {
  email: string
}

const SignupSuccessDialog = ({ email }: ISignupSuccessDialogProps) => {
  const { t } = useTranslation('common')

  return (
    <Modal open>
      <StyledCard elevation={0}>
        <CardContent>
          <Title>{t('success')}</Title>

          <Trans
            i18nKey='common:confirmationEmailWillBeSentTo'
            values={{ email }}
            components={[<p key='0' />, <b key='1' />]}
          />

          <Link href='/login'>
            <Button>{t('login')}</Button>
          </Link>
        </CardContent>
      </StyledCard>
    </Modal>
  )
}

export default SignupSuccessDialog
