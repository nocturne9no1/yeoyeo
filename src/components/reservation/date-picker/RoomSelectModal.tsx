// import {  } from "react";
import { useEffect } from "react";
import cn from "classnames";
import { useSetAtom } from "jotai";
import modalStatus from "src/state/modalStatus";

function RoomSelectModal({ setSelectedRoom, setIsModal, handleCellClick }: RoomSelectModalProps) {
  const setModal = useSetAtom(modalStatus);

  const pushEscape = (e: KeyboardEvent) => {
    if (e.key === "Escape") {
      setModal(false);
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
      onClick={(e) => {
        e.stopPropagation();
        setModal(false);
      }}
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
              setModal(false);
              setIsModal(false);
              handleCellClick();
            }}
          >
            A
          </button>
          <button
            type="button"
            className={cn("room-button")}
            onClick={() => {
              setSelectedRoom("B");
              setModal(false);
              setIsModal(false);
              handleCellClick();
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
