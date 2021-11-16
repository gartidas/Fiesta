import { QueryClient, QueryKey, useQueryClient } from 'react-query'
import { SetDataOptions } from 'react-query/types/core/query'
import { Updater } from 'react-query/types/core/utils'

export interface QueryClientPlus extends QueryClient {
  /**
   * Sets query data only if data is already loaded
   */
  setLoadedQueryData: <TData>(
    queryKey: QueryKey,
    updater: Updater<TData, TData>,
    options?: SetDataOptions
  ) => TData | undefined
}

const useQueryClientPlus = (): QueryClientPlus => {
  const queryClient = useQueryClient()

  const setLoadedQueryData = <TData>(
    queryKey: QueryKey,
    updater: Updater<TData, TData>,
    options?: SetDataOptions
  ) => {
    const areDataLoaded = queryClient.getQueryData(queryKey)
    if (!areDataLoaded) return

    return queryClient.setQueryData(queryKey, updater as Updater<TData | undefined, TData>, options)
  }

  return Object.assign(queryClient, { setLoadedQueryData })
}

export default useQueryClientPlus
