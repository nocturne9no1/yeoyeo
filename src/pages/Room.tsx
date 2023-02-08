// import { useState, useEffect } from "react";
// import outsideImg from "@temp/yeoyeo_outside.jpg";
import cn from "classnames";

function Room() {
  // const [cnt, setCnt] = useState<number>(0);

  return (
    <div>
      {/* 배너 */}
      <div className={cn("banner-img-wrap")}>{/* <img src={outsideImg} alt="yeoyeo_outside" /> */}</div>

      <div className={cn("room-wrap")}>
        {/* 공간도 */}
        <div>
          <div>단면도</div>
        </div>

        {/* swiper */}
        <div>
          <div>스와이퍼</div>
        </div>
      </div>
    </div>
  );
}

export default Room;
