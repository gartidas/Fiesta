import { useState } from 'react'
import { CardContent } from '@material-ui/core'
import { KeyboardArrowRight, Done } from '@material-ui/icons'
import useTranslation from 'next-translate/useTranslation'

import { IApiError } from '@api/types'
import api from '@api/HttpClient'
import Modal from '@elements/Modal'
import Button from '@elements/Button/Button'
import TextBox from '@elements/TextBox/TextBox'

import { StyledCard, Title } from './ForgotPasswordDialog.styled'

interface IConfirmEmailDialogProps {
  onClose: () => void
}

type SendingState = 'notSent' | 'sending' | 'sent'

const ConfirmEmailDialog = ({ onClose }: IConfirmEmailDialogProps) => {
  const { t } = useTranslation('common')
  const [email, setEmail] = useState('')
  const [error, setError] = useState<string>()
  const [state, setState] = useState<SendingState>('notSent')

  const handleSent = async () => {
    setError(undefined)
    if (state === 'sent') return

    setState('sending')
    try {
      await api.post('/auth/send-reset-password-email', { email })
      setState('sent')
    } catch (err) {
      const apiError = (err as IApiError).data
      setError(t(`validator.${apiError.errorMessage}`))
      setState('notSent')
    }
  }

  return (
    <Modal open onClose={onClose}>
      <StyledCard elevation={0}>
        <CardContent>
          <Title>{t('login:resetYourPassword')}</Title>

          <TextBox
            fullWidth
            value={email}
            error={error}
            onChange={setEmail}
            color='secondary'
            variant='outlined'
            label={t('emailAddress')}
          />

          {state === 'sent' && <p>{t('checkYourEmail')} !</p>}

          <Button
            onClick={handleSent}
            loading={state === 'sending'}
            endIcon={state === 'sent' ? <Done /> : <KeyboardArrowRight />}
          >
            {state === 'sent' ? t('success') : t('send')}
          </Button>
        </CardContent>
      </StyledCard>
    </Modal>
  )
}

export default ConfirmEmailDialog
