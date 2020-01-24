export = function createDate(yr: number, mo: number, day: number): Date {
  return new Date(yr, mo, day, 0, 0);
};
