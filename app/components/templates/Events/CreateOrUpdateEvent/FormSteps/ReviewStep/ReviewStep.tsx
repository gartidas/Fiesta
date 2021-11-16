import { useEffect } from 'react'
import { keys, lowerFirst } from 'lodash'
import { useFormContext } from 'react-hook-form'
import useTranslation from 'next-translate/useTranslation'
import { EditOutlined, KeyboardArrowLeft, OpenInNew } from '@material-ui/icons'
import { Box, Card, CardContent, Chip, Grid, IconButton } from '@material-ui/core'

import Map from '@modules/Map/Map'
import Button from '@elements/Button/Button'
import { AccessibilityTypeEnum } from 'domainTypes'
import { toLocalTime } from '@utils/utils'
import KeyValueRow from '@elements/KeyValueRow/KeyValueRow'
import { redirectToStepByErrorFieldName } from '../../utils'
import { ICreateEventFormValues } from '@templates/Events/CreateOrUpdateEvent/CreateOrUpdateEventTemplate'

import { MapWrapper, Title, Wrapper } from './ReviewStep.styled'
import { LinkPreview } from '@dhaiwat10/react-link-preview'

interface IReviewStepProps {
  submitting: boolean
  isUpdateEvent: boolean
  prevStep: (index?: number) => void
}

const ReviewStep = ({ isUpdateEvent, submitting, prevStep }: IReviewStepProps) => {
  const { getValues, trigger, errors } = useFormContext<ICreateEventFormValues>()
  const { t } = useTranslation('common')
  const {
    location,
    name,
    startDate,
    endDate,
    capacity,
    accessibilityType,
    description,
    externalLink
  } = getValues()

  useEffect(() => {
    redirectToStepByErrorFieldName(keys(errors), prevStep)
    // NOTE: adding prevStep as dependency causes infinite loop
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [errors])

  return (
    <Wrapper>
      <Grid container spacing={3} wrap='wrap'>
        <Grid item xs={12} md={6} xl={4}>
          <Card>
            <CardContent>
              <Title>
                {t('eventInfo')}
                <IconButton onClick={() => prevStep(0)}>
                  <EditOutlined />
                </IconButton>
              </Title>

              <KeyValueRow keyName={t('name')} value={name} />
              <KeyValueRow keyName={t('startDate')} value={toLocalTime(startDate)} />
              <KeyValueRow keyName={t('endDate')} value={toLocalTime(endDate)} />
              <KeyValueRow keyName={t('maxAttendees')} value={capacity} />
              <KeyValueRow
                keyName={t('accessibility')}
                value={t(
                  `enum.accessibilityTypeEnum.${lowerFirst(
                    AccessibilityTypeEnum[accessibilityType]
                  )}`
                )}
              />
              <KeyValueRow keyName={t('description')} value={description} />
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={6} xl={4}>
          <Card>
            <CardContent>
              <Title>
                {t('location')}
                <IconButton onClick={() => prevStep(1)}>
                  <EditOutlined />
                </IconButton>
              </Title>

              {location && (
                <>
                  {location?.city && <Chip variant='outlined' label={location.city} />}
                  {location?.state && <Chip variant='outlined' label={location.state} />}

                  <MapWrapper>
                    <Map
                      readonly
                      value={location}
                      key={`${location?.latitude}${location?.longitude}`}
                    />
                  </MapWrapper>
                </>
              )}

              {externalLink && (
                <LinkPreview
                  url={externalLink}
                  fallback={
                    <Button href={externalLink} endIcon={<OpenInNew />} variant='outlined'>
                      {externalLink}
                    </Button>
                  }
                />
              )}
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Box marginY='40px' display='flex' justifyContent='center' gridGap='20px'>
        <Button
          onClick={() => prevStep()}
          color='secondary'
          variant='text'
          startIcon={<KeyboardArrowLeft />}
        >
          {t('back')}
        </Button>

        <Button type='submit' size='large' onClick={() => trigger()} loading={submitting}>
          {isUpdateEvent ? t('save') : t('create')}
        </Button>
      </Box>
    </Wrapper>
  )
}

export default ReviewStep
