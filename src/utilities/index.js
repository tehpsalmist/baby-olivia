import moment from 'moment'

export const twoDigit = number => {
  const stringified = String(number)

  return stringified.length < 2 ? '0'.repeat(2 - stringified.length).concat(stringified) : stringified
}

export const calculateArrival = (day, time) => {
  if (!(day instanceof Date) || !time) {
    return ''
  }

  const dayCopy = new Date(day)

  const offsetHours = (time.hours() - (dayCopy.getTimezoneOffset() / 60))

  dayCopy.setMinutes(time.minutes())
  dayCopy.setHours(offsetHours)

  return dayCopy.toISOString()
}

export const getFormattedDateAndTime = dateString => {
  const date = moment(dateString.slice(0, -6))
  const day = date.format('M/DD')
  const time = date.format('h:mm A')

  return [day, time]
}