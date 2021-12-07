export const createDate = (year, month) => {
  const date = new Date(year, month, 0); // 0-index month (0 - 11)
  const firstDay = new Date(year, month).getDay(); // 0-index day of week (0 - 6)
  const prevMonthTotalDays = new Date(year, month, 0).getDate();
  const nextMonthTotalDays = new Date(year, month + 2, 0).getDate();
  const totalDays = new Date(year, month + 1, 0).getDate();
  const prettyName = date.toLocaleDateString("en-US", {
    timeZone: "UTC",
    month: "long",
  });

  return {
    firstDay,
    totalDays,
    prettyName,
    prevMonthTotalDays,
    nextMonthTotalDays,
  };
};
export const buildDayArray = (days) =>
  [...Array(days).keys()].map((day) => day);

export const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
export const daysOfWeek = ["Sun", "Mon", "Tues", "Wed", "Thurs", "Fri", "Sat"];
export const YEARS = "years";
export const MONTHS = "months";
