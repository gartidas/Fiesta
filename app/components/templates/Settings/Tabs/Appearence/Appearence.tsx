import { Brightness2Outlined } from '@material-ui/icons'
import useTranslation from 'next-translate/useTranslation'
import { AccordionSummary } from '@material-ui/core'

import { useAppTheme } from '@contextProviders/AppThemeProvider/AppThemeProvider'
import { AccordionTitle, SettingsAccordion, TabTitle } from '../common.styled'
import { LightThemeIcon, Wrapper } from './Appearence.styled'

const AppearenceTab = () => {
  const { t } = useTranslation('common')
  const { switchTheme, isDark } = useAppTheme()

  return (
    <Wrapper>
      <TabTitle>{t('appearence')}</TabTitle>

      <SettingsAccordion expanded={false}>
        <AccordionSummary
          onClick={switchTheme}
          expandIcon={isDark ? <LightThemeIcon /> : <Brightness2Outlined />}
        >
          <AccordionTitle>{t('switchTheme')}</AccordionTitle>
        </AccordionSummary>
      </SettingsAccordion>
    </Wrapper>
  )
}

export default AppearenceTab
