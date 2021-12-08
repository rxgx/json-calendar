import addDaysToDate from './addDaysToDate'

test('add days to date', () => {
  const date = new Date(2018, 8, 29, 0, 0)
  expect(addDaysToDate(date, 0).getDate()).toBe(date.getDate())
  expect(addDaysToDate(date, -3).getDate()).toBe(26)
  expect(addDaysToDate(date, 10).getDate()).toBe(9)
})
