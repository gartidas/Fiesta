import { memo, useState } from 'react'
import moment from 'moment'
import Link from 'next/link'
import { useInfiniteQuery } from 'react-query'
import { Box, CircularProgress, Tooltip } from '@material-ui/core'
import useTranslation from 'next-translate/useTranslation'
import {
  ArrowDownward,
  ArrowDropDown,
  ArrowDropUp,
  CheckCircleOutline,
  Edit
} from '@material-ui/icons'

import api from '@api/HttpClient'
import Avatar from '@elements/Avatar'
import { editComment } from '../utils'
import Linkify from '@elements/Linkify'
import { IComment } from '../Discussion'
import Button from '@elements/Button/Button'
import NewComment from '../NewComment/NewComment'
import { apiErrorToast } from 'services/toastService'
import CommentMenu from './CommentMenu/CommentMenu'
import FetchError from '@elements/FetchError/FetchError'
import useQueryClientPlus from '@hooks/useQueryClientPlus'
import { useAuthorizedUser } from '@contextProviders/AuthProvider'
import CollapseContainer from '@elements/CollapseContainer/CollapseContainer'
import { IApiError, ISkippedItemsDocument, ISkippedItemsResponse } from '@api/types'

import {
  Content,
  CreatedAt,
  ReplyButton,
  StyledChip,
  UserName,
  ViewRepliesButton
} from './Comment.styled'

interface ICommentProps {
  comment: IComment
  organizerId: string
  eventId: string
  getCommentsQueryKey: (parentId?: string | null) => any[]
  onReply: (text: string, parentId: string) => Promise<void>
}

const Comment = memo(
  ({ comment, eventId, organizerId, getCommentsQueryKey, onReply }: ICommentProps) => {
    const { t } = useTranslation('common')
    const queryClient = useQueryClientPlus()
    const { currentUser } = useAuthorizedUser()
    const [isEditing, setIsEditing] = useState(false)
    const [showNewReply, setShowNewReply] = useState(false)
    const [showReplies, setShowReplies] = useState(false)

    const { data, isFetching, isLoading, error, hasNextPage, fetchNextPage } = useInfiniteQuery<
      ISkippedItemsResponse<IComment>,
      IApiError
    >(
      getCommentsQueryKey(comment.id),
      async ({ pageParam = 0 }) => {
        const skippedItemsDocument: ISkippedItemsDocument = {
          skip: pageParam,
          take: 10
        }
        const res = await api.post(`/events/${eventId}/comments/query`, {
          skippedItemsDocument,
          parentId: comment.id
        })
        return res.data
      },
      {
        staleTime: 60_000,
        keepPreviousData: true,
        enabled: showReplies,
        getNextPageParam: (lastPage, allPages) =>
          !lastPage || lastPage.hasMore ? allPages.flatMap(x => x.entries).length : false
      }
    )

    if (error) return <FetchError error={error} />

    const userHref = `/users/${comment.sender.id}`
    const username =
      organizerId === comment.sender.id ? (
        <StyledChip label={comment.sender.username} icon={<CheckCircleOutline />} />
      ) : (
        <UserName>{comment.sender.username}</UserName>
      )

    const handleEdit = async (text: string) => {
      try {
        const { data } = await api.patch<IComment>(`/events/${eventId}/comments/${comment.id}`, {
          text
        })
        editComment(queryClient, getCommentsQueryKey(comment.parentId), data)
        setIsEditing(false)
      } catch (err) {
        apiErrorToast(err, t)
      }
    }

    return (
      <Box marginY={comment.parentId ? '18px' : '25px'}>
        {isEditing ? (
          <NewComment
            autofocus
            onSend={handleEdit}
            initialText={comment.text}
            smallAvatar={!!comment.parentId}
            sendButtonText={t('edit')}
            onCancel={() => setIsEditing(false)}
          />
        ) : (
          <Box display='flex'>
            <Link href={userHref}>
              <Box width={comment.parentId ? '40px' : '50px'}>
                <Avatar
                  clickable
                  src={comment.sender.pictureUrl}
                  size={comment.parentId ? '30px' : undefined}
                  smSize={comment.parentId ? '25px' : undefined}
                />
              </Box>
            </Link>

            <Box flex='1'>
              <Box display='flex' alignItems='center' gridGap='5px' color='themeText.themeGray'>
                <Link href={userHref}>{username}</Link>
                <CreatedAt>{moment.utc(comment.createdAt).local().fromNow()}</CreatedAt>
                {comment.isEdited && (
                  <Tooltip title={t('edited')} placement='right'>
                    <Edit fontSize='inherit' color='inherit' />
                  </Tooltip>
                )}
              </Box>

              <CollapseContainer collapsedHeight={90}>
                <Content>
                  <Linkify>{comment.text}</Linkify>
                </Content>
              </CollapseContainer>

              {!comment.parentId && (
                <ReplyButton variant='text' color='default' onClick={() => setShowNewReply(true)}>
                  {t('reply').toUpperCase()}
                </ReplyButton>
              )}
            </Box>

            {currentUser.id === comment.sender.id && (
              <CommentMenu
                getCommentsQueryKey={getCommentsQueryKey}
                eventId={eventId}
                comment={comment}
                onEdit={() => setIsEditing(true)}
              />
            )}
          </Box>
        )}

        <Box marginLeft='50px'>
          {showNewReply && (
            <NewComment
              autofocus
              smallAvatar
              sendButtonText={t('reply')}
              placeholder={t('addReply')}
              onCancel={() => setShowNewReply(false)}
              onSend={async text => await onReply(text, comment.id)}
            />
          )}

          {comment.replyCount > 0 && (
            <ViewRepliesButton
              variant='text'
              disableRipple
              startIcon={showReplies ? <ArrowDropUp /> : <ArrowDropDown />}
              onClick={() => setShowReplies(x => !x)}
            >
              {showReplies
                ? t('hideCountReplies', { count: comment.replyCount })
                : t('viewCountReplies', { count: comment.replyCount })}
            </ViewRepliesButton>
          )}

          {showReplies &&
            !isLoading &&
            data!.pages.map(page =>
              page.entries.map(e => (
                <Comment
                  getCommentsQueryKey={getCommentsQueryKey}
                  onReply={onReply}
                  eventId={eventId}
                  organizerId={organizerId}
                  key={e.id}
                  comment={e}
                />
              ))
            )}

          {(isLoading || isFetching) && (
            <Box>
              <CircularProgress />
            </Box>
          )}

          {hasNextPage && showReplies && !isLoading && !isFetching && (
            <Button variant='text' startIcon={<ArrowDownward />} onClick={() => fetchNextPage()}>
              {t('loadMore')}
            </Button>
          )}
        </Box>
      </Box>
    )
  }
)

export default Comment
