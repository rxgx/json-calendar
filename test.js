var JsonCalendar = require("./");

var subject = new JsonCalendar();

test("exports a class", () => {
  expect(subject instanceof JsonCalendar).toBe(true);
});

test("has month names", () => {
  expect(Array.isArray(subject.monthNames)).toBe(true);
});

test("has today's date", () => {
  const today = new Date();
  expect(subject.today instanceof Date).toBe(true);
  expect(subject.today.getFullYear()).toBe(today.getFullYear());
  expect(subject.today.getHours()).toBe(0);
  expect(subject.today.getMinutes()).toBe(0);
  expect(subject.today.getHours()).toBe(0);
});

test("uses given today param", () => {
  var today = new Date(2018, 12, 31, 0, 0);
  var calendar = new JsonCalendar({ today });
  expect(calendar.today instanceof Date).toBe(true);
  expect(calendar.today.getFullYear()).toBe(today.getFullYear());
  expect(calendar.today.getMonth()).toBe(today.getMonth());
  expect(calendar.today.getHours()).toBe(0);
  expect(calendar.today.getMinutes()).toBe(0);
  expect(calendar.today.getHours()).toBe(0);
});

test("has week arrays with 7 days", () => {
  const lastWeekIndex = subject.weeks.length - 1;
  expect(subject.weeks[0].length).toBe(7);
  expect(subject.weeks[lastWeekIndex].length).toBe(7);
  expect(typeof subject.weeks[1][1].className).toBe("string");
});

test("displays October 2018 correctly", () => {
  var today = new Date(2018, 12, 1, 0, 0);
  var calendar = new JsonCalendar({ year: 2018, monthIndex: 9, today });
  expect(calendar.weeks[0][0].day).toBe(30);
  expect(calendar.weeks[0][0].date.getMonth()).toBe(8);
  expect(calendar.weeks[0][1].day).toBe(1);
  expect(calendar.weeks[0][1].date.getMonth()).toBe(9);
});

test("add days to date", () => {
  const date = new Date(2018, 8, 29, 0, 0);
  expect(subject.addDaysToDate(date, 0).getDate()).toBe(date.getDate());
  expect(subject.addDaysToDate(date, -3).getDate()).toBe(26);
  expect(subject.addDaysToDate(date, 10).getDate()).toBe(9);
});

test("creates a date without time", () => {
  var date = subject.createDate(2018, 11, 32, 0, 0);
  expect(date instanceof Date).toBe(true);
  expect(date.getFullYear()).toBe(2019);
  expect(date.getMonth()).toBe(0);
  expect(date.getDate()).toBe(1);
  expect(date.getMinutes()).toBe(0);
  expect(date.getHours()).toBe(0);
});

test("get days in month", () => {
  expect(subject.getDaysInMonth(2018, 4)).toBe(31);
  expect(subject.getDaysInMonth(2018, 8)).toBe(30);
  // non-leap year
  expect(subject.getDaysInMonth(2009, 1)).toBe(28);
  // leap year
  expect(subject.getDaysInMonth(2008, 1)).toBe(29);
});
