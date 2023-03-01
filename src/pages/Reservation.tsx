// import { useEffect } from "react";
import cn from "classnames";
// import axios from "axios";

import DatePicker from "@components/reservation/date-picker/DatePicker";
import CustomerForm from "@components/reservation/CustomerForm";
// import { useState } from "react";
import ReservationSidebar from "@components/reservation/ReservationSidebar";
import { useNavigate } from "react-router-dom";
import axios from "axios";
// import { useEffect } from "react";

function Reservation() {
  const navigate = useNavigate();
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
      // console.log(response)
      const postData = {
        dateRoomId: "string",
        email: response.buyer_email,
        guestCount: 0,
        imp_uid: response.imp_uid,
        merchant_uid: response.merchant_uid,
        name: response.buyer_name,
        phoneNumber: response.buyer_tel,
        request: "string",
      };

      console.log(postData);
      navigate("/intro");
      // TODO: 결제 성공 요청 이후 서버에 결제 정보 검증 요청
      // axios({
      //   method: 'post',

      // })
    } else {
      alert(`결제 실패: ${error_msg}`);
    }
  }
  // TODO : 결제모듈 열기전
  function onClickPayment() {
    // TODO: 서버에 예약 정보 보낸 뒤 unique_id get

    try {
      /* 1. 가맹점 식별하기 */
      const { IMP } = window;
      IMP.init("imp28607423");

      /* 2. 결제 데이터 정의하기 */
      const data = {
        pg: "nice",
        // pg: "kakaopay"
        pay_method: "card",
        merchant_uid: "2023030210test_m04", // 고유 주문번호 (날짜+방)
        name: "여여 결제 테스트",
        amount: 100, // 결제금액
        buyer_email: "toto9091@naver.com",
        buyer_name: "박정웅",
        buyer_tel: "010-1234-7777",
        buyer_addr: "서울특별시 강남구 신사동",
        buyer_postcode: "01181",
      };

      IMP.request_pay(data, callBack);
    } catch (e) {
      console.log("aaaaaa", e);
    }
  }
  function smsCheck() {
    axios
      .get("http://3.35.98.5:8080/room/show-all")
      .then((res) => console.log("sms response", res))
      .catch((err) => console.log("sms error", err));
  }
  return (
    <div className={cn("reservation-wrap")}>
      <div className={cn("reservation-inner")}>
        Reservation
        <DatePicker />
        <div className={cn("reservation-form-wrap")}>
          <CustomerForm />
          {/* <ReservationSidebar
            startDate={new Date()}
            endDate={new Date()}
            accommodationPeriod={accommodationPeriod}
            defaultFeePerDay={200}
            onClickPayment={() => onClickPayment()}
  /> */}
        </div>
      </div>
      <button type="button" onClick={() => smsCheck()}>
        결제하기
      </button>
    </div>
  );
}

export default Reservation;
