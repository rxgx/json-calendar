var JsonCalendar = require("./index");

test("exports a class", () => {
  var calendar = new JsonCalendar();
  expect(calendar instanceof JsonCalendar).toBe(true);
  expect(typeof calendar.state.year).toBe("number");
  expect(typeof calendar.state.monthIndex).toBe("number");
});

test("exports a class", async () => {
  var callback = jest.fn();
  var calendar = new JsonCalendar({}, callback);
  await calendar;
  expect(callback.mock.calls[0][0].weeks).toEqual(expect.arrayContaining([]));
});

test("has today's date", () => {
  const today = new Date();
  const calendar = new JsonCalendar();
  const state = calendar.state;
  expect(state.today instanceof Date).toBe(true);
  expect(state.today.getFullYear()).toBe(today.getFullYear());
  expect(state.today.getHours()).toBe(0);
  expect(state.today.getMinutes()).toBe(0);
  expect(state.today.getHours()).toBe(0);
});

test("uses given today param", () => {
  var today = new Date(2018, 12, 31, 0, 0);
  var calendar = new JsonCalendar({ today });
  var state = calendar.state;
  expect(state.today instanceof Date).toBe(true);
  expect(state.today.getFullYear()).toBe(today.getFullYear());
  expect(state.today.getMonth()).toBe(today.getMonth());
  expect(state.today.getHours()).toBe(0);
  expect(state.today.getMinutes()).toBe(0);
  expect(state.today.getHours()).toBe(0);
});

test("uses given today param and no abbr", () => {
  var today = new Date(2018, 12, 31, 0, 0);
  var calendar = new JsonCalendar({ today });
  expect(calendar.state.abbreviate).toBe(0);
  expect(calendar.dayNames[0]).toBe("Sunday");
  expect(calendar.dayNames[6]).toBe("Saturday");
});

test("uses given today param and abbr", () => {
  var today = new Date(2018, 12, 31, 0, 0);
  var calendar = new JsonCalendar({ abbreviate: 3, today });
  expect(calendar.state.abbreviate).toBe(3);
  expect(calendar.dayNames[0]).toBe("Sun");
  expect(calendar.dayNames[6]).toBe("Sat");
});

test("uses given today param, language, and abbr", () => {
  var today = new Date(2018, 12, 31, 0, 0);
  var calendar = new JsonCalendar({ abbreviate: 3, language: "french", today });
  expect(calendar.state.abbreviate).toBe(3);
  expect(calendar.dayNames[0]).toBe("Dim");
});

test("has week arrays with 7 days", () => {
  const calendar = new JsonCalendar();
  const state = calendar.state;
  const lastWeekIndex = state.weeks.length - 1;
  expect(state.weeks[0].length).toBe(7);
  expect(state.weeks[lastWeekIndex].length).toBe(7);
  expect(typeof state.weeks[1][1].className).toBe("string");
});

test("displays October 2018 correctly", () => {
  var today = new Date(2018, 11, 1, 0, 0);
  var calendar = new JsonCalendar({ year: 2018, monthIndex: 9, today });
  var state = calendar.state;
  expect(state.weeks[0][0].day).toBe(30);
  expect(state.weeks[0][0].date.getMonth()).toBe(8);
  expect(state.weeks[0][1].day).toBe(1);
  expect(state.weeks[0][1].date.getMonth()).toBe(9);
});

test("add days to date", () => {
  const calendar = new JsonCalendar();
  const date = new Date(2018, 8, 29, 0, 0);
  expect(calendar.addDaysToDate(date, 0).getDate()).toBe(date.getDate());
  expect(calendar.addDaysToDate(date, -3).getDate()).toBe(26);
  expect(calendar.addDaysToDate(date, 10).getDate()).toBe(9);
});

test("creates a date without time", () => {
  var subject = new JsonCalendar();
  var date = subject.createDate(2018, 11, 32, 0, 0);
  expect(date instanceof Date).toBe(true);
  expect(date.getFullYear()).toBe(2019);
  expect(date.getMonth()).toBe(0);
  expect(date.getDate()).toBe(1);
  expect(date.getMinutes()).toBe(0);
  expect(date.getHours()).toBe(0);
});

test("get days in month", () => {
  var subject = new JsonCalendar({ today: new Date(2015, 4, 23) });
  expect(subject.state.monthIndex).toBe(4);
  expect(subject.state.year).toBe(2015);
  expect(subject.getDaysInMonth()).toBe(31);
  expect(subject.getDaysInMonth(2015)).toBe(31);
  expect(subject.getDaysInMonth(2018, 4)).toBe(31);
  expect(subject.getDaysInMonth(2018, 8)).toBe(30);
  // non-leap year
  expect(subject.getDaysInMonth(2009, 1)).toBe(28);
  // leap year
  expect(subject.getDaysInMonth(2008, 1)).toBe(29);
});

test("accepts change of month", () => {
  const calendar = new JsonCalendar();
  calendar.createWeeksForMonth(0);
  expect(calendar.state.monthIndex).toBe(0);
  expect(calendar.state.year).toBe(new Date().getFullYear());
});

test("accepts change of month and year", () => {
  const calendar = new JsonCalendar();
  calendar.createWeeksForMonth(3, 2020);
  expect(calendar.state.monthIndex).toBe(3);
  expect(calendar.state.year).toBe(2020);
});

describe("uses firstDayOfWeek param", () => {
  test("month starts on correct day when firstDayOfWeek is 0", () => {
    const calendar = new JsonCalendar({
      year: 2019,
      monthIndex: 1,
      firstDayOfWeek: 0
    });

    expect(calendar.state.firstDayOfWeek).toBe(0);
    expect(calendar.state.weeks[0][0].day).toBe(27);
  });

  test("month starts on correct day when firstDayOfWeek is 1", () => {
    const calendar = new JsonCalendar({
      year: 2019,
      monthIndex: 1,
      firstDayOfWeek: 1
    });

    expect(calendar.state.firstDayOfWeek).toBe(1);
    expect(calendar.state.weeks[0][0].day).toBe(28);
  });
});

describe("language parameter in constructor", () => {
  test("constructor optionally accepts a language", () => {
    let calendar = new JsonCalendar({ language: "french" });
    expect(calendar.state.language).toBe("french");

    calendar = new JsonCalendar();
    expect(calendar.state.language).toBe("english");
  });

  test("optional language param accept french or spanish, otherwise defaults to english", () => {
    let calendar = new JsonCalendar({ language: "spanish" });
    expect(calendar.state.language).toBe("spanish");

    calendar = new JsonCalendar({ language: "french" });
    expect(calendar.state.language).toBe("french");

    calendar = new JsonCalendar({ language: "esperanto" });
    expect(calendar.state.language).toBe("english");
  });
});

describe("language for months name", () => {
  test("should return french month names", () => {
    const calendar = new JsonCalendar({ language: "french" });

    const janvier = calendar.getMonthName(0);
    const fevrier = calendar.getMonthName(1);
    const mars = calendar.getMonthName(2);
    const avril = calendar.getMonthName(3);
    const mai = calendar.getMonthName(4);
    const juin = calendar.getMonthName(5);
    const juillet = calendar.getMonthName(6);
    const aout = calendar.getMonthName(7);
    const septembre = calendar.getMonthName(8);
    const octobre = calendar.getMonthName(9);
    const novembre = calendar.getMonthName(10);
    const decembre = calendar.getMonthName(11);

    expect(janvier).toBe("Janvier");
    expect(fevrier).toBe("Février");
    expect(mars).toBe("Mars");
    expect(avril).toBe("Avril");
    expect(mai).toBe("Mai");
    expect(juin).toBe("Juin");
    expect(juillet).toBe("Juillet");
    expect(aout).toBe("Août");
    expect(septembre).toBe("Septembre");
    expect(octobre).toBe("Octobre");
    expect(novembre).toBe("Novembre");
    expect(decembre).toBe("Décembre");

    expect(calendar.monthNames).toEqual(
      expect.arrayContaining([
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
      ])
    );
  });

  test("should return spanish month name", () => {
    const calendar = new JsonCalendar({ language: "spanish" });

    const enero = calendar.getMonthName(0);
    const febrero = calendar.getMonthName(1);
    const marzo = calendar.getMonthName(2);
    const abril = calendar.getMonthName(3);
    const mayo = calendar.getMonthName(4);
    const junio = calendar.getMonthName(5);
    const julio = calendar.getMonthName(6);
    const agosto = calendar.getMonthName(7);
    const septiembre = calendar.getMonthName(8);
    const octubre = calendar.getMonthName(9);
    const noviembre = calendar.getMonthName(10);
    const diciembre = calendar.getMonthName(11);

    expect(enero).toBe("Enero");
    expect(febrero).toBe("Febrero");
    expect(marzo).toBe("Marzo");
    expect(abril).toBe("Abril");
    expect(mayo).toBe("Mayo");
    expect(junio).toBe("Junio");
    expect(julio).toBe("Julio");
    expect(agosto).toBe("Agosto");
    expect(septiembre).toBe("Septiembre");
    expect(octubre).toBe("Octubre");
    expect(noviembre).toBe("Noviembre");
    expect(diciembre).toBe("Diciembre");

    expect(calendar.monthNames).toEqual(
      expect.arrayContaining([
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
      ])
    );
  });

  test("should return english month name", () => {
    // by default => english
    const calendar = new JsonCalendar();

    const january = calendar.getMonthName(0);
    const february = calendar.getMonthName(1);
    const march = calendar.getMonthName(2);
    const april = calendar.getMonthName(3);
    const may = calendar.getMonthName(4);
    const june = calendar.getMonthName(5);
    const july = calendar.getMonthName(6);
    const august = calendar.getMonthName(7);
    const septembre = calendar.getMonthName(8);
    const octobre = calendar.getMonthName(9);
    const novembre = calendar.getMonthName(10);
    const decembre = calendar.getMonthName(11);

    expect(january).toBe("January");
    expect(february).toBe("February");
    expect(march).toBe("March");
    expect(april).toBe("April");
    expect(may).toBe("May");
    expect(june).toBe("June");
    expect(july).toBe("July");
    expect(august).toBe("August");
    expect(septembre).toBe("September");
    expect(octobre).toBe("October");
    expect(novembre).toBe("November");
    expect(decembre).toBe("December");

    expect(calendar.monthNames).toEqual(
      expect.arrayContaining([
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
      ])
    );
  });
});

describe("language for day name", () => {
  test("should return french day names", () => {
    const calendar = new JsonCalendar({ language: "french" });

    const dimanche = calendar.getDayName(0);
    const lundi = calendar.getDayName(1);
    const mardi = calendar.getDayName(2);
    const mercredi = calendar.getDayName(3);
    const jeudi = calendar.getDayName(4);
    const vendredi = calendar.getDayName(5);
    const samedi = calendar.getDayName(6);

    expect(dimanche).toBe("Dimanche");
    expect(lundi).toBe("Lundi");
    expect(mardi).toBe("Mardi");
    expect(mercredi).toBe("Mercredi");
    expect(jeudi).toBe("Jeudi");
    expect(vendredi).toBe("Vendredi");
    expect(samedi).toBe("Samedi");

    expect(calendar.dayNames).toEqual(
      expect.arrayContaining([
        "Dimanche",
        "Lundi",
        "Mardi",
        "Mercredi",
        "Jeudi",
        "Vendredi",
        "Samedi"
      ])
    );
  });

  test("should return spanish day names", () => {
    const calendar = new JsonCalendar({ language: "spanish" });

    const domingo = calendar.getDayName(0);
    const lunes = calendar.getDayName(1);
    const martes = calendar.getDayName(2);
    const miercole = calendar.getDayName(3);
    const jueves = calendar.getDayName(4);
    const viernes = calendar.getDayName(5);
    const sabado = calendar.getDayName(6);

    expect(domingo).toBe("Domingo");
    expect(lunes).toBe("Lunes");
    expect(martes).toBe("Martes");
    expect(miercole).toBe("Miércoles");
    expect(jueves).toBe("Jueves");
    expect(viernes).toBe("Viernes");
    expect(sabado).toBe("Sábado");

    expect(calendar.dayNames).toEqual(
      expect.arrayContaining([
        "Domingo",
        "Lunes",
        "Martes",
        "Miércoles",
        "Jueves",
        "Viernes",
        "Sábado"
      ])
    );
  });

  test("should return english day names", () => {
    // by default => english
    const calendar = new JsonCalendar();

    const sunday = calendar.getDayName(0);
    const monday = calendar.getDayName(1);
    const tuesday = calendar.getDayName(2);
    const wednesday = calendar.getDayName(3);
    const thursday = calendar.getDayName(4);
    const friday = calendar.getDayName(5);
    const saturday = calendar.getDayName(6);

    expect(sunday).toBe("Sunday");
    expect(monday).toBe("Monday");
    expect(tuesday).toBe("Tuesday");
    expect(wednesday).toBe("Wednesday");
    expect(thursday).toBe("Thursday");
    expect(friday).toBe("Friday");
    expect(saturday).toBe("Saturday");

    expect(calendar.dayNames).toEqual(
      expect.arrayContaining([
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday"
      ])
    );
  });
});
