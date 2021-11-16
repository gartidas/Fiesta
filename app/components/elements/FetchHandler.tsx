import React from 'react'
import { IApiError } from '@api/types'
import { CircularProgress } from '@material-ui/core'
import FetchError from './FetchError/FetchError'

interface IFetchHandlerProps<T> {
  data?: T
  isLoading: boolean
  children: JSX.Element | JSX.Element[] | ((data: T) => JSX.Element)
  error: IApiError | null
  loadingComponent?: JSX.Element | JSX.Element[]
}

const FetchHandler = <T extends any>({
  isLoading,
  loadingComponent,
  children,
  data,
  error
}: IFetchHandlerProps<T>): JSX.Element => {
  if (isLoading) return (loadingComponent as any) || <CircularProgress />
  if (error) return <FetchError error={error} />
  return typeof children === 'function' ? children(data!) : (children as any)
}

export default FetchHandler
