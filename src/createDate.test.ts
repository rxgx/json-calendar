import createDate from './createDate'

test('creates a date in the future', () => {
  const date = createDate(2018, 11, 32)
  expect(date instanceof Date).toBe(true)
  expect(date.toDateString()).toBe('Tue Jan 01 2019')
  expect(date.getFullYear()).toBe(2019)
  expect(date.getMonth()).toBe(0)
  expect(date.getDate()).toBe(1)
  expect(date.getMinutes()).toBe(0)
  expect(date.getHours()).toBe(0)
})

test('creates a valid date', () => {
  const date = createDate(2024, 5, 20)
  expect(date instanceof Date).toBe(true)
  expect(date.toDateString()).toBe('Thu Jun 20 2024')
  expect(date.getFullYear()).toBe(2024)
  expect(date.getMonth()).toBe(5)
  expect(date.getDate()).toBe(20)
  expect(date.getMinutes()).toBe(0)
  expect(date.getHours()).toBe(0)
})
