import { useState } from "react";
import cn from "classnames";

interface CalendarProps {
  startDate: Date | null;
  endDate: Date | null;
  setStartDate: (startDate: Date | null) => void;
  setEndDate: (endDate: Date | null) => void;
}

function Calendar({ startDate, endDate, setStartDate, setEndDate }: CalendarProps) {
  const [currentDate, setCurrentDate] = useState(new Date());

  const monthNames = [
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

  const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const getDaysInMonth = (month: number, year: number) => new Date(year, month + 1, 0).getDate();

  // getDay() -> 현재 요일 구함 (일요일 0 ~ 토요일 7)
  const getFirstDayOfMonth = (month: number, year: number) => new Date(year, month, 1).getDay();

  const handlePrevMonth = () =>
    setCurrentDate((prevState) => new Date(prevState.getFullYear(), prevState.getMonth() - 1, 1));

  const handleNextMonth = () =>
    setCurrentDate((prevState) => new Date(prevState.getFullYear(), prevState.getMonth() + 1, 1));

  const handleDateClick = (day: number) => {
    // const currentYear = currentDate.getFullYear();
    // const currentMonth = currentDate.getMonth();
    // 향후 Date type으로 다음과 같이 넘겨줄 수 있음
    // new Date(currentDate.getFullYear(), currentDate.getMonth(), day)
    const selectedDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);

    /*
      날짜 Click 시 start/end 규칙
      1. startDate 없음 -> set start
      2. startDate 있는데 선택한 날짜가 그보다 앞 -> set start
      3. startDate 있는데 선택한 날짜가 그보다 뒤 -> set end
      4. 선택한 날짜가 이미 선택된 start || end -> cancel start || end
    */

    // Date type 끼리의 동등 비교 연산자(===)는 값이 아닌 참조로 비교하기 때문에 '서로 다른 메모리에 저장되어 있음'으로 판명되어 항상 false 반환함
    // 따라서 아래와 같이 비교해야함
    if (startDate && startDate.getTime() === selectedDate.getTime()) {
      setStartDate(null);
      return;
    }
    if (endDate && endDate.getTime() === selectedDate.getTime()) {
      setEndDate(null);
      return;
    }
    if (startDate === null || startDate > selectedDate || (endDate !== null && endDate > selectedDate)) {
      setStartDate(new Date(currentDate.getFullYear(), currentDate.getMonth(), day));
    } else {
      setEndDate(new Date(currentDate.getFullYear(), currentDate.getMonth(), day));
    }
  };

  return (
    <div className={cn("calendar-wrap")}>
      <div className={cn("calendar-header")}>
        <button type="button" onClick={handlePrevMonth}>
          Prev
        </button>
        <span className={cn("mont-year")}>
          {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
        </span>
        <button type="button" onClick={handleNextMonth}>
          Next
        </button>
      </div>
      <table className={cn("calendar")}>
        <thead>
          <tr>
            {weekdays.map((weekday) => (
              <th key={weekday}>{weekday}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {Array.from({ length: 6 }, (_, i) => (
            <tr key={i}>
              {Array.from({ length: 7 }, (__, j) => {
                const day = 7 * i + j + 1 - getFirstDayOfMonth(currentDate.getMonth(), currentDate.getFullYear());
                if (day > 0 && day <= getDaysInMonth(currentDate.getMonth(), currentDate.getFullYear())) {
                  return (
                    <td
                      key={j}
                      onClick={() => handleDateClick(day)}
                      aria-hidden="true"
                      // className={selectedDate.getDate() === day ? "selected" : ""}
                      className={cn(
                        startDate?.getDate() === day && "selected",
                        endDate?.getDate() === day && "selected",
                        startDate && startDate.getDate() < day && endDate && endDate.getDate() > day && "between-day",
                      )}
                    >
                      {day}
                    </td>
                  );
                }
                return <td key={j} />;
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Calendar;
