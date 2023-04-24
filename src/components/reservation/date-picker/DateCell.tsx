import { useState, useEffect } from "react";
import cn from "classnames";
import dayjs from "dayjs";
import { useAtom } from "jotai";
import modalStatus from "src/state/modalStatus";

import RoomSelectModal from "./RoomSelectModal";

function DateCell({
  day,
  data,
  cellData,
  handleDateClick,
  startDate,
  endDate,
  currentDate,
  selectedRoom,
  setSelectedRoom,
}: DateCellProps) {
  const [isModal, setIsModal] = useState<boolean>(false);
  const [modalOpen, setModalOpen] = useAtom(modalStatus);

  // const [canReserve, setCanReserve] = useState<boolean>(true);
  const cellDate = dayjs(currentDate).set("date", day);
  const [checkoutDate, setCheckoutDate] = useState<any | null>(null);

  const isPastAsSelectedDate = dayjs() < cellDate && startDate && cellDate < startDate;
  const isAfterAsSelectedDate = endDate && cellDate > endDate;
  const afterCheckoutDate = checkoutDate !== null && checkoutDate.isBefore(cellDate, "date");

  // TODO: useContext datePicker에 생성. Provider로 내려주기.
  const handleCellClick = () => {
    console.log("현재startDate", startDate, "현재CheckoutDate", checkoutDate);
    if (startDate === null && cellData && selectedRoom === "A" && cellData[0].reservationState === 1) return;
    if (startDate === null && cellData && selectedRoom === "B" && cellData[1].reservationState === 1) return;
    if (startDate === null && cellData && cellData[0].reservationState === 1 && cellData[1].reservationState === 1)
      return;
    console.log("a", isPastAsSelectedDate);
    if (isPastAsSelectedDate || isAfterAsSelectedDate) return;
    if (afterCheckoutDate) return;
    console.log("b");
    if (
      cellData[0].reservationState === 0 &&
      cellData[1].reservationState === 0 &&
      !isAfterAsSelectedDate &&
      !isPastAsSelectedDate &&
      !modalOpen &&
      !isModal &&
      selectedRoom === null
    ) {
      setModalOpen(true);
      setIsModal(true);
      return;
    }
    if (!(dayjs() > dayjs(currentDate).set("date", day) && "passed-date")) {
      // handleDateClick(day, currentDate);
      // A방만 예약된 경우 => B방으로 설정
      // B방만 예약된 경우 => A방으로 설정
      // 두 방 모두 예약된 경우 => startDate로 선택불가, 체크아웃만 가능
      if (cellData[0].reservationState === 1 && cellData[1].reservationState === 0) {
        handleDateClick(day, currentDate);
        if (selectedRoom !== "A") {
          // 체크아웃으로 선택되지않을경우 => B로 선택
          setSelectedRoom("B");
        }
      } else if (cellData[0].reservationState === 0 && cellData[1].reservationState === 1) {
        handleDateClick(day, currentDate);
        if (selectedRoom !== "B") {
          setSelectedRoom("A");
        }
      } else if (startDate !== null && cellData[0].reservationState === 1 && cellData[1].reservationState === 1) {
        handleDateClick(day, currentDate);
        // setCanReserve(false);
      } else handleDateClick(day, currentDate);
    }
  };

  useEffect(() => {
    if (!modalOpen) {
      setIsModal(false);
    }
  }, [modalOpen]);

  useEffect(() => {
    if (startDate && selectedRoom !== null) {
      const roomNum = selectedRoom === "A" ? 0 : 1;
      const index = data.findIndex((e) => e.date === startDate.format("YYYY-MM-DD"));
      const reserved = data.slice(index).find(({ rooms }) => rooms[roomNum].reservationState);
      if (reserved) {
        setCheckoutDate(dayjs(reserved.date));
      } else {
        setCheckoutDate(null);
      }
    } else {
      setCheckoutDate(null);
    }
  }, [data, selectedRoom, startDate]);

  const isPassed = dayjs() > dayjs(currentDate).set("date", day);

  return (
    <td
      key={day}
      onClick={isPassed ? (e) => e.preventDefault() : () => handleCellClick()}
      aria-hidden="true"
      // className={selectedDate.getDate() === day ? "selected" : ""}
      className={cn(
        (cellDate.isSame(startDate) || cellDate.isSame(endDate)) && "selected",
        startDate && startDate < cellDate && endDate && endDate > cellDate && "between-day",
        isPassed && "passed-date",
        isModal && "room-selecting",

        // canReserve === false && "passed-date",
        isPastAsSelectedDate && "passed-date",
        isAfterAsSelectedDate && "passed-date",

        cellData && cellData[0].reservationState === 1 && cellData[1].reservationState === 1 && "checkout-only",

        ((cellData && selectedRoom === "A" && cellData[0].reservationState === 1) ||
          (cellData && selectedRoom === "B" && cellData[1].reservationState === 1)) &&
          !isPassed &&
          !isPastAsSelectedDate &&
          !isAfterAsSelectedDate &&
          "checkout-only",

        startDate &&
          !cellDate.isSame(checkoutDate, "date") &&
          ((cellData && selectedRoom === "A" && cellData[0].reservationState === 1) ||
            (cellData && selectedRoom === "B" && cellData[1].reservationState === 1)) &&
          cellData &&
          cellData[0].reservationState === 1 &&
          cellData[1].reservationState === 1 &&
          !isPassed &&
          !isPastAsSelectedDate &&
          !isAfterAsSelectedDate &&
          "passed-date",

        afterCheckoutDate && "passed-date",
      )}
    >
      <div className={cn("day")}>{day}</div>
      {cellData && (
        <>
          {/* <div>{!data[day - 1] && data[day - 1].rooms[0].price}</div> */}
          <ul className={cn("room-list")}>
            {/* {selectedRoom} */}
            {!isPassed && (selectedRoom === "A" || selectedRoom === null) && (
              <li className={cn("room-item", cellData[0].reservationState === 0 && "available")}>
                <strong className={cn("room-name")}>A</strong>
                <span className={cn("price")}>{cellData[0].price / 10000}</span>
              </li>
            )}
            {cellData[1].reservationState === 0 && !isPassed && (selectedRoom === "B" || selectedRoom === null) && (
              <li className={cn("room-item", cellData[1].reservationState === 0 && "available")}>
                <strong className={cn("room-name")}>B</strong>
                <span className={cn("price")}>{cellData[1].price / 10000}</span>
              </li>
            )}
          </ul>
        </>
      )}
      {isModal && (
        <RoomSelectModal setSelectedRoom={setSelectedRoom} setIsModal={setIsModal} handleCellClick={handleCellClick} />
      )}
    </td>
  );
}

export default DateCell;
