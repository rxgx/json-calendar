export default function isWeekend(date: Date): boolean {
  const day = date.getDay();
  return day === 0 || day === 6;
}
