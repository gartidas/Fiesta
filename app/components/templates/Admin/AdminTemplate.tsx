import Users from './Users/Users'
import Events from './Events/Events'
import { Wrapper } from './AdminTemplate.styled'
import { Tab, Tabs } from '@material-ui/core'
import { useState } from 'react'
import TabPanel from '@elements/TabPanel/TabPanel'

const AdminTemplate = () => {
  const [currTab, setCurrTab] = useState('users')

  return (
    <Wrapper>
      <Tabs
        value={currTab}
        onChange={(_, value) => setCurrTab(value)}
        indicatorColor='primary'
        variant='scrollable'
      >
        <Tab value='users' label='Users'>
          Users
        </Tab>
        <Tab value='events' label='Events'>
          Events
        </Tab>
      </Tabs>

      <div style={{ marginTop: 20 }}>
        <TabPanel index='users' value={currTab}>
          <Users />
        </TabPanel>

        <TabPanel index='events' value={currTab}>
          <Events />
        </TabPanel>
      </div>
    </Wrapper>
  )
}

export default AdminTemplate
