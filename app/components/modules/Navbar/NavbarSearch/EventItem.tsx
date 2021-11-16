import Link from 'next/link'
import moment from 'moment'
import { Box, Chip } from '@material-ui/core'
import { Edit, Event, KeyboardArrowRight, LiveTv, LocationOn, Schedule } from '@material-ui/icons'

import Avatar from '@elements/Avatar'
import { EventAndUserSelectorItem, ItemType } from './types'
import { EllipsisOverflow, Item, ItemInfo } from './NavbarSearch.styled'
import useTranslation from 'next-translate/useTranslation'

interface IEventItemProps {
  item: EventAndUserSelectorItem
  onClose: () => void
}

const EventItem = ({ item, onClose }: IEventItemProps) => {
  const { t } = useTranslation('common')

  if (item.type === ItemType.User) return <></>

  return (
    <Link href={`/events/${item.id}`}>
      <Item onClick={onClose}>
        <Avatar variant='rounded' src={item.pictureUrl}>
          <Event />
        </Avatar>

        <ItemInfo>
          <p>{item.displayName}</p>

          <span>
            <Box display='flex' alignItems='center' gridGap='3px' marginRight='7px'>
              <Schedule />
              {moment(item.startDate).format('DD.MM.YYYY')}
            </Box>

            {item.location && (
              <Box display='flex' alignItems='center' gridGap='1px' overflow='hidden'>
                <LocationOn />
                <EllipsisOverflow>{item.location}</EllipsisOverflow>
              </Box>
            )}

            {item.externalLink && <Chip size='small' label={t('online')} icon={<LiveTv />} />}
          </span>

          {item.description && (
            <span>
              <Box display='flex' alignItems='center' gridGap='3px' overflow='hidden'>
                <Edit />
                <EllipsisOverflow>{item.description}</EllipsisOverflow>
              </Box>
            </span>
          )}
        </ItemInfo>

        <KeyboardArrowRight />
      </Item>
    </Link>
  )
}

export default EventItem
