import styled from 'styled-components'

interface IHiddenProps {
  hidden?: boolean
}

const Hidden = styled.div<IHiddenProps>`
  visibility: ${({ hidden }) => (hidden !== false ? 'hidden' : 'visible')};
`

export default Hidden
