import Notification from '@elements/Notification/Notification'
import Trans from 'next-translate/Trans'
import { useNotifications } from '../NotificationsProvider'
import { INotification } from '../types'

interface IFriendRequestReplyProps {
  notification: INotification<{
    friendId: string
    friendUsername: string
    friendPictureUrl?: string
    accepted: boolean
  }>
}

const FriendRequestReply = ({ notification }: IFriendRequestReplyProps) => {
  const { setSeen } = useNotifications()
  const { friendId, friendUsername, friendPictureUrl, accepted } = notification.model

  return (
    <Notification
      setSeen={() => setSeen(notification.id)}
      seen={notification.seen}
      imageSrc={friendPictureUrl}
      createdAt={notification.createdAt}
      href={`/users/${friendId}`}
    >
      <Trans
        i18nKey={
          accepted
            ? 'common:notification.friendRequestAccepted'
            : 'common:notification.friendRequestRejected'
        }
        values={{ friend: friendUsername }}
        components={[<strong key='0' />]}
      />
    </Notification>
  )
}

export default FriendRequestReply
