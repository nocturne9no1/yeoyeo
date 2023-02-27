import { Dayjs } from "dayjs";

declare global {
  interface MonthRoomData {
    date: string;
    rooms: DateRoomItem[];
    isPassedDate?: boolean;
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
    data: MonthRoomData[];
    currentDate: Dayjs;
    handleDateClick: (day: number, date: Dayjs) => void;
  }
}
