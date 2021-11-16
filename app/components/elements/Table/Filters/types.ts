import { FilterOperation } from '@api/types'
import { FilterProps } from 'react-table'

export interface IFilter {
  operation: FilterOperation
  value?: any
}

export interface IFilterProps extends FilterProps<any> {
  value?: IFilter
  setValue?: (value: IFilter) => void
  operation: FilterOperation
}
