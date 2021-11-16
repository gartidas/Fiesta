import Notification from '@elements/Notification/Notification'
import Trans from 'next-translate/Trans'
import { memo } from 'react'
import { useNotifications } from '../NotificationsProvider'
import { INotification } from '../types'

interface IEventInvitationCreatedProps {
  notification: INotification<{
    eventId: string
    eventName: string
    inviterUsername: string
    inviterPictureUrl?: string
  }>
}

const EventInvitationCreated = memo(({ notification }: IEventInvitationCreatedProps) => {
  const { setSeen } = useNotifications()
  const { eventId, eventName, inviterPictureUrl, inviterUsername } = notification.model

  return (
    <Notification
      setSeen={() => setSeen(notification.id)}
      seen={notification.seen}
      imageSrc={inviterPictureUrl}
      createdAt={notification.createdAt}
      href={`/events/${eventId}`}
    >
      <Trans
        i18nKey='common:notification.eventInvitationCreated'
        values={{ inviter: inviterUsername, event: eventName }}
        components={[<strong key='0' />]}
      />
    </Notification>
  )
})

export default EventInvitationCreated
