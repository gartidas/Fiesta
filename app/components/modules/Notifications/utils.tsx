import { ReactNode } from 'react'
import { InfiniteData, QueryClient } from 'react-query'

import { ISkippedItemsResponse } from '@api/types'
import { INotification, NotificationType } from './types'
import EventAttendeeLeft from './variants/EventAttendeeLeft'
import EventInvitationReply from './variants/EventInvitationReply'
import EventAttendeeRemoved from './variants/EventAttendeeRemoved'
import EventInvitationCreated from './variants/EventInvitationCreated'
import EventJoinRequestCreated from './variants/EventJoinRequestCreated'
import EventJoinRequestReply from './variants/EventJoinRequestReply'
import FriendRequestReply from './variants/FriendRequestReply'
import FriendRemoved from './variants/FriendRemoved'
import NewUserWelcome from './variants/NewUserWelcome'

export const getNotificationVariant = (notification: INotification<any>) => {
  const notificationMap: Record<NotificationType, ReactNode> = {
    [NotificationType.EventInvitationReply]: <EventInvitationReply notification={notification} />,
    [NotificationType.EventInvitationCreated]: (
      <EventInvitationCreated notification={notification} />
    ),
    [NotificationType.EventAttendeeRemoved]: <EventAttendeeRemoved notification={notification} />,
    [NotificationType.EventAttendeeLeft]: <EventAttendeeLeft notification={notification} />,
    [NotificationType.EventJoinRequestCreated]: (
      <EventJoinRequestCreated notification={notification} />
    ),
    [NotificationType.EventJoinRequestReply]: <EventJoinRequestReply notification={notification} />,
    [NotificationType.FriendRequestReply]: <FriendRequestReply notification={notification} />,
    [NotificationType.FriendRemoved]: <FriendRemoved notification={notification} />,
    [NotificationType.NewUserWelcome]: <NewUserWelcome notification={notification} />
  }

  return notificationMap[notification.type]
}

export const addNotification = (queryClient: QueryClient, notification: INotification<any>) => {
  queryClient.setQueryData<InfiniteData<ISkippedItemsResponse<INotification<any>>>>(
    ['notifications'],
    prev =>
      prev
        ? {
            ...prev,
            pages: prev.pages.map((page, pageIndex) => ({
              ...page,
              entries: pageIndex === 0 ? [notification, ...page.entries] : page.entries
            }))
          }
        : { pages: [], pageParams: [] }
  )
}

export const setNotificationSeen = (queryClient: QueryClient, id: number) => {
  queryClient.setQueryData<InfiniteData<ISkippedItemsResponse<INotification<any>>>>(
    ['notifications'],
    prev =>
      prev
        ? {
            ...prev,
            pages: prev.pages.map(page => ({
              ...page,
              entries: page.entries.map(e => (e.id === id ? { ...e, seen: true } : e))
            }))
          }
        : { pages: [], pageParams: [] }
  )
}

export const setAllNotificationsSeen = (queryClient: QueryClient) => {
  queryClient.setQueryData<InfiniteData<ISkippedItemsResponse<INotification<any>>>>(
    ['notifications'],
    prev =>
      prev
        ? {
            ...prev,
            pages: prev.pages.map(page => ({
              ...page,
              entries: page.entries.map(e => ({ ...e, seen: true }))
            }))
          }
        : { pages: [], pageParams: [] }
  )
}

export const deleteAllNotifications = (queryClient: QueryClient) => {
  queryClient.setQueryData<InfiniteData<ISkippedItemsResponse<INotification<any>>>>(
    ['notifications'],
    {
      pages: [
        { hasMore: false, entries: [], take: 0, skip: 0, totalEntries: 0, additionalData: null }
      ],
      pageParams: []
    }
  )
}
