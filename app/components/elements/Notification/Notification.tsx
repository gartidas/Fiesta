import moment from 'moment'
import { ReactNode } from 'react'
import { useRouter } from 'next/router'
import { Box } from '@material-ui/core'
import { FiberManualRecord, NotificationsTwoTone } from '@material-ui/icons'

import Avatar from '@elements/Avatar'
import { Content, CreatedAt, Wrapper } from './Notification.styled'

interface INotificationProps {
  children: ReactNode
  imageSrc?: string
  createdAt: string
  seen: boolean
  href?: string
  setSeen: () => Promise<void>
}

const Notification = ({
  imageSrc,
  children,
  createdAt,
  seen,
  href,
  setSeen
}: INotificationProps) => {
  const router = useRouter()

  const handleClick = async () => {
    href && router.push(href)
    if (!seen) await setSeen()
  }

  return (
    <Wrapper onClick={handleClick}>
      <Box alignSelf='flex-start'>
        <Avatar src={imageSrc}>
          <NotificationsTwoTone />
        </Avatar>
      </Box>

      <Box marginX='15px' flex='1'>
        <Content>{children}</Content>
        <CreatedAt seen={seen ? 1 : 0}>{moment.utc(createdAt).local().fromNow()}</CreatedAt>
      </Box>

      {!seen && (
        <Box color='primary.main' width='10px'>
          <FiberManualRecord fontSize='small' />
        </Box>
      )}
    </Wrapper>
  )
}

export default Notification
