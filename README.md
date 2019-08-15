# json-calendar

[![codecov](https://codecov.io/gh/rxgx/json-calendar/branch/master/graph/badge.svg)](https://codecov.io/gh/rxgx/json-calendar)
[![CircleCI](https://circleci.com/gh/rxgx/json-calendar.svg?style=svg)](https://circleci.com/gh/rxgx/json-calendar)

A (JSON) data model for displaying dates and date ranges on a calendar interface.

### Usage

```js
const Calendar = require("@rxgx/json-calendar");
const calendar = new Calendar();

// with custom today date
const calendar = new Calendar({ today: new Date(1971, 0, 1) });

// with language for days / months name
// 'fr', 'es' and 'en' supported, will default to 'en' if empty or unrecognized
const calendarWithSpanishNames = new Calendar({ languageCode: 'es' });
```

```js
console.log(calendarWithSpanishName.dayNames.map(item => item.name));
```

```js
[ 'Domingo',
  'Lunes',
  'Martes',
  'Miércoles',
  'Jueves',
  'Viernes',
  'Sábado'
]
```

### Get an array of weeks in this month

```js
console.log("Weeks this month:", calendar.weeks.length);
```

You can use the returned array of arrays to render a full calendar for a given month. If, for example, the month is September of 2018:

```js
calendar.weeks.map(w => w.map(d => d.day));
```

Will output all the elements as the day number:

```js
[
  [26, 27, 28, 29, 30, 31, 1],
  [2, 3, 4, 5, 6, 7, 8],
  [9, 10, 11, 12, 13, 14, 15],
  [16, 17, 18, 19, 20, 21, 22],
  [23, 24, 25, 26, 27, 28, 29],
  [30, 1, 2, 3, 4, 5, 6]
];
```

### Get an array of month names

```js
console.log("Month names", calendar.monthNames);
```
