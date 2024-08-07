# json-calendar

[![Publish](https://github.com/rxgx/json-calendar/actions/workflows/publish.yml/badge.svg)](https://github.com/rxgx/json-calendar/actions/workflows/publish.yml)
[![codecov](https://codecov.io/gh/rxgx/json-calendar/branch/main/graph/badge.svg?token=uETifPQbG3)](undefined)

A JSON data model for displaying dates and date ranges on a calendar interface.

## Installation

Install with NodeJS:

```sh
npm install json-calendar
```

Install for browsers, [Volta](https://volta.sh), or [Deno](https://deno.land):

```js
import { install } from 'esinstall'

await install(['json-calendar'], {
  /* options */
})
// Result: Creates `json-calendar.js` inside a `web_modules/` directory in your current directory.
```

### Usage

Works default out of the box:

```js
const { JsonCalendar } = require('json-calendar')
const calendar = new JsonCalendar()
calendar.weeks.map(week => {
  week.map(day => {
    const { className, id, day, date, monthIndex, year } = day
    // do something with the day's data
    return date.toLocaleString()
  })
})
```

Or set a custom selected date:

```js
// with custom today date
const calendar = new JsonCalendar({ today: new Date(1971, 0, 1) })
```

Or use a specific language:

```js
// with language for day and month names
// 'fr', 'es', 'id' and 'en' supported, will default to 'en' if empty or unrecognized
const calendarWithSpanishNames = new JsonCalendar({ languageCode: 'es' })
```

For example:

```js
calendarWithSpanishName.dayNames.map(item => console.log(item.name))
// Outputs:
//   'Domingo'
//   'Lunes'
//   'Martes'
//   'Miércoles'
//   'Jueves'
//   'Viernes'
//   'Sábado'
```

### Get an array of weeks in this month

```js
console.log('Weeks this month:', calendar.weeks.length)
// Output: Weeks this month: 5
```

You can use the returned array of arrays to render a full calendar for a given month. If, for example, the month is September of 2018:

```js
calendar.weeks.map(w => w.map(d => d.day))
```

Will output all the elements as the day number:

```json
[
  [26, 27, 28, 29, 30, 31, 1],
  [2, 3, 4, 5, 6, 7, 8],
  [9, 10, 11, 12, 13, 14, 15],
  [16, 17, 18, 19, 20, 21, 22],
  [23, 24, 25, 26, 27, 28, 29],
  [30, 1, 2, 3, 4, 5, 6]
]
```

### Get an array of month names

```js
calendar.monthNames
```

Will output an array of month names:

```json
[
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December"
]
```

### Change the displayed month

The following example code will display the days for September, 2020:

```js
// create the calendar
const { JsonCalendar } = require('json-calendar')
const calendar = new JsonCalendar()

// sometime later fire an event
function handleOnClick () {
  calendar.changeMonth(2020, 8)
}
```

The function `changeMonth` takes two number params: `year` and `monthIndex`
