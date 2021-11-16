import { Backdrop, makeStyles, Modal as MuiModal, ModalProps } from '@material-ui/core'
import { useCallback } from 'react'

const useStyles = makeStyles(theme => ({
  backdrop: {
    backgroundColor: theme.palette.type === 'dark' ? 'rgba(0,0,0,0.7)' : 'rgba(0,0,0,0.8)'
  }
}))

const Modal = (props: ModalProps) => {
  const styles = useStyles()

  return (
    <MuiModal
      {...props}
      BackdropProps={{ classes: { root: styles.backdrop } }}
      BackdropComponent={useCallback(
        props => (
          <Backdrop {...props} />
        ),
        []
      )}
    />
  )
}

export default Modal
