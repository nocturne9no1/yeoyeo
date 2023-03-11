import { useState, useEffect } from "react";
import cn from "classnames";
import dayjs from "dayjs";
import { useAtom } from "jotai";
import modalStatus from "src/state/modalStatus";

import RoomSelectModal from "./RoomSelectModal";

function DateCell({
  day,
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

  const handleCellClick = () => {
    if (
      cellData[0].reservationState === 0 &&
      cellData[1].reservationState === 0 &&
      !modalOpen &&
      !isModal &&
      selectedRoom === null
    ) {
      setModalOpen(true);
      setIsModal(true);
      return;
    }
    if (!(dayjs() > dayjs(currentDate).set("date", day) && "passed-date")) {
      handleDateClick(day, currentDate);
    }
  };

  const cellDate = dayjs(currentDate).set("date", day);

  useEffect(() => {
    if (!modalOpen) {
      setIsModal(false);
    }
  }, [modalOpen]);

  return (
    <td
      key={day}
      onClick={() => handleCellClick()}
      aria-hidden="true"
      // className={selectedDate.getDate() === day ? "selected" : ""}
      className={cn(
        (cellDate.isSame(startDate) || cellDate.isSame(endDate)) && "selected",
        startDate && startDate < cellDate && endDate && endDate > cellDate && "between-day",
        dayjs() > dayjs(currentDate).set("date", day) && "passed-date",
        isModal && "room-selecting",
      )}
    >
      <div className={cn("day")}>{day}</div>
      {cellData && (
        <>
          {/* <div>{!data[day - 1] && data[day - 1].rooms[0].price}</div> */}
          <ul className={cn("room-list")}>
            {/* {selectedRoom} */}
            {(selectedRoom === "A" || selectedRoom === null) && (
              <li className={cn("room-item", cellData[0].reservationState === 0 && "available")}>A</li>
            )}
            {(selectedRoom === "B" || selectedRoom === null) && (
              <li className={cn("room-item", cellData[1].reservationState === 0 && "available")}>B</li>
            )}
          </ul>
        </>
      )}
      {isModal && <RoomSelectModal setSelectedRoom={setSelectedRoom} setIsModal={setIsModal} />}
    </td>
  );
}

export default DateCell;
