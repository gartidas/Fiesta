import styled from 'styled-components'

const FiestaH1 = styled.h1<{ fontSize?: string }>`
  position: relative;
  font-size: ${({ fontSize }) => fontSize || '5.5rem'};
  color: ${({ theme }) => theme.palette.themeText.white};
  text-shadow: 2px 2px 2px rgba(0, 0, 0, 0.5);

  ::before {
    content: '';
    display: block;
    height: 1em;
    width: 100%;
    border-radius: 5px;
    background: ${({ theme }) => theme.palette.gradients.primary};

    position: absolute;
    bottom: 10px;
    z-index: -1;

    clip-path: polygon(0 0, 100% 0, 100% 30%, 10% 100%, 0% 100%);
  }
`

interface IProps {
  fontSize?: string
  className?: string
  onClick?: () => void
}

const FiestaLogo = ({ fontSize, ...rest }: IProps) => {
  return (
    <FiestaH1 {...rest} fontSize={fontSize}>
      Fiesta
    </FiestaH1>
  )
}

export default FiestaLogo
