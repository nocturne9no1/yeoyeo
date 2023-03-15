import { useState, useEffect } from "react";
import cn from "classnames";
import dayjs, { Dayjs } from "dayjs";
import axios from "axios";

import Calendar from "./Calendar";

function DatePicker({ startDate, setStartDate, endDate, setEndDate, setPeriodData }: DatePickerProps) {
  const [currentDate, setCurrentDate] = useState(dayjs().set("date", 1));
  const [nextMonth, setNextMonth] = useState(dayjs(currentDate).add(1, "month"));
  const [roomMonthData, setRoomMonthData] = useState<MonthRoomData>({} as MonthRoomData);
  const [selectedRoom, setSelectedRoom] = useState<"A" | "B" | null>(null);

  const handlePrevMonth = () => {
    if (currentDate < dayjs().set("date", 1)) return;
    setCurrentDate((prevState) => dayjs(prevState).add(-1, "month").set("date", 1));
  };
  const handleNextMonth = () => setCurrentDate((prevState) => dayjs(prevState).add(1, "month").set("date", 1));

  useEffect(() => {
    setNextMonth(dayjs(currentDate).add(1, "month"));
  }, [currentDate]);

  useEffect(() => {
    axios({
      method: "get",
      url: `http://3.35.98.5:8080/dateroom/${currentDate.get("year")}/${currentDate.get("month") + 1}`,
    }).then((res) => {
      setRoomMonthData(res.data);
    });
  }, [currentDate]);

  // TODO: start/end date 모두 설정 시 데이터 계산해서 넘겨주기
  useEffect(() => {
    if (startDate && endDate) {
      console.log(startDate);
      axios({
        method: "get",
        url: `http://3.35.98.5:8080/dateroom/price/1/${startDate.format("YYYYMMDD")}/${endDate.format("YYYYMMDD")}`,
      }).then((res) => setPeriodData(res.data));
    }
  }, [startDate, endDate, setPeriodData]);

  const handleDateClick = (day: number, date: Dayjs) => {
    const selectedDate = dayjs(date).set("date", day);
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

  const resetSelect = () => {
    setStartDate(null);
    setEndDate(null);
    setSelectedRoom(null);
  };

  return (
    <div className={cn("date-picker-wrap")}>
      <button type="button" onClick={() => resetSelect()}>
        초기화
      </button>
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
