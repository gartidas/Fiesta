import { Card, CardContent } from '@material-ui/core'
import useTranslation from 'next-translate/useTranslation'
import Link from 'next/link'
import Button from './Button/Button'

interface ILoginFallbackProps {
  loginUrl: string
}

const LoginFallback = ({ loginUrl }: ILoginFallbackProps) => {
  const { t } = useTranslation('common')

  return (
    <Card elevation={0}>
      <CardContent>
        {t('youMustBeLoggedIn')}

        <Link href={loginUrl}>
          <Button variant='text'>{t('login')}</Button>
        </Link>
      </CardContent>
    </Card>
  )
}

export default LoginFallback
