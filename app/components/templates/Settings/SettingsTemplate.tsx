import { useState } from 'react'
import { useRouter } from 'next/router'
import { AccordionSummary, Tabs } from '@material-ui/core'
import useTranslation from 'next-translate/useTranslation'
import { ExitToAppTwoTone } from '@material-ui/icons'

import { hasAuthProvider } from 'utils/utils'
import { AuthProviderFlags, RoleEnum } from 'domainTypes'
import useWindowSize from '@hooks/useWindowSize'
import AdminTab from './Tabs/AdminTab/AdminTab'
import AppearenceTab from './Tabs/Appearence/Appearence'
import EditProfileTab from './Tabs/EditProfileTab/EditProfileTab'
import { useAuthorizedUser } from '@contextProviders/AuthProvider'
import DeleteAccountTab from './Tabs/DeleteAccountTab/DeleteAccountTab'
import SignInMethodsTab from './Tabs/SignInMethodsTab/SignInMethodsTab'
import ChangePasswordTab from './Tabs/ChangePasswordTab/ChangePasswordTab'

import {
  TabPanelContainer,
  TabsContainer,
  StyledTab,
  StyledPanel,
  Wrapper
} from './SettingsTemplate.styled'
import { AccordionTitle, SettingsAccordion, TabTitle } from './Tabs/common.styled'

const SettingsTemplate = () => {
  const router = useRouter()
  const [currTab, setCurrTab] = useState((router.query.tab as string) || 'profile')
  const { t } = useTranslation('common')
  const { maxMedium } = useWindowSize()
  const { currentUser, logout } = useAuthorizedUser()

  const changeTab = (value: string) => {
    setCurrTab(value)
    router.push({ pathname: router.pathname, query: { tab: value } }, undefined, { shallow: true })
  }

  return (
    <Wrapper>
      {!maxMedium && (
        <TabsContainer>
          <Tabs
            value={currTab}
            textColor='inherit'
            indicatorColor='primary'
            onChange={(_, value) => changeTab(value)}
            orientation='vertical'
          >
            {currentUser.role === RoleEnum.Admin && <StyledTab value='admin' label='Admin' />}

            <StyledTab value='profile' label={t('profile')} />

            {hasAuthProvider(currentUser, AuthProviderFlags.EmailAndPassword) && (
              <StyledTab value='changePassword' label={t('changePassword')} />
            )}

            <StyledTab value='signInMethods' label={t('signInMethods')} />

            <StyledTab value='appearence' label={t('appearence')} />

            <StyledTab value='deleteAccount' label={t('deleteAccount')} />
          </Tabs>
        </TabsContainer>
      )}

      <TabPanelContainer>
        {currentUser.role === RoleEnum.Admin && (
          <StyledPanel index='admin' value={currTab} alwaysVisible={maxMedium}>
            <AdminTab />
          </StyledPanel>
        )}

        <StyledPanel index='profile' value={currTab} alwaysVisible={maxMedium}>
          <EditProfileTab />
        </StyledPanel>

        {hasAuthProvider(currentUser, AuthProviderFlags.EmailAndPassword) && (
          <StyledPanel index='changePassword' value={currTab} alwaysVisible={maxMedium}>
            <ChangePasswordTab />
          </StyledPanel>
        )}

        <StyledPanel index='signInMethods' value={currTab} alwaysVisible={maxMedium}>
          <SignInMethodsTab />
        </StyledPanel>

        <StyledPanel index='appearence' value={currTab} alwaysVisible={maxMedium}>
          <AppearenceTab />
        </StyledPanel>

        {maxMedium && (
          <div>
            <TabTitle>{t('logout')}</TabTitle>
            <SettingsAccordion expanded={false}>
              <AccordionSummary onClick={() => logout()} expandIcon={<ExitToAppTwoTone />}>
                <AccordionTitle>{t('logout')}</AccordionTitle>
              </AccordionSummary>
            </SettingsAccordion>
          </div>
        )}

        <StyledPanel index='deleteAccount' value={currTab} alwaysVisible={maxMedium}>
          <DeleteAccountTab />
        </StyledPanel>
      </TabPanelContainer>
    </Wrapper>
  )
}

export default SettingsTemplate
