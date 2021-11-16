import { useRef, useState } from 'react'
import useTranslation from 'next-translate/useTranslation'
import { Box, Chip, IconButton, Slider } from '@material-ui/core'
import {
  LiveTv,
  LocationOffOutlined,
  LocationOnOutlined,
  PinDropOutlined
} from '@material-ui/icons'

import Modal from '@elements/Modal'
import Divider from '@elements/Divider'
import Button from '@elements/Button/Button'
import useWindowSize from '@hooks/useWindowSize'
import Checkbox from '@elements/Checkbox/Checkbox'
import useUpdateEffect from '@hooks/useUpdateEffect'

import {
  DistanceFilterValue,
  FiltersWrapper,
  ModalCard,
  NoLimitParagraph,
  SliderWrapper
} from './EventsFilter.styled'

export enum OnlineFilter {
  All = 0,
  OnlineOnly = 1,
  OfflineOnly = 2
}

export interface IEventsFilter {
  onlineFilter: OnlineFilter
  maxDistanceFilter?: number
  currentUserLocation?: { latitude: number; longitude: number }
}

interface IEventsFilterProps {
  filter: IEventsFilter
  onChange: (filter: IEventsFilter) => void
  disabled?: boolean
}

const EventsFilter = ({ filter, disabled, onChange }: IEventsFilterProps) => {
  const { t } = useTranslation('common')
  const { maxMedium } = useWindowSize()
  const [distanceModalOpen, setDistanceModalOpen] = useState(false)
  const lastMaxDistanceFilter = useRef(filter.maxDistanceFilter || 100)
  const [currentLocation, setCurrentLocation] = useState<GeolocationCoordinates>()

  const { onlineFilter, maxDistanceFilter } = filter

  const handleOnlineFilterChange = (newValue: OnlineFilter) => {
    if (disabled) return
    if (newValue === onlineFilter) return onChange({ ...filter, onlineFilter: OnlineFilter.All })
    return onChange({ ...filter, onlineFilter: newValue })
  }

  const handleDistanceFilterActiveChange = () => {
    if (!currentLocation) {
      navigator.geolocation.getCurrentPosition(x => setCurrentLocation(x.coords))
      return
    }

    if (maxDistanceFilter) lastMaxDistanceFilter.current = maxDistanceFilter
    onChange({
      ...filter,
      currentUserLocation: {
        latitude: currentLocation.latitude,
        longitude: currentLocation.longitude
      },
      maxDistanceFilter: maxDistanceFilter ? undefined : lastMaxDistanceFilter.current
    })
  }

  useUpdateEffect(() => {
    handleDistanceFilterActiveChange()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentLocation])

  const distanceSlider = (
    <>
      <Slider
        marks
        step={100}
        min={100}
        max={1000}
        value={maxDistanceFilter}
        onChange={(_, value) => onChange({ ...filter, maxDistanceFilter: value as number })}
      />

      <DistanceFilterValue>{maxDistanceFilter}</DistanceFilterValue>
    </>
  )

  const openModal = () => setDistanceModalOpen(true)

  return (
    <FiltersWrapper>
      <Chip
        icon={<LiveTv />}
        label={t('online')}
        variant={onlineFilter === OnlineFilter.OnlineOnly ? 'default' : 'outlined'}
        color={onlineFilter === OnlineFilter.OnlineOnly ? 'primary' : 'default'}
        onClick={() => handleOnlineFilterChange(OnlineFilter.OnlineOnly)}
      />
      <Chip
        icon={<PinDropOutlined />}
        label={t('offline')}
        variant={onlineFilter === OnlineFilter.OfflineOnly ? 'default' : 'outlined'}
        color={onlineFilter === OnlineFilter.OfflineOnly ? 'primary' : 'default'}
        onClick={() => handleOnlineFilterChange(OnlineFilter.OfflineOnly)}
      />

      {onlineFilter === OnlineFilter.OfflineOnly && (
        <>
          <Divider orientation='vertical' style={{ margin: '0 3px 0 15px' }} />

          <SliderWrapper>
            <IconButton onClick={maxMedium ? openModal : handleDistanceFilterActiveChange}>
              {maxDistanceFilter ? <LocationOnOutlined /> : <LocationOffOutlined />}
            </IconButton>

            {!maxDistanceFilter && (
              <NoLimitParagraph onClick={maxMedium ? openModal : handleDistanceFilterActiveChange}>
                {t('noLimit').toUpperCase()}
              </NoLimitParagraph>
            )}

            {maxDistanceFilter && !maxMedium && distanceSlider}

            {maxDistanceFilter && maxMedium && (
              <DistanceFilterValue onClick={openModal}>{maxDistanceFilter}</DistanceFilterValue>
            )}
          </SliderWrapper>
        </>
      )}

      <Modal open={distanceModalOpen} onClose={() => setDistanceModalOpen(false)}>
        <ModalCard>
          <Checkbox
            label={t('noLimit')}
            checked={!maxDistanceFilter}
            onChange={handleDistanceFilterActiveChange}
          />

          {maxDistanceFilter && <SliderWrapper>{distanceSlider}</SliderWrapper>}

          <Box marginTop='10px'>
            <Button variant='outlined' onClick={() => setDistanceModalOpen(false)}>
              {t('close')}
            </Button>
          </Box>
        </ModalCard>
      </Modal>
    </FiltersWrapper>
  )
}

export default EventsFilter
