import { useEffect, useState } from 'react'
import { Box } from '@material-ui/core'
import useTranslation from 'next-translate/useTranslation'

import Avatar from '@elements/Avatar'
import Button from '@elements/Button/Button'
import TextBox from '@elements/TextBox/TextBox'
import { useAuthorizedUser } from '@contextProviders/AuthProvider'

interface INewCommentProps {
  onSend: (text: string) => Promise<void>
  onCancel?: () => void
  initialText?: string
  sendButtonText?: string
  placeholder?: string
  autofocus?: boolean
  smallAvatar?: boolean
}

const NewComment = ({
  sendButtonText,
  autofocus,
  initialText,
  placeholder,
  smallAvatar,
  onSend,
  onCancel
}: INewCommentProps) => {
  const [text, setText] = useState('')
  const [sending, setSending] = useState(false)
  const { t } = useTranslation('common')
  const { currentUser } = useAuthorizedUser()
  const [showButtons, setShowButtons] = useState(false)

  // Setting initial state this way so the cursor ends up at the end of the text
  useEffect(() => {
    initialText && setText(initialText)
  }, [initialText])

  const handleCancel = () => {
    setShowButtons(false)
    setText('')
    onCancel?.()
  }

  const handleSent = async () => {
    setSending(true)
    await onSend(text)
    setSending(false)

    handleCancel()
  }

  return (
    <Box marginBottom='10px' marginTop='2px'>
      <Box display='flex' gridGap='15px'>
        <Avatar
          src={currentUser.pictureUrl}
          size={smallAvatar ? '30px' : undefined}
          smSize={smallAvatar ? '25px' : undefined}
        />

        <TextBox
          value={text}
          onChange={setText}
          multiline
          fullWidth
          color='secondary'
          autoFocus={autofocus}
          onFocus={() => setShowButtons(true)}
          placeholder={(placeholder || t('addComment')) + '...'}
        />
      </Box>

      {showButtons && (
        <Box display='flex' justifyContent='flex-end' gridGap='10px' marginTop='5px'>
          <Button variant='text' color='secondary' onClick={handleCancel} disabled={sending}>
            {t('cancel').toUpperCase()}
          </Button>

          <Button
            disabled={!text || text === initialText}
            disableElevation
            onClick={handleSent}
            loading={sending}
          >
            {(sendButtonText || t('send')).toUpperCase()}
          </Button>
        </Box>
      )}
    </Box>
  )
}

export default NewComment
