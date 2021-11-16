import { ChangeEvent, forwardRef } from 'react'
import { TextFieldProps } from '@material-ui/core'
import { StyledTextBox } from './TextBox.styled'

export type TextBoxProps = Omit<TextFieldProps, 'onChange' | 'error'> & {
  name?: string
  label?: string
  value?: string
  error?: string
  className?: string
  max?: number
  min?: number
  onChange: (value: string) => void
  onBlur?: () => void
}

const TextBox = forwardRef(
  ({ label, value, error, type, max, min, onChange, ...rest }: TextBoxProps, forwardRef) => {
    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { value } = e.target
      if (type === 'number') {
        if (min !== undefined && Number(value) < min) return onChange(min.toString())
        if (max !== undefined && Number(value) > max) return onChange(max.toString())
      }

      onChange(value)
    }

    return (
      <StyledTextBox
        {...rest}
        ref={forwardRef as any}
        type={type}
        value={value || ''}
        label={label}
        error={!!error}
        helperText={error}
        onChange={handleChange}
      />
    )
  }
)

export default TextBox
