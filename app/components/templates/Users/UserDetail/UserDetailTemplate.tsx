import Link from 'next/link'
import { useState } from 'react'
import { useQuery } from 'react-query'
import { Edit } from '@material-ui/icons'
import useTranslation from 'next-translate/useTranslation'
import { Avatar, Box } from '@material-ui/core'

import api from '@api/HttpClient'
import { IUserDetail } from 'domainTypes'
import { IApiError } from '@api/types'
import Divider from '@elements/Divider'
import Linkify from '@elements/Linkify'
import AuthCheck from '@elements/AuthCheck'
import Button from '@elements/Button/Button'
import UserDetailTabs from './Tabs/UserDetailTabs'
import FriendButton from './FriendMenu/FriendButton'
import { useAuth } from '@contextProviders/AuthProvider'
import CollapseContainer from '@elements/CollapseContainer/CollapseContainer'
import FriendsSearch from './FriendsSearch/FriendsSearch'
import {
  handleFriendAdded,
  handleFriendRemoved,
  handleFriendRequestAccepted,
  handleFriendRequestRejected,
  handleFriendRequestUnsent
} from './utils'

import {
  AvatarWrapper,
  BioText,
  ButtonsWrapper,
  FriendsWrapper,
  NameAndButtonsAndBioWrapper,
  NameAndButtonsWrapper,
  NameAndFriendsWrapper,
  TopSection
} from './UserDetailTemplate.styled'
import UserDetailSkeleton from './UserDetailSkeleton'
import FetchHandler from '@elements/FetchHandler'

interface IUserDetailTemplateProps {
  userId: string
}

const UserDetailTemplate = ({ userId }: IUserDetailTemplateProps) => {
  const auth = useAuth()
  const { t } = useTranslation('common')
  const [searchOpen, setSearchOpen] = useState(false)

  const { data, error, isLoading, isIdle } = useQuery<IUserDetail, IApiError>(
    ['users', userId],
    async () => (await api.get(`/users/${userId}`)).data,
    { enabled: !auth.isLoading }
  )

  const isCurrUser = auth.isLoggedIn ? auth.currentUser.id === userId : false

  return (
    <>
      <FetchHandler
        data={data}
        error={error}
        isLoading={isLoading || isIdle}
        loadingComponent={<UserDetailSkeleton />}
      >
        {user => (
          <TopSection>
            <AvatarWrapper>
              <Avatar src={user.pictureUrl} />
            </AvatarWrapper>

            <NameAndButtonsAndBioWrapper>
              <NameAndButtonsWrapper>
                <NameAndFriendsWrapper>
                  <h1>{user.username}</h1>
                  <p>{user.fullName}</p>

                  <AuthCheck
                    fallback={loginUrl => (
                      <Link href={loginUrl}>
                        <FriendsWrapper>
                          <p>
                            {t('friends')}: <span>{user.numberOfFriends}</span>
                          </p>
                        </FriendsWrapper>
                      </Link>
                    )}
                  >
                    <FriendsWrapper
                      onClick={() => {
                        auth.isLoggedIn ? setSearchOpen(true) : null
                      }}
                    >
                      <p>
                        {t('friends')}: <span>{user.numberOfFriends}</span>
                      </p>
                    </FriendsWrapper>
                  </AuthCheck>
                </NameAndFriendsWrapper>

                <ButtonsWrapper>
                  {isCurrUser && (
                    <Link href='/settings?tab=profile'>
                      <Button variant='outlined' color='secondary' endIcon={<Edit />}>
                        {t('edit')}
                      </Button>
                    </Link>
                  )}

                  {!isCurrUser && (
                    <FriendButton
                      userId={user.id}
                      friendStatus={user.friendStatus}
                      onFriendAdded={handleFriendAdded}
                      onFriendRemoved={handleFriendRemoved}
                      onFriendRequestUnsent={handleFriendRequestUnsent}
                      onFriendRequestAccepted={handleFriendRequestAccepted}
                      onFriendRequestRejected={handleFriendRequestRejected}
                    />
                  )}
                </ButtonsWrapper>
              </NameAndButtonsWrapper>

              {user.bio && (
                <Box marginTop='20px'>
                  <CollapseContainer>
                    <BioText>
                      <Linkify>{user.bio}</Linkify>
                    </BioText>
                  </CollapseContainer>
                </Box>
              )}
            </NameAndButtonsAndBioWrapper>
          </TopSection>
        )}
      </FetchHandler>

      <Box margin='30px auto'>
        <Divider />
      </Box>

      <UserDetailTabs userId={userId} isCurrentUser={isCurrUser} />

      {searchOpen && auth.isLoggedIn && (
        <FriendsSearch
          onClose={() => setSearchOpen(false)}
          userId={userId}
          currUserId={auth.currentUser.id}
        />
      )}
    </>
  )
}

export default UserDetailTemplate
