import moment from 'moment'
import { keys, pick } from 'lodash'
import { Translate } from 'next-translate'

import { IApiError } from '@api/types'
import { SubmitFormatter } from '@elements/HookForm/types'
import { AuthProviderFlags, ICurrentUser } from 'domainTypes'

export const IS_BROWSER = typeof window !== undefined

export const hasAuthProvider = ({ authProvider }: ICurrentUser, flag: AuthProviderFlags) => {
  return (authProvider & flag) === flag
}

export const isStringNumber = (value: any) => {
  return isNaN(Number(value)) === false
}

export const enumToKeyValueArray = (_enum: any) => {
  return Object.keys(_enum)
    .filter(x => !isStringNumber(x))
    .map(key => ({ key, value: _enum[key] }))
}

export const onlyDirtyValues: SubmitFormatter<any> = (values, { formState }) => {
  const dirtyKeys = keys(formState.dirtyFields)
  return pick(values, dirtyKeys)
}

export const toLocalTime = (date: string | Date, format?: string) => {
  const utc = moment.utc(date).toDate()
  return moment(utc)
    .local()
    .format(format || 'DD MMMM yyyy, HH:mm')
}

export const getErrorMessage = (error: IApiError, t: Translate) => {
  const detail = error.data.errorDetails?.[0]
  if (detail) {
    return t(`validator.${detail.code}`, detail.customState)
  }

  const translated = t(`validator.${error.data.errorMessage}`)
  const translationExist = !translated.includes('validator.')

  return translationExist ? translated : error.data.errorMessage
}

export const trimToMaxChars = (link: string, maxChars = 20) => {
  if (link.length > maxChars) return link.slice(0, maxChars) + '...'
  return link
}
