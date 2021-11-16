import Notification from '@elements/Notification/Notification'
import Trans from 'next-translate/Trans'
import { useNotifications } from '../NotificationsProvider'
import { INotification } from '../types'

interface IEventInvitationReplyProps {
  notification: INotification<{
    eventId: string
    eventName: string
    accepted: boolean
    invitedUsername: string
    invitedPictureUrl: string
  }>
}

const EventInvitationReply = ({ notification }: IEventInvitationReplyProps) => {
  const { setSeen } = useNotifications()
  const { eventId, eventName, invitedPictureUrl, invitedUsername, accepted } = notification.model

  return (
    <Notification
      setSeen={() => setSeen(notification.id)}
      seen={notification.seen}
      imageSrc={invitedPictureUrl}
      createdAt={notification.createdAt}
      href={`/events/${eventId}`}
    >
      <Trans
        i18nKey={
          accepted
            ? 'common:notification.eventInvitationAccepted'
            : 'common:notification.eventInvitationDeclined'
        }
        values={{ invitee: invitedUsername, event: eventName }}
        components={[<strong key='0' />]}
      />
    </Notification>
  )
}

export default EventInvitationReply
