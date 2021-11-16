import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { Box, Tab, Tabs } from '@material-ui/core'
import useTranslation from 'next-translate/useTranslation'

import AuthCheck from '@elements/AuthCheck'
import Invitations from './Invitations/Invitations'
import useQueryClientPlus from '@hooks/useQueryClientPlus'
import AttendedEvents from './AttendedEvents/AttendedEvents'
import OrganizedEvents from './OrganizedEvents/OrganizedEvents'

import { StyledPanel } from './UserDetailTabs.styled'

interface IUserDetailTabsProps {
  userId: string
  isCurrentUser: boolean
}

const UserDetailTabs = ({ userId, isCurrentUser }: IUserDetailTabsProps) => {
  const { t } = useTranslation('common')
  const router = useRouter()
  const [currTab, setCurrTab] = useState((router.query.tab as string) || 'organizedEvents')
  const queryClient = useQueryClientPlus()

  useEffect(() => {
    // Invalidate cached tabs
    queryClient.invalidateQueries(['users', userId, 'organized-events'])
    queryClient.invalidateQueries(['users', userId, 'attended-events'])
    queryClient.invalidateQueries(['users', userId, 'event-invitations'])
  }, [queryClient, userId])

  const handleTabChanged = (value: string) => {
    setCurrTab(value)
    router.push({ pathname: router.asPath.split('?')[0], query: { tab: value } }, undefined, {
      shallow: true,
      scroll: false
    })
  }

  return (
    <>
      <Tabs
        value={currTab}
        onChange={(_, value) => handleTabChanged(value)}
        indicatorColor='primary'
        variant='scrollable'
      >
        <Tab value='organizedEvents' label={t('organizedEvents')} />
        <Tab value='attendedEvents' label={t('attendedEvents')} />
        {isCurrentUser && <Tab value='invitations' label={t('invitations')} />}
      </Tabs>

      <Box minHeight='400px'>
        <StyledPanel index='organizedEvents' value={currTab}>
          <AuthCheck>
            <OrganizedEvents userId={userId} isCurrentUser={isCurrentUser} />
          </AuthCheck>
        </StyledPanel>

        <StyledPanel index='attendedEvents' value={currTab}>
          <AuthCheck>
            <AttendedEvents userId={userId} isCurrentUser={isCurrentUser} />
          </AuthCheck>
        </StyledPanel>

        <StyledPanel index='invitations' value={currTab}>
          {isCurrentUser && <Invitations userId={userId} />}
        </StyledPanel>
      </Box>
    </>
  )
}

export default UserDetailTabs
