import { useTranslation } from "react-i18next";
import Section from "@components/Intro/Section";
import { useEffect, useRef, useState } from "react";
import Section123 from "@components/Intro/Section123";
import GridRouting from "@components/Intro/GrudRouting";
// import { gsap } from "gsap";
// import { useLayoutEffect, useRef } from "react";
// import { ScrollTrigger } from "gsap/ScrollTrigger";
// import { CSSPlugin } from "gsap/CSSPlugin";
// gsap.registerPlugin(ScrollTrigger, CSSPlugin);

function Intro() {
  const [sectionIdx, setSectionIdx] = useState(0);
  // const [touchclientY, setClientY] = useState(0);
  // const [touchDeltaY, setTouchDeltaY] = useState(0);
  const [scrollDirection, setScrollDirection] = useState<string | null>();
  const [startY, setStartY] = useState<number | null>(null);

  const sectionWrapRef = useRef<HTMLDivElement>(null);
  const introRef = useRef<HTMLDivElement>(null);
  const serviceRef = useRef<HTMLDivElement>(null);
  const roomRef = useRef<HTMLDivElement>(null);
  const reservationRef = useRef<HTMLDivElement>(null);
  const gridRoutingRef = useRef<HTMLDivElement>(null);
  const { t } = useTranslation("common");

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
            introRef.current?.classList.add("no");
            serviceRef.current?.classList.add("go");
            setSectionIdx(() => 1);
          } else if (sectionIdx === 1) {
            serviceRef.current?.classList.add("no");
            roomRef.current?.classList.add("go");
            setSectionIdx(() => 2);
          } else if (sectionIdx === 2) {
            roomRef.current?.classList.add("no");
            reservationRef.current?.classList.add("go");
            setSectionIdx(() => 3);
          } else if (sectionIdx === 3) {
            reservationRef.current?.classList.add("no");
            gridRoutingRef.current?.classList.add("go");
            setSectionIdx(() => 4);
          }
        } else if (deltaY < 0) {
          // 윗방향 스크롤일 때
          if (sectionIdx === 1) {
            introRef.current?.classList.remove("no");
            serviceRef.current?.classList.remove("go");
            setSectionIdx(() => 0);
          } else if (sectionIdx === 2) {
            serviceRef.current?.classList.remove("no");
            roomRef.current?.classList.remove("go");
            setSectionIdx(() => 1);
          } else if (sectionIdx === 3) {
            roomRef.current?.classList.remove("no");
            reservationRef.current?.classList.remove("go");
            setSectionIdx(() => 2);
          } else if (sectionIdx === 4) {
            reservationRef.current?.classList.remove("no");
            gridRoutingRef.current?.classList.remove("go");
            setSectionIdx(() => 3);
          }
        }
      }
    }
    // function touchStartHandler(e: TouchEvent) {
    //   e.preventDefault();
    //   const { changedTouches } = e;
    //   console.log("start", changedTouches[0].pageY);
    //   setClientY(() => changedTouches[0].pageY);
    // }

    // function touchEndHandler(e: TouchEvent) {
    //   e.preventDefault();
    //   const { changedTouches } = e;
    //   console.log("end", changedTouches[0].pageY);
    //   setTouchDeltaY(() => changedTouches[0].pageY - touchclientY);

    //   if (touchDeltaY !== 0 && Math.abs(touchDeltaY) > 50) {
    //     if (touchDeltaY < 0) {
    //       // 아래방향 스크롤일 때
    //       if (sectionIdx === 0) {
    //         introRef.current?.classList.add("no");
    //         serviceRef.current?.classList.add("go");
    //         setSectionIdx(() => 1);
    //       } else if (sectionIdx === 1) {
    //         serviceRef.current?.classList.add("no");
    //         roomRef.current?.classList.add("go");
    //         setSectionIdx(() => 2);
    //       } else if (sectionIdx === 2) {
    //         roomRef.current?.classList.add("no");
    //         reservationRef.current?.classList.add("go");
    //         setSectionIdx(() => 3);
    //       } else if (sectionIdx === 3) {
    //         reservationRef.current?.classList.add("no");
    //         gridRoutingRef.current?.classList.add("go");
    //         setSectionIdx(() => 4);
    //       }
    //     } else if (touchDeltaY > 50) {
    //       // 윗방향 스크롤일 때
    //       if (sectionIdx === 1) {
    //         // introRef.current?.classList.remove("no");
    //         serviceRef.current?.classList.remove("go");
    //         setSectionIdx(() => 0);
    //       } else if (sectionIdx === 2) {
    //         serviceRef.current?.classList.remove("no");
    //         roomRef.current?.classList.remove("go");
    //         setSectionIdx(() => 1);
    //       } else if (sectionIdx === 3) {
    //         roomRef.current?.classList.remove("no");
    //         reservationRef.current?.classList.remove("go");
    //         setSectionIdx(() => 2);
    //       } else if (sectionIdx === 4) {
    //         reservationRef.current?.classList.remove("no");
    //         gridRoutingRef.current?.classList.remove("go");
    //         setSectionIdx(() => 3);
    //       }
    //     }
    //   }
    // }

    const sectionWrapRefCurrent = sectionWrapRef.current;
    if (sectionWrapRefCurrent) {
      sectionWrapRefCurrent.addEventListener("wheel", wheelHandler);
      // sectionWrapRefCurrent.addEventListener("touchstart", touchStartHandler);
      // sectionWrapRefCurrent.addEventListener("touchend", touchEndHandler);

      return () => {
        sectionWrapRefCurrent.removeEventListener("wheel", wheelHandler);
        // sectionWrapRefCurrent.addEventListener("touchstart", touchStartHandler);
        // sectionWrapRefCurrent.addEventListener("touchend", touchEndHandler);
      };
    }
    return undefined;
  }, [sectionIdx]);

  function setScreenSize() {
    const vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty("--vh", `${vh}px`);
  }

  window.addEventListener("resize", () => {
    const vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty("--vh", `${vh}px`);
  });

  useEffect(() => {
    setScreenSize();
  });

  /* eslint-disable */
  useEffect(() => {
    console.log(scrollDirection);
    if (scrollDirection === "down") {
      // 아래방향 스크롤일 때
      if (sectionIdx === 0) {
        introRef.current?.classList.add("no");
        serviceRef.current?.classList.add("go");
        setSectionIdx(() => 1);
      } else if (sectionIdx === 1) {
        serviceRef.current?.classList.add("no");
        roomRef.current?.classList.add("go");
        setSectionIdx(() => 2);
      } else if (sectionIdx === 2) {
        roomRef.current?.classList.add("no");
        reservationRef.current?.classList.add("go");
        setSectionIdx(() => 3);
      } else if (sectionIdx === 3) {
        reservationRef.current?.classList.add("no");
        gridRoutingRef.current?.classList.add("go");
        setSectionIdx(() => 4);
      }
    } else if (scrollDirection === "up") {
      // 윗방향 스크롤일 때
      if (sectionIdx === 1) {
        introRef.current?.classList.remove("no");
        serviceRef.current?.classList.remove("go");
        setSectionIdx(() => 0);
      } else if (sectionIdx === 2) {
        serviceRef.current?.classList.remove("no");
        roomRef.current?.classList.remove("go");
        setSectionIdx(() => 1);
      } else if (sectionIdx === 3) {
        roomRef.current?.classList.remove("no");
        reservationRef.current?.classList.remove("go");
        setSectionIdx(() => 2);
      } else if (sectionIdx === 4) {
        reservationRef.current?.classList.remove("no");
        gridRoutingRef.current?.classList.remove("go");
        setSectionIdx(() => 3);
      }
    }
  }, [scrollDirection]);

  const handleTouchStart = (e: React.TouchEvent) => {
    setStartY(e.touches[0].clientY);
  };
  const handleTouchMove = (e: React.TouchEvent) => {
    const currentY = e.touches[0].clientY;
    const scrollY = sectionWrapRef.current?.scrollTop;

    if (currentY > startY! && scrollY === 0) {
      setScrollDirection("up");
    } else if (
      currentY < startY! &&
      sectionWrapRef.current
      // sectionWrapRef.current.scrollHeight - sectionWrapRef.current.scrollTop === sectionWrapRef.current.clientHeight
    ) {
      setScrollDirection("down");
    } else {
      setScrollDirection(null);
    }
  };

  const handleTouchEnd = () => {
    setStartY(null);
  };
  return (
    <div className="intro">
      <div
        ref={sectionWrapRef}
        className="section-wrap"
        onTouchStart={(e) => handleTouchStart(e)}
        onTouchMove={(e) => handleTouchMove(e)}
        onTouchEnd={handleTouchEnd}
      >
        <Section sectionType="intro" ref={introRef}>
          <div className="grid-container">
            <div className="top">
              <h1>{t("intro.intro.title")}</h1>
              <span>{t("intro.intro.desc")}</span>
            </div>
            <div className="body">
              <div className="poem">
                <p>{t("intro.intro.poem.0")}</p>
                <br />
                <p>{t("intro.intro.poem.1")}</p>
                <br />
                <p>{t("intro.intro.poem.2")}</p>
                <br />
                <p>{t("intro.intro.poem.3")}</p>
                <br />
                <p>{t("intro.intro.poem.4")}</p>
              </div>
            </div>
            {/* <div className="bottom">
              <button className="nav-resrve-btn" type="button">
                예약하기
              </button>
            </div> */}
          </div>
        </Section>
        <Section sectionType="service section123" ref={serviceRef}>
          <Section123
            title={t("intro.service.title")}
            desc={t("intro.service.desc")}
            buttonTitle={t("intro.service.buttonTitle")}
          />
        </Section>
        <Section sectionType="room section123" ref={roomRef}>
          <Section123
            title={t("intro.room.title")}
            desc={t("intro.room.desc")}
            buttonTitle={t("intro.room.buttonTitle")}
          />
        </Section>
        <Section sectionType="reservation section123" ref={reservationRef}>
          <Section123
            title={t("intro.reservation.title")}
            desc={t("intro.reservation.desc")}
            buttonTitle={t("intro.reservation.buttonTitle")}
          />
        </Section>
        <Section sectionType="grid-routing" ref={gridRoutingRef}>
          <GridRouting />
        </Section>
      </div>
    </div>
  );
}

export default Intro;
