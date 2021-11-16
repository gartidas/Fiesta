import { IApiError } from '@api/types'
import { Alert, AlertProps } from '@material-ui/lab'
import { getErrorMessage } from '@utils/utils'
import { Translate } from 'next-translate'
import { ReactNode } from 'react'
import { toast as toastifyToast } from 'react-toastify'

//Note: Fix for https://github.com/fkhadra/react-toastify/issues/224
const DummyContainer = ({ children }: { children: ReactNode }) => <div>{children}</div>

interface IToastOptions {
  severity?: AlertProps['severity']
}

const toast = (text: string, options?: IToastOptions) =>
  toastifyToast(
    <DummyContainer>
      <Alert variant='outlined' onClose={() => {}} {...options}>
        {text}
      </Alert>
    </DummyContainer>,
    {
      hideProgressBar: true,
      closeButton: false,
      position: 'top-right',
      autoClose: 4000,
      draggablePercent: 30
    }
  )

export const successToast = (text: string) => toast(text, { severity: 'success' })
export const infoToast = (text: string) => toast(text, { severity: 'info' })
export const errorToast = (text: string) => toast(text, { severity: 'error' })
export const warningToast = (text: string) => toast(text, { severity: 'warning' })

export const apiErrorToast = (error: IApiError, t: Translate) =>
  errorToast(getErrorMessage(error, t))
