import { useRouter } from 'next/router'
import { AccordionSummary } from '@material-ui/core'
import { ChevronRightRounded } from '@material-ui/icons'

import { Wrapper } from './AdminTab.styled'
import { AccordionTitle, SettingsAccordion, TabTitle } from '../common.styled'

const AdminTab = () => {
  const router = useRouter()

  return (
    <Wrapper>
      <TabTitle>Admin</TabTitle>

      <SettingsAccordion expanded={false}>
        <AccordionSummary
          onClick={() => router.push('/admin')}
          expandIcon={<ChevronRightRounded />}
        >
          <AccordionTitle>Go to admin section</AccordionTitle>
        </AccordionSummary>
      </SettingsAccordion>
    </Wrapper>
  )
}

export default AdminTab
