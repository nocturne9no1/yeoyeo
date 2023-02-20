import cn from "classnames";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

// 배너와 공간도, 스와이퍼 이미지들
import OutsideImg from "@temp/yeoyeo_outside.jpg";
import FloorPlan from "@temp/floor_plan.png";
import SwiperImg1 from "@temp/swiper_img1.jpg";
import SwiperImg2 from "@temp/swiper_img2.jpg";
import SwiperImg3 from "@temp/swiper_img3.jpg";

// Room 이미지들

function Room() {
  const ImgList: string[] = [SwiperImg1, SwiperImg2, SwiperImg3];

  return (
    <div className={cn("room-wrap")}>
      {/* 배너 */}
      <div className={cn("banner-img-wrap")}>
        <img src={OutsideImg} alt="yeoyeo-outside" />
      </div>

      <section className={cn("room-inner")}>
        {/* 공간도 */}
        <div className={cn("floor-plan")}>
          <img src={FloorPlan} alt="floor-plan" />
        </div>

        {/* swiper */}
        <div className={cn("swiper-wrap")}>
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
            {ImgList.map((el) => (
              <SwiperSlide key={el}>
                <div className="img-wrap">
                  <img src={el} alt="" />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        {/* Room 1 */}
        <div className={cn("room-detail")}>
          <div className={cn("room-detail-description")}>
            <p>Room 1</p>
          </div>
          <div className={cn("room-detail-pictures")}>
            <img src="" alt="" />
          </div>
        </div>
      </section>
    </div>
  );
}

export default Room;
