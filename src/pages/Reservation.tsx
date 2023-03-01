// import { useEffect } from "react";
import cn from "classnames";
// import axios from "axios";

import DatePicker from "@components/reservation/date-picker/DatePicker";
import CustomerForm from "@components/reservation/CustomerForm";
// import { useState } from "react";
import ReservationSidebar from "@components/reservation/ReservationSidebar";

function Reservation() {
  const accommodationPeriod = (Number(new Date()) - Number(new Date())) / 1000 / 60 / 60 / 24;

  return (
    <div className={cn("reservation-wrap")}>
      <div className={cn("reservation-inner")}>
        Reservation
        <DatePicker />
        <div className={cn("reservation-form-wrap")}>
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
