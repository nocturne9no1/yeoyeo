import { Dayjs } from "dayjs";

declare global {
  interface MonthRoomData {
    [key: string]: MonthRoomDataItem[];
  }

  interface MonthRoomDataItem {
    date: string;
    rooms: DateRoomItem[];
  }

  interface DateRoomItem {
    merchant_uid: string;
    price: number;
    reservationState: 0 | 1;
    roomId: number;
    roomName: string;
  }

  interface DateCellProps {
    day: number;
    data: MonthRoomDataItem[];
    cellData: DateRoomItem[];
    handleDateClick: (day: number, date: Dayjs) => void;
    startDate: Dayjs | null;
    endDate: Dayjs | null;
    currentDate: Dayjs;
    selectedRoom: "A" | "B" | null;
    setSelectedRoom: (selectedRoom: "A" | "B") => void;
  }
  interface CalendarProps {
    startDate: Dayjs | null;
    endDate: Dayjs | null;
    setStartDate: (startDate: Dayjs | null) => void;
    setEndDate: (endDate: Dayjs | null) => void;
    data: MonthRoomDataItem[];
    twoMonthsData: MonthRoomDataItem[];
    currentDate: Dayjs;
    handleDateClick: (day: number, date: Dayjs) => void;
    selectedRoom: "A" | "B" | null;
    setSelectedRoom: (selectedRoom: "A" | "B") => void;
  }

  interface RoomSelectModalProps {
    setSelectedRoom: (selectedRoom: "A" | "B") => void;
    setIsModal: (isModal: boolean) => void;
    handleCellClick: () => void;
  }
  interface InfoDtoListData {
    date: string;
    dateRoomId: string;
    price: number;
  }
  interface PeriodDataType {
    discountedPrice: number;
    infoDtoList: InfoDtoListData[];
    originalPrice: number;
    period: number;
    totalPrice: number;
  }

  interface DatePickerProps {
    startDate: Dayjs | null;
    endDate: Dayjs | null;
    setStartDate: (startDate: Dayjs | null) => void;
    setEndDate: (endDate: Dayjs | null) => void;
    setPeriodData: (periodData: PeriodDataType) => void;
  }
}

declare global {
  interface Window {
    IMP: any;
  }
}
