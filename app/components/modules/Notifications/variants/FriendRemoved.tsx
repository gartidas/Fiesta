import Notification from '@elements/Notification/Notification'
import Trans from 'next-translate/Trans'
import { useNotifications } from '../NotificationsProvider'
import { INotification } from '../types'

interface IFriendRemovedProps {
  notification: INotification<{
    friendId: string
    friendUsername: string
    friendPictureUrl?: string
  }>
}

const FriendRemoved = ({ notification }: IFriendRemovedProps) => {
  const { setSeen } = useNotifications()
  const { friendId, friendUsername, friendPictureUrl } = notification.model

  return (
    <Notification
      setSeen={() => setSeen(notification.id)}
      seen={notification.seen}
      imageSrc={friendPictureUrl}
      createdAt={notification.createdAt}
      href={`/users/${friendId}`}
    >
      <Trans
        i18nKey='common:notification.friendRemoved'
        values={{ friend: friendUsername }}
        components={[<strong key='0' />]}
      />
    </Notification>
  )
}

export default FriendRemoved
