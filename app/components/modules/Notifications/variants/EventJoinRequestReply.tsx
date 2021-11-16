import Notification from '@elements/Notification/Notification'
import Trans from 'next-translate/Trans'
import { useNotifications } from '../NotificationsProvider'
import { INotification } from '../types'

interface IEventJoinRequestReplyProps {
  notification: INotification<{
    eventId: string
    eventName: string
    accepted: boolean
    responderUsername: string
    responderPictureUrl: string
  }>
}

const EventJoinRequestReply = ({ notification }: IEventJoinRequestReplyProps) => {
  const { setSeen } = useNotifications()
  const { eventId, eventName, responderPictureUrl, responderUsername, accepted } =
    notification.model

  return (
    <Notification
      setSeen={() => setSeen(notification.id)}
      seen={notification.seen}
      imageSrc={responderPictureUrl}
      createdAt={notification.createdAt}
      href={`/events/${eventId}`}
    >
      <Trans
        i18nKey={
          accepted
            ? 'common:notification.eventJoinRequestAccepted'
            : 'common:notification.eventJoinRequestDeclined'
        }
        values={{ responder: responderUsername, event: eventName }}
        components={[<strong key='0' />]}
      />
    </Notification>
  )
}

export default EventJoinRequestReply
