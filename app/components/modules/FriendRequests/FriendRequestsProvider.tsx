import { createContext, FC, useCallback, useContext, useEffect, useState } from 'react'
import { InfiniteData, useInfiniteQuery, useQueryClient } from 'react-query'

import useHub from '@hooks/useHub'
import api from '@api/HttpClient'
import { IUserDto } from 'domainTypes'
import { useAuth } from '@contextProviders/AuthProvider'
import { IApiError, ISkippedItemsDocument, ISkippedItemsResponse } from '@api/types'

export interface IFriendRequest {
  user: IUserDto
  requestedOn: string
}

interface IFriendRequestsContextValue {
  friendRequests?: IFriendRequest[]
  isLoading: boolean
  totalCount: number
  error: IApiError | null
  hasMore: boolean
  loadMore: () => Promise<any>
  removeFriendRequest: (friendId: string) => void
}

const FriendRequestsContext = createContext<IFriendRequestsContextValue>(null!)
export const useFriendRequests = () => useContext(FriendRequestsContext)

const FriendRequestsProvider: FC = ({ children }) => {
  const auth = useAuth()
  const queryClient = useQueryClient()
  const [totalCount, setTotalCount] = useState(0)
  const { hubConnection } = useHub('/friends-hub')
  const currUserId = auth.isLoggedIn ? auth.currentUser.id : ''

  const { data, isLoading, error, hasNextPage, isFetching, fetchNextPage } = useInfiniteQuery<
    ISkippedItemsResponse<IFriendRequest>,
    IApiError
  >(
    [currUserId, 'friend-requests', 'query'],
    async ({ pageParam = 0 }) => {
      const skippedItemsDocument: ISkippedItemsDocument = {
        skip: pageParam
      }
      const { data } = await api.post(`users/${currUserId}/friend-requests/query`, {
        skippedItemsDocument
      })
      return data
    },
    {
      staleTime: Number.POSITIVE_INFINITY,
      cacheTime: Number.POSITIVE_INFINITY,
      enabled: auth.isLoggedIn,
      keepPreviousData: true,
      getNextPageParam: ({ hasMore }, allPages) =>
        hasMore ? allPages.flatMap(x => x.entries).length : false
    }
  )

  useEffect(() => {
    if (!data?.pages[0]) return
    setTotalCount(data.pages[0].totalEntries)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading, isFetching])

  const receiveFriendRequest = useCallback(
    (request: IFriendRequest) => {
      queryClient.setQueryData<InfiniteData<ISkippedItemsResponse<IFriendRequest>>>(
        [currUserId, 'friend-requests', 'query'],
        prev => ({
          ...prev!,
          pages: prev!.pages.map((page, index) =>
            index === 0
              ? {
                  ...page,
                  entries: [request, ...page.entries]
                }
              : page
          )
        })
      )
      setTotalCount(prev => prev + 1)
    },
    [currUserId, queryClient]
  )
  const removeFriendRequest = useCallback(
    (friendId: string) => {
      queryClient.setQueryData<InfiniteData<ISkippedItemsResponse<IFriendRequest>>>(
        [currUserId, 'friend-requests', 'query'],
        prev => ({
          ...prev!,
          pages: prev!.pages.map(page => ({
            ...page,
            entries: page.entries.filter(x => x.user.id !== friendId)
          }))
        })
      )
      setTotalCount(prev => prev - 1)
    },
    [currUserId, queryClient]
  )

  useEffect(() => {
    if (!hubConnection) return
    hubConnection.on('ReceiveFriendRequest', receiveFriendRequest)
    hubConnection.on('RemoveFriendRequest', removeFriendRequest)

    return () => {
      hubConnection.off('ReceiveFriendRequest')
      hubConnection.off('RemoveFriendRequest')
    }
  }, [hubConnection, receiveFriendRequest, removeFriendRequest])

  const value: IFriendRequestsContextValue = {
    error,
    totalCount,
    hasMore: !!hasNextPage,
    isLoading: isLoading || isFetching,
    friendRequests: data ? data.pages.flatMap(page => page.entries) : undefined,
    loadMore: useCallback(() => fetchNextPage(), [fetchNextPage]),
    removeFriendRequest
  }

  return <FriendRequestsContext.Provider value={value}>{children}</FriendRequestsContext.Provider>
}

export default FriendRequestsProvider
