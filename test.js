var JsonCalendar = require("./");

var subject = new JsonCalendar();

test("exports a class", () => {
  expect(subject instanceof JsonCalendar).toBe(true);
});

test("has month names", () => {
  expect(Array.isArray(subject.monthNames)).toBe(true);
});

test("has today's date", () => {
  expect(subject.today.getHours()).toBe(0);
  expect(subject.today.getMinutes()).toBe(0);
  expect(subject.today.getHours()).toBe(0);
});

test("has date for today", () => {
  expect(subject.today instanceof Date).toBe(true);
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
