import { useState } from 'react'
import { Menu } from '@material-ui/core'
import useTranslation from 'next-translate/useTranslation'
import { Delete, Edit, MoreVert } from '@material-ui/icons'

import api from '@api/HttpClient'
import { IComment } from '../../Discussion'
import { apiErrorToast } from 'services/toastService'
import useQueryClientPlus from '@hooks/useQueryClientPlus'
import { increaseReplyCount, removeComment } from '../../utils'

import { IconWrapper, StyledMenuItem } from './CommentMenu.styled'

interface ICommentMenuProps {
  eventId: string
  comment: IComment
  onEdit: () => void
  getCommentsQueryKey: (parentId?: string | null) => any[]
}

const CommentMenu = ({ eventId, comment, getCommentsQueryKey, onEdit }: ICommentMenuProps) => {
  const [anchorEl, setAnchorEl] = useState<HTMLDivElement>()
  const { t } = useTranslation('common')
  const queryClient = useQueryClientPlus()

  const handleDeleted = async () => {
    try {
      await api.delete(`/events/${eventId}/comments/${comment.id}`)
      removeComment(queryClient, getCommentsQueryKey(comment.parentId), comment)

      if (comment.parentId)
        increaseReplyCount(queryClient, getCommentsQueryKey(), comment.parentId, -1)
    } catch (err) {
      apiErrorToast(err, t)
    }
  }

  return (
    <>
      <IconWrapper onClick={e => setAnchorEl(e.currentTarget)}>
        <MoreVert />
      </IconWrapper>

      <Menu
        keepMounted
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        getContentAnchorEl={null}
        onClose={() => setAnchorEl(undefined)}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
      >
        <StyledMenuItem onClick={handleDeleted}>
          <Delete />
          {t('delete')}
        </StyledMenuItem>

        <StyledMenuItem onClick={onEdit}>
          <Edit />
          {t('edit')}
        </StyledMenuItem>
      </Menu>
    </>
  )
}

export default CommentMenu
