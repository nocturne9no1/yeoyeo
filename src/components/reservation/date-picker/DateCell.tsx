import { useState } from "react";
import cn from "classnames";
import dayjs from "dayjs";
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

  const cellDate = dayjs(currentDate).set("date", day);
  return (
    <td
      key={day}
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
      {cellData && (
        <>
          {/* <div>{!data[day - 1] && data[day - 1].rooms[0].price}</div> */}
          <ul className={cn("room-list")}>
            {selectedRoom}
            {selectedRoom === "A" ||
              (selectedRoom === null && (
                <li className={cn("room-item", cellData[0].reservationState === 0 && "available")}>A</li>
              ))}
            {selectedRoom === "B" ||
              (selectedRoom === null && (
                <li className={cn("room-item", cellData[1].reservationState === 0 && "available")}>B</li>
              ))}
          </ul>
        </>
      )}
      {isModal && <RoomSelectModal setSelectedRoom={setSelectedRoom} setIsModal={setIsModal} />}
    </td>
  );
}

export default DateCell;
