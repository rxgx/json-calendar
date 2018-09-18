"use strict";

var DAYNAMES = {
  english: [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ],
  french: [
    "Dimanche",
    "Lundi",
    "Mardi",
    "Mercredi",
    "Jeudi",
    "Vendredi",
    "Samedi"
  ],
  spanish: [
    "Domingo",
    "Lunes",
    "Martes",
    "Miércoles",
    "Jueves",
    "Viernes",
    "Sábado"
  ]
};

var MONTHNAMES = {
  english: [
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
  ],
  french: [
    "Janvier",
    "Février",
    "Mars",
    "Avril",
    "Mai",
    "Juin",
    "Juillet",
    "Août",
    "Septembre",
    "Octobre",
    "Novembre",
    "Décembre"
  ],
  spanish: [
    "Enero",
    "Febrero",
    "Marzo",
    "Abril",
    "Mayo",
    "Junio",
    "Julio",
    "Agosto",
    "Septiembre",
    "Octubre",
    "Noviembre",
    "Diciembre"
  ]
};

const LANGUAGES = {
  english: "english",
  french: "french",
  spanish: "spanish"
};

class Calendar {
  constructor(props = {}, callback = undefined) {
    // Use the provided value for today or use current date
    const now = props.today instanceof Date ? props.today : new Date();

    // filter language
    props.language = LANGUAGES[props.language] || LANGUAGES.english;

    const defaultState = {
      year: now.getFullYear(),
      monthIndex: now.getMonth(),
      abbreviate: 0,
      firstDayOfWeek: 0,
      showToday: true,
      previousMonth: " ",
      nextMonth: " "
    };

    props.today = this.createDate(
      now.getFullYear(),
      now.getMonth(),
      now.getDate()
    );

    var state = Object.assign({}, defaultState, props);

    var dayNames = DAYNAMES[props.language];

    this.dayNames = [];
    this.monthNames = MONTHNAMES[props.language];

    // Start storing the JSON data into an object.

    // Abbreviate the day names when configured to do so.
    for (var index = 0, len = dayNames.length; index < len; index++) {
      var dayName = dayNames[index];

      if (state.abbreviate) {
        dayName = dayName.substr(0, state.abbreviate);
      }

      this.dayNames[index] = dayName;
    }

    if (callback) this.callback = callback;

    this.state = state;
    this.createWeeksForMonth();
  }

  addDaysToDate(date, offset) {
    return new Date(date.getTime() + offset * 24 * 60 * 60 * 1000);
  }

  createDate(yr, mo, day) {
    return new Date(yr, mo, day, 0, 0);
  }

  createWeeksForMonth(monthIndex, year = undefined) {
    monthIndex =
      typeof monthIndex === "number" ? monthIndex : this.state.monthIndex;

    year = year || this.state.year;

    var nextState = Object.assign({}, this.state, { monthIndex, year });

    var classNames;
    var date;
    var day;
    var i = 1;
    var week;

    // Start storing the JSON data into an object.
    var weeks = [];

    var firstDate = this.createDate(year, monthIndex, 1);
    var monthDays = this.getDaysInMonth(year, monthIndex);
    var firstDateIndex = firstDate.getDay();

    // Loop through week indexes (0..6)
    for (var w = 0; w < 6; w++) {
      week = [];
      var { firstDayOfWeek } = this.state;

      // Loop through the day index (0..6) for each week.
      for (var d = firstDayOfWeek; d < firstDayOfWeek + 7; d++) {
        classNames = [];
        day = {};

        if (w === 0 && d < firstDateIndex) {
          // Day of Previous Month
          date = this.createDate(
            firstDate.getFullYear(),
            firstDate.getMonth(),
            1 - (firstDateIndex - d)
          );
        } else if (i > monthDays) {
          // Day of Next Month
          date = this.createDate(
            firstDate.getFullYear(),
            firstDate.getMonth(),
            i
          );
          i += 1;
        } else {
          // Day of Current Month
          classNames.push("month-day");
          date = this.createDate(
            firstDate.getFullYear(),
            firstDate.getMonth(),
            i
          );

          i += 1;

          if (
            nextState.showToday &&
            date.toDateString() === nextState.today.toDateString()
          ) {
            classNames.push("today");
          }
        }

        if (this.isWeekend(date)) {
          classNames.push("weekend-day");
        }

        day.className = classNames.join(" ");
        day.id = "day" + date.getTime();
        day.day = date.getDate();
        day.date = date;
        day.monthIndex = date.getMonth();
        day.year = date.getFullYear();

        date = undefined;

        week.push(day);
      }

      weeks.push(week);
    }

    nextState.weeks = weeks;
    this.state = nextState;
    if (this.callback) this.callback(nextState);
  }

  getDaysInMonth(yr, mo) {
    yr = yr || this.state.today.getFullYear();
    mo = mo || this.state.today.getMonth();
    return new Date(yr, mo + 1, 0).getDate();
  }

  getDayName(index) {
    return this.dayNames[index];
  }

  getMonthName(index) {
    return this.monthNames[index];
  }

  isWeekend(date) {
    var day = date.getDay();
    return day === 0 || day === 6;
  }
}

module.exports = Calendar;
