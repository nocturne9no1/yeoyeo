// import {  } from "react";
import { useEffect } from "react";
import cn from "classnames";

function RoomSelectModal({ setSelectedRoom, setIsModal }: RoomSelectModalProps) {
  const pushEscape = (e: KeyboardEvent) => {
    console.log(e.key);
    if (e.key === "Escape") {
      setIsModal(false);
    }
  };
  useEffect(() => {
    document.addEventListener("keydown", pushEscape);

    return () => document.removeEventListener("keydown", pushEscape);
  });

  return (
    <div
      className={cn("room-select-modal-mask")}
      onClick={() => setIsModal(false)}
      // onKeyDown={(e: KeyboardEvent<HTMLDivElement>) => {
      //   console.log(e.key);
      //   if (e.key === "Escape") {
      //     setIsModal(false);
      //   }
      // }}
      aria-hidden
    >
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
    </div>
  );
}

export default RoomSelectModal;
