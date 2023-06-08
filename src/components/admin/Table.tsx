import { CellRenderInfo } from "rc-picker/lib/interface";
import dayjs, { Dayjs } from "dayjs";
import { useEffect, useState } from "react";
import type { BadgeProps } from "antd";
import { Badge, Calendar, Button, InputNumber, Modal } from "antd";
import { getReservations, updatePrice, updateStatus, deletePayment, deleteReservation } from "./AdminApi";

interface Reservation {
  checkInDate: string;
  roomName: string;
  reservationState: number;
  reservationId?: number;
}

interface CalendarData {
  type: string;
  content: string;
}

function Table() {
  const [datas, setDatas] = useState([{ data: [{} as Reservation] }]);
  const [pickedDate, setPickedDate] = useState([{} as Reservation]);
  const [pickedReservationId, setPickedReservationId] = useState<number>(0);
  const [month, setMonth] = useState(dayjs().month());
  const [price, setPrice] = useState<number>(235000);
  const [priceType, setPriceType] = useState<number>(0);
  const [status, setStatus] = useState<number>(0);
  const [, setRoomName] = useState<string>("여행");
  const [selectedDate, setSelectedDate] = useState(dayjs());
  const [isModalOpen, setIsModalOpen] = useState(false);
  useEffect(() => {
    getReservations().then((reservations) => setDatas(reservations));
  }, []);

  const dash = "-";
  const zero = "0";
  const one = "1";
  const two = "2";

  const getCurrentMonthDates = (reservations: Reservation[]): Reservation[] =>
    reservations.filter((data) => dayjs(data.checkInDate).month() === month);

  const currentMonthDates = getCurrentMonthDates(datas[0].data);

  const getUniqueDates = (duplicateDates: Reservation[]) =>
    duplicateDates.reduce((acc: Reservation[], curr) => {
      if (
        !acc.find(
          (item: Reservation) =>
            item.checkInDate === curr.checkInDate &&
            item.roomName === curr.roomName &&
            item.reservationState === curr.reservationState,
        )
      ) {
        acc.push(curr);
      }
      return acc;
    }, []);

  // 환불 처리 - 숙박 예정, 예약 취소 - 숙박 예정
  const getBadgeState = (data: Reservation) => {
    const states = ["미결제", "숙박 예정", "예약 취소", "환불 완료"];
    const space = "";
    if (data.reservationState === 0) {
      return { type: "processing", content: data.roomName + space + states[0] };
    }
    if (data.reservationState === 1) {
      return { type: "success", content: data.roomName + space + states[1] };
    }
    if (data.reservationState === -1) {
      return { type: "error", content: data.roomName + space + states[2] };
    }
    if (data.reservationState === -2) {
      return { type: "default", content: data.roomName + space + states[3] };
    }
    return { type: "None", content: data.roomName };
  };

  const getReservationState = (reservations: Reservation[]) =>
    reservations.reduce<CalendarData[]>((acc, data) => {
      const badgeState = getBadgeState(data);
      if (badgeState.type !== "None") {
        acc.push(badgeState);
      }
      return acc;
    }, []);

  const getListData = (value: Dayjs): CalendarData[] => {
    const uniqueDates = getUniqueDates(currentMonthDates);
    const dayUniqueDates = uniqueDates.filter((date) => dayjs(date.checkInDate).date() === value.date());
    return getReservationState(dayUniqueDates);
  };

  // reservationId, roomName (여행 1, 여유 2), checkInDate

  // const getMonthData = (value: Dayjs) => {
  //   if (value.month() === 8) {
  //     return 1394;
  //   }
  // };

  // const monthCellRender = (value: Dayjs) => {
  //   const num = getMonthData(value);
  //   return num ? (
  //     <div className="notes-month">
  //       <section>{num}</section>
  //       <span>Backlog number</span>
  //     </div>
  //   ) : null;
  // };

  const dateCellRender = (value: Dayjs) => {
    const listData = getListData(value);
    return (
      <ul className="events">
        {listData.map((item) => (
          <li key={item.content}>
            <Badge status={item.type as BadgeProps["status"]} text={item.content} />
          </li>
        ))}
      </ul>
    );
  };

  const onPanelChange = (current: Dayjs, mode: string) => {
    if (mode === "month") {
      const selectedMonth = current.month();
      setMonth(selectedMonth);
    }
  };

  const cellRender = (current: Dayjs, info: CellRenderInfo<Dayjs>) => {
    if (info.type === "date") return dateCellRender(current);
    return info.originNode;
  };

  const priceOnChange = (value: any) => {
    setPrice(value);
  };

  const priceTypeOnChange = (value: any) => {
    setPriceType(value);
  };

  const statusOnChange = (value: any) => {
    setStatus(value);
  };

  const roomNameOnChange = (value: any) => {
    if (value === 1) setRoomName("여행");
    if (value === 2) setRoomName("여유");
    const pickedDateRoomName = pickedDate.map((date) => {
      let roomValue;

      if (date.roomName === "여행") {
        roomValue = 1;
      } else {
        roomValue = 2;
      }

      return { ...date, roomValue };
    });
    console.log("new1", pickedDateRoomName);

    // pickedDate.filter((i) => console.log("iiii", i));
    const ans = pickedDateRoomName.filter((i) => i.roomValue === value);
    console.log("ans", ans);
    setPickedReservationId(ans[0].reservationId || 0);
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const cancelModal = () => {
    setIsModalOpen(false);
  };

  const okModal = () => {
    console.log(selectedDate);
    setIsModalOpen(false);
  };

  const onSelect = (value: Dayjs) => {
    const checkedDate =
      dayjs(value).year().toString() +
      dash +
      (dayjs(value).month() + 1 < 10
        ? zero + (dayjs(value).month() + 1).toString()
        : (dayjs(value).month() + 1).toString()) +
      dash +
      (dayjs(value).month() + 1 < 10 ? zero + dayjs(value).date().toString() : dayjs(value).date().toString());
    const ans = datas[1].data.filter((reservation) => reservation.checkInDate === checkedDate);
    setPickedDate(ans);
    setSelectedDate(value);
    openModal();
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
      <div
        style={{
          width: "80%",
          height: "80%",
          marginTop: "120px",
        }}
      >
        <Calendar cellRender={cellRender} onPanelChange={onPanelChange} onSelect={onSelect} />
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
          <span>가격을 입력해주세요</span>
          <InputNumber min={1} max={10000000} defaultValue={235000} onChange={priceOnChange} />
        </div>
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
          <span>price Type - 0 : 직접 설정, 1 : 주중, 2 : 주말, 3 : 성수기 주중, 4 : 성수기 주말</span>
          <InputNumber min={0} max={4} defaultValue={0} onChange={priceTypeOnChange} />
        </div>
        <Button
          type="default"
          onClick={() => {
            // TODO: INPUT 박스 start, end 추가해 배열로 쉽게 받기
            updatePrice(
              [
                dayjs(selectedDate).year().toString() +
                  (dayjs(selectedDate).month() + 1 < 10
                    ? zero + (dayjs(selectedDate).month() + 1).toString()
                    : (dayjs(selectedDate).month() + 1).toString()) +
                  dayjs(selectedDate).date().toString() +
                  one,
              ],
              price,
              priceType,
            );
          }}
        >
          여유 가격 update
        </Button>
        <Button
          type="default"
          onClick={() => {
            // TODO: INPUT 박스 start, end 추가해 배열로 쉽게 받기
            updatePrice(
              [
                dayjs(selectedDate).year().toString() +
                  (dayjs(selectedDate).month() + 1 < 10
                    ? zero + (dayjs(selectedDate).month() + 1).toString()
                    : (dayjs(selectedDate).month() + 1).toString()) +
                  dayjs(selectedDate).date().toString() +
                  two,
              ],
              price,
              priceType,
            );
          }}
        >
          여행 가격 update
        </Button>

        <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
          <span>status를 입력해주세요. 0 : 예약 가능, 1 : 예약 완료</span>
          <InputNumber min={0} max={1} defaultValue={0} onChange={statusOnChange} />
        </div>
        <Button
          type="default"
          onClick={() => {
            // TODO: INPUT 박스 start, end 추가해 배열로 쉽게 받기
            updateStatus(
              [
                dayjs(selectedDate).year().toString() +
                  (dayjs(selectedDate).month() + 1 < 10
                    ? zero + (dayjs(selectedDate).month() + 1).toString()
                    : (dayjs(selectedDate).month() + 1).toString()) +
                  dayjs(selectedDate).date().toString() +
                  one,
              ],
              status,
            );
          }}
        >
          여유 status update
        </Button>
        <Button
          type="default"
          onClick={() => {
            // TODO: INPUT 박스 start, end 추가해 배열로 쉽게 받기
            updateStatus(
              [
                dayjs(selectedDate).year().toString() +
                  (dayjs(selectedDate).month() + 1 < 10
                    ? zero + (dayjs(selectedDate).month() + 1).toString()
                    : (dayjs(selectedDate).month() + 1).toString()) +
                  dayjs(selectedDate).date().toString() +
                  two,
              ],
              status,
            );
          }}
        >
          여행 status update
        </Button>

        <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
          <span>환불 및 예약 취소 처리 1: 여행 2: 여유</span>
          <InputNumber min={0} max={2} defaultValue={0} onChange={roomNameOnChange} />
        </div>
        <Button
          type="default"
          onClick={() => {
            deletePayment(pickedReservationId);
          }}
        >
          환불 처리
        </Button>

        <Button
          type="default"
          onClick={() => {
            deleteReservation(pickedReservationId);
          }}
        >
          예약 취소
        </Button>

        <Modal title="방 가격/상태 수정" open={isModalOpen} onOk={okModal} onCancel={cancelModal}>
          <p>Some contents...</p>
          <p>Some contents...</p>
          <p>Some contents...</p>
        </Modal>
      </div>
    </div>
  );
}

export default Table;
