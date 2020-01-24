import createDate = require('./createDate');

test('creates a date without time', () => {
  const date = createDate(2018, 11, 32);
  expect(date instanceof Date).toBe(true);
  expect(date.getFullYear()).toBe(2019);
  expect(date.getMonth()).toBe(0);
  expect(date.getDate()).toBe(1);
  expect(date.getMinutes()).toBe(0);
  expect(date.getHours()).toBe(0);
});
