import { Dayjs } from "dayjs";

declare global {
  interface MonthRoomData {
    [kye: string]: MonthRoomDataItem[];
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
    cellStatus: "start-date" | "end-date" | "out-range";
    cellData: DateRoomItem;
    handleDateClick: (day: number) => void;
  }

  interface CalendarProps {
    startDate: Dayjs | null;
    endDate: Dayjs | null;
    setStartDate: (startDate: Dayjs | null) => void;
    setEndDate: (endDate: Dayjs | null) => void;
    data: MonthRoomDataItem[];
    currentDate: Dayjs;
    handleDateClick: (day: number, date: Dayjs) => void;
    selectedRoom: "A" | "B" | null;
    setSelectedRoom: (selectedRoom: "A" | "B") => void;
  }

  interface RoomSelectModalProps {
    setSelectedRoom: (selectedRoom: "A" | "B") => void;
    setIsModal: (isModal: boolean) => void;
  }
}

declare global {
  interface Window {
    IMP: any;
  }
}
