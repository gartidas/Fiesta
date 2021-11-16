import { Skeleton } from '@material-ui/lab'
import { BottomWrapper, CardWrapper, TopWrapper } from './EventCard.styled'

const EventCardSkeleton = () => {
  return (
    <CardWrapper>
      <TopWrapper>
        <Skeleton height='100%' variant='rect' />
      </TopWrapper>

      <BottomWrapper>
        <h3>
          <Skeleton />
        </h3>

        <div style={{ marginTop: '20px' }}>
          <p>
            <Skeleton width='100%' />
          </p>
          <p>
            <Skeleton width='100%' />
          </p>
          <p>
            <Skeleton width='100%' />
          </p>
          <p>
            <Skeleton width='90%' />
          </p>
        </div>
      </BottomWrapper>
    </CardWrapper>
  )
}

export default EventCardSkeleton
