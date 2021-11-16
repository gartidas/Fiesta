import { useState } from 'react'
import { isEmpty } from 'lodash'
import {
  DeleteTwoTone,
  MoreHoriz,
  NotificationsTwoTone,
  VisibilityTwoTone
} from '@material-ui/icons'
import useTranslation from 'next-translate/useTranslation'
import { Box, CircularProgress, Menu, Typography } from '@material-ui/core'

import Observer from '@elements/Observer'
import { getErrorMessage } from '@utils/utils'
import { useNotifications } from './NotificationsProvider'

import { getNotificationVariant } from './utils'
import { MoreButton, StyledMenu, StyledMenuItem } from './Notifications.styled'

interface INotificationsProps {
  anchorEl: HTMLElement
  onClose: () => void
}

const Notifications = ({ anchorEl, onClose }: INotificationsProps) => {
  const { notifications, isLoading, error, hasMore, loadMore, setAllSeen, deleteAll } =
    useNotifications()
  const { t } = useTranslation('common')
  const [moreButtonAnchorEl, setMoreButtonAnchorEl] = useState<HTMLElement>()

  const handleDeleteAll = async () => {
    await deleteAll()
    setMoreButtonAnchorEl(undefined)
  }

  const handleSetAllSeen = async () => {
    await setAllSeen()
    setMoreButtonAnchorEl(undefined)
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
        <NotificationsTwoTone />
        <Typography variant='h6'>{t('notifications')}</Typography>
        {!isEmpty(notifications) && (
          <MoreButton
            onClick={e =>
              moreButtonAnchorEl
                ? setMoreButtonAnchorEl(undefined)
                : setMoreButtonAnchorEl(e.currentTarget)
            }
          >
            <MoreHoriz />
          </MoreButton>
        )}
      </Box>

      {!isLoading && !error && isEmpty(notifications) && (
        <Box padding='15px 20px' color='themeText.themeBlack'>
          <Typography variant='body2'>{t('noNotifications')}</Typography>
        </Box>
      )}

      {error && (
        <Typography variant='body1' color='error'>
          {getErrorMessage(error, t)}
        </Typography>
      )}

      {notifications && notifications.map(x => <div key={x.id}>{getNotificationVariant(x)}</div>)}

      {isLoading && (
        <Box margin='15px 20px'>
          <CircularProgress />
        </Box>
      )}

      <Observer callback={loadMore} disabled={isLoading || !hasMore} />

      <Menu
        keepMounted
        getContentAnchorEl={null}
        anchorEl={moreButtonAnchorEl}
        open={Boolean(moreButtonAnchorEl)}
        onClose={() => setMoreButtonAnchorEl(undefined)}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
      >
        <StyledMenuItem onClick={handleDeleteAll}>
          <DeleteTwoTone />
          {t('deleteAllNotifications')}
        </StyledMenuItem>

        <StyledMenuItem onClick={handleSetAllSeen}>
          <VisibilityTwoTone />
          {t('setAllAsSeen')}
        </StyledMenuItem>
      </Menu>
    </StyledMenu>
  )
}

export default Notifications
