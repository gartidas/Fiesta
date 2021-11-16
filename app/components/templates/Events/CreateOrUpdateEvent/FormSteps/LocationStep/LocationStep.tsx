import { Box, InputAdornment, Typography } from '@material-ui/core'
import { useFormContext } from 'react-hook-form'
import useTranslation from 'next-translate/useTranslation'
import { KeyboardArrowLeft, KeyboardArrowRight, LinkOutlined } from '@material-ui/icons'

import Button from '@elements/Button/Button'
import { locationValidator } from '../../utils'
import FormInput from '@elements/HookForm/FormInput'
import FormCheckbox from '@elements/HookForm/FormCheckbox'
import FormGoogleMap from '@elements/HookForm/FormGoogleMap'
import { combineValidators, requiredValidator, urlValidator } from '@utils/validators'

import { StyledCard } from './LocationStep.styled'

interface ILocationStepProps {
  nextStep: () => void
  prevStep: (index?: number) => void
}

const LocationStep = ({ nextStep, prevStep }: ILocationStepProps) => {
  const { t } = useTranslation('common')
  const { trigger } = useFormContext()
  const { watch } = useFormContext()
  const isOnlineEvent = watch('isOnlineEvent')

  const handleNextClick = async () => {
    const fieldToValidate = isOnlineEvent ? 'externalLink' : 'location'
    const isValid = await trigger(fieldToValidate)
    isValid && nextStep()
  }

  return (
    <div>
      <FormCheckbox name='isOnlineEvent' label={t('onlineEvent')} />

      {!isOnlineEvent && (
        <StyledCard elevation={0}>
          <FormGoogleMap name='location' validate={locationValidator} />
        </StyledCard>
      )}

      {isOnlineEvent && (
        <div style={{ margin: '20px 0 50px' }}>
          <Typography variant='subtitle2'>
            {t('provideUrlToWhereAttendeesCanWatchEvent')}
          </Typography>

          <FormInput
            InputProps={{
              startAdornment: (
                <InputAdornment position='start'>
                  <LinkOutlined />
                </InputAdornment>
              )
            }}
            fullWidth
            name='externalLink'
            validate={combineValidators([requiredValidator, urlValidator])}
          />
        </div>
      )}

      <Box marginY='25px' display='flex' justifyContent='center' gridGap='20px'>
        <Button
          onClick={() => prevStep()}
          color='secondary'
          variant='text'
          startIcon={<KeyboardArrowLeft />}
        >
          {t('back')}
        </Button>

        <Button onClick={handleNextClick} endIcon={<KeyboardArrowRight />}>
          {t('next')}
        </Button>
      </Box>
    </div>
  )
}

export default LocationStep
