import * as React from 'react'
import TextField from '@mui/material/TextField'
import AdapterDateFns from '@mui/lab/AdapterDateFns'
import LocalizationProvider from '@mui/lab/LocalizationProvider'
import Box from '@mui/material/Box'
import { GlobalStateContext } from './GlobalState'
import DatePicker from '@mui/lab/DatePicker';

export default function DatePickerRange () {
  const [valueFromDate, setValueFromDate] = React.useState(null);
  const [valueToDate, setValueToDate] = React.useState(null);

  const { setDateFrom, setDateTo } = React.useContext(GlobalStateContext)

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <DatePicker
        label="From date"
        value={valueFromDate}
        onChange={(newValue: any) => {
          if (newValue) {
            setDateFrom(newValue)
          }
          setValueFromDate(newValue);
        }}
        onClose={() => {
          setValueFromDate(valueFromDate)
        }}
        renderInput={(params: any) => <TextField {...params} />}
      />
      <DatePicker
        label="To date"
        value={valueToDate}
        onChange={(newValue: any) => {
          if (newValue) {
            setDateTo(newValue)
          }
          setValueToDate(newValue);
        }}
        onClose={() => {
          setValueToDate(valueToDate)
        }}
        renderInput={(params: any) => <TextField {...params} />}
      />

    </LocalizationProvider>
  )
}
