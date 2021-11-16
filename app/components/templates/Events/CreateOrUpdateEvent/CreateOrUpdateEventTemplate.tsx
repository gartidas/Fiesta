import { useEffect, useState } from 'react'
import { max } from 'lodash'
import { useRouter } from 'next/router'
import useTranslation from 'next-translate/useTranslation'
import { CircularProgress, Step, StepButton, Stepper } from '@material-ui/core'

import { IApiError } from '@api/types'
import Hidden from '@elements/Hidden'
import Form from '@elements/HookForm/Form'
import { AccessibilityTypeEnum } from 'domainTypes'
import { successToast } from 'services/toastService'
import { ILocationDto } from 'utils/googleUtils'
import FetchError from '@elements/FetchError/FetchError'
import ReviewStep from './FormSteps/ReviewStep/ReviewStep'
import LocationStep from './FormSteps/LocationStep/LocationStep'
import EventInfoStep from './FormSteps/EventInfoStep/EventInfoStep'
import { useSubmitForm } from '@elements/HookForm/hooks/useSubmitForm'
import { getStep, redirectToStepByErrorFieldName, stepIndexes, stepTitles } from './utils'

import { Wrapper } from './CreateOrUpdateEventTemplate.styled'

interface IProps {
  event?: ICreateEventFormValues & { id: string }
  eventFetching?: boolean
  fetchError?: IApiError | null
}

export interface ICreateEventFormValues {
  name: string
  startDate: Date
  endDate: Date
  accessibilityType: number
  location?: ILocationDto
  capacity: number
  description?: string
  externalLink?: string
  isOnlineEvent: boolean
}

const defaultValues: Partial<ICreateEventFormValues> = {
  name: '',
  isOnlineEvent: false,
  accessibilityType: AccessibilityTypeEnum.Public,
  capacity: 2
}

const CreateOrUpdateEvent = ({ event, eventFetching, fetchError }: IProps) => {
  const router = useRouter()
  const { t } = useTranslation('common')
  const [step, setStep] = useState(getStep(router.query.step))
  const [completedSteps, setCompletedSteps] = useState<number[]>([])

  useEffect(() => {
    const currStep = getStep(router.query.step)
    if (event || completedSteps.some(x => x === currStep - 1)) setStep(currStep)
    else setStep(0)
  }, [router.query, completedSteps, event])

  const changeStep = (index: number) =>
    router.push({ pathname: router.asPath.split('?')[0], query: { step: index } }, undefined, {
      shallow: true
    })

  const { onSubmit, submitting, success } = useSubmitForm<ICreateEventFormValues, { id: string }>({
    url: event ? `/events/${event.id}` : '/events',
    method: event ? 'patch' : 'post',
    canSubmit: step === stepIndexes.reviewStep,
    successCallback: ({ id }) => {
      successToast(t('success'))
      router.replace(`/events/${id}`)
    },
    errorCallback: ({ errorDetails }) => {
      redirectToStepByErrorFieldName(
        errorDetails.map(x => x.propertyName),
        changeStep
      )
    }
  })

  const nextStep = () => {
    setCompletedSteps(prev => [...prev, step])
    changeStep(step + 1)
  }

  const prevStep = (index?: number) => {
    changeStep(index ?? step - 1)
  }

  const isStepCompletedOrNext = (index: number) =>
    event || completedSteps.includes(index) || (max(completedSteps) ?? -1) + 1 === index

  if (eventFetching) return <CircularProgress />
  if (fetchError) return <FetchError error={fetchError} />

  return (
    <Wrapper>
      <Stepper alternativeLabel activeStep={step}>
        {stepTitles.map((name, index) => (
          <Step key={name} completed={completedSteps.includes(index)}>
            <StepButton disabled={!isStepCompletedOrNext(index)} onClick={() => changeStep(index)}>
              {t(name)}
            </StepButton>
          </Step>
        ))}
      </Stepper>

      <Form defaultValues={event || defaultValues} onSubmit={onSubmit}>
        <Hidden hidden={step !== stepIndexes.eventInfoStep}>
          <EventInfoStep nextStep={nextStep} />
        </Hidden>

        <Hidden hidden={step !== stepIndexes.locationStep}>
          <LocationStep nextStep={nextStep} prevStep={prevStep} />
        </Hidden>

        <Hidden hidden={step !== stepIndexes.reviewStep}>
          <ReviewStep
            prevStep={prevStep}
            submitting={submitting || success} //Note: show loading even after submitted when redirect takes bit longer
            isUpdateEvent={!!event}
          />
        </Hidden>
      </Form>
    </Wrapper>
  )
}

export default CreateOrUpdateEvent
