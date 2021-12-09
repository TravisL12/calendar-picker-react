export const createDate = (year, month) => {
  const firstDay = new Date(year, month).getDay(); // 0-index day of week (0 - 6)
  const prevMonthTotalDays = new Date(year, month, 0).getDate();
  const totalDays = new Date(year, month + 1, 0).getDate();
  const nextMonthTotalDays = new Date(year, month + 2, 0).getDate();

  return {
    firstDay,
    totalDays,
    prevMonthTotalDays,
    nextMonthTotalDays,
  };
};

export const buildDayArray = (days) =>
  [...Array(days).keys()].map((day) => day);

export const months = buildDayArray(11).map((month) => {
  const date = new Date(2021, month);
  return date.toLocaleDateString("en-US", {
    timeZone: "UTC",
    month: "long",
  });
});

export const daysOfWeek = buildDayArray(7).map((day) => {
  const date = new Date(2021, 1, day);
  return date.toLocaleDateString("en-US", {
    timeZone: "UTC",
    weekday: "short",
  });
});

export const YEARS = "years";
export const MONTHS = "months";
