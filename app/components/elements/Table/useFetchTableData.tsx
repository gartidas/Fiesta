import { useQuery } from 'react-query'
import { Filters, SortingRule } from 'react-table'

import api from '@api/HttpClient'
import { IApiError, IQueryDocument, IQueryResponse, SortType } from '@api/types'

export interface ITableEndpoint {
  url: string
}

interface UseFetchTableDataParams {
  endpoint: ITableEndpoint
  enabled: boolean
  page: number
  pageSize: number
  filters: Filters<any>
  sorts: SortingRule<any>[]
}

const useFetchTableData = ({
  endpoint,
  enabled,
  page,
  pageSize,
  filters,
  sorts
}: UseFetchTableDataParams) => {
  const queryDocument: IQueryDocument = {
    page,
    pageSize,
    filters: filters.map(x => ({
      fieldName: x.id,
      // Note: this prop is not part of original type - it is manually added in FilterModal.handleFilter()
      operation: (x as any).operation,
      fieldValue: x.value
    })),
    sorts: sorts.map(x => ({ fieldName: x.id, sortType: x.desc ? SortType.Desc : SortType.Asc }))
  }

  const { data, isLoading, isFetching, refetch, error } = useQuery<
    IQueryResponse<Record<string, any>>,
    IApiError
  >(
    [endpoint, queryDocument],
    async () => {
      const res = await api.post(endpoint.url, { queryDocument })
      return res.data
    },
    {
      enabled,
      keepPreviousData: true,
      staleTime: 60_000
    }
  )

  return {
    data,
    error,
    loading: isLoading || isFetching,
    refetch: () => refetch()
  }
}

export default useFetchTableData
