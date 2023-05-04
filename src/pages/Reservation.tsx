import { useEffect, useRef, useState } from "react";
import cn from "classnames";
import { Dayjs } from "dayjs";

import DatePicker from "@components/reservation/date-picker/DatePicker";
import CustomerForm from "@components/reservation/CustomerForm";
import ReservationSidebar from "@components/reservation/ReservationSidebar";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useAtom } from "jotai";
import modalStatus from "src/state/modalStatus";
import Agreement from "@components/reservation/Agreement";
import { useTranslation } from "react-i18next";
import i18next from "i18next";

function Reservation() {
  const [selectedRoom, setSelectedRoom] = useState<"여유" | "여행" | null>(null);
  const [username, setUsername] = useState<string>("");
  const [userMobileNumber, setUserMobileNumber] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [peopleNumber, setPeopleNumber] = useState<number>(2);
  const [requestedTerm, setRequestedTerm] = useState<string>("");
  const [formCompleted, setFormCompleted] = useState<boolean>(false);
  const [agreementCompleted, setAgreementCompleted] = useState<boolean>(false);

  const navigate = useNavigate();
  const [startDate, setStartDate] = useState<Dayjs | null>(null);
  const [endDate, setEndDate] = useState<Dayjs | null>(null);
  const [periodData, setPeriodData] = useState<PeriodDataType>({} as PeriodDataType);

  const [isModalMask, setIsModalMask] = useAtom(modalStatus);
  const reservationFormRef = useRef<HTMLDivElement>(null);
  const { t } = useTranslation("reservation");

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
        url: "/payment/pay",
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

      /* 2. 결제 데이터 정의하기 */
      const data = {
        pg: "tosspayments",
        pay_method: "card",
        merchant_uid: merchantUid, // 고유 주문번호 (날짜+방)
        name: `한옥스테이 여여 - ${selectedRoom}`,
        amount: peopleNumber > 2 ? periodData.totalPrice + 30000 * periodData.period : periodData.totalPrice, // 결제금액
        buyer_email: email,
        buyer_name: username,
        buyer_tel: userMobileNumber,
        confirm_url: "https://api.yeoyeo.co.kr/payment/confirm",
        bypass: {
          tosspayments: {
            useInternationalCardOnly: i18next.language === "en" // 영어 결제창 활성화
          }
        },
      };

      IMP.request_pay(data, callBack);
    } catch (e) {
      console.log("error error", e);
    }
  }

  function getReservationId() {
    // [o]TODO: CustomerForm.tsx에 있는 state 옮기기
    const dateRoomIdList: string[] = [];
    periodData.infoDtoList.map((item) => dateRoomIdList.push(item.dateRoomId));

    // dataRoomIdList, email, guestCount, name, phoneNumber, request
    const data = {
      dateRoomIdList,
      email,
      guestCount: peopleNumber,
      name: username,
      phoneNumber: userMobileNumber,
      request: requestedTerm,
    };
    axios({
      method: "post",
      url: "/reservation/reserve",
      data,
    })
      .then((res) => {
        console.log("reservation/reserve complete", res);
        onClickPayment(res.data.resultId);
      })
      .catch((err) => console.log("err", err));
  }

  function validCheck() {
    // return // 제거 예정
    if (formCompleted && agreementCompleted) {
      getReservationId();
    } else {
      alert("예약폼완성 및 동의사항을 체크해주세요.");
    }
  }

  return (
    <div className={cn("reservation-wrap")}>
      <div className={cn("reservation-inner")}>
        <h2 className={cn("title")}>Reservation</h2>
        <DatePicker
          startDate={startDate}
          endDate={endDate}
          setStartDate={setStartDate}
          setEndDate={setEndDate}
          setPeriodData={setPeriodData}
          selectedRoom={selectedRoom}
          setSelectedRoom={setSelectedRoom}
          translation={t}
        />
        {startDate && endDate && (
          <>
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
                setCanReserve={setFormCompleted}
                translation={t}
              />
              <ReservationSidebar
                startDate={startDate}
                endDate={endDate}
                periodData={periodData}
                peopleNumber={peopleNumber}
                onClickPayment={() => validCheck()}
                selectedRoom={selectedRoom}
                translation={t}
              />
            </div>
            <Agreement setAgreementCompleted={setAgreementCompleted} />
          </>
        )}
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
