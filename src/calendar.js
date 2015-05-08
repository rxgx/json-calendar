const DAYNAMES = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday'
];

const MONTHNAMES = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December'
];

const NOW = new Date();

function Calendar(options) {
  options = options || {};

  var data = this.data = {};


  var defaults = {
    year            : NOW.getFullYear(),
    month           : NOW.getMonth(),
    abbreviate      : 2,
    firstDayOfWeek  : 0,
    showToday       : true,
    previousMonth   : ' ',
    nextMonth       : ' ',
    otherMonthClass : 'month-other'
  };

    var classNames,
        date,
        day,
        dayNames = DAYNAMES,
        firstDate,
        firstDayOfWeek,
        i,
        lastDate,
        lastDayOfWeek,
        monthDays,
        week;

    for (var name in defaults) {
        if (!options.hasOwnProperty(name) && defaults[name]) {
            options[name] = defaults[name];
        }
    }

    //options["month_name_text"] ||= Date::MONTHNAMES[options["month"]]

    firstDate = new Date(options.year, options.month, 1);
    lastDate = new Date(options.year, options.month + 1, 0);

    monthDays = this.getDaysInMonth(firstDate.getFullYear(), firstDate.getMonth());

    //firstDayOfWeek = options.firstDayOfWeek;
    //lastDayOfWeek = this.getLastDayOfWeek(options.firstDayOfWeek);

    // Shift the day names array if the first day of the week isn't Sunday.
    //if (options.firstDayOfWeek < 0) {
    //    for (i = 0; i < firstDayOfWeek; i++) {
    //        DAYNAMES.push(DAYNAMES.shift());
    //    }
    //}

    // Start storing the JSON data into an object.
    data.dayNames = [];

    // Abbreviate the day names when configured to do so.
    for (i in DAYNAMES) {
        var dayName = DAYNAMES[i];
        var dayAbbr = dayName.substr(0, options.abbreviate);

        if (dayAbbr !== dayName) {
            data.dayNames[i] = { name: dayName, abbr: dayAbbr };
        } else {
            data.dayNames[i] = { name: dayName };
        }
    }

    this.weeks = [];

    i = 1;

    // Loop through week indexes (0..6)
    for (var w = 0; w < 6; w++) {
        week = [];

        // Loop through the day index (0..6) for each week.
        for (var d = 0; d < 7; d++) {
            classNames = [];
            day = {};

            if (w === 0 && d < firstDate.getDay()) {
                date = this.addDaysToDate(firstDate, d - firstDate.getDay());
            } else if (i > lastDate.getDate()) {
                date = this.addDaysToDate(lastDate, (i - monthDays));
                i += 1;
                d = 7;
            } else {
                // Day of Current Month
                classNames.push('month-day');
                date = new Date(firstDate.getFullYear(), firstDate.getMonth(), i);

                i += 1;
                if (options.showToday && date.toDateString() === NOW.toDateString()) {
                    classNames.push('today');
                }
            }

            if (date && date.getDate) {
                if (this.isWeekend(date)) {
                    classNames.push('weekend-day');
                }

                day.className = classNames.join(" ");
                day.id = 'day' + date.getDate();
                day.day = date.getDate();
                day.date = date;
                day.month = date.getMonth() + 1;
                day.year = date.getFullYear();

                date = undefined;
            } else {
                day = { date: null, day: null };
            }

            week.push(day);
        }
        this.weeks.push(week);
    }

    data.nextMonth     = this.getRelativeMonth(firstDate, 1);
    data.previousMonth = this.getRelativeMonth(firstDate, -1);
    data.currentMonth  = this.getMonthName(firstDate.getMonth());

    this.now = NOW;
}

Calendar.prototype = {
    addDaysToDate: (date, days) => {
        return new Date(date.getFullYear(), date.getMonth(), date.getDate() + days);
    },

    getDaysInMonth: (mo, yr) => {
        mo = mo || this.now.getMonth();
        yr = yr || this.now.getFullYear();
        return 32 - new Date(yr, mo - 1, 32).getDate();
    },

    getLastDayOfWeek: (day) => day > 0 ? day : 6,

    getDayName: (index) => DAYNAMES[index],

    getMonthName: (index) => MONTHNAMES[index],

    getRelativeMonth: (date, dif) => {
        var curIndex = date.getMonth();
        var newIndex = curIndex + dif;

        if (newIndex < 0) newIndex = 11;
        else if (newIndex > 11) newIndex = 1;
        return MONTHNAMES[newIndex];
    },

    isWeekend: (date) => {
        var day = date.getDay();
        return (day === 0 || day === 6);
    }
};

module.exports = Calendar;
