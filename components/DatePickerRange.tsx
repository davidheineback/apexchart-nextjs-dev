import * as React from 'react'
import TextField from '@mui/material/TextField'
import AdapterDateFns from '@mui/lab/AdapterDateFns'
import LocalizationProvider from '@mui/lab/LocalizationProvider'
import svLocale from 'date-fns/locale/sv'
import { GlobalStateContext } from './GlobalState'
import DatePicker from '@mui/lab/DatePicker'
import moment from 'moment'

export default function DatePickerRange() {
  const [valueFromDate, setValueFromDate] = React.useState(null)
  const [valueToDate, setValueToDate] = React.useState(null)

  const { dateFrom, dateTo, setDateFrom, setDateTo } =
    React.useContext(GlobalStateContext)

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns} locale={svLocale}>
      <DatePicker
        label="From date"
        value={valueFromDate || dateFrom}
        onChange={(newValue: any) => {
          if (newValue) {
            setDateFrom(newValue)
          }
          setValueFromDate(newValue)
          if (moment(newValue).isAfter(dateTo, 'day')) {
            setDateTo(newValue)
            setValueToDate(newValue)
          }
        }}
        onClose={() => {
          setValueFromDate(valueFromDate)
          valueFromDate && setDateFrom(valueFromDate)
        }}
        renderInput={(params: any) => <TextField {...params} />}
      />
      <DatePicker
        label="To date"
        value={valueToDate || dateTo}
        onChange={(newValue: any) => {
          if (newValue) {
            setDateTo(newValue)
          }
          setValueToDate(newValue)
          if (moment(newValue).isBefore(dateFrom, 'day')) {
            setDateFrom(newValue)
            setValueFromDate(newValue)
          }
        }}
        onClose={() => {
          setValueToDate(valueToDate)
          valueToDate && setDateTo(valueToDate)
        }}
        renderInput={(params: any) => <TextField {...params} />}
      />
    </LocalizationProvider>
  )
}
