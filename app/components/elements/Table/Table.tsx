/* eslint-disable react/jsx-key */
import {
  Box,
  Paper,
  Table as ReactTable,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableSortLabel
} from '@material-ui/core'
import { Column } from 'react-table'
import { isArray, keys } from 'lodash'
import { useEffect, useState } from 'react'
import { FilterListRounded, Refresh } from '@material-ui/icons'

import NoRowsFound from './NoRowsFound'
import TablePagination from './TablePagination'
import FilterModal from './FilterModal/FilterModal'
import LoadingOverlay from '@elements/LoadingOverlay'
import FetchError from '@elements/FetchError/FetchError'
import { useTable, SELECTION_COLUMN_ID } from './TableProvider'
import useFetchTableData, { ITableEndpoint } from './useFetchTableData'

import {
  FilterButtonBadge,
  FloatingButton,
  FloatingButtonsContainer,
  OuterWrapper,
  Wrapper
} from './Table.styled'

interface IProps {
  columns: Column<any>[]
  dataOrEndpoint: Record<string, any>[] | ITableEndpoint
  height?: string
  resizable?: boolean
  size?: 'small' | 'medium'
  selectable?: boolean
}

const Table = ({ columns, dataOrEndpoint, height, resizable, size, selectable }: IProps) => {
  const [filterOpen, setFilterOpen] = useState(false)
  const {
    page,
    headerGroups,
    filteredRows,
    gotoPage,
    setData,
    setConfig,
    prepareRow,
    setPageSize,
    setAllFilters,
    getTableProps,
    getTableBodyProps,
    state: { pageIndex, pageSize, selectedRowIds, filters, sortBy }
  } = useTable()

  const { data, loading, error, refetch } = useFetchTableData({
    pageSize,
    filters,
    sorts: sortBy,
    page: pageIndex,
    endpoint: dataOrEndpoint as ITableEndpoint,
    enabled: !isArray(dataOrEndpoint)
  })

  useEffect(() => {
    setConfig(prev => ({
      ...prev,
      columns,
      selectable,
      inMemory: isArray(dataOrEndpoint),
      pageCount: data?.totalPages
    }))
  }, [columns, selectable, dataOrEndpoint, data?.totalPages, setConfig])

  useEffect(() => {
    if (loading || error) return
    isArray(dataOrEndpoint) ? setData(dataOrEndpoint) : setData(data!.entries)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [JSON.stringify(dataOrEndpoint), data, error, loading, setData])

  if (error) return <FetchError error={error} />

  const hasFilters = columns.some(col => keys(col).includes('Filter'))
  const totalEntries = isArray(dataOrEndpoint) ? filteredRows.length : data?.totalEntries || 0
  const totalPages = isArray(dataOrEndpoint)
    ? Math.ceil(filteredRows.length / pageSize)
    : data?.totalPages || 0

  return (
    <OuterWrapper>
      <FloatingButtonsContainer>
        {hasFilters && (
          <FilterButtonBadge color='primary' badgeContent={filters.length || undefined}>
            <FloatingButton onClick={() => setFilterOpen(true)} disabled={loading}>
              <FilterListRounded />
            </FloatingButton>
          </FilterButtonBadge>
        )}

        {!isArray(dataOrEndpoint) && (
          <FloatingButton onClick={refetch} disabled={loading}>
            <Refresh />
          </FloatingButton>
        )}
      </FloatingButtonsContainer>

      <Wrapper height={height} resizable={resizable}>
        {loading && <LoadingOverlay />}

        {!loading && !totalEntries && <NoRowsFound />}

        <TableContainer component={Paper} style={{ pointerEvents: loading ? 'none' : 'auto' }}>
          <ReactTable stickyHeader {...getTableProps()} size={size}>
            <TableHead>
              {headerGroups.map(headerGroup => (
                <TableRow {...headerGroup.getHeaderGroupProps()}>
                  {headerGroup.headers.map(column => (
                    <TableCell
                      {...column.getHeaderProps(column.getSortByToggleProps())}
                      className={column.id === SELECTION_COLUMN_ID ? 'selection-col' : ''}
                    >
                      <TableSortLabel
                        active={column.isSorted}
                        disabled={!column.canSort}
                        direction={column.isSortedDesc ? 'desc' : 'asc'}
                      >
                        {column.render('Header')}
                      </TableSortLabel>
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableHead>

            <TableBody {...getTableBodyProps()}>
              {page.map(row => {
                prepareRow(row)
                return (
                  <TableRow hover selected={selectedRowIds[row.id] || false} {...row.getRowProps()}>
                    {row.cells.map(cell => (
                      <TableCell {...cell.getCellProps()}>{cell.render('Cell')}</TableCell>
                    ))}
                  </TableRow>
                )
              })}
            </TableBody>
          </ReactTable>
        </TableContainer>

        <Box paddingY='10px' display='flex' justifyContent='flex-end' bgcolor='background.paper'>
          <TablePagination
            page={pageIndex}
            pageSize={pageSize}
            totalPages={totalPages}
            totalEntries={totalEntries}
            goToPage={gotoPage}
            setPageSize={setPageSize}
          />
        </Box>
      </Wrapper>

      <FilterModal
        open={filterOpen}
        headerGroups={headerGroups}
        onClose={() => setFilterOpen(false)}
        setAllFilters={setAllFilters}
      />
    </OuterWrapper>
  )
}

export default Table
