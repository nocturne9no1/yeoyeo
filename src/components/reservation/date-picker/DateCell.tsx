import cn from "classnames";

function DateCell({ day, cellStatus, cellData, handleDateClick }: DateCellProps) {
  return (
    <td
      onClick={() => handleDateClick(day)}
      aria-hidden
      className={cn(cellStatus, cellData.reservationState === 1 && "reserved")}
    >
      {cellStatus === "out-range" && (
        <>
          <span className={cn("day")}>{day}</span>
          <div className={cn("room-wrap")}>{}</div>
        </>
      )}
    </td>
  );
}

export default DateCell;
