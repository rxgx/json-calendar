
var JsonCalendar = (function() {

    var MONTHNAMES = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    var defaults,
        nbsp = "&nbsp;",
        now = new Date;

    defaults = {
        year            : now.getFullYear(),
        month           : now.getMonth(),
        abbreviate      : 2,
        firstDayOfWeek  : 0,
        showToday       : true,
        previousMonth   : nbsp,
        nextMonth       : nbsp,
        showOutsideDays : false,
        otherMonthClass : "month-other"
    };

    return {

        addDaysToDate: function(date, days) {
            //date.setDate(date.getDate() + days);
            return new Date(date.getFullYear(), date.getMonth(), date.getDate() + days);
        },

        getDaysInMonth: function(mo, yr) {
            mo = mo || now.getMonth();
            yr = yr || now.getFullYear();
            return 32 - new Date(yr, mo - 1, 32).getDate();
        },

        getLastDayOfWeek: function(day) {
            if (day > 0) {
                return day;
            } else {
                return 6;
            }
        },

        isWeekend: function(date) {
            var day = date.getDay();
            return (day === 0 || day === 6);
        },

        calendar: function(options) {

            options = options || {};

            var classNames,
                d = 0,
                data = {},
                date = {},
                day,
                dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
                firstDate,
                firstDayOfWeek,
                i = 1,
                lastDate,
                lastDayOfWeek,
                name,
                w = 0,
                week = [];

            for (name in defaults) {
                if (!options.hasOwnProperty(name)) {
                    options[name] = defaults[name];
                }
            }

            //options["month_name_text"] ||= Date::MONTHNAMES[options["month"]]

            firstDate = new Date(options['year'], options['month'], 1);
            lastDate = new Date(options['year'], options['month'] + 1, 0);

            firstDayOfWeek = options.firstDayOfWeek;
            lastDayOfWeek = this.getLastDayOfWeek(options.firstDayOfWeek);

            // Shift the day names array if the first day of the week isn't Sunday.
            if (options['firstDayOfWeek'] < 0) {
                for (i = 0; i < firstDayOfWeek; i++) {
                    dayNames.push(dayNames.shift())
                }
            }

            // Start storing the JSON data into an object.
            data.dayNames = [];

            // Abbreviate the day names when configured to do so.
            for (d in dayNames) {
                var dayName = dayNames[d],
                    dayAbbr = dayName.substr(0, options.abbreviate);
                if (dayAbbr !== dayName) {
                    data.dayNames[d] = { name: dayName, abbr: dayAbbr };
                } else {
                    data.dayNames[d] = { name: dayName };
                }
            }

            data.weeks = [];

            // Loop through week indexes (0..6).
            while (w < 6) {
                d = 0;
                // Loop through the day index (0..6) for each week.
                while (d < 7) {
                    classNames = [];
                    day = {};
                    if (i > lastDate.getDate()) {
                        // Day of Next Month
                        if (options.showOutsideDays) {
                            date = this.addDaysToDate(lastDate, i - lastDate.getDate());
                        }
                        i += 1;
                        classNames.push(options.otherMonthClass);
                    } else if (w === 0 && d < firstDate.getDay()) {
                        // Day of Previous Month
                        if (options.showOutsideDays) {
                            date = this.addDaysToDate(firstDate, d - firstDate.getDay());
                        }
                        classNames.push(options.otherMonthClass);
                    } else {
                        // Day of Current Month
                        classNames.push("month-day");
                        date = new Date(firstDate.getFullYear(), firstDate.getMonth(), i);
                        i += 1;
                        if (date.toDateString() === now.toDateString() && options['show_today']) {
                            classNames.push("today");
                        }
                    }
                    if (date && date.getDate) {
                        if (this.isWeekend(date)) {
                            classNames.push("weekend-day");
                        }
                        day.className = classNames.join(" ");
                        day.id = "day" + date.getDate();
                        day.day = date.getDate();
                        day.date = date;
                        day.month = date.getMonth();
                        day.year = date.getFullYear();
                        date = undefined;
                    } else {
                        day = { date: nbsp, day: nbsp };
                    }
                    week.push(day);
                    d += 1;
                }
                data.weeks.push(week);
                week = [];
                w += 1;
            }

            data.nextMonth = options.nextMonth;
            data.previousMonth = options.previousMonth;
            data.currentMonth = MONTHNAMES[firstDate.getMonth()];

            return data;

        }

    };

})();

