import { FormHelperText, InputLabel, SelectProps, Select as MuiSelect } from '@material-ui/core'
import { StyledFormControl } from './Select.styled'

export interface ISelectProps extends Omit<SelectProps, 'onChange' | 'error'> {
  onChange: (value: any) => void
  label?: string
  error?: string
}

const Select = ({
  children,
  label,
  fullWidth,
  name,
  error,
  variant,
  onChange,
  ...rest
}: ISelectProps) => {
  const labelId = `${name}-labelId`

  return (
    <StyledFormControl fullWidth error={!!error} variant={variant}>
      <InputLabel id={labelId}>{label}</InputLabel>

      <MuiSelect
        {...rest}
        name={name}
        onChange={e => onChange(e.target.value as any)}
        label={label}
        labelId={labelId}
      >
        {children}
      </MuiSelect>

      {error && <FormHelperText>{error}</FormHelperText>}
    </StyledFormControl>
  )
}

export default Select
