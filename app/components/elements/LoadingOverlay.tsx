import { CircularProgress } from '@material-ui/core'
import styled from 'styled-components'

export const Wrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 10;

  display: grid;
  place-items: center;
  pointer-events: none;

  background-color: ${({ theme }) =>
    theme.palette.type === 'dark' ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.2)'};
`

const LoadingOverlay = () => {
  return (
    <Wrapper onClick={e => e.preventDefault()}>
      <CircularProgress />
    </Wrapper>
  )
}

export default LoadingOverlay
