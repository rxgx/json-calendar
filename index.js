"use strict";

var DAYNAMES = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday"
];

var MONTHNAMES = [
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
];

class Calendar {
  constructor(options) {
    options = options || {};

    this.monthNames = MONTHNAMES;
    this.today = new Date();
    this.weeks = [];
    this.data = {};

    var data = this.data;

    var defaults = {
      year: this.today.getFullYear(),
      monthIndex: this.today.getMonth(),
      abbreviate: 2,
      firstDayOfWeek: 0,
      showToday: true,
      previousMonth: " ",
      nextMonth: " ",
      otherMonthClass: "month-other"
    };

    var classNames, date, day, firstDate, lastDate, monthDays, week;

    for (var prop in defaults) {
      if (
        defaults.hasOwnProperty(prop) &&
        !options.hasOwnProperty(prop) &&
        defaults[prop]
      ) {
        options[prop] = defaults[prop];
      }
    }

    // options["month_name_text"] ||= Date::MONTHNAMES[options["month"]]

    firstDate = new Date(options.year, options.monthIndex, 1);
    lastDate = new Date(options.year, options.monthIndex + 1, 0);

    monthDays = lastDate.getDate();

    // firstDayOfWeek = options.firstDayOfWeek;
    // lastDayOfWeek = this.getLastDayOfWeek(options.firstDayOfWeek);

    // Shift the day names array if the first day of the week isn't Sunday.
    // if (options.firstDayOfWeek < 0) {
    //    for (i = 0; i < firstDayOfWeek; i++) {
    //        DAYNAMES.push(DAYNAMES.shift());
    //    }
    // }

    // Start storing the JSON data into an object.
    data.dayNames = [];

    // Abbreviate the day names when configured to do so.
    for (var i = 0, len = DAYNAMES.length; i < len; i++) {
      var dayName = DAYNAMES[i];
      var dayAbbr = dayName.substr(0, options.abbreviate);

      if (dayAbbr !== dayName) {
        data.dayNames[i] = { name: dayName, abbr: dayAbbr };
      } else {
        data.dayNames[i] = { name: dayName };
      }
    }

    i = 1;

    // Loop through week indexes (0..6)
    for (var w = 0; w < 6; w++) {
      week = [];

      // Loop through the day index (0..6) for each week.
      for (var d = 0; d < 7; d++) {
        classNames = [];
        day = {};

        if (w === 0 && d < firstDate.getDay()) {
          // Day of Previous Month
          date = new Date(
            firstDate.getFullYear(),
            firstDate.getMonth(),
            -(6 - d) + 1
          );
        } else if (i > monthDays) {
          // Day of Next Month
          date = new Date(firstDate.getFullYear(), firstDate.getMonth(), i);
          i += 1;
        } else {
          // Day of Current Month
          classNames.push("month-day");
          date = new Date(firstDate.getFullYear(), firstDate.getMonth(), i);

          i += 1;

          if (
            options.showToday &&
            date.toDateString() === this.today.toDateString()
          ) {
            classNames.push("today");
          }
        }

        if (date && date.getDate) {
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
        } else {
          day = { date: null, day: null };
        }

        week.push(day);
      }

      this.weeks.push(week);
    }

    data.nextMonth = this.getRelativeMonth(firstDate, 1);
    data.previousMonth = this.getRelativeMonth(firstDate, -1);
    data.currentMonth = this.getMonthName(firstDate.getMonth());
  }

  addDaysToDate(date, offset) {
    return new Date(date.getTime() + offset * 24 * 60 * 60 * 1000);
  }

  getDaysInMonth(yr, mo) {
    yr = yr || this.today.getFullYear();
    mo = mo || this.today.getMonth();
    return new Date(yr, mo + 1, 0).getDate();
  }

  getLastDayOfWeek(day) {
    return day > 0 ? day : 6;
  }

  getDayName(index) {
    return DAYNAMES[index];
  }

  getMonthName(index) {
    return MONTHNAMES[index];
  }

  getRelativeMonth(date, dif) {
    var curIndex = date.getMonth();
    var newIndex = curIndex + dif;

    if (newIndex < 0) newIndex = 11;
    else if (newIndex > 11) newIndex = 1;
    return MONTHNAMES[newIndex];
  }

  isWeekend(date) {
    var day = date.getDay();
    return day === 0 || day === 6;
  }
}

module.exports = Calendar;
