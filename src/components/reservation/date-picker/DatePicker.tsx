import { useState } from "react";
import cn from "classnames";

import Calendar from "./Calendar";

function DatePicker() {
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);

  return (
    <div className={cn("date-picker-wrap")}>
      <Calendar startDate={startDate} endDate={endDate} setStartDate={setStartDate} setEndDate={setEndDate} />
      {/* <div>start date: {startDate?.toDateString()}</div>
      <div>end date: {endDate?.toDateString()}</div> */}
      <div className={cn("input-wrap")}>
        <input
          type="text"
          value={startDate ? startDate.toDateString() : ""}
          // onFocus={() => setFocusedInput("startDate")}
          placeholder="Start Date"
        />
        <input
          type="text"
          value={endDate ? endDate.toDateString() : ""}
          // onFocus={() => setFocusedInput("endDate")}
          placeholder="End Date"
        />
      </div>
    </div>
  );
}

export default DatePicker;
