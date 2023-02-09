// import { useTranslation } from "react-i18next";
import { gsap } from "gsap";
import { useEffect } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { CSSPlugin } from "gsap/CSSPlugin";

gsap.registerPlugin(ScrollTrigger, CSSPlugin);
function Intro() {
  // const { t } = useTranslation("common");
  useEffect(() => {
    // gsap.utils.toArray(".panel").forEach((panel, i) => {
    //   ScrollTrigger.create({
    //     trigger: panel,
    //     start: "top top",
    //     pin: true,
    //     pinSpacing: false,
    //   });
    // });
    gsap.registerPlugin(ScrollTrigger, CSSPlugin);
    ScrollTrigger.defaults({
      toggleActions: "restart pause resume pause",
      scroller: ".container",
    });

    gsap.to(".orange", {
      scrollTrigger: ".orange",
      duration: 2,
      rotation: 360,
    });

    gsap.to(".red", {
      scrollTrigger: {
        trigger: ".red",
        toggleActions: "restart pause reverse pause",
      },
      duration: 1,
      backgroundColor: "#FFA500",
      ease: "none",
    });

    gsap.to(".yoyo p", {
      scrollTrigger: ".yoyo",
      scale: 2,
      repeat: -1,
      yoyo: true,
      ease: "power2",
    });
  }, []);
  return (
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
    //       {/* <button className="nav-resrve-btn" type="button">
    //         예약하기
    //       </button> */}
    //     </div>
    //     {/* <div className="side">

    //     </div> */}
    //   </div>
    // </div>
    <>
      <div className="description panel blue">
        <div>
          <h1>Layered pinning</h1>
          <p>Use pinning to layer panels on top of each other as you scroll.</p>
          {/* <div className="scroll-down">
            Scroll down<div className="arrow"></div>
          </div> */}
        </div>
      </div>
      <section className="panel red">ONE</section>
      <section className="panel orange">TWO</section>
      <section className="panel purple">THREE</section>
      <section className="panel green">FOUR</section>
    </>
  );
}

export default Intro;
