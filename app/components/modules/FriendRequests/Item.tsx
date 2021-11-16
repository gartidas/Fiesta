import { memo, useState } from 'react'
import { Box } from '@material-ui/core'
import { Close, Done } from '@material-ui/icons'
import useTranslation from 'next-translate/useTranslation'

import Button from '@elements/Button/Button'
import { IFriendRequest } from './FriendRequestsProvider'
import UserListItem from '@elements/UserListItem/UserListItem'

import { ItemWrapper } from './FriendRequests.styled'

interface IItemProps {
  friendRequest: IFriendRequest
  onAccept: () => Promise<void>
  onReject: () => Promise<void>
}

const Item = memo(({ friendRequest, onAccept, onReject }: IItemProps) => {
  const { t } = useTranslation('common')
  const [accepting, setAccepting] = useState(false)
  const [rejecting, setRejecting] = useState(false)

  const handleAccepted = async () => {
    setAccepting(true)
    await onAccept()
    setAccepting(false)
  }
  const handleRejected = async () => {
    setRejecting(true)
    await onReject()
    setRejecting(false)
  }

  return (
    <ItemWrapper disableRipple>
      <UserListItem user={friendRequest.user} isLink />

      <Box display='flex' gridGap='5px' marginLeft='auto'>
        <Button
          startIcon={<Done />}
          size='small'
          variant='outlined'
          loading={accepting}
          disabled={rejecting}
          onClick={handleAccepted}
        >
          {t('accept')}
        </Button>

        <Button
          startIcon={<Close />}
          size='small'
          variant='outlined'
          color='secondary'
          loading={rejecting}
          disabled={accepting}
          onClick={handleRejected}
        >
          {t('reject')}
        </Button>
      </Box>
    </ItemWrapper>
  )
})

export default Item
