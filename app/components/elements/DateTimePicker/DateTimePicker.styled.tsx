import { DateTimePicker } from '@material-ui/pickers'
import styled, { createGlobalStyle } from 'styled-components'

export const StyledPicker = styled(DateTimePicker)`
  .MuiFormLabel-root {
    color: ${({ theme }) => theme.palette.themeText.themeGray};
  }

  .MuiInputBase-input {
    color: ${({ theme }) => theme.palette.themeText.themeBlack};
  }

  .MuiFormLabel-root {
    font-weight: 300;
  }
`

//Note: order of these rules is important
export const PickerGlobalStyle = createGlobalStyle`
.MuiPickersBasePicker-pickerView{
  .MuiPickersDay-day,.MuiPickersCalendarHeader-switchHeader,.MuiPickersYear-root,.MuiPickersClockNumber-clockNumber , svg {
    color:${({ theme }) => theme.palette.themeText.themeBlack};
  }
  .MuiPickersDay-current, .MuiPickersYear-yearSelected{
    color:${({ theme }) => theme.palette.primary.main};
  }
  .MuiPickersDay-daySelected,.MuiPickersClockNumber-clockNumberSelected {
    color:${({ theme }) => theme.palette.themeText.white};
  }
  .MuiPickersDay-dayDisabled, .MuiPickersCalendarHeader-dayLabel, .MuiPickersYear-yearDisabled {
    color:${({ theme }) => theme.palette.grey[500]};
  }
}
`
