import * as React from 'react'
import TextField from '@mui/material/TextField'
import DateRangePicker, { DateRange } from '@mui/lab/DateRangePicker'
import AdapterDateFns from '@mui/lab/AdapterDateFns'
import LocalizationProvider from '@mui/lab/LocalizationProvider'
import Box from '@mui/material/Box'
import { GlobalStateContext } from './GlobalState'

export default function DatePicker() {
  const [value, setValue] = React.useState<DateRange<Date>>([null, null])

  const { setDateFrom, setDateTo } = React.useContext(GlobalStateContext)

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <DateRangePicker
        calendars={1}
        value={value}
        onChange={(newValue) => {
          console.log(newValue)
          setValue(newValue)
          if (newValue[0] && newValue[1]) {
            setDateFrom(newValue[0])
            setDateTo(newValue[1])
          }
        }}
        renderInput={(startProps, endProps) => (
          <React.Fragment>
            <TextField {...startProps} />
            <Box sx={{ mx: 2 }}> to </Box>
            <TextField {...endProps} />
          </React.Fragment>
        )}
      />
    </LocalizationProvider>
  )
}
