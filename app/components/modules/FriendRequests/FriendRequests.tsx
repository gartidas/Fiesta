import { isEmpty } from 'lodash'
import { PeopleTwoTone } from '@material-ui/icons'
import useQueryClientPlus from '@hooks/useQueryClientPlus'
import useTranslation from 'next-translate/useTranslation'
import { Box, Typography, CircularProgress } from '@material-ui/core'

import Item from './Item'
import Observer from '@elements/Observer'
import { getErrorMessage } from '@utils/utils'
import { useFriendRequests } from './FriendRequestsProvider'
import { acceptFriendRequest, rejectFriendRequest } from './utils'

import { StyledMenu } from './FriendRequests.styled'

interface IFriendRequestsProps {
  anchorEl: HTMLElement
  onClose: () => void
}

const FriendRequests = ({ anchorEl, onClose }: IFriendRequestsProps) => {
  const { t } = useTranslation('common')
  const queryClient = useQueryClientPlus()
  const { friendRequests, error, hasMore, isLoading, loadMore, removeFriendRequest } =
    useFriendRequests()

  const handleAccepted = async (friendId: string) => {
    await acceptFriendRequest(friendId, t, queryClient)
    removeFriendRequest(friendId)
  }

  const handleRejected = async (friendId: string) => {
    await rejectFriendRequest(friendId, t, queryClient)
    removeFriendRequest(friendId)
  }

  return (
    <StyledMenu
      open
      elevation={4}
      anchorEl={anchorEl}
      onClose={onClose}
      getContentAnchorEl={null}
      anchorOrigin={{ horizontal: 'center', vertical: 'bottom' }}
      transformOrigin={{ horizontal: 'center', vertical: 'top' }}
    >
      <Box
        padding='15px 20px'
        color='themeText.themeGray'
        display='flex'
        gridGap='5px'
        alignItems='center'
      >
        <PeopleTwoTone />
        <Typography variant='h6'>{t('friendRequests')}</Typography>
      </Box>

      {!isLoading && !error && isEmpty(friendRequests) && (
        <Box padding='15px 20px' color='themeText.themeBlack'>
          <Typography variant='body2'>{t('nothingFound')}</Typography>
        </Box>
      )}

      {error && (
        <Typography variant='body1' color='error'>
          {getErrorMessage(error, t)}
        </Typography>
      )}

      {friendRequests &&
        friendRequests.map(x => (
          <div key={x.user.id}>
            <Item
              friendRequest={x}
              onAccept={() => handleAccepted(x.user.id)}
              onReject={() => handleRejected(x.user.id)}
            />
          </div>
        ))}

      {isLoading && (
        <Box margin='15px 20px'>
          <CircularProgress />
        </Box>
      )}

      <Observer callback={loadMore} disabled={isLoading || !hasMore} />
    </StyledMenu>
  )
}

export default FriendRequests
