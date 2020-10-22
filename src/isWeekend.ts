export = function isWeekend (date: Date): boolean {
  const dayIndex: number = date.getDay()
  return dayIndex === 0 || dayIndex === 6
}
