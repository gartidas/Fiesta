import { useState } from 'react'
import { InfiniteData, useInfiniteQuery, useQueryClient } from 'react-query'
import { Box } from '@material-ui/core'
import useTranslation from 'next-translate/useTranslation'

import api from '@api/HttpClient'
import { IApiError, IQueryDocument, IQueryResponse } from '@api/types'
import useDebounce from '@hooks/useDebounce'
import FetchError from '@elements/FetchError/FetchError'
import { SearchModal, SearchModalItem } from '@modules/SearchModal'
import FriendButton from '../FriendMenu/FriendButton'
import { FriendStatus, IUserDetail, IUserDto } from 'domainTypes'
import UserListItem from '@elements/UserListItem/UserListItem'
import useWindowSize from '@hooks/useWindowSize'

interface IFriendsSearchProps {
  onClose: () => void
  userId: string
  currUserId: string
}

interface IFriend extends IUserDto {
  friendStatus: FriendStatus
}

const FriendsSearch = ({ onClose, userId, currUserId }: IFriendsSearchProps) => {
  const { t } = useTranslation('common')
  const [search, setSearch] = useState('')
  const debouncedSearch = useDebounce(search)
  const queryClient = useQueryClient()
  const { maxMedium } = useWindowSize()
  const queryKey = ['users', userId, 'friends', 'query', debouncedSearch]

  const { data, isFetching, isLoading, error, hasNextPage, fetchNextPage } = useInfiniteQuery<
    IQueryResponse<IFriend>,
    IApiError
  >(
    queryKey,
    async ({ pageParam = 0 }) => {
      const queryDocument: IQueryDocument = {
        sorts: [{ fieldName: 'username' }],
        page: pageParam,
        pageSize: 25
      }
      const res = await api.post(
        `/users/${userId}/friends/query?search=${encodeURIComponent(debouncedSearch)}`,
        {
          queryDocument
        }
      )
      return res.data
    },
    {
      keepPreviousData: true,
      getNextPageParam: ({ hasMore, nextPage }) => (hasMore ? nextPage : false)
    }
  )

  const handleFriendAdded = (id: string) => {
    queryClient.setQueryData<InfiniteData<IQueryResponse<IFriend>>>(queryKey, prev => ({
      ...prev!,
      pages: prev!.pages.map(page => ({
        ...page,
        entries: page.entries.map(friend =>
          friend.id === id ? { ...friend, friendStatus: FriendStatus.FriendRequestSent } : friend
        )
      }))
    }))
  }

  const handleFriendRemoved = (id: string) => {
    queryClient.setQueryData<InfiniteData<IQueryResponse<IFriend>>>(queryKey, prev => ({
      ...prev!,
      pages: prev!.pages.map(page => ({
        ...page,
        entries:
          userId === currUserId
            ? page.entries!.filter(friend => friend.id !== id)
            : page.entries!.map(friend =>
                friend.id === id ? { ...friend, friendStatus: FriendStatus.None } : friend
              )
      }))
    }))
    userId === currUserId &&
      queryClient.setQueryData<IUserDetail>(['users', userId], prev => ({
        ...prev!,
        numberOfFriends: prev!.numberOfFriends - 1
      }))
  }

  const handleFriendRequestUnsent = (id: string) => {
    queryClient.setQueryData<InfiniteData<IQueryResponse<IFriend>>>(queryKey, prev => ({
      ...prev!,
      pages: prev!.pages.map(page => ({
        ...page,
        entries: page.entries.map(friend =>
          friend.id === id ? { ...friend, friendStatus: FriendStatus.None } : friend
        )
      }))
    }))
  }

  const handleFriendRequestAccepted = (id: string) => {
    queryClient.setQueryData<InfiniteData<IQueryResponse<IFriend>>>(queryKey, prev => ({
      ...prev!,
      pages: prev!.pages.map(page => ({
        ...page,
        entries: page.entries.map(friend =>
          friend.id === id ? { ...friend, friendStatus: FriendStatus.Friend } : friend
        )
      }))
    }))
  }

  const handleFriendRequestRejected = (id: string) => {
    queryClient.setQueryData<InfiniteData<IQueryResponse<IFriend>>>(queryKey, prev => ({
      ...prev!,
      pages: prev!.pages.map(page => ({
        ...page,
        entries: page.entries.map(friend =>
          friend.id === id ? { ...friend, friendStatus: FriendStatus.None } : friend
        )
      }))
    }))
  }

  if (error) return <FetchError error={error} />

  const renderItem = (item: IFriend) => (
    <SearchModalItem disableRipple>
      <UserListItem user={item} href={`/users/${item.id}`} isLink onClick={onClose} />
      <Box marginLeft='auto'>
        {item.id !== currUserId && (
          <FriendButton
            userId={item.id}
            friendStatus={item.friendStatus}
            onFriendAdded={handleFriendAdded}
            onFriendRemoved={handleFriendRemoved}
            onFriendRequestUnsent={handleFriendRequestUnsent}
            onFriendRequestAccepted={handleFriendRequestAccepted}
            onFriendRequestRejected={handleFriendRequestRejected}
            size={maxMedium ? 'small' : undefined}
          />
        )}
      </Box>
    </SearchModalItem>
  )

  return (
    <SearchModal
      title={t('friends')}
      items={data?.pages.flatMap(x => x.entries) || []}
      hasNextPage={hasNextPage}
      fetchNextPage={fetchNextPage}
      search={search}
      isFetching={isFetching || isLoading}
      onClose={onClose}
      setSearch={setSearch}
      renderItem={renderItem}
      searchPlaceholder={t('searchFriends')}
    />
  )
}

export default FriendsSearch
