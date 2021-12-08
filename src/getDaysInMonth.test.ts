import getDaysInMonth from './getDaysInMonth'

test('get days in month', () => {
  expect(getDaysInMonth(2018, 4)).toBe(31)
  expect(getDaysInMonth(2018, 8)).toBe(30)
  // non-leap year
  expect(getDaysInMonth(2009, 1)).toBe(28)
  // leap year
  expect(getDaysInMonth(2008, 1)).toBe(29)
})
