import useTranslation from 'next-translate/useTranslation'
import { BottomNavigation as MuiNavigation, BottomNavigationAction } from '@material-ui/core'
import {
  AccountCircleTwoTone,
  HomeTwoTone,
  ExploreTwoTone,
  SettingsTwoTone,
  HomeOutlined,
  ExploreOutlined,
  AccountCircleOutlined,
  SettingsOutlined
} from '@material-ui/icons'

import NavLink from '@elements/NavLink'
import useWindowSize from '@hooks/useWindowSize'
import { useAuth } from '@contextProviders/AuthProvider'

import { Wrapper } from './BottomNavigation.styled'

const BottomNavigation = () => {
  const { t } = useTranslation('common')
  const auth = useAuth()
  const { maxMedium } = useWindowSize()

  if (!maxMedium || !auth.isLoggedIn) return <></>

  return (
    <Wrapper>
      <MuiNavigation>
        <NavLink href='/home'>
          {isActive => (
            <BottomNavigationAction
              showLabel
              label={t('home')}
              icon={isActive ? <HomeTwoTone color='primary' /> : <HomeOutlined />}
            />
          )}
        </NavLink>

        <NavLink href='/explore'>
          {isActive => (
            <BottomNavigationAction
              showLabel
              label={t('explore')}
              icon={isActive ? <ExploreTwoTone color='primary' /> : <ExploreOutlined />}
            />
          )}
        </NavLink>

        <NavLink href={`/users/${auth.currentUser.id}`}>
          {isActive => (
            <BottomNavigationAction
              showLabel
              label={t('profile')}
              icon={isActive ? <AccountCircleTwoTone color='primary' /> : <AccountCircleOutlined />}
            />
          )}
        </NavLink>

        <NavLink href='/settings'>
          {isActive => (
            <BottomNavigationAction
              showLabel
              label={t('settings')}
              icon={isActive ? <SettingsTwoTone color='primary' /> : <SettingsOutlined />}
            />
          )}
        </NavLink>
      </MuiNavigation>
    </Wrapper>
  )
}

export default BottomNavigation
