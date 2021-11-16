import { useState } from 'react'
import { useRouter } from 'next/router'
import { Box, Tab, Tabs } from '@material-ui/core'
import useTranslation from 'next-translate/useTranslation'

import AuthCheck from '@elements/AuthCheck'
import Attendees from './Attendees/Attendees'
import Discussion from './Discussion/Discussion'
import Invitations from './Invitations/Invitations'
import JoinRequests from './JoinRequests/JoinRequests'
import { IEventDetail } from '../EventDetailTemplate'

import { StyledPanel, TabsWrapper } from './EventDetailTabs.styled'

interface IEventDetailTabsProps {
  event: IEventDetail
  isOrganizer: boolean
}

const EventDetailTabs = ({ event, isOrganizer }: IEventDetailTabsProps) => {
  const { t } = useTranslation('common')
  const router = useRouter()
  const [currTab, setCurrTab] = useState((router.query.tab as string) || 'attendees')

  const handleTabChanged = (value: string) => {
    setCurrTab(value)
    router.push({ pathname: router.asPath.split('?')[0], query: { tab: value } }, undefined, {
      shallow: true,
      scroll: false
    })
  }

  const showDiscussion = isOrganizer || event.isCurrentUserAttendee

  return (
    <TabsWrapper>
      <Tabs
        value={currTab}
        onChange={(_, value) => handleTabChanged(value)}
        indicatorColor='primary'
        variant='scrollable'
      >
        <Tab value='attendees' label={t('attendees')} />
        {isOrganizer && <Tab value='invitations' label={t('invitations')} />}
        {isOrganizer && <Tab value='joinRequests' label={t('joinRequests')} />}
        {showDiscussion && <Tab value='discussion' label={t('discussion')} />}
      </Tabs>

      <Box minHeight='400px'>
        <StyledPanel index='attendees' value={currTab}>
          <AuthCheck>
            <Attendees event={event} isOrganizer={isOrganizer} />
          </AuthCheck>
        </StyledPanel>

        {isOrganizer && (
          <StyledPanel index='invitations' value={currTab}>
            <AuthCheck>
              <Invitations event={event} isOrganizer={isOrganizer} />
            </AuthCheck>
          </StyledPanel>
        )}

        {isOrganizer && (
          <StyledPanel index='joinRequests' value={currTab}>
            <AuthCheck>
              <JoinRequests event={event} />
            </AuthCheck>
          </StyledPanel>
        )}

        {showDiscussion && (
          <StyledPanel index='discussion' value={currTab}>
            <AuthCheck>
              <Discussion event={event} />
            </AuthCheck>
          </StyledPanel>
        )}
      </Box>
    </TabsWrapper>
  )
}

export default EventDetailTabs
