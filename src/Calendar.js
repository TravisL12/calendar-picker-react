import { useCallback, useEffect, useMemo, useState } from "react";

const createDate = (year, month) => {
  const date = new Date(year, month, 0); // 0-index month (0 - 11)
  const firstDay = new Date(year, month).getDay(); // 0-index day of week (0 - 6)
  const totalDays = new Date(year, month + 1, 0).getDate();
  const prettyName = date.toLocaleDateString("en-US", {
    timeZone: "UTC",
    month: "long",
  });

  return {
    firstDay,
    totalDays,
    prettyName,
  };
};

const months = [
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
const daysOfWeek = ["Sun", "Mon", "Tues", "Wed", "Thurs", "Fri", "Sat"];
const YEARS = "years";
const MONTHS = "months";

const CalendarPicker = ({ startDate = new Date() }) => {
  const id = useMemo(() => Math.round(Math.random() * 1000), []);
  const dateProp = useMemo(() => {
    if (typeof startDate === "string") {
      return new Date(startDate);
    }
    return startDate;
  }, [startDate]);

  const [selectedMonth, setSelectedMonth] = useState(dateProp.getMonth());
  const [selectedYear, setSelectedYear] = useState(dateProp.getFullYear());
  const [selectedDay, setSelectedDay] = useState(dateProp.getDate());
  const [days, setDays] = useState([]);
  const date = createDate(selectedYear, selectedMonth);

  const setDate = useCallback(() => {
    const newDays = [...Array(date.totalDays).keys()].map((day) => day);
    setDays(newDays);
  }, [date.totalDays]);

  useEffect(() => setDate(), [setDate, selectedMonth, selectedYear]);

  const changeMonth = (change) => {
    const isJanuary = selectedMonth === 0;
    const isDecember = selectedMonth === months.length - 1;

    if (isJanuary && change < 0) {
      setSelectedYear(selectedYear - 1);
      setSelectedMonth(months.length - 1);
    } else if (isDecember && change > 0) {
      setSelectedYear(selectedYear + 1);
      setSelectedMonth((selectedMonth + change) % months.length);
    } else {
      setSelectedMonth((selectedMonth + change) % months.length);
    }
  };

  const changeDate = (event) => {
    const { name, value } = event.target;
    if (name === "months") {
      setSelectedMonth(+value);
    }
    if (name === "years") {
      setSelectedYear(value);
    }
    setDate();
  };

  return (
    <div className="calendar">
      <div className="title">
        <button
          className="month-btn"
          onClick={() => {
            changeMonth(-1);
          }}
        >
          &lt;
        </button>
        <select value={selectedMonth} name={MONTHS} onChange={changeDate}>
          {months.map((month, idx) => (
            <option key={month} value={idx}>
              {month}
            </option>
          ))}
        </select>
        <input
          type="number"
          value={selectedYear}
          step="1"
          name={YEARS}
          onChange={changeDate}
        />
        <button
          className="month-btn"
          onClick={() => {
            changeMonth(1);
          }}
        >
          &gt;
        </button>
      </div>
      <div className="dow-container">
        {daysOfWeek.map((dow) => (
          <div key={dow} className="dow">
            {dow}
          </div>
        ))}
      </div>
      <div className="grid">
        {days.map((day) => {
          const style = day === 0 ? { gridColumnStart: date.firstDay + 1 } : {};
          return (
            <form key={`${id}-${day}`} style={style} className="day">
              <input
                onChange={() => {
                  setSelectedDay(day + 1);
                }}
                checked={selectedDay - 1 === day}
                id={`${id}-${day}`}
                type="radio"
                name="dates"
              />
              <label htmlFor={`${id}-${day}`}>{day + 1}</label>
            </form>
          );
        })}
      </div>
    </div>
  );
};

export default CalendarPicker;
