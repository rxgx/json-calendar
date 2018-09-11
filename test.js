var JsonCalendar = require("./");

var cal = new JsonCalendar();

test("exports a class", () => {
  expect(cal instanceof JsonCalendar).toBe(true);
});

test("has month names", () => {
  expect(Array.isArray(cal.monthNames)).toBe(true);
});

test("has date for today", () => {
  expect(cal.today instanceof Date).toBe(true);
});

test("has week arrays with 7 days", () => {
  expect(Array.isArray(cal.weeks)).toBe(true);
  expect(cal.weeks[0].length).toBe(7);
});
