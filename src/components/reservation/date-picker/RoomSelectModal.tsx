import cn from "classnames";

function RoomSelectModal({ setSelectedRoom, setIsModal }: RoomSelectModalProps) {
  return (
    <div className={cn("room-select-modal")}>
      <strong>방을 선택해주세요</strong>
      <div className={cn("room-select")}>
        <button
          type="button"
          className={cn("room-button")}
          onClick={() => {
            setSelectedRoom("A");
            setIsModal(false);
          }}
        >
          A
        </button>
        <button
          type="button"
          className={cn("room-button")}
          onClick={() => {
            setSelectedRoom("B");
            setIsModal(false);
          }}
        >
          B
        </button>
      </div>
    </div>
  );
}

export default RoomSelectModal;
