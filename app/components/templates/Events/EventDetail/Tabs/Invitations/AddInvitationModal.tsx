import { useState } from 'react'
import { isEmpty } from 'lodash'
import { Box } from '@material-ui/core'
import { Check } from '@material-ui/icons'
import { useQuery, useQueryClient } from 'react-query'
import useTranslation from 'next-translate/useTranslation'

import api from '@api/HttpClient'
import { IUserDto } from 'domainTypes'
import { IApiError } from '@api/types'
import Button from '@elements/Button/Button'
import useDebounce from '@hooks/useDebounce'
import { apiErrorToast } from 'services/toastService'
import { IEventDetail } from '../../EventDetailTemplate'
import FetchError from '@elements/FetchError/FetchError'
import UserListItem from '@elements/UserListItem/UserListItem'
import { SearchModal, SearchModalItem } from '@modules/SearchModal'

interface IAddInvitationModalProps {
  eventId: string
  onClose: () => void
}

const AddInvitationModal = ({ eventId, onClose }: IAddInvitationModalProps) => {
  const [search, setSearch] = useState('')
  const debouncedSearch = useDebounce(search)
  const { t } = useTranslation('common')
  const queryClient = useQueryClient()
  const [loadingIds, setLoadingIds] = useState<string[]>([])
  const [invitedIds, setInvitedIds] = useState<string[]>([])

  const { data, isFetching, error } = useQuery<IUserDto[], IApiError>(
    ['events', eventId, 'invitations', 'new', debouncedSearch],
    async () =>
      await (
        await api.get(
          `/events/${eventId}/invitations/new?search=${encodeURIComponent(debouncedSearch)}`
        )
      ).data,
    { initialData: [], keepPreviousData: true }
  )

  const handleInvite = async (userId: string) => {
    setLoadingIds(prev => [...prev, userId])

    try {
      await api.post(`/events/${eventId}/invitations`, { invitedIds: [userId] })
      setInvitedIds(prev => [...prev, userId])
    } catch (err) {
      apiErrorToast(err, t)
    }

    setLoadingIds(prev => [...prev.filter(x => x !== userId)])
  }

  const handleClose = () => {
    if (!isEmpty(invitedIds)) {
      queryClient.invalidateQueries(['events', eventId, 'invitations', 'query'])
      queryClient.setQueryData<IEventDetail>(['events', eventId], prev => ({
        ...prev!,
        invitationsCount: prev!.invitationsCount + invitedIds.length
      }))
    }

    onClose()
  }

  if (error) return <FetchError error={error} />

  return (
    <SearchModal
      title='Invite people'
      onClose={handleClose}
      isFetching={isFetching}
      items={data!}
      search={search}
      setSearch={setSearch}
      renderItem={x => (
        <SearchModalItem disableRipple>
          <UserListItem user={x} />

          <Box marginLeft='auto'>
            <Button
              size='small'
              variant='outlined'
              onClick={() => handleInvite(x.id)}
              loading={loadingIds.includes(x.id)}
              disabled={invitedIds.includes(x.id)}
            >
              {invitedIds.includes(x.id) ? <Check /> : t('invite')}
            </Button>
          </Box>
        </SearchModalItem>
      )}
    />
  )
}

export default AddInvitationModal
