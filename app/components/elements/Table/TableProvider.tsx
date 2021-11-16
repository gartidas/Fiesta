import { createContext, FC, memo, useContext, useState } from 'react'
import {
  Column,
  TableInstance,
  useFilters,
  usePagination,
  useRowSelect,
  useSortBy,
  useTable as useReactTable
} from 'react-table'
import { StyledCheckBox } from './Table.styled'

interface ITableContextValue extends TableInstance {
  setData: (
    data: Record<string, any>[] | ((data: Record<string, any>[]) => Record<string, any>[])
  ) => void
  setConfig: (value: IConfig | ((value: IConfig) => IConfig)) => void
}

interface IConfig {
  selectable?: boolean
  inMemory?: boolean
  columns: Column<any>[]
  pageCount?: number
}

const TableContext = createContext<ITableContextValue>(null!)
export const useTable = () => useContext(TableContext)
export const SELECTION_COLUMN_ID = 'selection-column'

const TableProvider: FC = memo(({ children }) => {
  const [data, setData] = useState<Record<string, any>[]>([])
  const [config, setConfig] = useState<IConfig>({ columns: [] })

  const { columns, inMemory, selectable, pageCount } = config

  const tableInstance = useReactTable<any>(
    {
      data,
      columns,
      initialState: { pageSize: 25 },
      autoResetFilters: false,
      manualPagination: !inMemory,
      manualFilters: !inMemory,
      manualSortBy: !inMemory,
      pageCount: inMemory ? undefined : pageCount
    },
    useFilters,
    useSortBy,
    usePagination,
    useRowSelect,
    hooks => {
      selectable &&
        hooks.visibleColumns.push(columns => [
          {
            id: SELECTION_COLUMN_ID,
            Header: ({ getToggleAllRowsSelectedProps }) => (
              <StyledCheckBox color='primary' {...getToggleAllRowsSelectedProps()} />
            ),
            Cell: ({ row }) => (
              <StyledCheckBox color='primary' {...row.getToggleRowSelectedProps()} />
            )
          },
          ...columns
        ])
    }
  )

  return (
    <TableContext.Provider value={{ ...tableInstance, setData, setConfig }}>
      {children}
    </TableContext.Provider>
  )
})

export default TableProvider
