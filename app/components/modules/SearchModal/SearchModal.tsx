import { ReactNode } from 'react'
import { isEmpty } from 'lodash'
import { Box, CircularProgress, Typography } from '@material-ui/core'
import useTranslation from 'next-translate/useTranslation'
import { Close, Search } from '@material-ui/icons'

import Modal from '@elements/Modal'
import Observer from '@elements/Observer'
import TextBox from '@elements/TextBox/TextBox'
import NothingFound from '@elements/NothingFound'

import {
  SearchModalItem,
  ItemsContainer,
  StyledCard,
  StyledCloseButton
} from './SearchModal.styled'

interface ISearchModalProps<T> {
  items: T[]
  search: string
  isFetching: boolean
  title?: string
  searchPlaceholder?: string
  hasNextPage?: boolean
  nothingFoundComponent?: ReactNode
  onClose: () => void
  fetchNextPage?: () => void
  renderItem: (item: T) => ReactNode
  setSearch: (value: string) => void
}

const SearchModal = <T extends { id: string }>({
  items,
  search,
  title,
  isFetching,
  hasNextPage,
  searchPlaceholder,
  nothingFoundComponent,
  onClose,
  renderItem,
  setSearch,
  fetchNextPage
}: ISearchModalProps<T>) => {
  const { t } = useTranslation('common')

  return (
    <Modal open onClose={onClose}>
      <StyledCard>
        <StyledCloseButton onClick={onClose}>
          <Close />
        </StyledCloseButton>

        <Box padding='40px 8% 0'>
          <Typography color='primary' variant='h6'>
            {title}
          </Typography>
        </Box>

        <Box margin='40px auto 20px' width='84%'>
          <TextBox
            fullWidth
            autoFocus
            value={search}
            onChange={setSearch}
            placeholder={searchPlaceholder || t('search')}
            InputProps={{
              startAdornment: (
                <Box marginRight='10px' color='themeText.themeGray'>
                  <Search />
                </Box>
              )
            }}
          />
        </Box>

        <ItemsContainer>
          {isFetching && (
            <SearchModalItem>
              <CircularProgress />
            </SearchModalItem>
          )}

          {items.map(x => (
            <div key={x.id}>{renderItem(x)}</div>
          ))}

          {fetchNextPage && (
            <Observer callback={fetchNextPage} disabled={isFetching || !hasNextPage} />
          )}

          {isEmpty(items) && !isFetching && (
            <SearchModalItem disabled>{nothingFoundComponent || <NothingFound />}</SearchModalItem>
          )}
        </ItemsContainer>
      </StyledCard>
    </Modal>
  )
}

export default SearchModal
