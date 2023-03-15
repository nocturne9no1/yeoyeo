import cn from "classnames";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { useTranslation } from "react-i18next";

// 배너와 공간도, 스와이퍼 이미지들
import OutsideImg from "@temp/yeoyeo_outside.jpg";
import FloorPlan from "@temp/floor_plan.png";
import SwiperImg1 from "@temp/swiper_img1.jpg";
import SwiperImg2 from "@temp/swiper_img2.jpg";
import SwiperImg3 from "@temp/swiper_img3.jpg";

// Room 이미지들
import RoomA1 from "@temp/Room1_1.jpg";
import RoomA2 from "@temp/Room1_2.jpg";
import RoomB1 from "@temp/Room2_1.jpeg";
import RoomB2 from "@temp/Room2_2.jpeg";

function Room() {
  const ImgList: string[] = [OutsideImg, SwiperImg2, SwiperImg3];
  const { t } = useTranslation("common");

  return (
    <div className={cn("room-wrap")}>
      {/* 배너 */}
      <div className={cn("banner-img-wrap")}>
        <h2 className={cn("room-main-title")}>{t("floorPlan.name")}</h2>
        <img src={SwiperImg1} alt="yeoyeo-outside" />
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

        {/* 웰컴문구 */}
        <h3 className={cn("welcome-title")}>
          <span>{t("floorPlan.serviceTitle")}</span>
          <span>{t("floorPlan.serviceTitle")}</span>
        </h3>
        <p className={cn("welcome-description")}>{t("floorPlan.serviceDescription")}</p>

        {/* Room A */}
        <div className={cn("room-detail")}>
          <div className={cn("room-detail-description")}>
            <h4 className={cn("room-title")}>Room A</h4>
            <div className={cn("room-features")}>
              <span>{t("floorPlan.roomA.0")}</span>
              <span>{t("floorPlan.roomA.1")}</span>
              <span>{t("floorPlan.roomA.2")}</span>
              <span>{t("floorPlan.roomA.3")}</span>
              <span>{t("floorPlan.roomA.4")}</span>
              <span>{t("floorPlan.roomA.5")}</span>
            </div>
          </div>
          <div className={cn("room-detail-pictures")}>
            <div className={cn("room-detail-grid-item")}>
              <img src={RoomA1} alt="Room 이미지 1" />
            </div>
            <div className={cn("room-detail-grid-item")}>
              <img src={RoomA2} alt="Room 이미지 2 " />
            </div>
          </div>
        </div>

        {/* Room B */}
        <div className={cn("room-detail room-detail2")}>
          <div className={cn("room-detail-description room-order")}>
            <h4 className={cn("room-title")}>Room B</h4>
            <div className={cn("room-features")}>
              <span>{t("floorPlan.roomA.0")}</span>
              <span>{t("floorPlan.roomA.1")}</span>
              <span>{t("floorPlan.roomA.2")}</span>
              <span>{t("floorPlan.roomA.3")}</span>
              <span>{t("floorPlan.roomA.4")}</span>
              <span>{t("floorPlan.roomA.5")}</span>
            </div>
          </div>
          <div className={cn("room-detail-pictures")}>
            <div className={cn("room-detail-grid-item")}>
              <img src={RoomB1} alt="Room 이미지 1" />
            </div>
            <div className={cn("room-detail-grid-item")}>
              <img src={RoomB2} alt="Room 이미지 2 " />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Room;
