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

test("has given date", () => {
  var today = new Date(2018, 12, 31, 0, 0);
  console.log("today >> ", today);
  var calendar = new JsonCalendar({ today });
  console.log("cal >>", calendar.today);
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

test("get days in month", () => {
  expect(subject.getDaysInMonth(2018, 4)).toBe(31);
  expect(subject.getDaysInMonth(2018, 8)).toBe(30);
  // non-leap year
  expect(subject.getDaysInMonth(2009, 1)).toBe(28);
  // leap year
  expect(subject.getDaysInMonth(2008, 1)).toBe(29);
});
