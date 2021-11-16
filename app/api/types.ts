interface IApiErrorDetail {
  code: string
  customState: any
  propertyName: string
}

export interface IApiError {
  data: {
    errorCode: string
    errorMessage: string
    errorDetails: IApiErrorDetail[]
  }
  status: number
}

export interface IQueryResponse<T> {
  entries: T[]
  page: number
  nextPage: number
  pageSize: number
  totalPages: number
  totalEntries: number
  hasMore: boolean
}

export enum SortType {
  Asc = 0,
  Desc = 1
}

export enum FilterOperation {
  Equals = 0,
  Contains = 1,
  GreaterThan = 2,
  LessThan = 3,
  GreaterThanOrEqual = 4,
  LessThanOrEqual = 5,
  HasFlag = 6,
  StartsWith = 7,
  EndsWith = 8
}

export interface ISort {
  fieldName: string
  sortType?: SortType
}

export interface IFilter {
  fieldName: string
  operation: FilterOperation
  fieldValue: any
}

export interface IQueryDocument {
  page?: number
  pageSize?: number
  sorts?: ISort[]
  filters?: IFilter[]
}

export interface ISkippedItemsDocument {
  take?: number
  skip?: number
}

export interface ISkippedItemsResponse<T, TAdditionalData = any> {
  entries: T[]
  take: number
  skip: number
  totalEntries: number
  hasMore: boolean
  additionalData: TAdditionalData
}
