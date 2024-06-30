export = function createDate (year: number, monthIndex: number, day: number): Date {
  return new Date(year, monthIndex, day, 0, 0)
}
