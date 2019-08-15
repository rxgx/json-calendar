export default function addDaysToDate(date: Date, offset: number): Date {
  return new Date(date.getTime() + offset * 24 * 60 * 60 * 1000);
}
