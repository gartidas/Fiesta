import { TextField } from '@material-ui/core'
import { LocationOn } from '@material-ui/icons'
import { Autocomplete } from '@material-ui/lab'
import useTranslation from 'next-translate/useTranslation'
import { getDetails, Suggestions } from 'use-places-autocomplete'

import { getLocation, ILocationDto } from 'utils/googleUtils'
import { Wrapper, OptionText, Option } from './Search.styled'

interface IProps {
  value: string
  ready: boolean
  suggestions: Suggestions
  onChange: (location: ILocationDto) => void
  setValue: (value: string, shouldFetch?: boolean) => void
}

const Search = ({
  value,
  ready,
  suggestions: { loading, data, status },
  setValue,
  onChange
}: IProps) => {
  const { t } = useTranslation('common')

  const handleSelected = async (value: any) => {
    if (!value) return

    try {
      const { geometry } = await getDetails({ placeId: value.place_id })
      const { lat, lng } = geometry.location
      const location = await getLocation({ lat: lat(), lng: lng() })
      onChange(location)
    } catch (error) {
      console.log('Search error: ', error)
    }
  }

  return (
    <Wrapper>
      <Autocomplete
        disabled={!ready}
        loading={loading}
        inputValue={value}
        getOptionLabel={x => x.description}
        options={status === 'OK' ? data : []}
        onChange={(_, value) => handleSelected(value)}
        onInputChange={(_, value) => setValue(value)}
        renderOption={option => (
          <Option>
            <LocationOn />
            <OptionText>{option.description}</OptionText>
          </Option>
        )}
        renderInput={props => (
          <TextField
            {...props}
            variant='outlined'
            color='secondary'
            placeholder={`${t('search')}...`}
          />
        )}
        loadingText={<OptionText>{t('loading')}...</OptionText>}
        noOptionsText={<OptionText>{t('nothingFound')}</OptionText>}
      />
    </Wrapper>
  )
}

export default Search
