import cn from "classnames";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper";
import { useState, useRef, useEffect } from "react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { useTranslation } from "react-i18next";

// 배너와 공간도, 스와이퍼 이미지들
import OutsideImg from "@temp/yeoyeo_outside.jpg";
import RoomAIntro from "@images/room/roomA_intro.jpg";
import RoomBIntro from "@images/room/roomB_intro.jpg";
import FloorPlanA from "@images/room/floor_plan_A.png";
import FloorPlanB from "@images/room/floor_plan_B.png";
import SwiperImg1 from "@temp/swiper_img1.jpg";
import SwiperImg2 from "@temp/swiper_img2.jpg";
import SwiperImg3 from "@temp/swiper_img3.jpg";

// Room 이미지들
import RoomA1 from "@temp/Room1_1.jpg";
import RoomA2 from "@temp/Room1_2.jpg";
import RoomB1 from "@temp/Room2_1.jpeg";
import RoomB2 from "@temp/Room2_2.jpeg";
import { debounce } from "lodash";

function Room() {
  const ImgList: string[] = [OutsideImg, SwiperImg2, SwiperImg3];
  const [touchStartY, setTouchStartY] = useState<number | null>(null);
  const [scrollStartY, setScrollStartY] = useState<number | number>(0);

  const introRef = useRef<HTMLDivElement>(null);
  const roomSelectionRef = useRef<HTMLDivElement>(null);
  const roomARef = useRef<HTMLDivElement>(null);
  const roomBRef = useRef<HTMLDivElement>(null);
  const { t } = useTranslation("common");

  // 스크롤
  const useScroll = ()=>{
    const [scrollY, setScrollY] = useState<number>(0);
    const delay = 100; // 메모리 누출을 막기 위한 debounce delay

    const listener = ()=>{
      setScrollY(window.scrollY);
    };
    const keyListener = (e: KeyboardEvent)=>{
      e.preventDefault();
      if (scrollStartY < 100 && e.key === "ArrowDown") {
        roomSelectionRef.current?.scrollIntoView({ behavior: "smooth" });
      }
    };

    useEffect(()=>{
      window.addEventListener("scroll", debounce(listener, delay));
      window.addEventListener("keydown", debounce(keyListener, delay));
      return ()=>{
        window.removeEventListener("scroll", listener);
        window.removeEventListener("keydown", keyListener);
      };
    });

    return { scrollY };
  }

  const { scrollY } = useScroll();

  useEffect(()=>{
    if (introRef) {
      introRef.current?.addEventListener("wheel", (e: WheelEvent)=>{
        e.preventDefault();
        const scrollDirection = e.screenY;
        if (scrollDirection > 0) {
          roomSelectionRef.current?.scrollIntoView({ behavior: "smooth" });
        }
      })
      setScrollStartY(window.scrollY);
    }
  }, [scrollY, scrollStartY])

  // 터치
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStartY(e.touches[0].clientY);
  };

  useEffect(()=>{
    if (touchStartY) {
      if (introRef) {
        introRef.current?.addEventListener("touchstart", (e: TouchEvent)=>{
          if (window.scrollY === 0) {
            e.preventDefault();
            roomSelectionRef.current?.scrollIntoView({ behavior: "smooth" });
          }
        })
      }
    }
  }, [touchStartY])

  const selectRoom = (room: string) => {
    const roomA = document.querySelector(".roomA-info");
    const roomB = document.querySelector(".roomB-info");
    if (room==="A") {
      roomA?.setAttribute("style", "display:block;");
      roomB?.setAttribute("style", "display:none;");
      roomARef.current?.scrollIntoView({ behavior: "smooth" });
    } else {
      roomA?.setAttribute("style", "display:none;");
      roomB?.setAttribute("style", "display:block;");
      roomBRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }

  return (
    <div className={cn("room-wrap")}>
      {/* 배너 */}
      <div
        ref={introRef} 
        className={cn("banner-img-wrap")}
        onTouchStart={(e) => handleTouchStart(e)}>
        <h2 className={cn("room-main-title")}>{t("floorPlan.name")}</h2>
        <img src={SwiperImg1} alt="yeoyeo-outside" />
      </div>

      <section className={cn("room-inner")}>
        {/* 객실 선택 */}
        <div ref={roomSelectionRef} className={cn("room-intro")}>
          <div
            role="presentation" 
            onClick={() => selectRoom("A")}>
            <span>{t("floorPlan.roomA.name")}</span>
            <img src={RoomAIntro} alt="roomA-intro" />
          </div>
          <div
            role="presentation" 
            onClick={() => selectRoom("B")}>
            <span>{t("floorPlan.roomB.name")}</span>
            <img src={RoomBIntro} alt="roomB-intro" />
          </div>
        </div>

        {/* A호실 */}
        <div ref={roomARef} className={cn("roomA-info")}>
          {/* 공간도 */}
          <div className={cn("floor-plan")}>
            <img src={FloorPlanA} alt="floor-plan" />
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

          {/* 뒷마당 */}
          <div className={cn("room-detail")}>
            <div className={cn("room-detail-description")}>
              <h4 className={cn("room-title")}>{t("floorPlan.roomA.titles.0")}</h4>
              <div className={cn("room-features")}>
                <span>{t("floorPlan.roomA.descriptions.0.0")}</span>
                <span>{t("floorPlan.roomA.descriptions.0.1")}</span>
                <span>{t("floorPlan.roomA.descriptions.0.2")}</span>
                <span>{t("floorPlan.roomA.descriptions.0.3")}</span>
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

          {/* 거실 */}
          <div className={cn("room-detail room-detail2")}>
            <div className={cn("room-detail-description room-order")}>
              <h4 className={cn("room-title")}>{t("floorPlan.roomA.titles.1")}</h4>
              <div className={cn("room-features")}>
                <span>{t("floorPlan.roomA.descriptions.1.0")}</span>
                <span>{t("floorPlan.roomA.descriptions.1.1")}</span>
                <span>{t("floorPlan.roomA.descriptions.1.2")}</span>
                <span>{t("floorPlan.roomA.descriptions.1.3")}</span>
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

          {/* 침실 */}
          <div className={cn("room-detail")}>
            <div className={cn("room-detail-description")}>
              <h4 className={cn("room-title")}>{t("floorPlan.roomA.titles.2")}</h4>
              <div className={cn("room-features")}>
                <span>{t("floorPlan.roomA.descriptions.0.0")}</span>
                <span>{t("floorPlan.roomA.descriptions.0.1")}</span>
                <span>{t("floorPlan.roomA.descriptions.0.2")}</span>
                <span>{t("floorPlan.roomA.descriptions.0.3")}</span>
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

          {/* 욕실 */}
          <div className={cn("room-detail room-detail2")}>
            <div className={cn("room-detail-description room-order")}>
              <h4 className={cn("room-title")}>{t("floorPlan.roomA.titles.3")}</h4>
              <div className={cn("room-features")}>
                <span>{t("floorPlan.roomA.descriptions.1.0")}</span>
                <span>{t("floorPlan.roomA.descriptions.1.1")}</span>
                <span>{t("floorPlan.roomA.descriptions.1.2")}</span>
                <span>{t("floorPlan.roomA.descriptions.1.3")}</span>
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

          {/* 주방 */}
          <div className={cn("room-detail")}>
            <div className={cn("room-detail-description")}>
              <h4 className={cn("room-title")}>{t("floorPlan.roomA.titles.4")}</h4>
              <div className={cn("room-features")}>
                <span>{t("floorPlan.roomA.descriptions.0.0")}</span>
                <span>{t("floorPlan.roomA.descriptions.0.1")}</span>
                <span>{t("floorPlan.roomA.descriptions.0.2")}</span>
                <span>{t("floorPlan.roomA.descriptions.0.3")}</span>
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
        </div>

        

        {/* B호실 */}
        <div ref={roomBRef} className={cn("roomB-info")}>
          {/* 공간도 */}
          <div className={cn("floor-plan")}>
            <img src={FloorPlanB} alt="floor-plan" />
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

          {/* 뒷마당 */}
          <div className={cn("room-detail")}>
            <div className={cn("room-detail-description")}>
              <h4 className={cn("room-title")}>{t("floorPlan.roomB.titles.0")}</h4>
              <div className={cn("room-features")}>
                <span>{t("floorPlan.roomB.descriptions.0.0")}</span>
                <span>{t("floorPlan.roomB.descriptions.0.1")}</span>
                <span>{t("floorPlan.roomB.descriptions.0.2")}</span>
                <span>{t("floorPlan.roomB.descriptions.0.3")}</span>
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

          {/* 거실 */}
          <div className={cn("room-detail room-detail2")}>
            <div className={cn("room-detail-description room-order")}>
              <h4 className={cn("room-title")}>{t("floorPlan.roomB.titles.1")}</h4>
              <div className={cn("room-features")}>
                <span>{t("floorPlan.roomB.descriptions.1.0")}</span>
                <span>{t("floorPlan.roomB.descriptions.1.1")}</span>
                <span>{t("floorPlan.roomB.descriptions.1.2")}</span>
                <span>{t("floorPlan.roomB.descriptions.1.3")}</span>
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

          {/* 침실 */}
          <div className={cn("room-detail")}>
            <div className={cn("room-detail-description")}>
              <h4 className={cn("room-title")}>{t("floorPlan.roomB.titles.2")}</h4>
              <div className={cn("room-features")}>
                <span>{t("floorPlan.roomB.descriptions.0.0")}</span>
                <span>{t("floorPlan.roomB.descriptions.0.1")}</span>
                <span>{t("floorPlan.roomB.descriptions.0.2")}</span>
                <span>{t("floorPlan.roomB.descriptions.0.3")}</span>
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

          {/* 욕실 */}
          <div className={cn("room-detail room-detail2")}>
            <div className={cn("room-detail-description room-order")}>
              <h4 className={cn("room-title")}>{t("floorPlan.roomB.titles.3")}</h4>
              <div className={cn("room-features")}>
                <span>{t("floorPlan.roomB.descriptions.1.0")}</span>
                <span>{t("floorPlan.roomB.descriptions.1.1")}</span>
                <span>{t("floorPlan.roomB.descriptions.1.2")}</span>
                <span>{t("floorPlan.roomB.descriptions.1.3")}</span>
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

          {/* 주방 */}
          <div className={cn("room-detail")}>
            <div className={cn("room-detail-description")}>
              <h4 className={cn("room-title")}>{t("floorPlan.roomB.titles.4")}</h4>
              <div className={cn("room-features")}>
                <span>{t("floorPlan.roomB.descriptions.0.0")}</span>
                <span>{t("floorPlan.roomB.descriptions.0.1")}</span>
                <span>{t("floorPlan.roomB.descriptions.0.2")}</span>
                <span>{t("floorPlan.roomB.descriptions.0.3")}</span>
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
        </div>

      </section>
    </div>
  );
}

export default Room;
