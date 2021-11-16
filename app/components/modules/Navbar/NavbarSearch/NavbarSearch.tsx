import Link from 'next/link'
import { useState } from 'react'
import { useQuery } from 'react-query'
import { KeyboardArrowRight } from '@material-ui/icons'
import useTranslation from 'next-translate/useTranslation'

import api from '@api/HttpClient'
import EventItem from './EventItem'
import Avatar from '@elements/Avatar'
import { IApiError } from '@api/types'
import useDebounce from '@hooks/useDebounce'
import FetchError from '@elements/FetchError/FetchError'
import StartTyping from '@elements/StartTyping'
import { ItemType, EventAndUserSelectorItem } from './types'
import { SearchModal } from '@modules/SearchModal'

import { Item, ItemInfo } from './NavbarSearch.styled'

interface INavbarSearchProps {
  onClose: () => void
}

const MINIMUM_CHARS_TO_SEARCH = 2

const NavbarSearch = ({ onClose }: INavbarSearchProps) => {
  const { t } = useTranslation('common')
  const [search, setSearch] = useState('')
  const debouncedSearch = useDebounce(search)

  const { data, error, isFetching } = useQuery<EventAndUserSelectorItem[], IApiError>(
    ['selectors', 'events-and-users', debouncedSearch],
    async () => {
      if (debouncedSearch.length < MINIMUM_CHARS_TO_SEARCH) return []
      return (
        await api.get(`/selectors/events-and-users?search=${encodeURIComponent(debouncedSearch)}`)
      ).data
    },
    { initialData: [], keepPreviousData: true }
  )

  if (error) return <FetchError error={error} />
  const items = data!

  const renderItem = (item: EventAndUserSelectorItem) =>
    item.type === ItemType.User ? (
      <Link href={`/users/${item.id}`}>
        <Item onClick={onClose}>
          <Avatar src={item.pictureUrl} />

          <ItemInfo>
            <p>{item.displayName}</p>
            <span>{item.fullName}</span>
          </ItemInfo>

          <KeyboardArrowRight />
        </Item>
      </Link>
    ) : (
      <EventItem item={item} onClose={onClose} />
    )

  return (
    <SearchModal
      items={items}
      search={search}
      isFetching={isFetching}
      nothingFoundComponent={debouncedSearch.length < MINIMUM_CHARS_TO_SEARCH && <StartTyping />}
      onClose={onClose}
      setSearch={setSearch}
      renderItem={renderItem}
      searchPlaceholder={t('findPeopleOrEvents')}
    />
  )
}

export default NavbarSearch
