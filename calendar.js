var JsonCalendar = (function() {

    var MONTHNAMES = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    var now = new Date;

    return {

        defaults: {
            year           : now.getFullYear(),
            month          : now.getMonth(),
            abbreviate     : 2,
            firstDayOfWeek : 0,
            showToday      : true,
            previousMonth  : "<<",
            nextMonth      : ">>"
        },

        addDaysToDate: function(date, days) {
            //date.setDate(date.getDate() + days);
            return new Date(date.getFullYear(), date.getMonth(), date.getDate() + days);
        },

        getDaysInMonth: function(mo, yr) {
            mo = mo || now.getMonth();
            yr = yr || now.getFullYear();
            return 32 - new Date(yr, mo - 1, 32).getDate();
        },

        padString: function(string, pad, count) {
            var parts = [string];
            for (var i = 0; i < count; i++) {
                parts.push(pad);
            }
            return parts.join();
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
                i = 0,
                lastDate,
                lastDayOfWeek,
                name,
                w = 0,
                week = [];

            for (name in this.defaults) {
                if (!options.hasOwnProperty(name)) {
                    options[name] = this.defaults[name];
                }
            }

            //options["month_name_text"] ||= Date::MONTHNAMES[options["month"]]

            firstDate = new Date(options['year'], options['month'], 1);
            lastDate = new Date(options['year'], options['month'] + 1, 0);

            firstDayOfWeek = this.getFirstDayOfWeek(options['firstDayOfWeek']);
            lastDayOfWeek = this.getLastDayOfWeek(options['firstDayOfWeek']);

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
                        i += 1;
                        date = this.addDaysToDate(lastDate, i - lastDate.getDate());

                    } else if (w === 0 && d < firstDate.getDay()) {

                        // Day of Previous Month
                        date = this.addDaysToDate(firstDate, d - firstDate.getDay());
                        classNames.push(options['other_month_class']);

                    } else {

                        // Day of Current Month
                        i += 1;
                        date = new Date(firstDate.getFullYear(), firstDate.getMonth(), i);

                        classNames.push(options['day_class']);

                        if (date.toDateString() === now.toDateString() && options['show_today']) {
                            classNames.push("today");
                        }

                    }

                    if (this.isWeekend(date)) {
                        classNames.push("weekend-day");
                    }

                    // Expose these properties as API.
                    day.className = classNames.join(" ");
                    day.id = "day" + date.getDate();
                    day.day = date.getDate();
                    day.date = date;
                    day.month = date.getMonth();
                    day.year = date.getFullYear();

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

        },


        getFirstDayOfWeek: function(day) {
            return day;
        },

        getLastDayOfWeek: function(day) {
            if (day > 0) {
                return day - 1;
            } else {
                return 6;
            }
        },

        getDaysBetween: function(first, second) {
            if (first > second) {
                return second + (7 - first);
            } else {
                return second - first;
            }
        },

        getBeginningOfWeek: function(date, start) {
            start = start || 1;
            var delta = this.getDaysBetween(start, date.getDay());
            return this.addDaysToDate(date, -delta);
        },

        isWeekend: function(date) {
            var day = date.getDay();
            return (day === 0 || day === 6);
        }
    };

})();

