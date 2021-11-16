import { useState } from 'react'
import { useRouter } from 'next/router'
import { ExpandMore } from '@material-ui/icons'
import useTranslation from 'next-translate/useTranslation'
import { AccordionDetails, AccordionSummary, Box, Chip } from '@material-ui/core'

import { hasAuthProvider } from 'utils/utils'
import { AuthProviderFlags } from 'domainTypes'
import AddPasswordForm from './AddPasswordForm'
import ConnectGoogleAccount from './ConnectGoogleAccount'
import { useAuthorizedUser } from '@contextProviders/AuthProvider'

import { Wrapper } from './SignInMethodsTab.styled'
import { AccordionTitle, StyledSettingsAlert, SettingsAccordion, TabTitle } from '../common.styled'

type ExpandedType = 'passwordSignIn' | 'googleSignIn' | false

const SignInMethodsTab = () => {
  const { t } = useTranslation('settings')
  const { query } = useRouter()
  const { currentUser } = useAuthorizedUser()
  const [expanded, setExpanded] = useState<ExpandedType>(!!query.code && 'googleSignIn')

  const hasPassword = hasAuthProvider(currentUser, AuthProviderFlags.EmailAndPassword)
  const hasGoogleAccount = hasAuthProvider(currentUser, AuthProviderFlags.Google)

  return (
    <Wrapper>
      <TabTitle>{t('common:signInMethods')}</TabTitle>

      <SettingsAccordion
        expanded={expanded === 'passwordSignIn'}
        onChange={(_, value) => setExpanded(value && 'passwordSignIn')}
      >
        <AccordionSummary expandIcon={<ExpandMore />}>
          <AccordionTitle>{t('passwordSignIn')}</AccordionTitle>
        </AccordionSummary>

        <AccordionDetails>
          {hasPassword ? (
            <>
              <Box display='flex' gridGap='5px' flexWrap='wrap'>
                <Chip label={currentUser.email} />
                <Chip label={currentUser.username} />
              </Box>
              <StyledSettingsAlert>{t('passwordSignInIsSetUp')}.</StyledSettingsAlert>
            </>
          ) : (
            <>
              <StyledSettingsAlert severity='info'>
                {t('createPasswordForYourAccount')}.
              </StyledSettingsAlert>
              <AddPasswordForm />
            </>
          )}
        </AccordionDetails>
      </SettingsAccordion>

      <SettingsAccordion
        expanded={expanded === 'googleSignIn'}
        onChange={(_, value) => setExpanded(value && 'googleSignIn')}
      >
        <AccordionSummary expandIcon={<ExpandMore />}>
          <AccordionTitle>{t('googleAccountSignIn')}</AccordionTitle>
        </AccordionSummary>

        <AccordionDetails>
          {hasGoogleAccount ? (
            <>
              <Chip label={currentUser.googleEmail} />
              <StyledSettingsAlert>{t('googleAccountConnected')}.</StyledSettingsAlert>
            </>
          ) : (
            <>
              <StyledSettingsAlert severity='info'>
                {t('connectYourGoogleAccountSoYouCanSignIn')}.
              </StyledSettingsAlert>
              <ConnectGoogleAccount />
            </>
          )}
        </AccordionDetails>
      </SettingsAccordion>
    </Wrapper>
  )
}

export default SignInMethodsTab
