import cn from "classnames";
import { useTranslation } from "react-i18next";

// 서비스 배너
import ServiceBanner from "@temp/service_banner.jpg";

// Service 이미지들
import Frontyard1 from "@temp/Frontyard1.jpeg";
import Frontyard2 from "@temp/Frontyard2.jpeg";
import Backyard1 from "@temp/Backyard1.jpeg";
import Backyard2 from "@temp/Backyard2.jpeg";
import Coffeebread1 from "@temp/Coffeebread1.jpg";
import Coffeebread2 from "@temp/Coffeebread2.jpg";
import Projector1 from "@temp/Projector1.jpg";
import Projector2 from "@temp/Projector2.jpg";

function Service() {
  const { t } = useTranslation("common");

  return (
    <div className={cn("room-wrap")}>
      {/* 배너 */}
      <div className={cn("banner-img-wrap")}>
        <h2 className={cn("room-main-title")}>{t("service.name")}</h2>
        <img src={ServiceBanner} alt="services" />
      </div>

      <section className={cn("room-inner")}>
        {/* 커피와 빵 */}
        <div className={cn("room-detail")}>
          <div className={cn("room-detail-description")}>
            <h3 className={cn("room-title")}>{t("service.features.0")}</h3>
            <div className={cn("room-features")}>
              <span>{t("service.frontyard.0")}</span>
              <span>{t("service.frontyard.1")}</span>
            </div>
          </div>
          <div className={cn("room-detail-pictures")}>
            <div className={cn("room-detail-grid-item")}>
              <img src={Frontyard1} alt="앞마당 이미지 1" />
            </div>
            <div className={cn("room-detail-grid-item")}>
              <img src={Frontyard2} alt="앞마당 이미지 2 " />
            </div>
          </div>
        </div>

        {/* 빔프로젝터 */}
        <div className={cn("room-detail room-detail2")}>
          <div className={cn("room-detail-description room-order")}>
            <h3 className={cn("room-title")}>{t("service.features.1")}</h3>
            <div className={cn("room-features")}>
              <span>{t("service.backyard.0")}</span>
              <span>{t("service.backyard.1")}</span>
            </div>
          </div>
          <div className={cn("room-detail-pictures")}>
            <div className={cn("room-detail-grid-item")}>
              <img src={Backyard1} alt="뒷마당 이미지 1" />
            </div>
            <div className={cn("room-detail-grid-item")}>
              <img src={Backyard2} alt="뒷마당 이미지 2 " />
            </div>
          </div>
        </div>

        {/* 욕실 */}
        <div className={cn("room-detail")}>
          <div className={cn("room-detail-description")}>
            <h3 className={cn("room-title")}>{t("service.features.2")}</h3>
            <div className={cn("room-features")}>
              <span>{t("service.coffeeBread.0")}</span>
            </div>
          </div>
          <div className={cn("room-detail-pictures")}>
            <div className={cn("room-detail-grid-item")}>
              <img src={Coffeebread1} alt="커피와빵 이미지 1" />
            </div>
            <div className={cn("room-detail-grid-item")}>
              <img src={Coffeebread2} alt="커피와빵 이미지 2 " />
            </div>
          </div>
        </div>

        {/* 생활한복 */}
        <div className={cn("room-detail room-detail2")}>
          <div className={cn("room-detail-description room-order")}>
            <h3 className={cn("room-title")}>{t("service.features.3")}</h3>
            <div className={cn("room-features")}>
              <span>{t("service.projector.0")}</span>
            </div>
          </div>
          <div className={cn("room-detail-pictures")}>
            <div className={cn("room-detail-grid-item")}>
              <img src={Projector1} alt="프로젝터 이미지 1" />
            </div>
            <div className={cn("room-detail-grid-item")}>
              <img src={Projector2} alt="프로젝터 이미지 2 " />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Service;
