import { forwardRef } from 'react'
import { DateTimePickerProps as MuiDateTimePickerProps } from '@material-ui/pickers'
import useTranslation from 'next-translate/useTranslation'
import moment from 'moment'
import { PickerGlobalStyle, StyledPicker } from './DateTimePicker.styled'

export type DateTimePickerProps = MuiDateTimePickerProps & {
  name?: string
  label?: string
  value: string
  error?: string
  className?: string
  onChange: (value?: Date) => void
}

const DateTimePicker = forwardRef(
  ({ name, label, value, error, onChange, ...rest }: DateTimePickerProps, ref) => {
    const { t } = useTranslation('common')

    return (
      <>
        <PickerGlobalStyle />

        <StyledPicker
          {...rest}
          ref={ref as any}
          name={name}
          label={label}
          //Value needs to be null to show nothing
          value={value ? moment.utc(value).local().toDate() : null}
          onChange={x => onChange(x?.toDate())}
          error={!!error}
          helperText={error}
          clearLabel={t('clear')}
          cancelLabel={t('cancel')}
        />
      </>
    )
  }
)

export default DateTimePicker
