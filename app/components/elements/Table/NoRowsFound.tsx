import { Typography } from '@material-ui/core'
import useTranslation from 'next-translate/useTranslation'
import styled from 'styled-components'

const Wrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 10;

  display: grid;
  place-items: center;
  pointer-events: none;
`

interface INoRowsFoundProps {}

const NoRowsFound = ({}: INoRowsFoundProps) => {
  const { t } = useTranslation('common')

  return (
    <Wrapper>
      <Typography variant='h6'>{t('nothingFound')}</Typography>
    </Wrapper>
  )
}

export default NoRowsFound
