import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle
} from '@material-ui/core'
import useTranslation from 'next-translate/useTranslation'
import Button from '@elements/Button/Button'

interface IConfirmationDialogProps {
  onConfirm: () => void
  onCancel: () => void
  title?: string
  content: string
  confirmText?: string
  cancelText?: string
  confirmLoading?: boolean
}

const ConfirmationDialog = ({
  title,
  content,
  confirmText,
  cancelText,
  confirmLoading,
  onConfirm,
  onCancel
}: IConfirmationDialogProps) => {
  const { t } = useTranslation('common')

  return (
    <Dialog open onClose={confirmLoading ? undefined : onCancel}>
      <DialogTitle>{title || t('alert')}</DialogTitle>

      <DialogContent>
        <DialogContentText>{content}</DialogContentText>
      </DialogContent>

      <DialogActions>
        <Button variant='text' onClick={onCancel} disabled={confirmLoading}>
          {cancelText || t('cancel')}
        </Button>

        <Button variant='text' onClick={onConfirm} loading={confirmLoading}>
          {confirmText || t('confirm')}
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default ConfirmationDialog
