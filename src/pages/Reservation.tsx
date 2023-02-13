import cn from "classnames";

import DatePicker from "@components/reservation/date-picker/DatePicker";

function Reservation() {
  return (
    <div className={cn("reservation-wrap")}>
      <div className={cn("reservation-inner")}>
        Reservation
        <DatePicker />
      </div>
    </div>
  );
}

export default Reservation;
