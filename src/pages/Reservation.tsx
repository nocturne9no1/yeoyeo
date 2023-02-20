import cn from "classnames";

import DatePicker from "@components/reservation/date-picker/DatePicker";
import CustomerForm from "@components/reservation/CustomerForm";

function Reservation() {
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
