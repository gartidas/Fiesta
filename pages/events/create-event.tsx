import AuthorizedPage from '@layouts/AuthorizedPage'
import DefaultLayout from '@layouts/DefaultLayout'
import CreateOrUpdateEventTemplate from '@templates/Events/CreateOrUpdateEvent/CreateOrUpdateEventTemplate'

const CreateEvent = () => {
  return (
    <AuthorizedPage>
      <DefaultLayout title='Create event • Fiesta'>
        <CreateOrUpdateEventTemplate />
      </DefaultLayout>
    </AuthorizedPage>
  )
}

export default CreateEvent
