import Link from 'next/link'
import { PopoverOrigin } from '@material-ui/core'
import useTranslation from 'next-translate/useTranslation'
import {
  Brightness2Outlined,
  ExitToAppTwoTone,
  SettingsOutlined,
  VerifiedUserOutlined,
  WbSunnyTwoTone
} from '@material-ui/icons'

import { RoleEnum } from 'domainTypes'
import { useAuthorizedUser } from '@contextProviders/AuthProvider'
import { useAppTheme } from '@contextProviders/AppThemeProvider/AppThemeProvider'

import { Name, StyledAvatar, StyledDivider, StyledMenu, StyledMenuItem } from './NavbarMenu.styled'

interface INavbarMenuProps {
  anchorEl: HTMLElement
  onClose: () => void
}

const NavbarMenu = ({ anchorEl, onClose }: INavbarMenuProps) => {
  const { currentUser, logout } = useAuthorizedUser()
  const { isDark, switchTheme } = useAppTheme()
  const { t } = useTranslation('common')

  const userDetailLink = `/users/${currentUser.id}`

  const origins: {
    anchorOrigin: PopoverOrigin
    transformOrigin: PopoverOrigin
  } = {
    anchorOrigin: { horizontal: 'center', vertical: 'bottom' },
    transformOrigin: { horizontal: 'center', vertical: 'top' }
  }

  return (
    <StyledMenu
      elevation={4}
      open
      anchorEl={anchorEl}
      onClose={onClose}
      getContentAnchorEl={null}
      {...origins}
    >
      <Link href={userDetailLink}>
        <StyledAvatar src={currentUser.pictureUrl} />
      </Link>

      <Link href={userDetailLink}>
        <Name>{currentUser.username}</Name>
      </Link>

      <StyledDivider />

      <StyledMenuItem onClick={switchTheme}>
        {t('switchTheme')}
        {isDark ? <WbSunnyTwoTone id='lightThemeIcon' /> : <Brightness2Outlined />}
      </StyledMenuItem>

      <Link href='/settings'>
        <StyledMenuItem>
          {t('settings')}
          <SettingsOutlined />
        </StyledMenuItem>
      </Link>

      {currentUser.role === RoleEnum.Admin && (
        <Link href='/admin'>
          <StyledMenuItem>
            {'Admin'}
            <VerifiedUserOutlined />
          </StyledMenuItem>
        </Link>
      )}

      <StyledMenuItem onClick={() => logout()}>
        {t('logout')}
        <ExitToAppTwoTone />
      </StyledMenuItem>
    </StyledMenu>
  )
}

export default NavbarMenu
