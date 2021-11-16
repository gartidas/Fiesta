import { AccordionDetails, AccordionSummary, CircularProgress } from '@material-ui/core'
import useTranslation from 'next-translate/useTranslation'
import { ExpandMore } from '@material-ui/icons'

import { Wrapper } from './EditProfileTab.styled'
import { AccordionTitle, SettingsAccordion } from '../common.styled'

const LoadingAccordion = () => {
  const { t } = useTranslation('common')

  return (
    <Wrapper>
      <SettingsAccordion>
        <AccordionSummary expandIcon={<ExpandMore />}>
          <AccordionTitle>{t('editProfile')}</AccordionTitle>
        </AccordionSummary>

        <AccordionDetails>
          <CircularProgress />
        </AccordionDetails>
      </SettingsAccordion>
    </Wrapper>
  )
}

export default LoadingAccordion
