import AuthorizedPage from '@layouts/AuthorizedPage'
import DefaultLayout from '@layouts/DefaultLayout'
import AdminTemplate from '@templates/Admin/AdminTemplate'
import { RoleEnum } from 'domainTypes'

const AdminPage = () => {
  return (
    <AuthorizedPage roles={[RoleEnum.Admin]}>
      <DefaultLayout title='Admin'>
        <AdminTemplate />
      </DefaultLayout>
    </AuthorizedPage>
  )
}

export default AdminPage
