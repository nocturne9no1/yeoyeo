import InputForm from "@components/common/InputForm";
// import axios from "axios";
import cn from "classnames";
import dayjs from "dayjs";
import "dayjs/locale/ko";
import ReservationInfo from "./ReservationInfo";

interface ReservationSidebarProps {
  startDate?: Date | null;
  endDate?: Date | null;
  accommodationPeriod: number;
  defaultFeePerDay: number | null;
  onClickPayment: ()=>void;
}
// const dayOftheWeek = ['일요일', '월요일', '화요일', '수요일', '목요일', '금요일', '토요일'];

function ReservationSidebar({ startDate, endDate, accommodationPeriod, defaultFeePerDay, onClickPayment }: ReservationSidebarProps) {
  dayjs.locale('ko');
  const sD = '2023-02-12';
  const eD = '2023-02-15';
  const tmpStartDate = dayjs(sD).format(`YYYY년 MM월 DD일(ddd)`);
  const tmpEndDate = dayjs(eD).format(`YYYY년 MM월 DD일(ddd)`);
  const diffDate = dayjs(eD).diff(sD, 'day');
  const weekDayPrice = 200000;
  const weekEndPrice = 280000;
  console.log(tmpStartDate, tmpEndDate, typeof tmpStartDate);
  console.log('차이확인', diffDate);
  console.log(startDate, endDate,accommodationPeriod, defaultFeePerDay );

  // const handlePayment = () => {
  //   const data = {
  //     dateRoomIdList: [
  //       "string"
  //     ],
  //     email: "email@gmail.com",
  //     guestCount: 1,
  //     name: "김명준",
  //     phoneNumber: "010-3974-3823",
  //     request: "확인합니당"
  //   }

  //   axios({
  //     method: 'post',
  //     url: 'http://3.35.98.5:8080/reservation/reserve',
  //     headers: { "Content-Type": 'application/json'},
  //     data: JSON.stringify(data),
  //   }) 
  //     .then((res) => console.log('aaaaaaaaa', res))
  //     .catch((err) => console.log('err', err))
  // }

    return (
        <div className={cn("reservation-sidebar-wrap")}>

          <strong style={{fontSize: 24, fontWeight: 600}}>방A, 방A의 이름</strong>

          <InputForm title="예약날짜">
            <div className={cn("reservation-info-box")}>
              <ReservationInfo left="체크인" right={tmpStartDate} />
              <ReservationInfo left="체크아웃" right={tmpEndDate} />
              <div className={cn("border-line")}/>
              <ReservationInfo left="숙박기간" right={`총 ${diffDate}박 ${diffDate + 1}일`} isLast/>
              {/* <span style={{display:'block', textAlign: 'end', fontWeight: 700}}>총 {diffDate}박 {diffDate + 1}일</span> */}
            </div>
          </InputForm>

          <InputForm title="요금">
            <div className={cn("reservation-info-box")}>
              <ReservationInfo left="주중" middle={`${weekDayPrice.toLocaleString()}원 * 2`} right={`+ ${(weekDayPrice * 2).toLocaleString()}원`} />
              <ReservationInfo left="주말" middle={`${weekEndPrice.toLocaleString()}원 * 1`} right={`+ ${(weekEndPrice * 1).toLocaleString()}원`} />
              <ReservationInfo left="부가세(VAT별도)" middle={`${((weekDayPrice * 2 + weekEndPrice * 1) * 0.1).toLocaleString()}원`} right={`+ ${((weekDayPrice * 2 + weekEndPrice * 1) * 0.1).toLocaleString()}원`} />
              <ReservationInfo left="연박할인" middle={`${diffDate >= 3 ? `10,000원 * ${(diffDate - 2).toLocaleString()}` : '-' }`} right={`${diffDate >= 3 ? `- ${(10000 * (diffDate - 2)).toLocaleString()}원` : '-' }`} />
              <div className={cn("border-line")}/>
              <ReservationInfo left="총액" right={`총 ${(weekDayPrice * 2 + weekEndPrice * 1 + ((weekDayPrice * 2 + weekEndPrice * 1) * 0.1) - (10000 * (diffDate - 2))).toLocaleString()}원`} isLast/>
            </div>
          </InputForm>
          
          <button type="button" className={cn("reservation-button")} onClick={()=>onClickPayment()}>예약하기</button>

        </div>

          // <div className={cn("reservation-sidebar")}>
          //   <div className={cn("information-default")}>
          //     <strong style={{display: 'block'}}>예약날짜</strong>
          //     <span>체크인 {startDate?.toDateString()}</span>
          //     <span> ~ </span>
          //     <span>체크아웃 {endDate?.toDateString()}</span>
          //     {startDate && endDate
          //       ? <span> 총 ({accommodationPeriod}박 {accommodationPeriod + 1}일)</span>
          //       : null}
          //   </div>

          //   <button type="button">
          //     예약하기
          //   </button>

          //   <div className={cn("price-summary")}>
          //     <strong>요금</strong>
          //     <span>₩{(defaultFeePerDay && defaultFeePerDay*accommodationPeriod)?.toLocaleString()}</span>
          //   </div>
          // </div>
    )
}

export default ReservationSidebar;