import cn from "classnames";
import { useTranslation } from "react-i18next";

// 배너와 공간도, 스와이퍼 이미지들
import ServiceBanner from "@temp/service_banner.jpg";

// Room 이미지들
import RoomA1 from "@temp/Room1_1.jpg";
import RoomA2 from "@temp/Room1_2.jpg";
import RoomB1 from "@temp/Room2_1.jpeg";
import RoomB2 from "@temp/Room2_2.jpeg";

function Service() {
  const { t } = useTranslation("common");

  return (
    <div className={cn("room-wrap")}>
      {/* 배너 */}
      <div className={cn("banner-img-wrap")}>
        <img src={ServiceBanner} alt="services" />
      </div>

      <section className={cn("room-inner")}>
        {/* 앞마당 */}
        <div className={cn("room-detail")}>
          <div className={cn("room-detail-description")}>
            <h3 className={cn("room-title")}>{t("service.features.0")}</h3>
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

        {/* 뒷마당 */}
        <div className={cn("room-detail room-detail2")}>
          <div className={cn("room-detail-description room-order")}>
            <h3 className={cn("room-title")}>{t("service.features.1")}</h3>
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

        {/* 커피와 빵 */}
        <div className={cn("room-detail")}>
          <div className={cn("room-detail-description")}>
            <h3 className={cn("room-title")}>{t("service.features.2")}</h3>
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

        {/* 빔 프로젝터 */}
        <div className={cn("room-detail room-detail2")}>
          <div className={cn("room-detail-description room-order")}>
            <h3 className={cn("room-title")}>{t("service.features.3")}</h3>
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

        {/* 욕탕 */}
        <div className={cn("room-detail")}>
          <div className={cn("room-detail-description")}>
            <h3 className={cn("room-title")}>{t("service.features.4")}</h3>
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
      </section>
    </div>
  );
}

export default Service;
