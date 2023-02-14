// import { useTranslation } from "react-i18next";
// import GridServiceImage from "@images/intro/grid_service.jpg";
// import GridRoomImage from "@images/intro/grid_room.jpg";
// import GridReservationImage from "@images/intro/grid_reservation.jpg";
import Section from "@components/Intro/Section";
import { useEffect, useRef } from "react";
// import { gsap } from "gsap";
// import { useLayoutEffect, useRef } from "react";
// import { ScrollTrigger } from "gsap/ScrollTrigger";
// import { CSSPlugin } from "gsap/CSSPlugin";
// gsap.registerPlugin(ScrollTrigger, CSSPlugin);

function Intro() {
  // const boxRef = useRef(null);
  // forwa
  const testRef = useRef<HTMLDivElement>(null);
  const sectionWrapRef = useRef<HTMLDivElement>(null);
  const blueRef = useRef<HTMLDivElement>(null);
  // const { t } = useTranslation("common");

  // useLayoutEffect(() => {
  //   gsap.to(boxRef.current, {
  //     rotation: "+=340",
  //     duration: 5,
  //   });
  // }, []);

  useEffect(() => {
    function wheelHandler(e: WheelEvent) {
      e.preventDefault();
      const { deltaY } = e; // 세로 스크롤 방향, 양
      const scrollTop = sectionWrapRef.current?.scrollTop; // 스크롤 상단 끝부분 위치
      const pageHeight = window.innerHeight; // 화면세로길이(100vh)

      // console.log("deltaY : ", deltaY);
      // console.log("scrollTop : ", scrollTop);
      // console.log("pageHeight : ", pageHeight);
      if (scrollTop !== undefined) {
        if (deltaY > 0) {
          // 아래방향 스크롤일 때
          if (scrollTop >= 0 && scrollTop < pageHeight) {
            // console.log("현재 1페이지, down");
            // sectionWrapRef.current?.scrollTo({
            //   top: pageHeight,
            //   left: 0,
            //   behavior: "smooth",
            // });
            blueRef.current?.classList.add("go");
          } else if (scrollTop >= pageHeight && scrollTop < pageHeight * 2) {
            console.log("현재 2페이지, down");
            sectionWrapRef.current?.scrollTo({
              top: pageHeight * 2,
              left: 0,
              behavior: "smooth",
            });
          } else if (scrollTop >= pageHeight * 2 && scrollTop < pageHeight * 3) {
            console.log("현재 3페이지, down");
            sectionWrapRef.current?.scrollTo({
              top: pageHeight * 3,
              left: 0,
              behavior: "smooth",
            });
          } else if (scrollTop >= pageHeight * 3 && scrollTop < pageHeight * 4) {
            console.log("현재 4페이지, down");
            sectionWrapRef.current?.scrollTo({
              top: pageHeight * 4,
              left: 0,
              behavior: "smooth",
            });
          }
        } else if (deltaY < 0) {
          // 윗방향 스크롤일 때
          if (scrollTop >= 0 && scrollTop < pageHeight) {
            console.log("현재 1페이지, up");
            // sectionWrapRef.current?.scrollTo({
            //   top: 0,
            //   left: 0,
            //   behavior: "smooth",
            // });
            blueRef.current?.classList.remove("go");
          } else if (scrollTop >= pageHeight && scrollTop < pageHeight * 2) {
            console.log("현재 2페이지, up");
            // sectionWrapRef.current?.scrollTo({
            //   top: 0,
            //   left: 0,
            //   behavior: "smooth",
            // });
          } else if (scrollTop >= pageHeight * 2 && scrollTop < pageHeight * 3) {
            console.log("현재 3페이지, up");
            sectionWrapRef.current?.scrollTo({
              top: pageHeight,
              left: 0,
              behavior: "smooth",
            });
          } else if (scrollTop >= pageHeight * 3 && scrollTop < pageHeight * 4) {
            console.log("현재 4페이지, up");
            sectionWrapRef.current?.scrollTo({
              top: pageHeight * 2,
              left: 0,
              behavior: "smooth",
            });
          } else {
            console.log("현재 5페이지, up");
            sectionWrapRef.current?.scrollTo({
              top: pageHeight * 3,
              left: 0,
              behavior: "smooth",
            });
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
  }, []);

  return (
    <div className="intro">
      <div ref={sectionWrapRef} className="section-wrap">
        <Section color="bg-yellow" ref={testRef} />
        <Section color="bg-blue" ref={blueRef} />
        <Section color="bg-pink" />
        {/* <div className="section bg-blue" ref={blueRef}>
          <p>item2</p>
        </div>
        <Section color="bg-green" />
        <Section color="bg-orange" /> */}
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

    //   <div className="routing-section">
    //     <div className="container">
    //       <div className="snip1273 grid-service">
    //         <img src={GridServiceImage} alt="grid-home" className="grid-service" />
    //         <figcaption>
    //           <h3 style={{ color: "white" }}>Fletch Skinner</h3>
    //           <p style={{ color: "white" }}>
    //             I don&apos;t need to compromise my principles, because they don&apos;t have the slightest bearing on
    //             what happens to me anyway.
    //           </p>
    //         </figcaption>
    //         {/* <a href="/#">button</a> */}
    //       </div>
    //       <div className="grid-image1">
    //         <img src="https://picsum.photos/200/300" alt="grid-home" />
    //         {/* <figcaption>
    //           <h3 style={{ color: "white" }}>Fletch Skinner</h3>
    //           <p style={{ color: "white" }}>
    //             I don&apos;t need to compromise my principles, because they don&apos;t have the slightest bearing on
    //             what happens to me anyway.
    //           </p>
    //         </figcaption> */}
    //         {/* <a href="/#">button</a> */}
    //       </div>
    //       <div className="grid-image2">
    //         <img src={GridRoomImage} alt="grid-home" className="grid-image2" />
    //       </div>
    //       <div className="snip1273 grid-room">
    //         <img src={GridRoomImage} alt="grid-home" className="grid-room" />
    //         <figcaption>
    //           <h3 style={{ color: "white" }}>Fletch Skinner</h3>
    //           <p style={{ color: "white" }}>
    //             I don&apos;t need to compromise my principles, because they don&apos;t have the slightest bearing on
    //             what happens to me anyway.
    //           </p>
    //         </figcaption>
    //         {/* <a href="/#">button</a> */}
    //       </div>
    //       <div className="snip1273 grid-reservation">
    //         <img src={GridReservationImage} alt="grid-home" className="grid-reservation" />
    //         <figcaption>
    //           <h3 style={{ color: "white" }}>Fletch Skinner</h3>
    //           <p style={{ color: "white" }}>
    //             I don&apos;t need to compromise my principles, because they don&apos;t have the slightest bearing on
    //             what happens to me anyway.
    //           </p>
    //         </figcaption>
    //         {/* <a href="/#">button</a> */}
    //       </div>
    //       <div className="grid-image3">
    //         <img src="https://picsum.photos/200/300" alt="grid-home" className="grid-image3" />
    //         {/* <figcaption>
    //           <h3 style={{ color: "white" }}>Fletch Skinner</h3>
    //           <p style={{ color: "white" }}>
    //             I don&apos;t need to compromise my principles, because they don&apos;t have the slightest bearing on
    //             what happens to me anyway.
    //           </p>
    //         </figcaption> */}
    //         {/* <a href="/#">button</a> */}
    //       </div>
    //     </div>
    //   </div>
    // </div>
  );
}

export default Intro;
