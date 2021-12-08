/**
 * Copyright (c) Ryan Gasparini
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import createDate from './createDate'
import getDaysInMonth from './getDaysInMonth'
import isWeekend from './isWeekend'
import dictionary from './dictionary'

export interface CalendarOptions {
  abbreviate: number
  firstDayOfWeek: number
  languageCode: string
  monthIndex: number
  nextMonth: string
  previousMonth: string
  showToday: boolean
  today: Date
  year: number
}

export interface CalendarDay {
  className: string
  id: string
  day: number
  date: Date
  monthIndex: number
  year: number
}

export type CalendarWeek = CalendarDay[]

export interface CalendarDayName {
  abbr?: string
  name: string
}

export class JsonCalendar {
  dayNames: CalendarDayName[]

  monthNames: string[]

  options: CalendarOptions

  today: Date

  weeks: CalendarWeek[]

  constructor (userParams: Partial<CalendarOptions> = {}) {
    const { today = new Date() } = userParams

    this.options = {
      abbreviate: 2,
      firstDayOfWeek: 0,
      languageCode: 'en',
      nextMonth: ' ',
      previousMonth: ' ',
      showToday: true,
      today,
      monthIndex: today.getMonth(),
      year: today.getFullYear(),
      ...userParams
    }

    // assign the correct month and day names for the set language code
    if (!['en', 'fr', 'es'].includes(this.options.languageCode)) {
      this.options.languageCode = 'en'
    }

    const language = dictionary[this.options.languageCode]

    this.monthNames = language.monthNames

    this.today = createDate(
      today.getFullYear(),
      today.getMonth(),
      today.getDate()
    )

    this.weeks = [] as CalendarWeek[]

    // Start storing the JSON data into an object.
    this.dayNames = [] as CalendarDayName[]

    // Abbreviate the day names when configured to do so.
    for (
      let index = 0, len = language.dayNames.length;
      index < len;
      index += 1
    ) {
      const dayName = language.dayNames[index]

      if (this.options.abbreviate > 1) {
        const dayAbbr = dayName.substr(0, this.options.abbreviate)
        this.dayNames[index] = { name: dayName, abbr: dayAbbr }
      } else {
        this.dayNames[index] = { name: dayName }
      }
    }

    this.buildWeeksArray()
  }

  private buildWeeksArray (): void {
    let classNames: string[]
    let i = 1
    let week: CalendarWeek
    const { options } = this

    const firstDate = createDate(options.year, options.monthIndex, 1)
    const monthDays = getDaysInMonth(options.year, options.monthIndex)
    const firstDateIndex = firstDate.getDay()

    // Loop through week indexes (0..6)
    for (let w = 0; w < 6; w += 1) {
      let date: Date
      week = []
      const { firstDayOfWeek } = this.options

      // Loop through the day index (0..6) for each week
      for (let d: number = firstDayOfWeek; d < firstDayOfWeek + 7; d += 1) {
        classNames = []

        if (w === 0 && d < firstDateIndex) {
          // Day of Previous Month
          date = createDate(
            firstDate.getFullYear(),
            firstDate.getMonth(),
            1 - (firstDateIndex - d)
          )
        } else if (i > monthDays) {
          // Day of Next Month
          date = createDate(firstDate.getFullYear(), firstDate.getMonth(), i)
          i += 1
        } else {
          // Day of Current Month
          classNames.push('month-day')
          date = createDate(firstDate.getFullYear(), firstDate.getMonth(), i)

          i += 1

          if (
            options.showToday &&
            date.toDateString() === this.today.toDateString()
          ) {
            classNames.push('today')
          }
        }

        if (isWeekend(date)) {
          classNames.push('weekend-day')
        }

        const day: CalendarDay = {
          className: classNames.join(' '),
          id: `day${date.getTime()}`,
          day: date.getDate(),
          date: date,
          monthIndex: date.getMonth(),
          year: date.getFullYear()
        }

        week.push(day)
      }

      this.weeks.push(week)
    }
  }

  changeMonth (year: number, monthIndex: number): void {
    this.options.year = year
    this.options.monthIndex = monthIndex
    this.buildWeeksArray()
  }

  getDayAbbr (index: number): string {
    const dayName = this.dayNames[index]
    return dayName?.abbr ?? ''
  }

  getDayName (index: number): string {
    return this.dayNames[index].name
  }

  getMonthName (index: number): string {
    return this.monthNames[index]
  }
}
