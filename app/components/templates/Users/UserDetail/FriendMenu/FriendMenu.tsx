import { QueryClient, useQueryClient } from 'react-query'
import useTranslation from 'next-translate/useTranslation'
import { Block, Cancel, CancelScheduleSend, Check } from '@material-ui/icons'

import api from '@api/HttpClient'
import { Menu } from '@elements/Menu/Menu'
import { FriendStatus } from 'domainTypes'
import { errorToast, successToast } from 'services/toastService'
import { useFriendRequests } from '@modules/FriendRequests/FriendRequestsProvider'

import { StyledMenuItem } from './FriendMenu.styled'

interface IFriendMenuProps {
  userId: string
  friendStatus: FriendStatus
  anchorEl?: HTMLElement
  setLoading: (loading: boolean) => void
  onClose: () => void
  onFriendRemoved: (id: string, queryClient: QueryClient) => void
  onFriendRequestUnsent: (id: string, queryClient: QueryClient) => void
  onFriendRequestAccepted: (id: string, queryClient: QueryClient) => void
  onFriendRequestRejected: (id: string, queryClient: QueryClient) => void
}

const FriendMenu = ({
  userId,
  anchorEl,
  friendStatus,
  onClose,
  setLoading,
  onFriendRemoved,
  onFriendRequestUnsent,
  onFriendRequestAccepted,
  onFriendRequestRejected
}: IFriendMenuProps) => {
  const { t } = useTranslation('common')
  const queryClient = useQueryClient()
  const { removeFriendRequest } = useFriendRequests()

  const handleRemoveFriendClicked = async () => {
    try {
      setLoading(true)
      onClose()
      await api.delete(`/friends/${userId}`)
      onFriendRemoved(userId, queryClient)
      successToast(t('friendRemoved'))
    } catch (_) {
      errorToast(t('somethingWentWrong'))
    }
    setLoading(false)
  }

  const handleUnsendFriendRequestClick = async () => {
    try {
      setLoading(true)
      onClose()
      await api.post(`/friends/unsend-request`, { friendId: userId })
      onFriendRequestUnsent(userId, queryClient)
      successToast(t('requestUnsent'))
    } catch (_) {
      errorToast(t('somethingWentWrong'))
    }
    setLoading(false)
  }

  const handleAcceptFriendRequestClick = async () => {
    try {
      setLoading(true)
      onClose()
      await api.post(`/friends/confirm-request`, { friendId: userId })
      onFriendRequestAccepted(userId, queryClient)
      removeFriendRequest(userId)
      successToast(t('requestAccepted'))
    } catch (_) {
      errorToast(t('somethingWentWrong'))
    }
    setLoading(false)
  }

  const handleRejectFriendRequestClick = async () => {
    try {
      setLoading(true)
      onClose()
      await api.post(`/friends/reject-request`, { friendId: userId })
      onFriendRequestRejected(userId, queryClient)
      removeFriendRequest(userId)
      successToast(t('requestRejected'))
    } catch (_) {
      errorToast(t('somethingWentWrong'))
    }
    setLoading(false)
  }

  return (
    <Menu elevation={4} keepMounted open={Boolean(anchorEl)} anchorEl={anchorEl} onClose={onClose}>
      {friendStatus == FriendStatus.Friend && (
        <StyledMenuItem id='removeMenuItem' onClick={handleRemoveFriendClicked}>
          <Cancel />
          {t('removeFriend')}
        </StyledMenuItem>
      )}

      {friendStatus == FriendStatus.FriendRequestSent && (
        <StyledMenuItem id='removeMenuItem' onClick={handleUnsendFriendRequestClick}>
          <CancelScheduleSend />
          {t('unsendFriendRequest')}
        </StyledMenuItem>
      )}

      {friendStatus == FriendStatus.FriendRequestRecieved && (
        <>
          <StyledMenuItem onClick={handleAcceptFriendRequestClick}>
            <Check />
            {t('acceptFriendRequest')}
          </StyledMenuItem>

          <StyledMenuItem id='removeMenuItem' onClick={handleRejectFriendRequestClick}>
            <Block />
            {t('rejectFriendRequest')}
          </StyledMenuItem>
        </>
      )}
    </Menu>
  )
}

export default FriendMenu
