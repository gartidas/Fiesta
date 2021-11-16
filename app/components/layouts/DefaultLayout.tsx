import { FC } from 'react'

import { Container } from '../elements/Container'
import FullWidthLayout, { IFullWidthLayoutProps } from './FullWidthLayout'

interface IDefaultLayoutProps extends IFullWidthLayoutProps {}

const DefaultLayout: FC<IDefaultLayoutProps> = ({ children, ...rest }) => {
  return (
    <FullWidthLayout {...rest}>
      <Container>{children}</Container>
    </FullWidthLayout>
  )
}

export default DefaultLayout
