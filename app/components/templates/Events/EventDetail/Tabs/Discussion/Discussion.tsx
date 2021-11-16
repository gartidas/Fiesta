import { useCallback } from 'react'
import { CircularProgress } from '@material-ui/core'
import useTranslation from 'next-translate/useTranslation'
import { useInfiniteQuery } from 'react-query'

import api from '@api/HttpClient'
import { IUserDto } from 'domainTypes'
import Comment from './Comment/Comment'
import Observer from '@elements/Observer'
import NewComment from './NewComment/NewComment'
import { apiErrorToast } from 'services/toastService'
import FetchError from '@elements/FetchError/FetchError'
import { IEventDetail } from '../../EventDetailTemplate'
import useQueryClientPlus from '@hooks/useQueryClientPlus'
import { IApiError, ISkippedItemsDocument, ISkippedItemsResponse } from '@api/types'

import { addComment, increaseReplyCount } from './utils'

interface IDiscussionProps {
  event: IEventDetail
}

export interface IComment {
  id: string
  text: string
  createdAt: string
  replyCount: number
  sender: IUserDto
  isEdited: boolean
  parentId: string | null // keep null instead of undefined because BE returns null and parentId is used in queryKey
}

const Discussion = ({ event }: IDiscussionProps) => {
  const { t } = useTranslation('common')
  const queryClient = useQueryClientPlus()
  const getQueryKey = useCallback(
    (parentId: string | null = null) => ['event', event.id, 'comments', 'query', { parentId }],
    [event.id]
  )

  const { data, isFetching, isLoading, error, hasNextPage, fetchNextPage } = useInfiniteQuery<
    ISkippedItemsResponse<IComment>,
    IApiError
  >(
    getQueryKey(null),
    async ({ pageParam = 0 }) => {
      const skippedItemsDocument: ISkippedItemsDocument = {
        skip: pageParam
      }
      const res = await api.post(`/events/${event.id}/comments/query`, {
        skippedItemsDocument
      })
      return res.data
    },
    {
      staleTime: 60_000,
      keepPreviousData: true,
      getNextPageParam: ({ hasMore }, allPages) =>
        hasMore ? allPages.flatMap(x => x.entries).length : false
    }
  )

  const submitComment = useCallback(
    async (text: string, parentId: string | null = null) => {
      try {
        const { data } = await api.post<IComment>(`/events/${event.id}/comments`, {
          text,
          parentId
        })
        addComment(queryClient, getQueryKey(parentId), data)

        if (parentId) {
          increaseReplyCount(queryClient, getQueryKey(), parentId)
        }
      } catch (err) {
        apiErrorToast(err, t)
      }
    },
    [event.id, queryClient, t, getQueryKey]
  )

  if (isLoading) return <CircularProgress />
  if (error) return <FetchError error={error} />

  const { pages } = data!

  return (
    <>
      <NewComment onSend={submitComment} />

      {pages.map(page =>
        page.entries.map(x => (
          <Comment
            key={x.id}
            comment={x}
            eventId={event.id}
            organizerId={event.organizer.id}
            getCommentsQueryKey={getQueryKey}
            onReply={submitComment}
          />
        ))
      )}

      {isFetching && <CircularProgress />}

      <Observer callback={fetchNextPage} disabled={isFetching || !hasNextPage} />
    </>
  )
}

export default Discussion
