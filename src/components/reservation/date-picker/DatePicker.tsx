import { useState, useEffect } from "react";
import cn from "classnames";
import dayjs, { Dayjs } from "dayjs";
import axios from "axios";

import Calendar from "./Calendar";

// const Dummy1: MonthRoomData[] = [
//   {
//     date: "2023-02-01",
//     isPassedDate: true,
//     rooms: [],
//   },
//   {
//     date: "2023-02-02",
//     isPassedDate: true,
//     rooms: [],
//   },
//   {
//     date: "2023-02-03",
//     isPassedDate: true,
//     rooms: [],
//   },
//   {
//     date: "2023-02-04",
//     isPassedDate: true,
//     rooms: [],
//   },
//   {
//     date: "2023-02-05",
//     isPassedDate: true,
//     rooms: [],
//   },
//   {
//     date: "2023-02-06",
//     isPassedDate: true,
//     rooms: [],
//   },
//   {
//     date: "2023-02-07",
//     isPassedDate: true,
//     rooms: [],
//   },
//   {
//     date: "2023-02-08",
//     isPassedDate: true,
//     rooms: [],
//   },
//   {
//     date: "2023-02-09",
//     isPassedDate: true,
//     rooms: [],
//   },
//   {
//     date: "2023-02-10",
//     isPassedDate: true,
//     rooms: [],
//   },
//   {
//     date: "2023-02-11",
//     isPassedDate: true,
//     rooms: [],
//   },
//   {
//     date: "2023-02-12",
//     isPassedDate: true,
//     rooms: [],
//   },
//   {
//     date: "2023-02-13",
//     isPassedDate: true,
//     rooms: [],
//   },
//   {
//     date: "2023-02-14",
//     isPassedDate: true,
//     rooms: [],
//   },
//   {
//     date: "2023-02-15",
//     isPassedDate: true,
//     rooms: [],
//   },
//   {
//     date: "2023-02-16",
//     isPassedDate: true,
//     rooms: [],
//   },
//   {
//     date: "2023-02-17",
//     isPassedDate: true,
//     rooms: [],
//   },
//   {
//     date: "2023-02-18",
//     isPassedDate: true,
//     rooms: [],
//   },
//   {
//     date: "2023-02-19",
//     isPassedDate: true,
//     rooms: [],
//   },
//   {
//     date: "2023-02-20",
//     isPassedDate: true,
//     rooms: [],
//   },
//   {
//     date: "2023-02-21",
//     isPassedDate: true,
//     rooms: [],
//   },
//   {
//     date: "2023-02-22",
//     isPassedDate: true,
//     rooms: [],
//   },
//   {
//     date: "2023-02-23",
//     isPassedDate: true,
//     rooms: [],
//   },
//   {
//     date: "2023-02-24",
//     isPassedDate: true,
//     rooms: [],
//   },
//   {
//     date: "2023-02-25",
//     rooms: [
//       {
//         merchant_uid: "2023022511test",
//         roomId: 1,
//         roomName: "A호실",
//         price: 300000,
//         reservationState: 1,
//       },
//       {
//         merchant_uid: "2023022521test",
//         roomId: 2,
//         roomName: "B호실",
//         price: 300000,
//         reservationState: 1,
//       },
//     ],
//   },
//   {
//     date: "2023-02-26",
//     rooms: [
//       {
//         merchant_uid: "2023022612test",
//         roomId: 1,
//         roomName: "A호실",
//         price: 250000,
//         reservationState: 1,
//       },
//       {
//         merchant_uid: "2023022620test",
//         roomId: 2,
//         roomName: "B호실",
//         price: 250000,
//         reservationState: 0,
//       },
//     ],
//   },
//   {
//     date: "2023-02-27",
//     rooms: [
//       {
//         merchant_uid: "2023022710test",
//         roomId: 1,
//         roomName: "A호실",
//         price: 250000,
//         reservationState: 0,
//       },
//       {
//         merchant_uid: "2023022720test",
//         roomId: 2,
//         roomName: "B호실",
//         price: 250000,
//         reservationState: 0,
//       },
//     ],
//   },
//   {
//     date: "2023-02-28",
//     rooms: [
//       {
//         merchant_uid: "2023022810test",
//         roomId: 1,
//         roomName: "A호실",
//         price: 300000,
//         reservationState: 0,
//       },
//       {
//         merchant_uid: "2023022820test",
//         roomId: 2,
//         roomName: "B호실",
//         price: 300000,
//         reservationState: 0,
//       },
//     ],
//   },
// ];
// const Dummy2: MonthRoomData[] = [
//   {
//     date: "2023-03-01",
//     rooms: [
//       {
//         merchant_uid: "2023030110test",
//         roomId: 1,
//         roomName: "A호실",
//         price: 250000,
//         reservationState: 0,
//       },
//       {
//         merchant_uid: "2023030120test",
//         roomId: 2,
//         roomName: "B호실",
//         price: 250000,
//         reservationState: 0,
//       },
//     ],
//   },
//   {
//     date: "2023-03-02",
//     rooms: [
//       {
//         merchant_uid: "2023030210test",
//         roomId: 1,
//         roomName: "A호실",
//         price: 250000,
//         reservationState: 0,
//       },
//       {
//         merchant_uid: "2023030220test",
//         roomId: 2,
//         roomName: "B호실",
//         price: 250000,
//         reservationState: 0,
//       },
//     ],
//   },
//   {
//     date: "2023-03-03",
//     rooms: [
//       {
//         merchant_uid: "2023030310test",
//         roomId: 1,
//         roomName: "A호실",
//         price: 300000,
//         reservationState: 0,
//       },
//       {
//         merchant_uid: "2023030320test",
//         roomId: 2,
//         roomName: "B호실",
//         price: 300000,
//         reservationState: 0,
//       },
//     ],
//   },
//   {
//     date: "2023-03-04",
//     rooms: [
//       {
//         merchant_uid: "2023030420test",
//         roomId: 2,
//         roomName: "B호실",
//         price: 300000,
//         reservationState: 0,
//       },
//       {
//         merchant_uid: "2023030410test",
//         roomId: 1,
//         roomName: "A호실",
//         price: 300000,
//         reservationState: 0,
//       },
//     ],
//   },
//   {
//     date: "2023-03-05",
//     rooms: [
//       {
//         merchant_uid: "2023030510test",
//         roomId: 1,
//         roomName: "A호실",
//         price: 250000,
//         reservationState: 0,
//       },
//       {
//         merchant_uid: "2023030520test",
//         roomId: 2,
//         roomName: "B호실",
//         price: 250000,
//         reservationState: 0,
//       },
//     ],
//   },
//   {
//     date: "2023-03-06",
//     rooms: [
//       {
//         merchant_uid: "2023030610test",
//         roomId: 1,
//         roomName: "A호실",
//         price: 250000,
//         reservationState: 0,
//       },
//       {
//         merchant_uid: "2023030620test",
//         roomId: 2,
//         roomName: "B호실",
//         price: 250000,
//         reservationState: 0,
//       },
//     ],
//   },
//   {
//     date: "2023-03-07",
//     rooms: [
//       {
//         merchant_uid: "2023030710test",
//         roomId: 1,
//         roomName: "A호실",
//         price: 250000,
//         reservationState: 0,
//       },
//       {
//         merchant_uid: "2023030720test",
//         roomId: 2,
//         roomName: "B호실",
//         price: 250000,
//         reservationState: 0,
//       },
//     ],
//   },
//   {
//     date: "2023-03-08",
//     rooms: [
//       {
//         merchant_uid: "2023030820test",
//         roomId: 2,
//         roomName: "B호실",
//         price: 250000,
//         reservationState: 0,
//       },
//       {
//         merchant_uid: "2023030810test",
//         roomId: 1,
//         roomName: "A호실",
//         price: 250000,
//         reservationState: 0,
//       },
//     ],
//   },
//   {
//     date: "2023-03-09",
//     rooms: [
//       {
//         merchant_uid: "2023030910test",
//         roomId: 1,
//         roomName: "A호실",
//         price: 250000,
//         reservationState: 0,
//       },
//       {
//         merchant_uid: "2023030920test",
//         roomId: 2,
//         roomName: "B호실",
//         price: 250000,
//         reservationState: 0,
//       },
//     ],
//   },
//   {
//     date: "2023-03-10",
//     rooms: [
//       {
//         merchant_uid: "2023031010test",
//         roomId: 1,
//         roomName: "A호실",
//         price: 300000,
//         reservationState: 0,
//       },
//       {
//         merchant_uid: "2023031020test",
//         roomId: 2,
//         roomName: "B호실",
//         price: 300000,
//         reservationState: 0,
//       },
//     ],
//   },
//   {
//     date: "2023-03-11",
//     rooms: [
//       {
//         merchant_uid: "2023031110test",
//         roomId: 1,
//         roomName: "A호실",
//         price: 300000,
//         reservationState: 0,
//       },
//       {
//         merchant_uid: "2023031120test",
//         roomId: 2,
//         roomName: "B호실",
//         price: 300000,
//         reservationState: 0,
//       },
//     ],
//   },
//   {
//     date: "2023-03-12",
//     rooms: [
//       {
//         merchant_uid: "2023031220test",
//         roomId: 2,
//         roomName: "B호실",
//         price: 250000,
//         reservationState: 0,
//       },
//       {
//         merchant_uid: "2023031210test",
//         roomId: 1,
//         roomName: "A호실",
//         price: 250000,
//         reservationState: 0,
//       },
//     ],
//   },
//   {
//     date: "2023-03-13",
//     rooms: [
//       {
//         merchant_uid: "2023031310test",
//         roomId: 1,
//         roomName: "A호실",
//         price: 250000,
//         reservationState: 0,
//       },
//       {
//         merchant_uid: "2023031320test",
//         roomId: 2,
//         roomName: "B호실",
//         price: 250000,
//         reservationState: 0,
//       },
//     ],
//   },
//   {
//     date: "2023-03-14",
//     rooms: [
//       {
//         merchant_uid: "2023031410test",
//         roomId: 1,
//         roomName: "A호실",
//         price: 250000,
//         reservationState: 0,
//       },
//       {
//         merchant_uid: "2023031420test",
//         roomId: 2,
//         roomName: "B호실",
//         price: 250000,
//         reservationState: 0,
//       },
//     ],
//   },
//   {
//     date: "2023-03-15",
//     rooms: [
//       {
//         merchant_uid: "2023031510test",
//         roomId: 1,
//         roomName: "A호실",
//         price: 250000,
//         reservationState: 0,
//       },
//       {
//         merchant_uid: "2023031520test",
//         roomId: 2,
//         roomName: "B호실",
//         price: 250000,
//         reservationState: 0,
//       },
//     ],
//   },
//   {
//     date: "2023-03-16",
//     rooms: [
//       {
//         merchant_uid: "2023031620test",
//         roomId: 2,
//         roomName: "B호실",
//         price: 250000,
//         reservationState: 0,
//       },
//       {
//         merchant_uid: "2023031610test",
//         roomId: 1,
//         roomName: "A호실",
//         price: 250000,
//         reservationState: 0,
//       },
//     ],
//   },
//   {
//     date: "2023-03-17",
//     rooms: [
//       {
//         merchant_uid: "2023031710test",
//         roomId: 1,
//         roomName: "A호실",
//         price: 300000,
//         reservationState: 0,
//       },
//       {
//         merchant_uid: "2023031720test",
//         roomId: 2,
//         roomName: "B호실",
//         price: 300000,
//         reservationState: 0,
//       },
//     ],
//   },
//   {
//     date: "2023-03-18",
//     rooms: [
//       {
//         merchant_uid: "2023031810test",
//         roomId: 1,
//         roomName: "A호실",
//         price: 300000,
//         reservationState: 0,
//       },
//       {
//         merchant_uid: "2023031820test",
//         roomId: 2,
//         roomName: "B호실",
//         price: 300000,
//         reservationState: 0,
//       },
//     ],
//   },
//   {
//     date: "2023-03-19",
//     rooms: [
//       {
//         merchant_uid: "2023031910test",
//         roomId: 1,
//         roomName: "A호실",
//         price: 250000,
//         reservationState: 0,
//       },
//       {
//         merchant_uid: "2023031920test",
//         roomId: 2,
//         roomName: "B호실",
//         price: 250000,
//         reservationState: 0,
//       },
//     ],
//   },
//   {
//     date: "2023-03-20",
//     rooms: [
//       {
//         merchant_uid: "2023032020test",
//         roomId: 2,
//         roomName: "B호실",
//         price: 250000,
//         reservationState: 0,
//       },
//       {
//         merchant_uid: "2023032010test",
//         roomId: 1,
//         roomName: "A호실",
//         price: 250000,
//         reservationState: 0,
//       },
//     ],
//   },
//   {
//     date: "2023-03-21",
//     rooms: [
//       {
//         merchant_uid: "2023032110test",
//         roomId: 1,
//         roomName: "A호실",
//         price: 250000,
//         reservationState: 0,
//       },
//       {
//         merchant_uid: "2023032120test",
//         roomId: 2,
//         roomName: "B호실",
//         price: 250000,
//         reservationState: 0,
//       },
//     ],
//   },
//   {
//     date: "2023-03-22",
//     rooms: [
//       {
//         merchant_uid: "2023032210test",
//         roomId: 1,
//         roomName: "A호실",
//         price: 250000,
//         reservationState: 0,
//       },
//       {
//         merchant_uid: "2023032220test",
//         roomId: 2,
//         roomName: "B호실",
//         price: 250000,
//         reservationState: 0,
//       },
//     ],
//   },
//   {
//     date: "2023-03-23",
//     rooms: [
//       {
//         merchant_uid: "2023032310test",
//         roomId: 1,
//         roomName: "A호실",
//         price: 250000,
//         reservationState: 0,
//       },
//       {
//         merchant_uid: "2023032320test",
//         roomId: 2,
//         roomName: "B호실",
//         price: 250000,
//         reservationState: 0,
//       },
//     ],
//   },
//   {
//     date: "2023-03-24",
//     rooms: [
//       {
//         merchant_uid: "2023032420test",
//         roomId: 2,
//         roomName: "B호실",
//         price: 300000,
//         reservationState: 0,
//       },
//       {
//         merchant_uid: "2023032410test",
//         roomId: 1,
//         roomName: "A호실",
//         price: 300000,
//         reservationState: 0,
//       },
//     ],
//   },
//   {
//     date: "2023-03-25",
//     rooms: [
//       {
//         merchant_uid: "2023032510test",
//         roomId: 1,
//         roomName: "A호실",
//         price: 300000,
//         reservationState: 0,
//       },
//       {
//         merchant_uid: "2023032520test",
//         roomId: 2,
//         roomName: "B호실",
//         price: 300000,
//         reservationState: 0,
//       },
//     ],
//   },
//   {
//     date: "2023-03-26",
//     rooms: [
//       {
//         merchant_uid: "2023032610test",
//         roomId: 1,
//         roomName: "A호실",
//         price: 250000,
//         reservationState: 0,
//       },
//       {
//         merchant_uid: "2023032620test",
//         roomId: 2,
//         roomName: "B호실",
//         price: 250000,
//         reservationState: 0,
//       },
//     ],
//   },
//   {
//     date: "2023-03-27",
//     rooms: [
//       {
//         merchant_uid: "2023032710test",
//         roomId: 1,
//         roomName: "A호실",
//         price: 250000,
//         reservationState: 0,
//       },
//       {
//         merchant_uid: "2023032720test",
//         roomId: 2,
//         roomName: "B호실",
//         price: 250000,
//         reservationState: 0,
//       },
//     ],
//   },
//   {
//     date: "2023-03-28",
//     rooms: [
//       {
//         merchant_uid: "2023032820test",
//         roomId: 2,
//         roomName: "B호실",
//         price: 250000,
//         reservationState: 0,
//       },
//       {
//         merchant_uid: "2023032810test",
//         roomId: 1,
//         roomName: "A호실",
//         price: 250000,
//         reservationState: 0,
//       },
//     ],
//   },
//   {
//     date: "2023-03-29",
//     rooms: [
//       {
//         merchant_uid: "2023032910test",
//         roomId: 1,
//         roomName: "A호실",
//         price: 250000,
//         reservationState: 0,
//       },
//       {
//         merchant_uid: "2023032920test",
//         roomId: 2,
//         roomName: "B호실",
//         price: 250000,
//         reservationState: 0,
//       },
//     ],
//   },
//   {
//     date: "2023-03-30",
//     rooms: [
//       {
//         merchant_uid: "2023033010test",
//         roomId: 1,
//         roomName: "A호실",
//         price: 250000,
//         reservationState: 0,
//       },
//       {
//         merchant_uid: "2023033020test",
//         roomId: 2,
//         roomName: "B호실",
//         price: 250000,
//         reservationState: 0,
//       },
//     ],
//   },
//   {
//     date: "2023-03-31",
//     rooms: [
//       {
//         merchant_uid: "2023033120test",
//         roomId: 2,
//         roomName: "B호실",
//         price: 300000,
//         reservationState: 0,
//       },
//       {
//         merchant_uid: "2023033110test",
//         roomId: 1,
//         roomName: "A호실",
//         price: 300000,
//         reservationState: 0,
//       },
//     ],
//   },
// ];

function DatePicker() {
  const [startDate, setStartDate] = useState<Dayjs | null>(null);
  const [endDate, setEndDate] = useState<Dayjs | null>(null);
  const [currentDate, setCurrentDate] = useState(dayjs());
  const [nextMonth, setNextMonth] = useState(dayjs(currentDate).add(1, "month"));
  const [roomMonthData, setRoomMonthData] = useState<MonthRoomData>({} as MonthRoomData);
  const [selectedRoom, setSelectedRoom] = useState<"A" | "B" | null>(null);

  const handlePrevMonth = () => setCurrentDate((prevState) => dayjs(prevState).add(-1, "month"));
  const handleNextMonth = () => setCurrentDate((prevState) => dayjs(prevState).add(1, "month"));

  useEffect(() => {
    setNextMonth(dayjs(currentDate).add(1, "month"));
  }, [currentDate]);

  useEffect(() => {
    axios({
      method: "get",
      url: `http://3.35.98.5:8080/dateroom/2023/${currentDate.get("month") + 1}`,
    }).then((res) => setRoomMonthData(res.data));
  }, [currentDate]);

  // useEffect(() => {

  // }, [startDate, endDate])

  const handleDateClick = (day: number, date: Dayjs) => {
    const selectedDate = dayjs(date).set("date", day);
    console.log(day);
    console.log(date);
    console.log(selectedDate);
    /*
      날짜 Click 시 start/end 규칙
      1. startDate 없음 -> set start
      2. startDate 있는데 선택한 날짜가 그보다 앞 -> set start
      3. startDate 있는데 선택한 날짜가 그보다 뒤 -> set end
      4. 선택한 날짜가 이미 선택된 start || end -> cancel start || end
    */

    // Date type 끼리의 동등 비교 연산자(===)는 값이 아닌 참조로 비교하기 때문에 '서로 다른 메모리에 저장되어 있음'으로 판명되어 항상 false 반환함
    // 따라서 아래와 같이 비교해야함
    if (startDate?.isSame(selectedDate)) {
      setStartDate(null);
      return;
    }
    if (endDate?.isSame(selectedDate)) {
      setEndDate(null);
      return;
    }
    if (startDate === null || startDate > selectedDate || (endDate !== null && endDate > selectedDate)) {
      setStartDate(selectedDate);
    } else {
      setEndDate(selectedDate);
    }
  };

  return (
    <div className={cn("date-picker-wrap")}>
      <div className={cn("calendar-header")}>
        <button type="button" onClick={() => handlePrevMonth()}>
          Prev
        </button>
        <button type="button" onClick={() => handleNextMonth()}>
          Next
        </button>
      </div>
      <div className={cn("calender-wrap")}>
        <Calendar
          startDate={startDate}
          endDate={endDate}
          setStartDate={setStartDate}
          setEndDate={setEndDate}
          data={roomMonthData?.month}
          currentDate={currentDate}
          handleDateClick={handleDateClick}
          selectedRoom={selectedRoom}
          setSelectedRoom={setSelectedRoom}
        />
        <Calendar
          startDate={startDate}
          endDate={endDate}
          setStartDate={setStartDate}
          setEndDate={setEndDate}
          data={roomMonthData?.nextMonth}
          currentDate={nextMonth}
          handleDateClick={handleDateClick}
          selectedRoom={selectedRoom}
          setSelectedRoom={setSelectedRoom}
        />
      </div>
      {/* <div>start date: {startDate?.toDateString()}</div>
      <div>end date: {endDate?.toDateString()}</div> */}
      <div className={cn("input-wrap")}>
        <input
          type="text"
          value={startDate?.format("YYYY-MM-DD") || ""}
          // onFocus={() => setFocusedInput("startDate")}
          placeholder="Start Date"
          onChange={() => null}
        />
        <input
          type="text"
          value={endDate?.format("YYYY-MM-DD") || ""}
          // onFocus={() => setFocusedInput("endDate")}
          placeholder="End Date"
          onChange={() => null}
        />
      </div>
    </div>
  );
}

export default DatePicker;
