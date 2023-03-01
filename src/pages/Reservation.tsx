// import { useEffect } from "react";
import cn from "classnames";
// import axios from "axios";

import DatePicker from "@components/reservation/date-picker/DatePicker";
import CustomerForm from "@components/reservation/CustomerForm";
// import { useState } from "react";
import ReservationSidebar from "@components/reservation/ReservationSidebar";
// import { useEffect } from "react";

function Reservation() {
  const accommodationPeriod = (Number(new Date()) - Number(new Date())) / 1000 / 60 / 60 / 24;

  function callBack(response: any) {
    const {
      success,
      // merchant_uid,
      // eslint-disable-next-line @typescript-eslint/naming-convention
      error_msg,
    } = response;

    if (success) {
      alert("결제 성공");
    } else {
      alert(`결제 실패: ${error_msg}`);
    }
  }
  function onClickPayment() {
    try {
      /* 1. 가맹점 식별하기 */
      const { IMP } = window;
      IMP.init("imp28607423");

      /* 2. 결제 데이터 정의하기 */
      const data = {
        pg: "nice",
        // pg: "kakaopay"
        pay_method: "card",
        merchant_uid: "20230302101test", // 고유 주문번호 (날짜+방)
        name: "여여 결제 테스트",
        amount: 10000, // 결제금액
        buyer_email: "toto9091@naver.com",
        buyer_name: "박정웅",
        buyer_tel: "010-1234-7777",
        buyer_addr: "서울특별시 강남구 신사동",
        buyer_postcode: "01181",
      };

      IMP.request_pay(data, callBack);
    } catch (e) {
      console.log(e);
    }
  }
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
      <button type="button" onClick={() => onClickPayment()}>
        결제하기
      </button>
    </div>
  );
}

export default Reservation;
