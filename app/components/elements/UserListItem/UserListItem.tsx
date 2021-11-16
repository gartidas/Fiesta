import Link from 'next/link'
import { Box } from '@material-ui/core'

import Avatar from '@elements/Avatar'
import { IUserDto } from 'domainTypes'

import { ItemSubText, ItemText, Wrapper } from './UserListItem.styled'

interface IUserListItemProps {
  user: IUserDto
  href?: string
  className?: string
  isLink?: boolean
  onClick?: () => void
}

const UserListItem = ({ user, isLink, href, className, onClick }: IUserListItemProps) => {
  const content = (
    <Wrapper className={className} cursor={isLink ? 'pointer' : 'auto'} onClick={onClick}>
      <Avatar src={user.pictureUrl} />

      <Box>
        <ItemText>{user.username}</ItemText>
        <ItemSubText>{user.fullName}</ItemSubText>
      </Box>
    </Wrapper>
  )

  if (!isLink) return content

  return <Link href={href || `/users/${user.id}`}>{content}</Link>
}

export default UserListItem
