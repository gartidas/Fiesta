import useTranslation from 'next-translate/useTranslation'
import Alert, { AlertProps } from '@material-ui/lab/Alert'
import { StyledSnackBar } from './Snackbar.styled'

interface ISuccessSnackbarProps {
  onClose: () => void
  translationKey?: string
  text?: string
  severity?: AlertProps['severity']
}

const Snackbar = ({ severity, translationKey, text, onClose }: ISuccessSnackbarProps) => {
  const { t } = useTranslation('common')

  return (
    <StyledSnackBar
      open
      autoHideDuration={6000}
      onClose={onClose}
      anchorOrigin={{ horizontal: 'center', vertical: 'bottom' }}
    >
      <Alert onClose={onClose} severity={severity || 'success'} variant='outlined' elevation={10}>
        {translationKey ? t(translationKey) : text}
      </Alert>
    </StyledSnackBar>
  )
}

export default Snackbar
