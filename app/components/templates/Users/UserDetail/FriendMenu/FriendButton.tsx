import { useState } from 'react'
import Link from 'next/link'
import { QueryClient, useQueryClient } from 'react-query'
import { PersonAdd } from '@material-ui/icons'
import useTranslation from 'next-translate/useTranslation'

import api from '@api/HttpClient'
import FriendMenu from './FriendMenu'
import AuthCheck from '@elements/AuthCheck'
import Button from '@elements/Button/Button'
import { FriendStatus } from 'domainTypes'
import { apiErrorToast, successToast } from 'services/toastService'
import { friendStatusEndIconMap, friendStatusStartIconMap, friendStatusTextMap } from './utils'
import { ButtonProps } from '@material-ui/core'

interface IProps {
  userId: string
  friendStatus: FriendStatus
  size?: ButtonProps['size']
  onFriendAdded: (id: string, queryClient: QueryClient) => void
  onFriendRemoved: (id: string, queryClient: QueryClient) => void
  onFriendRequestUnsent: (id: string, queryClient: QueryClient) => void
  onFriendRequestAccepted: (id: string, queryClient: QueryClient) => void
  onFriendRequestRejected: (id: string, queryClient: QueryClient) => void
}

const FriendButton = ({
  userId,
  friendStatus,
  size,
  onFriendAdded,
  onFriendRemoved,
  onFriendRequestUnsent,
  onFriendRequestAccepted,
  onFriendRequestRejected
}: IProps) => {
  const { t } = useTranslation('common')
  const queryClient = useQueryClient()
  const [friendEl, setFriendEl] = useState<HTMLElement>()
  const [friendStatusLoading, setFriendStatusLoading] = useState(false)

  const handleAddFriendClick = async () => {
    try {
      setFriendStatusLoading(true)
      await api.post(`/friends/send-request`, { friendId: userId })
      onFriendAdded(userId, queryClient)
      successToast(t('requestSent'))
    } catch (err) {
      apiErrorToast(err, t)
    }
    setFriendStatusLoading(false)
  }

  return (
    <>
      <AuthCheck
        fallback={loginUrl => (
          <Link href={loginUrl}>
            <Button variant='outlined' color='secondary' endIcon={<PersonAdd />}>
              {t('addFriend')}
            </Button>
          </Link>
        )}
      >
        <Button
          variant='outlined'
          loading={friendStatusLoading}
          color={friendStatus === FriendStatus.FriendRequestRecieved ? 'primary' : 'secondary'}
          startIcon={friendStatusStartIconMap[friendStatus]}
          endIcon={friendStatusEndIconMap[friendStatus]}
          onClick={e =>
            friendStatus === FriendStatus.None
              ? handleAddFriendClick()
              : setFriendEl(friendEl ? undefined : e.currentTarget)
          }
          size={size}
        >
          {t(friendStatusTextMap[friendStatus])}
        </Button>
      </AuthCheck>

      <FriendMenu
        userId={userId}
        friendStatus={friendStatus}
        onClose={() => setFriendEl(undefined)}
        anchorEl={friendEl}
        setLoading={setFriendStatusLoading}
        onFriendRemoved={onFriendRemoved}
        onFriendRequestUnsent={onFriendRequestUnsent}
        onFriendRequestAccepted={onFriendRequestAccepted}
        onFriendRequestRejected={onFriendRequestRejected}
      />
    </>
  )
}

export default FriendButton
