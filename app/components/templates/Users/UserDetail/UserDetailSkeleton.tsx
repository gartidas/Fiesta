import styled from 'styled-components'
import { Box } from '@material-ui/core'
import { Skeleton } from '@material-ui/lab'
import { LG, MD } from '@contextProviders/AppThemeProvider/theme'

import {
  ButtonsWrapper,
  NameAndButtonsAndBioWrapper,
  NameAndButtonsWrapper,
  NameAndFriendsWrapper,
  TopSection
} from './UserDetailTemplate.styled'

const AvatarWrapper = styled.div`
  padding: 0 50px;

  .MuiSkeleton-root {
    height: 170px;
    width: 170px;
    box-shadow: 0 13px 13px rgba(0, 0, 0, 0.2);
  }

  @media screen and (max-width: ${LG}px) {
    padding-left: 0;
  }

  @media screen and (max-width: ${MD}px) {
    padding: 0;
    margin-bottom: 10px;

    .MuiSkeleton-root {
      height: 130px;
      width: 130px;
    }
  }
`

const UserDetailSkeleton = () => {
  return (
    <TopSection>
      <AvatarWrapper>
        <Skeleton variant='circle' />
      </AvatarWrapper>

      <NameAndButtonsAndBioWrapper>
        <NameAndButtonsWrapper>
          <NameAndFriendsWrapper>
            <h1>
              <Skeleton width='200px' />
            </h1>
            <p>
              <Skeleton width='130px' />
            </p>

            <p>
              <Skeleton width='150px' />
            </p>
          </NameAndFriendsWrapper>

          <ButtonsWrapper>
            <Skeleton variant='rect' width='120px' height='36px' />
          </ButtonsWrapper>
        </NameAndButtonsWrapper>

        <Box marginTop='20px'>
          <Skeleton />
          <Skeleton width='90%' />
        </Box>
      </NameAndButtonsAndBioWrapper>
    </TopSection>
  )
}

export default UserDetailSkeleton
