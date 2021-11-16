import { Translate } from 'next-translate'

import api from '@api/HttpClient'
import { apiErrorToast } from 'services/toastService'
import { FriendStatus, IUserDetail } from 'domainTypes'
import { QueryClientPlus } from '@hooks/useQueryClientPlus'

export const acceptFriendRequest = async (
  friendId: string,
  t: Translate,
  queryClient: QueryClientPlus
) => {
  try {
    await api.post(`/friends/confirm-request`, { friendId })

    queryClient.setLoadedQueryData<IUserDetail>(['users', friendId], prev => ({
      ...prev,
      friendStatus: FriendStatus.Friend,
      numberOfFriends: prev.numberOfFriends + 1
    }))
  } catch (err) {
    apiErrorToast(err, t)
  }
}

export const rejectFriendRequest = async (
  friendId: string,
  t: Translate,
  queryClient: QueryClientPlus
) => {
  try {
    await api.post(`/friends/reject-request`, { friendId })

    queryClient.setLoadedQueryData<IUserDetail>(['users', friendId], prev => ({
      ...prev,
      friendStatus: FriendStatus.None
    }))
  } catch (err) {
    apiErrorToast(err, t)
  }
}
