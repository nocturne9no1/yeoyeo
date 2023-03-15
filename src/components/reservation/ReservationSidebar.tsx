import InputForm from "@components/common/InputForm";
// import axios from "axios";
import cn from "classnames";
import dayjs, { Dayjs } from "dayjs";
import "dayjs/locale/ko";
import ReservationInfo from "./ReservationInfo";

interface ReservationSidebarProps {
  startDate?: Dayjs | null;
  endDate?: Dayjs | null;
  periodData: PeriodDataType;
  onClickPayment: () => void;
}
// const dayOftheWeek = ['일요일', '월요일', '화요일', '수요일', '목요일', '금요일', '토요일'];
function ReservationSidebar({ startDate, endDate, periodData, onClickPayment }: ReservationSidebarProps) {
  dayjs.locale("ko");
  const tmpStartDate = dayjs(startDate).format(`YYYY년 MM월 DD일(ddd)`);
  const tmpEndDate = dayjs(endDate).format(`YYYY년 MM월 DD일(ddd)`);

  return (
    <div className={cn("reservation-sidebar-wrap")}>
      <strong style={{ fontSize: 24, fontWeight: 600 }}>방A, 방A의 이름</strong>

      <InputForm title="예약날짜">
        <div className={cn("reservation-info-box")}>
          <ReservationInfo left="체크인" right={tmpStartDate} />
          <ReservationInfo left="체크아웃" right={tmpEndDate} />
          <div className={cn("border-line")} />
          <ReservationInfo left="숙박기간" right={`총 ${periodData.period}박 ${periodData.period + 1}일`} isLast />
        </div>
      </InputForm>

      <InputForm title="요금">
        <div className={cn("reservation-info-box")}>
          {/* <ReservationInfo
            left="주중"
            middle={`${weekDayPrice.toLocaleString()}원 * 2`}
            right={`+ ${(weekDayPrice * 2).toLocaleString()}원`}
          />
          <ReservationInfo
            left="주말"
            middle={`${weekEndPrice.toLocaleString()}원 * 1`}
            right={`+ ${(weekEndPrice * 1).toLocaleString()}원`}
          /> */}
          <ReservationInfo
            left="정상가(부가세포함)"
            middle={`${periodData.originalPrice?.toLocaleString()}원`}
            right={`+ ${periodData.originalPrice?.toLocaleString()}원`}
          />
          {/* <ReservationInfo
            left="부가세(VAT별도)"
            middle={`${(periodData.totalPrice * 0.1)?.toLocaleString()}원`}
            right={`+ ${(periodData.totalPrice * 0.1)?.toLocaleString()}원`}
          /> */}
          <ReservationInfo
            left="연박할인"
            middle={`${periodData.period >= 2 ? `20,000원 * ${(periodData.period - 1)?.toLocaleString()}` : "-"}`}
            right={`${periodData.period >= 2 ? `- ${periodData.discountedPrice?.toLocaleString()}원` : "-"}`}
          />
          <div className={cn("border-line")} />
          <ReservationInfo left="총액" right={`총 ${periodData.totalPrice?.toLocaleString()}원`} isLast />
        </div>
      </InputForm>

      <button type="button" className={cn("reservation-button")} onClick={() => onClickPayment()}>
        예약하기
      </button>
    </div>
  );
}

export default ReservationSidebar;
