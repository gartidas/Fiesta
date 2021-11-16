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
    margin: 50px 0 50px 0;
  }
  h1 {
    color: ${({ theme }) => theme.palette.themeText.themeBlack};
    font-weight: 500;
  }
  p {
    font-weight: 400;
    margin: 0;
    color: ${({ theme }) => theme.palette.themeText.themeGray};
  }
`

interface IProps {
  subText?: string | null
}

const NothingFound = ({ subText }: IProps) => {
  const { t } = useTranslation('common')

  return (
    <Wrapper>
      <img src='/NothingFound.svg'></img>
      <h1>{t('nothingFound')}</h1>
      {subText !== null && <p>{subText || t('areYouSureYouWereLookingForThis')}</p>}
    </Wrapper>
  )
}

export default NothingFound
