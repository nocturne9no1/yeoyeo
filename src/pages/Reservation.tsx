import { useEffect, useRef, useState } from "react";
import cn from "classnames";
import { Dayjs } from "dayjs";

import DatePicker from "@components/reservation/date-picker/DatePicker";
import CustomerForm from "@components/reservation/CustomerForm";
import ReservationSidebar from "@components/reservation/ReservationSidebar";
import { useNavigate } from "react-router-dom";
import axios from "axios";
// import { useEffect } from "react";
import { useAtom } from "jotai";
import modalStatus from "src/state/modalStatus";
import Agreement from "@components/reservation/Agreement";

function Reservation() {
  const [username, setUsername] = useState<string>("");
  const [userMobileNumber, setUserMobileNumber] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [peopleNumber, setPeopleNumber] = useState<number>(2);
  const [requestedTerm, setRequestedTerm] = useState<string>("");

  const [canReserve, setCanReserve] = useState<boolean>(false);

  const navigate = useNavigate();
  // const accommodationPeriod = (Number(new Date()) - Number(new Date())) / 1000 / 60 / 60 / 24;
  const [startDate, setStartDate] = useState<Dayjs | null>(null);
  const [endDate, setEndDate] = useState<Dayjs | null>(null);
  const [periodData, setPeriodData] = useState<PeriodDataType>({} as PeriodDataType);

  const [isModalMask, setIsModalMask] = useAtom(modalStatus);
  const reservationFormRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const clientTop = reservationFormRef.current?.getBoundingClientRect().top;
    if (periodData) {
      window.scrollTo({
        top: clientTop! - 73,
        behavior: "smooth",
      });
    }
  }, [periodData]);

  function callBack(response: any) {
    const {
      success,
      // merchant_uid,
      // eslint-disable-next-line @typescript-eslint/naming-convention
      error_msg,
    } = response;

    if (success) {
      alert("결제 성공");
      // const postData = {
      //   dateRoomId: "string",
      //   email: response.buyer_email,
      //   guestCount: peopleNumber,
      //   imp_uid: response.imp_uid,
      //   merchant_uid: response.merchant_uid,
      //   name: response.buyer_name,
      //   phoneNumber: response.buyer_tel,
      //   request: "string",
      // };
      // // {
      // //   "imp_uid": "string",
      // //   "merchant_uid": 0
      // // }
      // console.log(postData);
      navigate("/intro");

      // TODO: 결제 성공 요청 이후 서버에 결제 정보 검증 요청
      axios({
        method: "post",
        url: "http://3.35.98.5:8080/payment/pay",
        data: {
          imp_uid: response.imp_uid,
          merchant_uid: response.merchant_uid,
        },
      })
        .then(() => console.log("결제 ㄹㅇ 완료"))
        .catch(() => console.log("아직 끝난게아님"));
    } else {
      alert(`결제 실패: ${error_msg}`);
    }
  }

  // TODO : 결제모듈 열기전
  function onClickPayment(merchantUid: number) {
    // TODO: 서버에 예약 정보 보낸 뒤 unique_id get

    try {
      /* 1. 가맹점 식별하기 */
      const { IMP } = window;
      IMP.init("imp28607423");

      IMP.init("imp28607423");

      /* 2. 결제 데이터 정의하기 */
      const data = {
        pg: "nice",
        // pg: "kakaopay"
        pay_method: "card",
        merchant_uid: merchantUid, // 고유 주문번호 (날짜+방)
        name: "여여 결제 테스트",
        amount: periodData.totalPrice, // 결제금액
        buyer_email: email,
        buyer_name: username,
        buyer_tel: userMobileNumber,
        // buyer_addr: "서울특별시 강남구 신사동",
        // buyer_postcode: "01181",
        confirm_url: "http://3.35.98.5:8080/payment/confirm",
      };

      IMP.request_pay(data, callBack);
    } catch (e) {
      console.log("error error", e);
    }
  }

  function getReservationId() {
    // TODO: CustomerForm.tsx에 있는 state 옮기기
    // dataRoomIdList, email, guestCount, name, phoneNumber, request
    const data = {
      dateRoomIdList: ["string"],
      email,
      guestCount: peopleNumber,
      name: username,
      phoneNumber: userMobileNumber,
      request: requestedTerm,
    };
    axios({
      method: "post",
      url: "http://3.35.98.5:8080/reservation/reserve",
      data,
    })
      .then((res) => {
        console.log("aaaaaaaaa", res);
        console.log(res.data.resultId, typeof res.data.resultId);
        onClickPayment(res.data.resultId);
      })
      .catch((err) => console.log("err", err));
  }

  function validCheck() {
    if (canReserve) {
      getReservationId();
    } else {
      alert("예약폼확인");
    }
  }

  return (
    <div className={cn("reservation-wrap")}>
      <div className={cn("reservation-inner")}>
        Reservation
        <DatePicker
          startDate={startDate}
          endDate={endDate}
          setStartDate={setStartDate}
          setEndDate={setEndDate}
          setPeriodData={setPeriodData}
        />
        {startDate && endDate && (
          <div ref={reservationFormRef} className={cn("reservation-form-wrap")}>
            <CustomerForm
              username={username}
              setUsername={setUsername}
              userMobileNumber={userMobileNumber}
              setUserMobileNumber={setUserMobileNumber}
              email={email}
              setEmail={setEmail}
              peopleNumber={peopleNumber}
              setPeopleNumber={setPeopleNumber}
              requestedTerm={requestedTerm}
              setRequestedTerm={setRequestedTerm}
              setCanReserve={setCanReserve}
            />
            <ReservationSidebar
              startDate={startDate}
              endDate={endDate}
              periodData={periodData}
              onClickPayment={() => validCheck()}
            />
          </div>
        )}
        <Agreement />
        {/* <div className={cn("reservation-form-wrap")}>약관동의가 들어가야할 부분</div> */}
      </div>
      {isModalMask && (
        <div
          tabIndex={0}
          role="button"
          className={cn("modal-mask")}
          onClick={() => setIsModalMask(false)}
          onKeyDown={() => {}}
          aria-label="close modal"
        />
      )}
    </div>
  );
}

export default Reservation;
