import { useRouter } from 'next/router'
import { getGoogleLoginUrl } from 'services/authService'
import styled from 'styled-components'
import Button from './Button/Button'

const StyledButton = styled(Button)`
  background: #fff !important;
  color: ${({ theme }) => theme.palette.grey[700]};
  height: 40px;
  padding: 0;
  position: relative;
  text-transform: uppercase;
  font-weight: 500;
  img {
    position: absolute;
    left: 10px;
    top: 0px;
    display: inline-block;
    height: 100%;
  }
`

const GoogleLoginButton = ({ text }: { text: string }) => {
  const router = useRouter()

  const handleGoogleLogin = () => {
    const url = getGoogleLoginUrl(router.query.redirectedFrom as string)
    window.location.assign(url)
  }

  return (
    <StyledButton onClick={handleGoogleLogin} startIcon={<img src='GoogleBtnIcon.svg' />}>
      {text}
    </StyledButton>
  )
}

export default GoogleLoginButton
