// import { useState, useEffect } from "react";
import cn from "classnames";
// import axios from "axios";

import DatePicker from "@components/reservation/date-picker/DatePicker";
import CustomerForm from "@components/reservation/CustomerForm";
// import { useState } from "react";
import ReservationSidebar from "@components/reservation/ReservationSidebar";

function Reservation() {
  // const [calendarData, setCalendarData] = useState<MonthRoomData[]>();

  // useEffect(() => {
  //   axios({
  //     method: "get",
  //     url: "http://3.35.98.5:8080/dateroom/2023/2",
  //   }).then((res) => setCalendarData(res.data));
  // }, []); 

  // const [startDate, setStartDate] = useState<Date | null>(null);
  // const [endDate, setEndDate] = useState<Date | null>(null);
  // const accommodationPeriod = ((Number(endDate) - Number(startDate)) / 1000 / 60 / 60 / 24 );
  const accommodationPeriod = ((Number(new Date()) - Number(new Date())) / 1000 / 60 / 60 / 24 );
  // const [defaultFeePerDay, setDefaultFeePerDay] = useState<number | null>(null);

  return (
    <div className={cn("reservation-wrap")}>
      <div className={cn("reservation-inner")}>
        Reservation
        {/* <DatePicker startDate={startDate} setStartDate={setStartDate} endDate={endDate} setEndDate={setEndDate} setDefaultFeePerDay={setDefaultFeePerDay}/> */}
        <DatePicker />
        <div style={{display:'flex'}}>
        <CustomerForm />

        <ReservationSidebar
          startDate={new Date()}
          endDate={new Date()}
          accommodationPeriod={accommodationPeriod}
          defaultFeePerDay={200}
        />
        </div>
      </div>
    </div>
  );
}

export default Reservation;
