import { QueryClient } from 'react-query'

import { FriendStatus, IUserDetail } from 'domainTypes'

export const handleFriendAdded = (userId: string, queryClient: QueryClient) => {
  queryClient.setQueryData<IUserDetail>(['users', userId], prev => ({
    ...prev!,
    friendStatus: FriendStatus.FriendRequestSent
  }))
}

export const handleFriendRemoved = (userId: string, queryClient: QueryClient) => {
  queryClient.setQueryData<IUserDetail>(['users', userId], prev => ({
    ...prev!,
    friendStatus: FriendStatus.None,
    numberOfFriends: prev!.numberOfFriends - 1
  }))
}

export const handleFriendRequestUnsent = (userId: string, queryClient: QueryClient) => {
  queryClient.setQueryData<IUserDetail>(['users', userId], prev => ({
    ...prev!,
    friendStatus: FriendStatus.None
  }))
}

export const handleFriendRequestAccepted = (userId: string, queryClient: QueryClient) => {
  queryClient.setQueryData<IUserDetail>(['users', userId], prev => ({
    ...prev!,
    friendStatus: FriendStatus.Friend,
    numberOfFriends: prev!.numberOfFriends + 1
  }))
}

export const handleFriendRequestRejected = (userId: string, queryClient: QueryClient) => {
  queryClient.setQueryData<IUserDetail>(['users', userId], prev => ({
    ...prev!,
    friendStatus: FriendStatus.None
  }))
}
