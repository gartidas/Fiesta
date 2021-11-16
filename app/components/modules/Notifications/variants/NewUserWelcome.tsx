import Button from '@elements/Button/Button'
import Notification from '@elements/Notification/Notification'
import Trans from 'next-translate/Trans'
import { useNotifications } from '../NotificationsProvider'
import { INotification } from '../types'

interface INewUserWelcomeProps {
  notification: INotification<{
    firstName: string
  }>
}

const NewUserWelcome = ({ notification }: INewUserWelcomeProps) => {
  const { setSeen } = useNotifications()
  const { firstName } = notification.model

  return (
    <Notification
      setSeen={() => setSeen(notification.id)}
      seen={notification.seen}
      createdAt={notification.createdAt}
    >
      <Trans
        i18nKey='common:notification.newUserWelcome'
        values={{ firstName }}
        components={[
          <strong key='0' />,
          <br key='1' />,
          <Button variant='text' key='2' style={{ padding: '0 0 1px 0' }} href='/explore' />
        ]}
      />
    </Notification>
  )
}

export default NewUserWelcome
