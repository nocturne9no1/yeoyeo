import { CellRenderInfo } from "rc-picker/lib/interface";
import dayjs, { Dayjs } from "dayjs";
import { useEffect, useState } from "react";
import type { BadgeProps } from "antd";
import { Badge, Calendar, Button, InputNumber, Modal, Radio, Space } from "antd";
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
  const [, setPickedDate] = useState([{} as Reservation]);
  const [pickedReservationId] = useState<number>(0);
  const [month, setMonth] = useState(dayjs().month());
  const [price, setPrice] = useState<number>(235000);
  const [priceType, setPriceType] = useState<number>(1);
  const [status, setStatus] = useState<number>(0);
  // 여유: 1, 여행: 2
  const [roomName, setRoomName] = useState<number>(1);
  const [selectedDate, setSelectedDate] = useState(dayjs());
  const [isModalOpen, setIsModalOpen] = useState(false);
  useEffect(() => {
    getReservations().then((reservations) => setDatas(reservations));
  }, []);

  const dash = "-";
  const zero = "0";

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
    setPriceType(value.target.value);
  };

  const statusOnChange = (value: any) => {
    setStatus(value.target.value);
  };

  const roomTypeOnChange = (value: any) => {
    console.log(value.target.value);
    setRoomName(value.target.value);
  };

  // const roomNameOnChange = (value: any) => {
  //   const pickedDateRoomName = pickedDate.map((date) => {
  //     let roomValue;

  //     if (date.roomName === "여행") {
  //       roomValue = 1;
  //     } else {
  //       roomValue = 2;
  //     }

  //     return { ...date, roomValue };
  //   });

  //   const ans = pickedDateRoomName.filter((i) => i.roomValue === value);
  //   console.log("ans", ans);
  //   setPickedReservationId(ans[0].reservationId || 0);
  // };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const cancelModal = () => {
    setIsModalOpen(false);
  };

  const okModal = () => {
    console.log(selectedDate);
    setIsModalOpen(false);
    // update price
    updatePrice(
      [
        dayjs(selectedDate).year().toString() +
          (dayjs(selectedDate).month() + 1 < 10
            ? zero + (dayjs(selectedDate).month() + 1).toString()
            : (dayjs(selectedDate).month() + 1).toString()) +
          dayjs(selectedDate).date().toString() +
          roomName.toString(),
      ],
      price,
      priceType,
    );
    updateStatus(
      [
        dayjs(selectedDate).year().toString() +
          (dayjs(selectedDate).month() + 1 < 10
            ? zero + (dayjs(selectedDate).month() + 1).toString()
            : (dayjs(selectedDate).month() + 1).toString()) +
          dayjs(selectedDate).date().toString() +
          roomName.toString(),
      ],
      status,
    );
  };

  // const onChangeStatusRadio = (e: RadioChangeEvent) => {
  //   console.log("radio checked", e.target.value);
  //   console.log("status", status);
  //   // setStatus(e.target.value)
  // };

  // const onChangePriceRadio = (e: RadioChangeEvent) => {
  //   console.log("radio checked", e.target.value);
  //   console.log("price", price);
  //   // setPrice(e.target.value);
  // };

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
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
      <div
        style={{
          width: "80%",
          height: "80%",
          marginTop: "200px",
          display: "flex",
          flexDirection: "column",
          position: "relative",
        }}
      >
        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <Button
            type="default"
            style={{ marginRight: "5px" }}
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
        </div>
        <Calendar cellRender={cellRender} onPanelChange={onPanelChange} onSelect={onSelect} />

        {/* <div style={{ display: "flex" }}>
          <span>환불 및 예약 취소 처리 1: 여행 2: 여유</span>
          <InputNumber min={0} max={2} defaultValue={0} onChange={roomNameOnChange} />
        </div> */}
        {/* <div style={{ display: "flex", position: "absolute", right: "5%", top: "-30px" }}> */}

        <Modal title="방 가격/상태 수정" open={isModalOpen} onOk={okModal} onCancel={cancelModal}>
          <div>
            <Radio.Group onChange={priceTypeOnChange} value={priceType}>
              <Space direction="vertical">
                <Radio value={1}>비수기 주중</Radio>
                <Radio value={2}>비수기 주말</Radio>
                <Radio value={3}>성수기 주중</Radio>
                <Radio value={4}>성수기 주말</Radio>
                <Radio value={5}>
                  가격 직접 수정{"  "}
                  <InputNumber min={0} max={1000000} defaultValue={250000} onChange={priceOnChange} />
                </Radio>
              </Space>
            </Radio.Group>
            <Radio.Group onChange={statusOnChange} value={status}>
              <Space direction="vertical">
                <Radio value={0}>예약 가능</Radio>
                <Radio value={1}>예약 완료</Radio>
              </Space>
            </Radio.Group>
            <Radio.Group onChange={roomTypeOnChange} value={roomName}>
              <Space direction="vertical">
                <Radio value={1}>여유</Radio>
                <Radio value={2}>여행</Radio>
              </Space>
            </Radio.Group>
          </div>
        </Modal>
      </div>
    </div>
  );
}

export default Table;
