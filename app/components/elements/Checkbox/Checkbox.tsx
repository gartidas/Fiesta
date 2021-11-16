import {
  CheckboxProps,
  FormControl,
  FormControlLabel,
  Checkbox as MuiCheckbox,
  FormHelperText
} from '@material-ui/core'

export interface ICheckboxProps extends Omit<CheckboxProps, 'onChange'> {
  label?: string
  error?: string
  checked: boolean
  onChange: (value: boolean) => void
}

const Checkbox = ({ error, label, checked, onChange, ...rest }: ICheckboxProps) => {
  return (
    <FormControl error={!!error}>
      <FormControlLabel
        label={label}
        control={
          <MuiCheckbox checked={checked} onChange={e => onChange(e.target.checked)} {...rest} />
        }
      />

      {error && <FormHelperText style={{ marginTop: '-7px' }}>{error}</FormHelperText>}
    </FormControl>
  )
}

export default Checkbox
