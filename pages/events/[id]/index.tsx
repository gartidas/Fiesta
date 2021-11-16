import { useRouter } from 'next/router'
import { GetStaticPaths, GetStaticProps } from 'next'
import EventDetailTemplate from '@templates/Events/EventDetail/EventDetailTemplate'
import FullWidthLayout from '@layouts/FullWidthLayout'

const EventDetail = () => {
  const { query } = useRouter()

  return (
    <FullWidthLayout title='Event • Fiesta' transparentNavbar removeNavbarHeightPadding>
      <EventDetailTemplate eventId={query.id as string} />
    </FullWidthLayout>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  return {
    props: {}
  }
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: 'blocking'
  }
}

export default EventDetail
