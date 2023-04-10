import cn from "classnames";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Pagination, Navigation, Autoplay } from "swiper";
import { useState, useRef, useEffect } from "react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { useTranslation } from "react-i18next";

// 배너와 공간도, 스와이퍼 이미지들
import RoomAIntro from "@images/room/roomA_intro.jpg";
import RoomBIntro from "@images/room/roomB_intro.jpg";
import FloorPlanA from "@images/room/floor_plan_A.png";
import FloorPlanB from "@images/room/floor_plan_B.png";
import SwiperImg1 from "@temp/swiper_img1.jpg";

// Room 이미지들
import RoomA1 from "@images/room/roomA_1.jpg";
import RoomA2 from "@images/room/roomA_2.jpg";
import RoomA3 from "@images/room/roomA_3.jpg";
import RoomA4 from "@images/room/roomA_4.jpg";
import RoomA5 from "@images/room/roomA_5.jpg";
import RoomA6 from "@images/room/roomA_6.jpg";

import outside1 from '@images/room/outside1.jpg'
import outside2 from '@images/room/outside2.jpg'
import roomA1 from '@images/room/roomA1.jpg'
import roomA2 from '@images/room/roomA2.jpg'
import roomA3 from '@images/room/roomA3.jpg'
import roomA4 from '@images/room/roomA4.jpg'
import roomB1 from '@images/room/roomB1.jpg'
import roomB2 from '@images/room/roomB2.jpg'
import roomB3 from '@images/room/roomB3.jpg'
import roomB4 from '@images/room/roomB4.jpg'
import roomB5 from '@images/room/roomB5.jpg'
import roomB6 from '@images/room/roomB6.jpg'

import { debounce } from "lodash";

function Room() {
  const [ImgList, setImgList] = useState([RoomA1, RoomA2, RoomA3, RoomA4, RoomA5, RoomA6]);
  const [selectedSpace, setSelectedSpace] = useState<number>(0);
  const [touchStartY, setTouchStartY] = useState<number | null>(null);
  const [scrollStartY, setScrollStartY] = useState<number | number>(0);
  
  const introRef = useRef<HTMLDivElement>(null);
  const roomSelectionRef = useRef<HTMLDivElement>(null);
  const roomARef = useRef<HTMLDivElement>(null);
  const roomBRef = useRef<HTMLDivElement>(null);

  const spaceA1 = useRef<HTMLDivElement>(null);
  const spaceA2 = useRef<HTMLDivElement>(null);
  const spaceA3 = useRef<HTMLDivElement>(null);
  const spaceA4 = useRef<HTMLDivElement>(null);
  const spaceA5 = useRef<HTMLDivElement>(null);
  const selectA0 = useRef<HTMLDivElement>(null);
  const selectA1 = useRef<HTMLDivElement>(null);
  const selectA2 = useRef<HTMLDivElement>(null);
  const selectA3 = useRef<HTMLDivElement>(null);
  const selectA4 = useRef<HTMLDivElement>(null);
  const selectA5 = useRef<HTMLDivElement>(null);
  const { t } = useTranslation("common");

  const [swiper, serSwiper] = useState<SwiperCore>();
  const selectSpace = (idx: number)=>{
    setSelectedSpace(idx);
  }

  useEffect(()=>{
    switch (selectedSpace) {
      case 0:
        setImgList([outside1, outside2, roomA1, roomA2])
        break;
      case 1:
        setImgList([roomA1, roomA2])
        break;
      case 2:
        setImgList([roomA3, roomA4])
        break;
      case 3:
        setImgList([roomB1, roomB2])
        break;
      case 4:
        setImgList([roomB3, roomB4])
        break;
      case 5:
        setImgList([roomB5, roomB6])
        break;
      default:
        alert("올바르지 않은 접근입니다.")
        break;
    }
    swiper?.slideTo(0,0.5);
  }, [selectedSpace, swiper])

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
    setSelectedSpace(0);
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
            <div>
              <div ref={spaceA1} className={cn("floor-plan-A-living", selectedSpace===1 && "selected")}
                role="presentation" onClick={()=>selectSpace(1)} />
              <div ref={spaceA2} className={cn("floor-plan-A-bed", selectedSpace===2 && "selected")}
                role="presentation" onClick={()=>selectSpace(2)} />
              <div ref={spaceA3} className={cn("floor-plan-A-kitchen", selectedSpace===3 && "selected")}
                role="presentation" onClick={()=>selectSpace(3)} />
              <div ref={spaceA4} className={cn("floor-plan-A-bath", selectedSpace===4 && "selected")}
                role="presentation" onClick={()=>selectSpace(4)} />
              <div ref={spaceA5} className={cn("floor-plan-A-yard", selectedSpace===5 && "selected")}
                role="presentation" onClick={()=>selectSpace(5)} />
              <img src={FloorPlanA} role="presentation" onClick={()=>selectSpace(0)} alt="floor-plan" />
            </div>
          </div>

          {/* 공간 선택 */}
          <div className={cn("space-selection")}>
            <div ref={selectA0} className={cn(selectedSpace===0 && "selected")}
             role="presentation" onClick={()=>selectSpace(0)}>{t("floorPlan.roomA.titles.0")}</div>
            <div ref={selectA1} className={cn(selectedSpace===1 && "selected")}
             role="presentation" onClick={()=>selectSpace(1)}>{t("floorPlan.roomA.titles.1")}</div>
            <div ref={selectA2} className={cn(selectedSpace===2 && "selected")}
             role="presentation" onClick={()=>selectSpace(2)}>{t("floorPlan.roomA.titles.2")}</div>
            <div ref={selectA3} className={cn(selectedSpace===3 && "selected")}
             role="presentation" onClick={()=>selectSpace(3)}>{t("floorPlan.roomA.titles.3")}</div>
            <div ref={selectA4} className={cn(selectedSpace===4 && "selected")}
             role="presentation" onClick={()=>selectSpace(4)}>{t("floorPlan.roomA.titles.4")}</div>
            <div ref={selectA5} className={cn(selectedSpace===5 && "selected")}
             role="presentation" onClick={()=>selectSpace(5)}>{t("floorPlan.roomA.titles.5")}</div>
          </div>

          {/* swiper */}
          <div className={cn("swiper-wrap")}>
            <Swiper
              navigation
              pagination={{
                dynamicBullets: true,
              }}
              modules={[Pagination, Navigation, Autoplay]}
              slidesPerView={1}
              rewind
              autoplay={{delay:5000, disableOnInteraction: false}}
              onSwiper={serSwiper}
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
          <p className={cn("space-description", selectedSpace===0 && "selected")}>{t("floorPlan.serviceDescription")}</p>
          <p className={cn("space-description", selectedSpace===1 && "selected")}>{t("floorPlan.roomA.descriptions.0")}</p>
          <p className={cn("space-description", selectedSpace===2 && "selected")}>{t("floorPlan.roomA.descriptions.1")}</p>
          <p className={cn("space-description", selectedSpace===3 && "selected")}>{t("floorPlan.roomA.descriptions.2")}</p>
          <p className={cn("space-description", selectedSpace===4 && "selected")}>{t("floorPlan.roomA.descriptions.3")}</p>
          <p className={cn("space-description", selectedSpace===5 && "selected")}>{t("floorPlan.roomA.descriptions.4")}</p>
        </div>        

        {/* B호실 */}
        <div ref={roomBRef} className={cn("roomB-info")}>
          {/* 공간도 */}
          <div className={cn("floor-plan")}>
            <div>
              <div ref={spaceA1} className={cn("floor-plan-B-living", selectedSpace===1 && "selected")}
                role="presentation" onClick={()=>selectSpace(1)} />
              <div ref={spaceA2} className={cn("floor-plan-B-bed", selectedSpace===2 && "selected")}
                role="presentation" onClick={()=>selectSpace(2)} />
              <div ref={spaceA3} className={cn("floor-plan-B-kitchen", selectedSpace===3 && "selected")}
                role="presentation" onClick={()=>selectSpace(3)} />
              <div ref={spaceA4} className={cn("floor-plan-B-bath", selectedSpace===4 && "selected")}
                role="presentation" onClick={()=>selectSpace(4)} />
              <div ref={spaceA5} className={cn("floor-plan-B-yard", selectedSpace===5 && "selected")}
                role="presentation" onClick={()=>selectSpace(5)} />
              <img src={FloorPlanB} alt="floor-plan" />
            </div>
          </div>

          {/* 공간 선택 */}
          <div className={cn("space-selection")}>
            <div ref={selectA0} className={cn(selectedSpace===0 && "selected")}
            role="presentation" onClick={()=>selectSpace(0)}>{t("floorPlan.roomB.titles.0")}</div>
            <div ref={selectA1} className={cn(selectedSpace===1 && "selected")}
            role="presentation" onClick={()=>selectSpace(1)}>{t("floorPlan.roomB.titles.1")}</div>
            <div ref={selectA2} className={cn(selectedSpace===2 && "selected")}
            role="presentation" onClick={()=>selectSpace(2)}>{t("floorPlan.roomB.titles.2")}</div>
            <div ref={selectA3} className={cn(selectedSpace===3 && "selected")}
            role="presentation" onClick={()=>selectSpace(3)}>{t("floorPlan.roomB.titles.3")}</div>
            <div ref={selectA4} className={cn(selectedSpace===4 && "selected")}
            role="presentation" onClick={()=>selectSpace(4)}>{t("floorPlan.roomB.titles.4")}</div>
            <div ref={selectA5} className={cn(selectedSpace===5 && "selected")}
            role="presentation" onClick={()=>selectSpace(5)}>{t("floorPlan.roomB.titles.5")}</div>
          </div>

          {/* swiper */}
          <div className={cn("swiper-wrap")}>
            <Swiper
              navigation
              pagination={{
                dynamicBullets: true,
              }}
              modules={[Pagination, Navigation, Autoplay]}
              slidesPerView={1}
              rewind
              autoplay={{delay:5000, disableOnInteraction: false}}
              onSwiper={serSwiper}
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
          <p className={cn("space-description", selectedSpace===0 && "selected")}>{t("floorPlan.serviceDescription")}</p>
          <p className={cn("space-description", selectedSpace===1 && "selected")}>{t("floorPlan.roomB.descriptions.0")}</p>
          <p className={cn("space-description", selectedSpace===2 && "selected")}>{t("floorPlan.roomB.descriptions.1")}</p>
          <p className={cn("space-description", selectedSpace===3 && "selected")}>{t("floorPlan.roomB.descriptions.2")}</p>
          <p className={cn("space-description", selectedSpace===4 && "selected")}>{t("floorPlan.roomB.descriptions.3")}</p>
          <p className={cn("space-description", selectedSpace===5 && "selected")}>{t("floorPlan.roomB.descriptions.4")}</p>
        </div>

{/* 웰컴문구
<h3 className={cn("welcome-title")}>
  <span>{t("floorPlan.serviceTitle")}</span>
  <span>{t("floorPlan.serviceTitle")}</span>
</h3>
<p className={cn("welcome-description")}>{t("floorPlan.serviceDescription")}</p>

{/* 뒷마당
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

{/* 거실
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

{/* 침실
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

{/* 욕실
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

{/* 주방
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
</div> */}

      </section>
    </div>
  );
}

export default Room;
