/**
 * todays date as midnight local time
 * from https://github.com/trussworks/react-uswds/blob/main/src/components/forms/DatePicker/utils.tsx
 *
 * @returns {Date} todays date
 */
export const today = (): Date => {
  const newDate = new Date()
  const day = newDate.getDate()
  const month = newDate.getMonth()
  const year = newDate.getFullYear()
  return new Date(year, month, day)
}

/**
 * generates a date with leading zeros in MM/DD/YYYY format
 * note: all error dates will generate as the following day, like
 * 9/31/2024 will generate as 10/1/2024
 * 
 * @param date Date
 * @param staticDate string 
 * @returns string
 */
export const generateFormattedDate = (date: Date, staticDate?: string): string => {
    const formattedMonth = addLeadingZero((date.getMonth()+1).toString())
    const day = addLeadingZero(staticDate ? staticDate : date.getDate().toString())
    return `${formattedMonth}/${day}/${date.getFullYear()}`;
}

const addLeadingZero = (num: string) => num.length === 1 ? 
`0${num}` : num as String