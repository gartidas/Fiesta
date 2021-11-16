import React, { useState } from 'react'
import { ExpandMore } from '@material-ui/icons'
import { useQuery, useQueryClient } from 'react-query'
import useTranslation from 'next-translate/useTranslation'
import { AccordionDetails, AccordionSummary, Badge, CircularProgress } from '@material-ui/core'

import api from '@api/HttpClient'
import { IApiError } from '@api/types'
import { IUserDetail } from 'domainTypes'
import Form from '@elements/HookForm/Form'
import { onlyDirtyValues } from '@utils/utils'
import LoadingAccordion from './LoadingAccordion'
import { successToast } from 'services/toastService'
import FormInput from '@elements/HookForm/FormInput'
import FetchError from '@elements/FetchError/FetchError'
import SubmitButton from '@elements/HookForm/SubmitButton'
import { useAuthorizedUser } from '@contextProviders/AuthProvider'
import { useSubmitForm } from '@elements/HookForm/hooks/useSubmitForm'
import ProfilePictureMenu from './ProfilePictureMenu/ProfilePictureMenu'
import {
  requiredValidator,
  combineValidators,
  minLengthValidator,
  maxLengthValidator
} from 'utils/validators'

import { AccordionTitle, SettingsAccordion, TabTitle } from '../common.styled'
import { Wrapper, StyledAvatar, StyledDivider } from './EditProfileTab.styled'

interface IEditProfileValues {
  firstName: string
  lastName: string
  username: string
  bio: string
}

const EditProfileTab = () => {
  const { t } = useTranslation('common')
  const [expanded, setExpanded] = useState(false)
  const [profilePictureEl, setProfilePictureEl] = useState<HTMLElement>()
  const { currentUser, updateUser } = useAuthorizedUser()
  const [profilePictureLoading, setProfilePictureLoading] = useState(false)
  const queryClient = useQueryClient()

  const { onSubmit } = useSubmitForm<IEditProfileValues, Omit<IUserDetail, 'pictureUrl'>>({
    method: 'patch',
    url: `/users/${currentUser.id}`,
    formatter: onlyDirtyValues,
    successCallback: response => {
      successToast(t('saved'))
      updateUser(response)
      queryClient.setQueryData<IUserDetail>(['users', currentUser.id], prev => ({
        ...prev,
        ...response
      }))
    }
  })

  const { data, isLoading, error } = useQuery<IUserDetail, IApiError>(
    ['users', currentUser.id],
    async () => (await api.get(`/users/${currentUser.id}`)).data
  )

  if (isLoading) return <LoadingAccordion />
  if (error) return <FetchError error={error} />

  const user = data!

  return (
    <Wrapper>
      <TabTitle>{t('profile')}</TabTitle>

      <SettingsAccordion expanded={expanded} onChange={(_, value) => setExpanded(value)}>
        <AccordionSummary expandIcon={<ExpandMore />}>
          <AccordionTitle>{t('editProfile')}</AccordionTitle>
        </AccordionSummary>

        <AccordionDetails>
          {profilePictureLoading ? (
            <CircularProgress />
          ) : (
            <Badge badgeContent='Admin' color='primary' invisible={!currentUser.isAdmin}>
              <StyledAvatar
                src={user.pictureUrl}
                onClick={e => setProfilePictureEl(profilePictureEl ? undefined : e.currentTarget)}
              />
            </Badge>
          )}

          <StyledDivider />

          <Form onSubmit={onSubmit} defaultValues={user}>
            <FormInput
              name='username'
              label={t('username')}
              variant='outlined'
              validate={combineValidators([
                requiredValidator,
                minLengthValidator(2),
                maxLengthValidator(15)
              ])}
            />

            <FormInput
              name='firstName'
              label={t('firstName')}
              variant='outlined'
              validate={combineValidators([
                requiredValidator,
                minLengthValidator(2),
                maxLengthValidator(30)
              ])}
            />

            <FormInput
              name='lastName'
              label={t('lastName')}
              variant='outlined'
              validate={combineValidators([
                requiredValidator,
                minLengthValidator(2),
                maxLengthValidator(30)
              ])}
            />

            <FormInput
              name='bio'
              label={t('bio')}
              multiline
              rows={5}
              rowsMax={13}
              variant='outlined'
              validate={maxLengthValidator(500)}
            />

            <SubmitButton variant='outlined'>{t('submit')}</SubmitButton>
          </Form>

          <ProfilePictureMenu
            onClose={() => setProfilePictureEl(undefined)}
            anchorEl={profilePictureEl}
            setLoading={setProfilePictureLoading}
          />
        </AccordionDetails>
      </SettingsAccordion>
    </Wrapper>
  )
}

export default EditProfileTab
