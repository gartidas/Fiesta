import { TablePagination as MuiTablePagination } from '@material-ui/core'
import useTranslation from 'next-translate/useTranslation'
interface IProps {
  page: number
  totalPages: number
  totalEntries: number

  pageSize: number
  goToPage: (page: number) => void
  setPageSize: (size: number) => void
}

const TablePagination = ({
  page,
  totalPages,
  totalEntries,
  pageSize,
  setPageSize,
  goToPage
}: IProps) => {
  const { t } = useTranslation('common')

  return (
    <MuiTablePagination
      component='div'
      page={page}
      count={totalEntries}
      rowsPerPage={pageSize}
      labelRowsPerPage={t('rowsPerPage')}
      onChangePage={(_, x) => goToPage(x)}
      rowsPerPageOptions={[10, 25, 50, 100]}
      onChangeRowsPerPage={e => setPageSize(parseInt(e.target.value))}
      labelDisplayedRows={() => t('pageOfPages', { page: page + 1, pages: totalPages })}
    />
  )
}

export default TablePagination
