import { FC } from 'react'
import Head from 'next/head'
import Router from 'next/router'
import FiestaLogo from '@elements/FiestaLogo'
import styled, { keyframes } from 'styled-components'
import { useAuth } from '@contextProviders/AuthProvider'
import { RoleEnum } from 'domainTypes'

const Overlay = styled.div`
  height: 100vh;
  display: grid;
  place-items: center;
`
const logoMotion = keyframes`
  from{
    transform: scale(0.85);
  }
  to{
    transform:scale(1.15)
  }
`

const StyledLogo = styled(FiestaLogo)`
  animation: ${logoMotion} 0.8s linear infinite alternate;
`

interface IProps {
  roles?: RoleEnum[]
}

const AuthorizedPage: FC<IProps> = ({ children, roles }) => {
  const auth = useAuth()

  const header = (
    <Head>
      <title>Authorization check | Fiesta</title>
    </Head>
  )

  if (auth.isLoading && !auth.isLoggedIn)
    return (
      <Overlay>
        {header}
        <StyledLogo />
      </Overlay>
    )

  const hasRequiredRole = roles ? auth.isLoggedIn && roles.includes(auth.currentUser.role) : true

  if (!auth.isLoggedIn || !hasRequiredRole) {
    Router.replace(`/login?redirectedFrom=${Router.asPath}`)
    return (
      <Overlay>
        {header}

        <StyledLogo />
      </Overlay>
    )
  }

  return (
    <>
      {header}
      {children}
    </>
  )
}

export default AuthorizedPage
