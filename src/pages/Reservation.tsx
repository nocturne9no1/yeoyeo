// import { useState, useEffect } from "react";
import cn from "classnames";
// import axios from "axios";

import DatePicker from "@components/reservation/date-picker/DatePicker";
import CustomerForm from "@components/reservation/CustomerForm";

function Reservation() {
  // const [calendarData, setCalendarData] = useState<MonthRoomData[]>();

  // useEffect(() => {
  //   axios({
  //     method: "get",
  //     url: "http://3.35.98.5:8080/dateroom/2023/2",
  //   }).then((res) => setCalendarData(res.data));
  // }, []);

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
