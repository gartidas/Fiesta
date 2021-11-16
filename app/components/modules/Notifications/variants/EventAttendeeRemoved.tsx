import Trans from 'next-translate/Trans'
import { INotification } from '../types'
import { useNotifications } from '../NotificationsProvider'
import Notification from '@elements/Notification/Notification'

interface IEventAttendeeRemovedProps {
  notification: INotification<{
    eventId: string
    eventName: string
    removedById: string
    removedByUsername: string
    removedByPictureUrl?: string
  }>
}

const EventAttendeeRemoved = ({ notification }: IEventAttendeeRemovedProps) => {
  const { setSeen } = useNotifications()
  const { eventName, removedByUsername, removedByPictureUrl } = notification.model

  return (
    <Notification
      setSeen={() => setSeen(notification.id)}
      seen={notification.seen}
      imageSrc={removedByPictureUrl}
      createdAt={notification.createdAt}
    >
      <Trans
        i18nKey='common:notification.eventAttendeeRemoved'
        values={{ removedBy: removedByUsername, event: eventName }}
        components={[<strong key='0' />]}
      />
    </Notification>
  )
}

export default EventAttendeeRemoved
