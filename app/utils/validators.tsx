import { Translate } from 'next-translate'
import { UseFormMethods } from 'react-hook-form'
import { Validator } from '@elements/HookForm/types'

const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
const urlRegex =
  /[(http(s)?):\/\/(www\.)?a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/

export const combineValidators =
  (validators: Validator[]) =>
  (value: any, t: Translate, form: UseFormMethods<Record<string, any>>) => {
    for (let i = 0; i < validators.length; i++) {
      const validator = validators[i]
      const result = validator?.(value, t, form)
      if (result) return result
    }
  }

export const emailValidator: Validator = (email: string, t) => {
  if (!email) return undefined
  return emailRegex.test(email) ? undefined : t('validator.invalidEmail')
}

export const requiredValidator: Validator = (value, t) =>
  value ? undefined : t('validator.required')

export const minLengthValidator =
  (minLength: number): Validator =>
  (value: string, t) => {
    if (value) return value.length < minLength ? t('validator.minLength', { minLength }) : undefined
  }

export const maxLengthValidator =
  (maxLength: number): Validator =>
  (value: string, t) => {
    if (value) return value.length > maxLength ? t('validator.maxLength', { maxLength }) : undefined
  }

export const createRepeatPasswordValidator =
  (otherPasswordFieldName: string): Validator =>
  (repeatPassword: string, t, { getValues }) => {
    const otherPassword = getValues()[otherPasswordFieldName]
    return repeatPassword !== otherPassword ? t('validator.passwordDoesNotMatch') : undefined
  }

export const minNumericValue =
  (min: number): Validator =>
  (value: number, t) => {
    if (value) return value < min ? t('validator.min', { min }) : undefined
  }

export const maxNumericValue =
  (max: number): Validator =>
  (value: number, t) => {
    if (value) return value > max ? t('validator.min', { max }) : undefined
  }

export const urlValidator: Validator = (url: string, t) => {
  if (url) return urlRegex.test(url) ? undefined : t('validator.invalid')
}
