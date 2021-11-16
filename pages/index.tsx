import FullWidthLayout from '@layouts/FullWidthLayout'
import LandingPage from '@templates/LandingPage/LandingPage'

const HomePage = () => {
  return (
    <FullWidthLayout forceUnauthorizedNavbar removeNavbarHeightPadding title='Fiesta'>
      <LandingPage />
    </FullWidthLayout>
  )
}

export default HomePage
