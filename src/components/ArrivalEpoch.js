import React from 'react'
import DayPicker from 'react-day-picker'
import { TimePicker } from 'antd'
import moment from 'moment'

const today = new Date()

export const ArrivalEpoch = ({ arrivalDay, setArrivalDay, arrivalTime, setArrivalTime }) => {
  return <label className={`flex flex-col items-center text-xl`} htmlFor='arrival'>
    <p className='mb-3'>Baby's arrival epoch:</p>
    <TimePicker value={arrivalTime} format='h:mm A' use12Hours onChange={value => setArrivalTime(value)} />
    <DayPicker
      modifiers={{ highlighted: new Date(2019, 8, 18), selected: arrivalDay, disabled: { before: today } }}
      onDayClick={(day, { disabled }) => !disabled && setArrivalDay(day)}
    />
  </label>
}
