import DefaultLayout from '@layouts/DefaultLayout'
import AuthorizedPage from '@layouts/AuthorizedPage'
import HomeTemplate from '@templates/Home/HomeTemplate'

const Home = () => {
  return (
    <AuthorizedPage>
      <DefaultLayout title='Home • Fiesta'>
        <HomeTemplate />
      </DefaultLayout>
    </AuthorizedPage>
  )
}

export default Home
