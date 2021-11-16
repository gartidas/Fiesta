import Notification from '@elements/Notification/Notification'
import Trans from 'next-translate/Trans'
import { memo } from 'react'
import { useNotifications } from '../NotificationsProvider'
import { INotification } from '../types'

interface IEventJoinRequestCreatedProps {
  notification: INotification<{
    eventId: string
    eventName: string
    interestedUserUsername: string
    interestedUserPictureUrl?: string
  }>
}

const EventJoinRequestCreated = memo(({ notification }: IEventJoinRequestCreatedProps) => {
  const { setSeen } = useNotifications()
  const { eventId, eventName, interestedUserPictureUrl, interestedUserUsername } =
    notification.model

  return (
    <Notification
      setSeen={() => setSeen(notification.id)}
      seen={notification.seen}
      imageSrc={interestedUserPictureUrl}
      createdAt={notification.createdAt}
      href={`/events/${eventId}?tab=joinRequests`}
    >
      <Trans
        i18nKey='common:notification.eventJoinRequestCreated'
        values={{ interestedUser: interestedUserUsername, event: eventName }}
        components={[<strong key='0' />]}
      />
    </Notification>
  )
})

export default EventJoinRequestCreated
