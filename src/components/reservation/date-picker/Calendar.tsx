// import { useState } from "react";
import cn from "classnames";
// import dayjs from "dayjs";
// import axios from "axios";

function Calendar({ currentDate, handleDateClick }: CalendarProps) {
  // function Calendar({ startDate, endDate, setStartDate, setEndDate, currentDate }: CalendarProps) {
  // const [currentDate, setCurrentDate] = useState(new Date());
  // const [dummyAddedData, setDummyAddedData] = useState<MonthRoomData[]>();
  // const [selectedRoomType, setSelectedRoomType] = useState<"A" | "B">();
  // const [calendarData, setCalendarData] = useState<MonthRoomData[]>();

  // useEffect(() => {
  //   console.log(currentDate.getMonth());
  //   axios({
  //     method: "get",
  //     url: `http://3.35.98.5:8080/dateroom/2023/${currentDate.getMonth()}`,
  //   }).then((res) => {
  //     setCalendarData(res.data);
  //     setDummyAddedData([]);
  //   });
  // }, [currentDate]);

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

  // const handlePrevMonth = () =>
  //   setCurrentDate((prevState) => new Date(prevState.getFullYear(), prevState.getMonth() - 1, 1));

  // const handleNextMonth = () =>
  //   setCurrentDate((prevState) => new Date(prevState.getFullYear(), prevState.getMonth() + 1, 1));

  // const calendarStartDate = dayjs().date(1);
  // const dateDiff = dayjs(currentDate).diff(calendarStartDate, "day");

  // useEffect(() => {
  //   if (calendarData) {
  //     setDummyAddedData([
  //       ...Array.from(
  //         { length: dateDiff },
  //         () =>
  //           ({
  //             date: "",
  //             isPassedDate: true,
  //             rooms: [
  //               {
  //                 merchant_uid: "",
  //                 price: 0,
  //                 reservationState: 1,
  //                 roomId: 0,
  //                 roomName: "",
  //               },
  //             ],
  //           } as MonthRoomData),
  //       ),
  //       ...calendarData,
  //     ]);
  //   }
  // }, [calendarData, dateDiff]);

  // useEffect(() => {
  //   console.log(dummyAddedData);
  // }, [dummyAddedData]);

  // const handleDateClick = (day: number) => {
  //   // const currentYear = currentDate.getFullYear();
  //   // const currentMonth = currentDate.getMonth();
  //   // 향후 Date type으로 다음과 같이 넘겨줄 수 있음
  //   // new Date(currentDate.getFullYear(), currentDate.getMonth(), day)
  //   // const selectedDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);

  //   /*
  //     날짜 Click 시 start/end 규칙
  //     1. startDate 없음 -> set start
  //     2. startDate 있는데 선택한 날짜가 그보다 앞 -> set start
  //     3. startDate 있는데 선택한 날짜가 그보다 뒤 -> set end
  //     4. 선택한 날짜가 이미 선택된 start || end -> cancel start || end
  //   */

  //   // Date type 끼리의 동등 비교 연산자(===)는 값이 아닌 참조로 비교하기 때문에 '서로 다른 메모리에 저장되어 있음'으로 판명되어 항상 false 반환함
  //   // 따라서 아래와 같이 비교해야함
  //   // if (startDate && startDate.getTime() === selectedDate.getTime()) {
  //   //   setStartDate(null);
  //   //   return;
  //   // }
  //   // if (endDate && endDate.getTime() === selectedDate.getTime()) {
  //   //   setEndDate(null);
  //   //   return;
  //   // }
  //   // if (startDate === null || startDate > selectedDate || (endDate !== null && endDate > selectedDate)) {
  //   //   setStartDate(dayjs(currentDate).set('date', day));
  //   // } else {
  //   //   setEndDate(new Date(currentDate.getFullYear(), currentDate.getMonth(), day));
  //   // }
  //   console.log(dayjs(currentDate).set("day", day));
  // };

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
          {Array.from({ length: 6 }, (_, i) => (
            <tr key={i}>
              {Array.from({ length: 7 }, (__, j) => {
                const day = 7 * i + j + 1 - getFirstDayOfMonth(currentDate.get("M"), currentDate.get("year"));
                if (day > 0 && day <= getDaysInMonth(currentDate.get("M"), currentDate.get("year"))) {
                  return (
                    <td
                      key={j}
                      onClick={() => handleDateClick(day, currentDate)}
                      aria-hidden="true"
                      // className={selectedDate.getDate() === day ? "selected" : ""}
                      className={
                        cn()
                        // startDate?.getDate() === day && "selected",
                        // endDate?.getDate() === day && "selected",
                        // startDate && startDate.getDate() < day && endDate && endDate.getDate() > day && "between-day",
                        // dummyAddedData && dummyAddedData[day - 1].isPassedDate && "passed-date",
                        // data[day - 1].isPassedDate && data[day - 1].isPassedDate && "passed-date",
                      }
                    >
                      <div>{day}</div>
                      {/* <div>
                        {dayjs(currentDate)
                          .add(day - 1, "day")
                          .format("YYYY-MM-DD")}
                      </div>
                      <div>{data && data[day - 1].date}</div> */}
                      {/* {data[day - 1].isPassedDate && !data[day - 1].isPassedDate && (
                        <>
                          <div>{data && !data[day - 1].isPassedDate && data[day - 1].rooms[0].price}</div>
                          <ul className={cn("room-list")}>
                            <li
                              className={cn("room-item", data[day - 1].rooms[0].reservationState === 0 && "available")}
                            >
                              A
                            </li>
                            <li
                              className={cn("room-item", data[day - 1].rooms[1].reservationState === 0 && "available")}
                            >
                              B
                            </li>
                          </ul>
                        </>
                      )} */}
                      {/* {dummyAddedData && !dummyAddedData[day - 1].isPassedDate && (
                        <>
                          <div>
                            {dummyAddedData &&
                              !dummyAddedData[day - 1].isPassedDate &&
                              dummyAddedData[day - 1].rooms[0].price}
                          </div>
                          <ul className={cn("room-list")}>
                            <li
                              className={cn(
                                "room-item",
                                dummyAddedData[day - 1].rooms[0].reservationState === 0 && "available",
                              )}
                            >
                              A
                            </li>
                            <li
                              className={cn(
                                "room-item",
                                dummyAddedData[day - 1].rooms[1].reservationState === 0 && "available",
                              )}
                            >
                              B
                            </li>
                          </ul>
                        </>
                      )} */}
                      {/* {day} */}
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
