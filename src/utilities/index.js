export const twoDigit = number => {
  const stringified = String(number)

  return stringified.length < 2 ? '0'.repeat(2 - stringified.length).concat(stringified) : stringified
}

export const calculateArrival = (day, time) => {
  if (!(day instanceof Date) || !time) {
    return ''
  }

  day.setMinutes(time.minutes())
  day.setHours(time.hours())

  return day.toISOString()
}