// import { useTranslation } from "react-i18next";
// import GridServiceImage from "@images/intro/grid_service.jpg";
// import GridRoomImage from "@images/intro/grid_room.jpg";
// import GridReservationImage from "@images/intro/grid_reservation.jpg";
import Section from "@components/Intro/Section";
import { useEffect, useRef, useState } from "react";
// import { gsap } from "gsap";
// import { useLayoutEffect, useRef } from "react";
// import { ScrollTrigger } from "gsap/ScrollTrigger";
// import { CSSPlugin } from "gsap/CSSPlugin";
// gsap.registerPlugin(ScrollTrigger, CSSPlugin);

function Intro() {
  // const boxRef = useRef(null);
  const [sectionIdx, setSectionIdx] = useState(0);
  const sectionWrapRef = useRef<HTMLDivElement>(null);
  const introRef = useRef<HTMLDivElement>(null);
  const serviceRef = useRef<HTMLDivElement>(null);
  const roomRef = useRef<HTMLDivElement>(null);
  const reservationRef = useRef<HTMLDivElement>(null);
  const gridRoutingRef = useRef<HTMLDivElement>(null);
  // const { t } = useTranslation("common");

  useEffect(() => {
    function wheelHandler(e: WheelEvent) {
      e.preventDefault();
      const { deltaY } = e; // 세로 스크롤 방향, 양
      const scrollTop = sectionWrapRef.current?.scrollTop; // 스크롤 상단 끝부분 위치
      // const pageHeight = window.innerHeight; // 화면세로길이(100vh)

      if (scrollTop !== undefined) {
        if (deltaY > 0) {
          // 아래방향 스크롤일 때
          if (sectionIdx === 0) {
            serviceRef.current?.classList.add("go");
            setSectionIdx(() => 1);
          } else if (sectionIdx === 1) {
            roomRef.current?.classList.add("go");
            setSectionIdx(() => 2);
          } else if (sectionIdx === 2) {
            reservationRef.current?.classList.add("go");
            setSectionIdx(() => 3);
          } else if (sectionIdx === 3) {
            gridRoutingRef.current?.classList.add("go");
            setSectionIdx(() => 4);
          }
        } else if (deltaY < 0) {
          // 윗방향 스크롤일 때
          if (sectionIdx === 1) {
            serviceRef.current?.classList.remove("go");
            setSectionIdx(() => 0);
          } else if (sectionIdx === 2) {
            roomRef.current?.classList.remove("go");
            setSectionIdx(() => 1);
          } else if (sectionIdx === 3) {
            reservationRef.current?.classList.remove("go");
            setSectionIdx(() => 2);
          } else if (sectionIdx === 4) {
            gridRoutingRef.current?.classList.remove("go");
            setSectionIdx(() => 3);
          }
        }
      }
    }

    const sectionWrapRefCurrent = sectionWrapRef.current;
    if (sectionWrapRefCurrent) {
      sectionWrapRefCurrent.addEventListener("wheel", wheelHandler);
      return () => {
        sectionWrapRefCurrent.removeEventListener("wheel", wheelHandler);
      };
    }
    return undefined;
  }, [sectionIdx]);

  return (
    <div className="intro">
      <div ref={sectionWrapRef} className="section-wrap">
        <Section sectionType="intro" ref={introRef}>
          <p>Intro</p>
        </Section>
        <Section sectionType="service" ref={serviceRef}>
          <p>Service</p>
        </Section>
        <Section sectionType="room" ref={roomRef}>
          <p>Room</p>
        </Section>
        <Section sectionType="reservation" ref={reservationRef}>
          <p>Reservation</p>
        </Section>
        <Section sectionType="grid-routing" ref={gridRoutingRef}>
          <p>GridRounting</p>
        </Section>
      </div>
    </div>

    // <div className="intro-wrap">
    //   <div className="contents-section">
    //     <div className="top">
    //       <span>site desc</span>
    //       <span>welcome desc</span>
    //     </div>
    //     <div className="body">
    //       <span>Content body</span>
    //       <div className="poem">
    //         <p>{t("poem.0")}</p>
    //         <br />
    //         <p>{t("poem.1")}</p>
    //         <br />
    //         <p>{t("poem.2")}</p>
    //         <br />
    //         <p>{t("poem.3")}</p>
    //         <br />
    //         <p>{t("poem.4")}</p>
    //       </div>
    //     </div>
    //     <div className="bottom">
    //       <button className="nav-resrve-btn" type="button">
    //         예약하기
    //       </button>
    //     </div>
    //     {/* <div className="side">

    //     </div> */}
    //   </div>

    // <div className="routing-section">
    //   <div className="container">
    //     <div className="snip1273 grid-service">
    //       <img src={GridServiceImage} alt="grid-home" className="grid-service" />
    //       <figcaption>
    //         <h3 style={{ color: "white" }}>Fletch Skinner</h3>
    //         <p style={{ color: "white" }}>
    //           I don&apos;t need to compromise my principles, because they don&apos;t have the slightest bearing on
    //           what happens to me anyway.
    //         </p>
    //       </figcaption>
    //       {/* <a href="/#">button</a> */}
    //     </div>
    //     <div className="grid-image1">
    //       <img src="https://picsum.photos/200/300" alt="grid-home" />
    //       {/* <figcaption>
    //         <h3 style={{ color: "white" }}>Fletch Skinner</h3>
    //         <p style={{ color: "white" }}>
    //           I don&apos;t need to compromise my principles, because they don&apos;t have the slightest bearing on
    //           what happens to me anyway.
    //         </p>
    //       </figcaption> */}
    //       {/* <a href="/#">button</a> */}
    //     </div>
    //     <div className="grid-image2">
    //       <img src={GridRoomImage} alt="grid-home" className="grid-image2" />
    //     </div>
    //     <div className="snip1273 grid-room">
    //       <img src={GridRoomImage} alt="grid-home" className="grid-room" />
    //       <figcaption>
    //         <h3 style={{ color: "white" }}>Fletch Skinner</h3>
    //         <p style={{ color: "white" }}>
    //           I don&apos;t need to compromise my principles, because they don&apos;t have the slightest bearing on
    //           what happens to me anyway.
    //         </p>
    //       </figcaption>
    //       {/* <a href="/#">button</a> */}
    //     </div>
    //     <div className="snip1273 grid-reservation">
    //       <img src={GridReservationImage} alt="grid-home" className="grid-reservation" />
    //       <figcaption>
    //         <h3 style={{ color: "white" }}>Fletch Skinner</h3>
    //         <p style={{ color: "white" }}>
    //           I don&apos;t need to compromise my principles, because they don&apos;t have the slightest bearing on
    //           what happens to me anyway.
    //         </p>
    //       </figcaption>
    //       {/* <a href="/#">button</a> */}
    //     </div>
    //     <div className="grid-image3">
    //       <img src="https://picsum.photos/200/300" alt="grid-home" className="grid-image3" />
    //       {/* <figcaption>
    //         <h3 style={{ color: "white" }}>Fletch Skinner</h3>
    //         <p style={{ color: "white" }}>
    //           I don&apos;t need to compromise my principles, because they don&apos;t have the slightest bearing on
    //           what happens to me anyway.
    //         </p>
    //       </figcaption> */}
    //       {/* <a href="/#">button</a> */}
    //     </div>
    //   </div>
    // </div>
    // </div>
  );
}

export default Intro;
