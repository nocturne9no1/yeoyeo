// import { useEffect } from "react";
import cn from "classnames";
// import axios from "axios";

import DatePicker from "@components/reservation/date-picker/DatePicker";
import CustomerForm from "@components/reservation/CustomerForm";

function Reservation() {
  // const [calendarData, setCalendarData] = useState<MonthRoomData[]>();

  return (
    <div className={cn("reservation-wrap")}>
      <div className={cn("reservation-inner")}>
        Reservation
        <DatePicker />
        <CustomerForm />
      </div>
    </div>
  );
}

export default Reservation;
