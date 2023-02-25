interface MonthRoomData {
  date: string;
  rooms: DateRoomItem[2];
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
  startDate: Date | null;
  endDate: Date | null;
  setStartDate: (startDate: Date | null) => void;
  setEndDate: (endDate: Date | null) => void;
  data: MonthRoomData;
}
