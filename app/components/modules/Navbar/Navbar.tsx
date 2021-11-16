import { useState } from 'react'
import { useRouter } from 'next/dist/client/router'
import useTranslation from 'next-translate/useTranslation'
import { Badge, Tooltip } from '@material-ui/core'
import {
  HomeTwoTone,
  ExploreTwoTone,
  NotificationsTwoTone,
  PeopleTwoTone,
  SearchTwoTone,
  HomeOutlined,
  ExploreOutlined,
  PeopleOutlined,
  NotificationsOutlined
} from '@material-ui/icons'

import Avatar from '@elements/Avatar'
import NavLink from '@elements/NavLink'
import Button from '@elements/Button/Button'
import useWindowSize from '@hooks/useWindowSize'
import NavbarMenu from './NavbarMenu/NavbarMenu'
import HideOnScroll from '@elements/HideOnScroll'
import NavbarSearch from './NavbarSearch/NavbarSearch'
import { useAuth } from '@contextProviders/AuthProvider'
import Notifications from '@modules/Notifications/Notifications'
import FriendRequests from '@modules/FriendRequests/FriendRequests'
import { useNotifications } from '@modules/Notifications/NotificationsProvider'
import { useFriendRequests } from '@modules/FriendRequests/FriendRequestsProvider'

import {
  Logo,
  Menu,
  StyledAppBar,
  StyledContainer,
  StyledButtonGroup,
  NavIconButton
} from './Navbar.styled'

interface INavbarProps {
  forceUnauthorizedNavbar?: true
  transparent?: true
  disableHysteresis?: boolean
}

const Navbar = ({ forceUnauthorizedNavbar, transparent, disableHysteresis }: INavbarProps) => {
  const auth = useAuth()
  const router = useRouter()
  const { t } = useTranslation('common')
  const { maxMedium } = useWindowSize()
  const [searchOpen, setSearchOpen] = useState(false)
  const [avatarEl, setAvatarEl] = useState<HTMLElement>()
  const [notificationsEl, setNotificationsEl] = useState<HTMLElement>()
  const [friendRequestsEl, setFriendRequestsEl] = useState<HTMLElement>()
  const { unseenCount } = useNotifications()
  const { totalCount: friendRequestsCount } = useFriendRequests()

  const notificationButton = (
    <NavIconButton onClick={e => setNotificationsEl(notificationsEl ? undefined : e.currentTarget)}>
      <Badge badgeContent={unseenCount} color='primary'>
        {notificationsEl ? <NotificationsTwoTone color='primary' /> : <NotificationsOutlined />}
      </Badge>
    </NavIconButton>
  )

  const friendRequestsButton = (
    <NavIconButton
      onClick={e => setFriendRequestsEl(friendRequestsEl ? undefined : e.currentTarget)}
    >
      <Badge badgeContent={friendRequestsCount} color='primary'>
        {friendRequestsEl ? <PeopleTwoTone color='primary' /> : <PeopleOutlined />}
      </Badge>
    </NavIconButton>
  )

  const mobileContent = (
    <>
      <NavIconButton onClick={() => setSearchOpen(true)}>
        <SearchTwoTone />
      </NavIconButton>

      {friendRequestsButton}

      {notificationButton}
    </>
  )

  const desktopContent = auth.isLoggedIn && (
    <>
      <NavLink href='/home'>
        {isActive => (
          <Tooltip title={t('home')}>
            <NavIconButton>
              {isActive ? <HomeTwoTone color='primary' /> : <HomeOutlined />}
            </NavIconButton>
          </Tooltip>
        )}
      </NavLink>

      <NavLink href='/explore'>
        {isActive => (
          <Tooltip title={t('explore')}>
            <NavIconButton>
              {isActive ? <ExploreTwoTone color='primary' /> : <ExploreOutlined />}
            </NavIconButton>
          </Tooltip>
        )}
      </NavLink>

      <Tooltip title={t('friendRequests')}>{friendRequestsButton}</Tooltip>

      <Tooltip title={t('notifications')}>{notificationButton}</Tooltip>

      <Tooltip title={t('search')}>
        <NavIconButton onClick={() => setSearchOpen(true)}>
          <SearchTwoTone />
        </NavIconButton>
      </Tooltip>

      <Avatar
        src={auth.currentUser.pictureUrl}
        onClick={e => setAvatarEl(avatarEl ? undefined : e.currentTarget)}
      />

      {avatarEl && <NavbarMenu onClose={() => setAvatarEl(undefined)} anchorEl={avatarEl} />}
    </>
  )

  return (
    <HideOnScroll disableHysteresis={disableHysteresis}>
      <StyledAppBar elevation={0} transparent={transparent ? 1 : 0}>
        <StyledContainer>
          <Logo onClick={() => router.push(auth.isLoggedIn ? '/home' : '/')} />

          <Menu>
            {auth.isLoggedIn && !forceUnauthorizedNavbar ? (
              maxMedium ? (
                mobileContent
              ) : (
                desktopContent
              )
            ) : (
              <StyledButtonGroup>
                <Button
                  color='secondary'
                  variant='text'
                  size={maxMedium ? 'small' : 'large'}
                  href='/login'
                >
                  {t('login').toUpperCase()}
                </Button>

                <Button size={maxMedium ? 'small' : 'large'} href='/signup'>
                  {t('signup').toUpperCase()}
                </Button>
              </StyledButtonGroup>
            )}
          </Menu>
        </StyledContainer>

        {searchOpen && <NavbarSearch onClose={() => setSearchOpen(false)} />}

        {notificationsEl && (
          <Notifications anchorEl={notificationsEl} onClose={() => setNotificationsEl(undefined)} />
        )}

        {friendRequestsEl && (
          <FriendRequests
            anchorEl={friendRequestsEl}
            onClose={() => setFriendRequestsEl(undefined)}
          />
        )}
      </StyledAppBar>
    </HideOnScroll>
  )
}

export default Navbar
