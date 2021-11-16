import ResetPasswordTemplate from '@templates/ResetPassword/ResetPasswordTemplate'
import Head from 'next/head'

const ResetPassword = () => {
  return (
    <>
      <Head>
        <title>Reset password | Fiesta</title>
      </Head>

      <ResetPasswordTemplate />
    </>
  )
}

export default ResetPassword
