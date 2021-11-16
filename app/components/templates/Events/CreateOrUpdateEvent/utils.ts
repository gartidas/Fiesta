import { isNumber } from 'lodash'
import { Validator } from '@elements/HookForm/types'
import { ILocationDto } from 'utils/googleUtils'
import { ICreateEventFormValues } from './CreateOrUpdateEventTemplate'
import { eventInfoFormFields } from './FormSteps/EventInfoStep/EventInfoStep'

export const locationValidator: Validator<ICreateEventFormValues, ILocationDto> = (value, t) => {
  return isNumber(value?.latitude) && isNumber(value?.longitude)
    ? undefined
    : t('validator.locationMustBeSelected')
}

export const endDateValidator: Validator<ICreateEventFormValues, Date> = (
  value,
  t,
  { getValues }
) => {
  const startDate = getValues()['startDate']
  if (!startDate) return

  return startDate > value ? t('validator.mustBeAfterStartDate') : undefined
}

export const getStep = (value: any) => {
  const step = parseInt(value)
  return isNaN(step) ? 0 : step
}

export const stepTitles = ['provideEventInfo', 'pickLocation', 'review']

export const stepIndexes = {
  eventInfoStep: 0,
  locationStep: 1,
  reviewStep: 2
}

export const redirectToStepByErrorFieldName = (
  errorFields: string[],
  redirect: (index: number) => void
) => {
  if (errorFields.some(x => eventInfoFormFields.includes(x))) redirect(stepIndexes.eventInfoStep)
  else if (errorFields.some(x => x === 'location' || x === 'externalLink'))
    redirect(stepIndexes.locationStep)
}
