import { Box } from '@material-ui/core'
import { Skeleton } from '@material-ui/lab'

import Divider from '@elements/Divider'
import { Container } from '@elements/Container'
import useWindowSize from '@hooks/useWindowSize'

import { StyledCard, Wrapper, Title, EventDescription, InfoRow } from './EventDetailTemplate.styled'

const EventDetailSkeleton = () => {
  const { minMedium, maxMedium } = useWindowSize()
  return (
    <Wrapper>
      <Container disabled={maxMedium}>
        <Skeleton variant='rect' height='200px' />

        <StyledCard>
          <Container disabled={minMedium}>
            <Title>
              <Skeleton width='250px' height='70px' />
            </Title>

            <EventDescription>
              <Skeleton height='20px' />
              <Skeleton height='20px' width='90%' />
              <Skeleton height='20px' />
              <Skeleton height='20px' />
              <Skeleton height='20px' />
              <Skeleton height='20px' width='95%' />
              <Skeleton height='20px' width='85%' />
            </EventDescription>

            <Box marginY='20px'>
              <InfoRow>
                <Skeleton variant='rect' height='18px' width='300px' />
              </InfoRow>

              <InfoRow>
                <Skeleton variant='rect' height='18px' width='280px' />
              </InfoRow>

              <InfoRow>
                <Skeleton variant='rect' height='18px' width='300px' />
              </InfoRow>

              <InfoRow>
                <Skeleton variant='rect' height='18px' width='300px' />
              </InfoRow>

              <InfoRow>
                <Skeleton variant='rect' height='18px' width='300px' />
              </InfoRow>

              <InfoRow>
                <Skeleton variant='rect' height='18px' width='280px' />
              </InfoRow>
            </Box>

            <Divider />

            <Box
              display='flex'
              justifyContent='flex-end'
              gridGap='10px'
              flexWrap='wrap'
              marginTop='15px'
            >
              <Skeleton variant='rect' width='130px' height='36px' />
              <Skeleton variant='rect' width='130px' height='36px' />
            </Box>
          </Container>
        </StyledCard>
      </Container>
    </Wrapper>
  )
}

export default EventDetailSkeleton
