import isWeekend = require('./isWeekend');

test('exports function', () => {
  expect(typeof isWeekend).toBe('function');
});

test('weekday is not weekend', () => {
  const date = new Date('2019-10-03T12:26:52.679Z');
  expect(isWeekend(date)).toBe(false);
});

test('weekend is a weekend', () => {
  const date = new Date('2019-10-06T07:26:52.807Z');
  expect(isWeekend(date)).toBe(true);
});
