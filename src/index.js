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
  constructor(params = {}) {
    const now = params.today || new Date();

    // filter language
    params.language = LANGUAGES[params.language] || LANGUAGES.english;

    const defaults = {
      year: now.getFullYear(),
      monthIndex: now.getMonth(),
      abbreviate: 2,
      firstDayOfWeek: 0,
      showToday: true,
      previousMonth: " ",
      nextMonth: " "
    };

    this.options = Object.assign({}, defaults, params);

    this.dayNames = DAYNAMES[this.options.language];
    this.monthNames = MONTHNAMES[this.options.language];

    this.today = this.createDate(
      now.getFullYear(),
      now.getMonth(),
      now.getDate()
    );

    var data = {};

    // Start storing the JSON data into an object.
    data.dayNames = [];

    // Abbreviate the day names when configured to do so.
    for (var index = 0, len = this.dayNames.length; index < len; index++) {
      var dayAbbr;
      var dayName = this.dayNames[index];

      if (this.options.abbreviate) {
        dayAbbr = dayName.substr(0, this.options.abbreviate);
        data.dayNames[index] = { name: dayName, abbr: dayAbbr };
      } else {
        data.dayNames[index] = { name: dayName };
      }
    }

    this.buildWeeksArray();
    this.data = data;
  }

  addDaysToDate(date, offset) {
    return new Date(date.getTime() + offset * 24 * 60 * 60 * 1000);
  }

  buildWeeksArray() {
    var classNames;
    var date;
    var day;
    var i = 1;
    var week;
    var options = this.options;

    this.weeks = [];

    var firstDate = this.createDate(options.year, options.monthIndex, 1);
    var monthDays = this.getDaysInMonth(options.year, options.monthIndex);
    var firstDateIndex = firstDate.getDay();

    // Loop through week indexes (0..6)
    for (var w = 0; w < 6; w++) {
      week = [];
      var { firstDayOfWeek } = this.options;

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
            options.showToday &&
            date.toDateString() === this.today.toDateString()
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

      this.weeks.push(week);
    }
  }

  changeMonth(year, monthIndex) {
    this.options.year = year;
    this.options.monthIndex = monthIndex;
    this.buildWeeksArray();
  }

  createDate(yr, mo, day) {
    return new Date(yr, mo, day, 0, 0);
  }

  getDaysInMonth(yr, mo) {
    yr = yr || this.today.getFullYear();
    mo = mo || this.today.getMonth();
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
