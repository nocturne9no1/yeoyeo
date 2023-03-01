import { useState } from "react";
import cn from "classnames";
import dayjs from "dayjs";
// import axios from "axios";

import RoomSelectModal from "./RoomSelectModal";

function Calendar({
  startDate,
  endDate,
  currentDate,
  handleDateClick,
  data,
  selectedRoom,
  setSelectedRoom,
}: CalendarProps) {
  // console.log(data);
  const [isModal, setIsModal] = useState<boolean>(false);

  const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

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

  const getDaysInMonth = (month: number, year: number) => new Date(year, month + 1, 0).getDate();

  // getDay() -> 현재 요일 구함 (일요일 0 ~ 토요일 7)
  const getFirstDayOfMonth = (month: number, year: number) => new Date(year, month, 1).getDay();

  return (
    <div className={cn("calendar-item")}>
      <span className={cn("mont-year")}>
        {monthNames[currentDate.get("month")]} {currentDate.get("year")}
      </span>
      <table className={cn("calendar")}>
        <thead>
          <tr>
            {weekdays.map((weekday) => (
              <th key={weekday}>{weekday}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data &&
            Array.from({ length: 6 }, (_, i) => (
              <tr key={i}>
                {Array.from({ length: 7 }, (__, j) => {
                  const day = 7 * i + j + 1 - getFirstDayOfMonth(currentDate.get("M"), currentDate.get("year"));
                  if (day > 0 && day <= getDaysInMonth(currentDate.get("M"), currentDate.get("year"))) {
                    const cellDate = dayjs(currentDate).set("date", day);
                    return (
                      <td
                        key={j}
                        onClick={() => handleDateClick(day, currentDate)}
                        aria-hidden="true"
                        // className={selectedDate.getDate() === day ? "selected" : ""}
                        className={cn(
                          (cellDate.isSame(startDate) || cellDate.isSame(endDate)) && "selected",
                          startDate && startDate < cellDate && endDate && endDate > cellDate && "between-day",
                          dayjs() > dayjs(currentDate).set("date", day) && "passed-date",
                        )}
                      >
                        <div className={cn("day")}>{day}</div>
                        {data[day - 1] && (
                          <>
                            <div>{data && !data[day - 1] && data[day - 1].rooms[0].price}</div>
                            <ul className={cn("room-list")}>
                              {selectedRoom}
                              {selectedRoom === "A" ||
                                (selectedRoom === null && (
                                  <li
                                    className={cn(
                                      "room-item",
                                      data[day - 1].rooms[0].reservationState === 0 && "available",
                                    )}
                                  >
                                    A
                                  </li>
                                ))}
                              {selectedRoom === "B" ||
                                (selectedRoom === null && (
                                  <li
                                    className={cn(
                                      "room-item",
                                      data[day - 1].rooms[1].reservationState === 0 && "available",
                                    )}
                                  >
                                    B
                                  </li>
                                ))}
                            </ul>
                          </>
                        )}
                        {isModal && <RoomSelectModal setSelectedRoom={setSelectedRoom} setIsModal={setIsModal} />}
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
