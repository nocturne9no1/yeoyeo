// import { useState, useEffect } from "react";
import outsideImg from "@temp/yeoyeo_outside.jpg";
// import floorPlan from "@temp/room_spaces.jpg";
import floorPlan from "@temp/floor_plan.png";
import cn from "classnames";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

function Room() {
  // const [cnt, setCnt] = useState<number>(0);

  return (
    <div className={cn("room-wrap")}>
      {/* 배너 */}
      <div className={cn("banner-img-wrap")}>
        <img src={outsideImg} alt="yeoyeo-outside" />
      </div>

      <section className={cn("room-inner")}>
        {/* 공백 및 구분선 => 나중에 컴포넌트화 해보기 */}
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
          <Swiper
            navigation
            pagination={{
              dynamicBullets: true,
            }}
            modules={[Pagination, Navigation]}
            className="mySwiper"
            spaceBetween={50}
            slidesPerView={3}
            onSlideChange={() => console.log("slide change")}
            onSwiper={(swiper) => console.log(swiper)}
          >
            <SwiperSlide style={{ backgroundColor: "black" }}>Slide 1</SwiperSlide>
            <SwiperSlide>Slide 2</SwiperSlide>
            <SwiperSlide>Slide 3</SwiperSlide>
            <SwiperSlide>Slide 4</SwiperSlide>
          </Swiper>
        </div>
        <div className={cn("divider")}>
          <div className={cn("divider-line")} />
        </div>
        <div className={cn("room-padding")} />
        <div className={cn("divider")}>
          <div className={cn("divider-line")} />
        </div>
        <div className={cn("room-padding")} />
        <div className={cn("divider")}>
          <div className={cn("divider-line")} />
        </div>
        <div className={cn("room-padding")} />
        <div className={cn("divider")}>
          <div className={cn("divider-line")} />
        </div>
        <div className={cn("room-padding")} />
      </section>
    </div>
  );
}

export default Room;
