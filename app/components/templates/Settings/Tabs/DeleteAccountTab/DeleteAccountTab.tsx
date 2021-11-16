import { useState } from 'react'
import { useRouter } from 'next/router'
import { ExpandMore } from '@material-ui/icons'
import useTranslation from 'next-translate/useTranslation'
import { AccordionDetails, AccordionSummary } from '@material-ui/core'

import { hasAuthProvider } from 'utils/utils'
import { AuthProviderFlags } from 'domainTypes'
import { useAuthorizedUser } from '@contextProviders/AuthProvider'
import DeleteWithPassword from './DeleteWithPassword'
import DeleteAccountWithGoogle from './DeleteAccountWithGoogle'

import { Wrapper } from './DeleteAccountTab.styled'
import { SettingsAccordion, AccordionTitle, StyledSettingsAlert, TabTitle } from '../common.styled'

type ExpandedType = 'googleDelete' | 'passwordDelete' | false

const DeleteAccountTab = () => {
  const { t } = useTranslation('settings')
  const { query } = useRouter()
  const { currentUser } = useAuthorizedUser()
  const [expanded, setExpanded] = useState<ExpandedType>(!!query.code && 'googleDelete')

  const hasPassword = hasAuthProvider(currentUser, AuthProviderFlags.EmailAndPassword)
  const hasGoogleAccount = hasAuthProvider(currentUser, AuthProviderFlags.Google)

  return (
    <Wrapper>
      <TabTitle danger={1}>{t('dangerZone')}</TabTitle>

      <SettingsAccordion
        expanded={expanded === 'passwordDelete'}
        onChange={(_, value) => setExpanded(value && 'passwordDelete')}
      >
        <AccordionSummary expandIcon={<ExpandMore />}>
          <AccordionTitle>{t('deleteWithpassword')}</AccordionTitle>
        </AccordionSummary>

        <AccordionDetails>
          {hasPassword ? (
            <>
              <StyledSettingsAlert severity='warning'>
                {t('common:warning')}: {t('afterYouEnterValidPasswordAccountWillBeDeleted')}.
              </StyledSettingsAlert>
              <DeleteWithPassword />
            </>
          ) : (
            <StyledSettingsAlert severity='warning'>
              {t('deleteWithpasswordNotAccessible')}
            </StyledSettingsAlert>
          )}
        </AccordionDetails>
      </SettingsAccordion>

      <SettingsAccordion
        expanded={expanded === 'googleDelete'}
        onChange={(_, value) => setExpanded(value && 'googleDelete')}
      >
        <AccordionSummary expandIcon={<ExpandMore />}>
          <AccordionTitle>{t('deleteWithGoogle')}</AccordionTitle>
        </AccordionSummary>

        <AccordionDetails>
          {hasGoogleAccount ? (
            <>
              <StyledSettingsAlert severity='warning'>
                {t('common:warning')}: {t('afterYouPickGoogleAccountAccountWillBeDeleted')}.
              </StyledSettingsAlert>
              <DeleteAccountWithGoogle />
            </>
          ) : (
            <StyledSettingsAlert severity='warning'>
              {t('deleteWithGoogleNotAccessible')}
            </StyledSettingsAlert>
          )}
        </AccordionDetails>
      </SettingsAccordion>
    </Wrapper>
  )
}

export default DeleteAccountTab
