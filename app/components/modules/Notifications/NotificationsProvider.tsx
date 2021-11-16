import { createContext, FC, useCallback, useContext, useEffect, useState } from 'react'
import { useInfiniteQuery, useQueryClient } from 'react-query'

import api from '@api/HttpClient'
import useHub from '@hooks/useHub'
import { INotification } from './types'
import { useAuth } from '@contextProviders/AuthProvider'
import { IApiError, ISkippedItemsDocument, ISkippedItemsResponse } from '@api/types'
import {
  addNotification,
  setNotificationSeen,
  setAllNotificationsSeen,
  deleteAllNotifications
} from './utils'

type Response = ISkippedItemsResponse<INotification<any>, { unseenCount: number }>

interface INotificationsContextValue {
  notifications?: INotification<any>[]
  isLoading: boolean
  unseenCount: number
  error: IApiError | null
  hasMore: boolean
  loadMore: () => Promise<any>
  setSeen: (id: number) => Promise<void>
  setAllSeen: () => Promise<void>
  deleteAll: () => Promise<void>
}

const NotificationsContext = createContext<INotificationsContextValue>(null!)
export const useNotifications = () => useContext(NotificationsContext)

const NotificationsProvider: FC = ({ children }) => {
  const { isLoggedIn } = useAuth()
  const queryClient = useQueryClient()
  const [unseenCount, setUnseenCount] = useState(0)
  const { hubConnection } = useHub('/notifications-hub')

  const { data, isLoading, error, hasNextPage, isFetching, fetchNextPage } = useInfiniteQuery<
    Response,
    IApiError
  >(
    ['notifications'],
    async ({ pageParam = 0 }) => {
      const skippedItemsDocument: ISkippedItemsDocument = {
        skip: pageParam
      }
      const { data } = await api.post('/notifications/query', { skippedItemsDocument })
      return data
    },
    {
      staleTime: Number.POSITIVE_INFINITY,
      cacheTime: Number.POSITIVE_INFINITY,
      enabled: isLoggedIn,
      keepPreviousData: true,
      getNextPageParam: ({ hasMore }, allPages) =>
        hasMore ? allPages.flatMap(x => x.entries).length : false
    }
  )

  useEffect(() => {
    if (!data?.pages[0]) return
    setUnseenCount(data.pages[0].additionalData.unseenCount)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading, isFetching])

  const receiveNotification = useCallback(
    (notification: INotification<any>) => {
      addNotification(queryClient, notification)
      setUnseenCount(prev => prev + 1)
    },
    [queryClient]
  )

  const setSeen = useCallback(
    async (id: number) => {
      await hubConnection?.invoke('SetSeen', id)
      setNotificationSeen(queryClient, id)
      setUnseenCount(prev => prev - 1)
    },
    [hubConnection, queryClient]
  )

  const setAllSeen = useCallback(async () => {
    await hubConnection?.invoke('SetAllSeen')
    setAllNotificationsSeen(queryClient)
    setUnseenCount(0)
  }, [queryClient, hubConnection])

  const deleteAll = useCallback(async () => {
    await hubConnection?.invoke('DeleteAll')
    deleteAllNotifications(queryClient)
    setUnseenCount(0)
  }, [queryClient, hubConnection])

  useEffect(() => {
    if (!hubConnection) return

    hubConnection.on('ReceiveNotification', receiveNotification)

    return () => {
      hubConnection.off('ReceiveNotification')
    }
  }, [hubConnection, receiveNotification])

  const value: INotificationsContextValue = {
    error,
    unseenCount,
    hasMore: !!hasNextPage,
    isLoading: isLoading || isFetching,
    notifications: data ? data.pages.flatMap(page => page.entries) : undefined,
    setSeen,
    setAllSeen,
    deleteAll,
    loadMore: useCallback(() => fetchNextPage(), [fetchNextPage])
  }

  return <NotificationsContext.Provider value={value}>{children}</NotificationsContext.Provider>
}

export default NotificationsProvider
