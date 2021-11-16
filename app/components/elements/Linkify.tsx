import LinkifyOriginal, { Props } from 'react-linkify'
import styled from 'styled-components'

const StyledAnchor = styled.a`
  color: ${({ theme }) => theme.palette.primary.main};
  font-style: italic;
`

const Linkify = (props: Props) => {
  return (
    <LinkifyOriginal
      componentDecorator={(href, text, key) => (
        <StyledAnchor href={href} target='_blank' rel='noreferrer' key={key}>
          {text}
        </StyledAnchor>
      )}
      {...props}
    />
  )
}

export default Linkify
