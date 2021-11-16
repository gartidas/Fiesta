import { useInfiniteQuery } from 'react-query'
import { CircularProgress, MenuItem, Typography } from '@material-ui/core'

import api from '@api/HttpClient'
import Observer from '@elements/Observer'
import { IUserDto, RoleEnum } from 'domainTypes'
import FetchError from '@elements/FetchError/FetchError'
import UserListItem from '@elements/UserListItem/UserListItem'
import { IApiError, IQueryDocument, IQueryResponse } from '@api/types'

interface IUser extends IUserDto {
  isDeleted: boolean
  emailConfirmed: boolean
  role: RoleEnum
}

const Users = () => {
  const { data, isFetching, isLoading, error, hasNextPage, fetchNextPage } = useInfiniteQuery<
    IQueryResponse<IUser>,
    IApiError
  >(
    ['users', 'query'],
    async ({ pageParam = 0 }) => {
      const queryDocument: IQueryDocument = {
        page: pageParam,
        pageSize: 20
      }
      const res = await api.post('/users/query', {
        queryDocument
      })
      return res.data
    },
    {
      staleTime: 30_000,
      keepPreviousData: true,
      getNextPageParam: ({ hasMore, nextPage }) => (hasMore ? nextPage : false)
    }
  )

  if (isLoading) return <CircularProgress />
  if (error) return <FetchError error={error} />

  const { pages } = data!

  return (
    <div>
      <Typography gutterBottom>Total: {pages[0]?.totalEntries}</Typography>

      {pages.map(page =>
        page.entries.map(x => (
          <MenuItem key={x.id} disableGutters>
            <UserListItem user={x} isLink />
          </MenuItem>
        ))
      )}

      <Observer callback={fetchNextPage} disabled={!hasNextPage || isFetching || isLoading} />
    </div>
  )
}

export default Users
