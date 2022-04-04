import React, { useState, useEffect } from 'react'
import moment from 'moment'

const initalState: StateInterface = {
  dateFrom: null,
  dateTo: null,
  setDateFrom: (value: Date) => undefined,
  setDateTo: (value: Date) => undefined,
}

export const GlobalStateContext = React.createContext(initalState)

interface StateInterface {
  dateFrom: Date | null
  dateTo: Date | null
  setDateFrom: (value: Date) => void
  setDateTo: (value: Date) => void
}

export default function GlobalState ({
  children,
}: {
  children: React.ReactNode
}) {
  const [dateFrom, setDateFrom] = useState(
    new Date(moment().format('YYYY/MM/DD'))
  )
  const [dateTo, setDateTo] = useState(new Date(moment().format('YYYY/MM/DD')))

  const state: StateInterface = {
    dateFrom,
    setDateFrom,
    dateTo,
    setDateTo,
  }

  return (
    <GlobalStateContext.Provider value={state}>
      {children}
    </GlobalStateContext.Provider>
  )
}
