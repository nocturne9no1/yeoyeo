// import { useState, useEffect } from "react";
import outsideImg from "@temp/yeoyeo_outside.jpg";
import floorPlan from "@temp/room_spaces.jpg";
import cn from "classnames";

function Room() {
  // const [cnt, setCnt] = useState<number>(0);

  return (
    <div className={cn("room-wrap")}>
      {/* 배너 */}
      <div className={cn("banner-img-wrap")}>
        <img src={outsideImg} alt="yeoyeo-outside" />
      </div>

      <div className={cn("room-inner")}>
        {/* 공백 및 구분선 */}
        <div className={cn("room-padding")} />
        <div className={cn("divider")}>
          <div className={cn("divider-line")} />
        </div>

        {/* 공간도 */}
        <div className={cn("floor-plan")}>
          <img src={floorPlan} alt="floor-plan" />
        </div>

        <div className={cn("divider")}>
          <div className={cn("divider-line")} />
        </div>
        <div className={cn("room-padding")} />

        {/* swiper */}
        <div>
          <div>스와이퍼</div>
        </div>
      </div>
    </div>
  );
}

export default Room;
