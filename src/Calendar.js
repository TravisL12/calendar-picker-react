import React, { useCallback, useEffect, useMemo, useState } from "react";
import {
  createDate,
  months,
  daysOfWeek,
  YEARS,
  MONTHS,
  buildDayArray,
} from "./helpers";

const CalendarPicker = ({ startDate = new Date(), children }) => {
  const [isOpen, setIsOpen] = useState(false);
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
  const { totalDays, firstDay, prevMonthTotalDays, nextMonthTotalDays } =
    createDate(selectedYear, selectedMonth);

  const setDate = useCallback(() => {
    const newDays = buildDayArray(totalDays);
    setDays(newDays);
  }, [totalDays]);

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

  const daysBefore = buildDayArray(prevMonthTotalDays).slice(
    prevMonthTotalDays - firstDay
  );

  const daysAfter =
    totalDays + firstDay <= 35
      ? 35 - (totalDays + firstDay)
      : 42 - (totalDays + firstDay);

  const toggleOpen = () => {
    setIsOpen(!isOpen);
  };

  const childrenWithProps = React.Children.map(children, (child) => {
    if (React.isValidElement(child)) {
      const content = isOpen ? "close" : "open";
      const props = {
        key: "key",
        onClick: toggleOpen,
      };
      return React.cloneElement(child, props, content);
    }
    return child;
  });

  return (
    <>
      {childrenWithProps}

      {isOpen && (
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
            {daysBefore.map((day) => (
              <div className="day prev">{day + 1}</div>
            ))}
            {days.map((day) => {
              const style = day === 0 ? { gridColumnStart: firstDay + 1 } : {};
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
            {buildDayArray(nextMonthTotalDays)
              .slice(0, daysAfter)
              .map((day) => (
                <div className="day prev">{day + 1}</div>
              ))}
          </div>
        </div>
      )}
    </>
  );
};

export default CalendarPicker;
