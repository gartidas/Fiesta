import { InfiniteData } from 'react-query'
import { IComment } from './Discussion'
import { ISkippedItemsResponse } from '@api/types'
import { QueryClientPlus } from '@hooks/useQueryClientPlus'

export const increaseReplyCount = (
  queryClient: QueryClientPlus,
  queryKey: any,
  commentId: string,
  amount: number = 1
) => {
  queryClient.setLoadedQueryData<InfiniteData<ISkippedItemsResponse<IComment>>>(queryKey, prev => ({
    ...prev,
    pages: prev.pages.map(page => ({
      ...page,
      entries: page.entries.map(e =>
        e.id === commentId ? { ...e, replyCount: e.replyCount + amount } : e
      )
    }))
  }))
}

export const addComment = (queryClient: QueryClientPlus, queryKey: any, newComment: IComment) => {
  queryClient.setLoadedQueryData<InfiniteData<ISkippedItemsResponse<IComment>>>(queryKey, prev => ({
    ...prev,
    pages: prev.pages.map((page, pageIndex) => ({
      ...page,
      entries: pageIndex === 0 ? [newComment, ...page.entries] : page.entries
    }))
  }))
}

export const editComment = (queryClient: QueryClientPlus, queryKey: any, edited: IComment) => {
  queryClient.setLoadedQueryData<InfiniteData<ISkippedItemsResponse<IComment>>>(queryKey, prev => ({
    ...prev,
    pages: prev.pages.map(page => ({
      ...page,
      entries: page.entries.map(e => (e.id === edited.id ? edited : e))
    }))
  }))
}

export const removeComment = (queryClient: QueryClientPlus, queryKey: any, removed: IComment) => {
  queryClient.setLoadedQueryData<InfiniteData<ISkippedItemsResponse<IComment>>>(queryKey, prev => ({
    ...prev,
    pages: prev.pages.map(page => ({
      ...page,
      entries: page.entries.filter(e => e.id !== removed.id)
    }))
  }))
}
