// import { useTranslation } from "react-i18next";
import { gsap } from "gsap";
import { useLayoutEffect, useRef } from "react";
// import { ScrollTrigger } from "gsap/ScrollTrigger";
// import { CSSPlugin } from "gsap/CSSPlugin";

// gsap.registerPlugin(ScrollTrigger, CSSPlugin);
function Intro() {
  const boxRef = useRef(null);

  // const { t } = useTranslation("common");
  useLayoutEffect(() => {
    gsap.to(boxRef.current, {
      rotation: "+=180",
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
    // <div className="App">
    <div className="box" ref={boxRef}>
      Hello
    </div>
    // </div>
  );
}

export default Intro;
