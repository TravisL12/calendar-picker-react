import React, { useMemo, useState } from "react";
import {
  createDate,
  months,
  daysOfWeek,
  YEARS,
  MONTHS,
  buildDayArray,
} from "./helpers";

const CalendarPicker = ({ startDate, maxDate, minDate, children }) => {
  const id = useMemo(() => Math.round(Math.random() * 1000), []);

  const hasTrigger = !!children;
  const [isOpen, setIsOpen] = useState(!hasTrigger);
  const [date, setDate] = useState(createDate(startDate));

  const {
    date: dateProp,
    totalDays,
    firstDay,
    prevMonthTotalDays,
    nextMonthTotalDays,
    days,
  } = date;

  const selectedMonth = dateProp.getMonth();
  const selectedYear = dateProp.getFullYear();
  const selectedDay = dateProp.getDate();

  const updateDate = ({
    year = selectedYear,
    month = selectedMonth,
    day = selectedDay,
  }) => {
    const created = createDate(`${year}-${month + 1}-${day}`);
    setDate(created);
  };

  const changeMonth = (change) => {
    const isJanuary = selectedMonth === 0;
    const isDecember = selectedMonth === months.length - 1;

    let year = selectedYear;
    let month = selectedMonth;

    if (isJanuary && change < 0) {
      year = selectedYear - 1;
      month = months.length - 1;
    } else if (isDecember && change > 0) {
      year = selectedYear + 1;
      month = (selectedMonth + change) % months.length;
    } else {
      month = (selectedMonth + change) % months.length;
    }

    updateDate({ year, month });
  };

  const changeDate = (event) => {
    const { name, value } = event.target;
    let year = selectedYear;
    let month = selectedMonth;

    if (name === "months") {
      month = +value;
    }
    if (name === "years") {
      year = value;
    }
    if (String(year).length < 3) {
      return;
    }
    updateDate({ year, month });
  };

  const daysBefore = buildDayArray(prevMonthTotalDays).slice(
    prevMonthTotalDays - firstDay
  );

  const endDow = totalDays + firstDay;
  const daysAfter = endDow <= 35 ? 35 - endDow : 42 - endDow;

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
    <div className="calendar-container">
      {childrenWithProps}
      {isOpen && (
        <div className={`calendar ${hasTrigger ? "hasTrigger" : ""}`}>
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
              <div key={day} className="day prev">
                {day + 1}
              </div>
            ))}
            {days.map((day) => {
              const style = day === 0 ? { gridColumnStart: firstDay + 1 } : {};
              return (
                <form key={`${id}-${day}`} style={style} className="day">
                  <input
                    onChange={() => {
                      updateDate({ day: day + 1 });
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
                <div key={day} className="day prev">
                  {day + 1}
                </div>
              ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default CalendarPicker;
