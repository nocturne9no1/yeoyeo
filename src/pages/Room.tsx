// import { useState, useEffect } from "react";
import OutsideImg from "@temp/yeoyeo_outside.jpg";
import FloorPlan from "@temp/floor_plan.png";
import cn from "classnames";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

function Room() {
  // const [cnt, setCnt] = useState<number>(0);
  const ImgList: string[] = [OutsideImg, FloorPlan];

  return (
    <div className={cn("room-wrap")}>
      {/* 배너 */}
      <div className={cn("banner-img-wrap")}>
        <img src={OutsideImg} alt="yeoyeo-outside" />
      </div>

      <section className={cn("room-inner")}>
        {/* 공백 및 구분선 => 나중에 컴포넌트화 해보기 */}
        <div className={cn("room-padding")} />
        <div className={cn("divider")}>
          <div className={cn("divider-line")} />
        </div>

        {/* 공간도 */}
        <div className={cn("floor-plan")}>
          <img src={FloorPlan} alt="floor-plan" />
        </div>

        <div className={cn("divider")}>
          <div className={cn("divider-line")} />
        </div>
        <div className={cn("room-padding")} />

        {/* swiper */}
        <div className={cn("swiper-wrap")}>
          <div>스와이퍼</div>
          <Swiper
            navigation
            pagination={{
              dynamicBullets: true,
            }}
            modules={[Pagination, Navigation]}
            slidesPerView={1}
            onSlideChange={() => console.log("slide change")}
            onSwiper={(swiper) => console.log(swiper)}
          >
            {/* <SwiperSlide className={cn("slide")} style={{ backgroundColor: "pink" }}>
              <img src={floorPlan} alt="" />
            </SwiperSlide>
            <SwiperSlide className={cn("slide")}>Slide 2</SwiperSlide>
            <SwiperSlide className={cn("slide")}>Slide 3</SwiperSlide>
            <SwiperSlide className={cn("slide")}>Slide 4</SwiperSlide> */}
            {ImgList.map((el) => (
              <SwiperSlide key={el}>
                <div className="img-wrap">
                  <img src={el} alt="" />
                </div>
              </SwiperSlide>
            ))}
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
