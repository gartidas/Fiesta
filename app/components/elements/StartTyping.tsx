import useTranslation from 'next-translate/useTranslation'
import styled from 'styled-components'

export const Wrapper = styled.div`
  width: 100%;
  height: 100%;

  display: flex;
  flex-direction: column;
  align-items: center;

  img {
    height: 60%;
    width: 60%;
    margin: 100px 0 100px 0;
  }
  h2 {
    color: ${({ theme }) => theme.palette.themeText.themeBlack};
  }
`

const StartTyping = () => {
  const { t } = useTranslation('common')

  return (
    <Wrapper>
      <img src='/StartTyping.svg'></img>
      <h2>{t('startTypingToSeeResults')}...</h2>
    </Wrapper>
  )
}

export default StartTyping
