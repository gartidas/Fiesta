import Trans from 'next-translate/Trans'
import { INotification } from '../types'
import { useNotifications } from '../NotificationsProvider'
import Notification from '@elements/Notification/Notification'

interface IEventAttendeeLeftProps {
  notification: INotification<{
    eventId: string
    eventName: string
    attendeeId: string
    attendeeUsername: string
    attendeePictureUrl?: string
  }>
}

const EventAttendeeLeft = ({ notification }: IEventAttendeeLeftProps) => {
  const { setSeen } = useNotifications()
  const { eventName, attendeeId, attendeeUsername, attendeePictureUrl } = notification.model

  return (
    <Notification
      setSeen={() => setSeen(notification.id)}
      seen={notification.seen}
      imageSrc={attendeePictureUrl}
      createdAt={notification.createdAt}
      href={`/users/${attendeeId}`}
    >
      <Trans
        i18nKey='common:notification.eventAttendeeLeft'
        values={{ attendee: attendeeUsername, event: eventName }}
        components={[<strong key='0' />]}
      />
    </Notification>
  )
}

export default EventAttendeeLeft
