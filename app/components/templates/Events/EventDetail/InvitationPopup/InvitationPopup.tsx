import { useState } from 'react'
import { useRouter } from 'next/router'
import { useQueryClient } from 'react-query'
import { HelpTwoTone } from '@material-ui/icons'
import { Box, Grow, Typography } from '@material-ui/core'
import useTranslation from 'next-translate/useTranslation'

import api from '@api/HttpClient'
import Button from '@elements/Button/Button'
import useWindowSize from '@hooks/useWindowSize'
import { AccessibilityTypeEnum } from 'domainTypes'
import { IEventDetail } from '../EventDetailTemplate'
import { apiErrorToast } from 'services/toastService'

import { CloseIcon, Wrapper } from './InvitationPopup.styled'

interface IInvitationPopupProps {
  event: IEventDetail
}

const InvitationPopup = ({ event }: IInvitationPopupProps) => {
  const { t } = useTranslation('common')
  const router = useRouter()
  const queryClient = useQueryClient()
  const { maxMedium } = useWindowSize()

  const [invitationLoading, setInvitationLoading] = useState<'accept' | 'decline' | undefined>(
    undefined
  )

  const handleInvitation = async (accepted: boolean) => {
    if (invitationLoading) return
    setInvitationLoading(accepted ? 'accept' : 'decline')

    try {
      await api.post(`/events/${event.id}/invitations/reply`, { accepted })

      if (!accepted) {
        event.accessibilityType !== AccessibilityTypeEnum.Public && router.replace('/home')
        queryClient.setQueryData<IEventDetail>(['events', event.id], prev => ({
          ...prev!,
          isCurrentUserInvited: false
        }))
        return
      }

      queryClient.setQueryData<IEventDetail>(['events', event.id], prev => ({
        ...prev!,
        isCurrentUserInvited: false,
        isCurrentUserAttendee: true,
        attendeesCount: prev!.attendeesCount + 1
      }))
      queryClient.invalidateQueries(['events', event.id, 'attendees', 'query'])
    } catch (err) {
      apiErrorToast(err, t)
    }

    setInvitationLoading(undefined)
  }

  const handleClose = () => {
    queryClient.setQueryData<IEventDetail>(['events', event.id], prev => ({
      ...prev!,
      isCurrentUserInvited: false
    }))
  }

  const alertButtonProps = {
    size: maxMedium ? 'small' : 'medium'
  } as const

  return (
    <Grow in>
      <Wrapper elevation={15}>
        <CloseIcon fontSize='small' onClick={handleClose} />

        <Box display='flex' gridGap='17px'>
          {!maxMedium && <HelpTwoTone fontSize='large' />}

          <div>
            <Typography variant='body1'>{t('youHaveBeenInvitedToThisEvent')}</Typography>

            <Typography variant='body2' color='textSecondary'>
              {t('wouldYouLikeToAcceptTheInvitation')}
            </Typography>

            <Box marginTop='13px' display='flex' gridGap='5px'>
              <Button
                {...alertButtonProps}
                onClick={() => handleInvitation(true)}
                loading={invitationLoading === 'accept'}
              >
                {t('accept')}
              </Button>

              <Button
                {...alertButtonProps}
                variant='text'
                onClick={() => handleInvitation(false)}
                loading={invitationLoading === 'decline'}
              >
                {t('decline')}
              </Button>
            </Box>
          </div>
        </Box>
      </Wrapper>
    </Grow>
  )
}

export default InvitationPopup
