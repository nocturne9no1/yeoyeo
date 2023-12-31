// import { useRef, useEffect } from "react";
import { useRef } from "react";
import { useTranslation } from "react-i18next";
import Section from "@components/Intro/Section";
import cn from "classnames";
// import AOS from "aos";
// import "aos/dist/aos.css";

function Intro() {
  const sectionWrapRef = useRef<HTMLDivElement>(null);
  const introRef = useRef<HTMLDivElement>(null);
  const { t } = useTranslation("common");

  // useEffect(() => {
  //   AOS.init();
  // }, []);

  return (
    <div className="intro">
      <div ref={sectionWrapRef} className="section-wrap">
        <Section sectionType="intro-top" ref={introRef}>
          <div className="section-wrap">
            <div className={cn("section-inner")}>
              <div className="top">
              {/* <div className="top" data-aos="fade-down" data-aos-duration="1500"> */}
                <strong className={cn("section-title")}>{t("intro.intro.title")}</strong>
                <span className={cn("desc")}>{t("intro.intro.desc")}</span>
              </div>
              <div className="body">
              {/* <div className="body" data-aos="fade-left" data-aos-duration="1500" data-aos-delay="1000"> */}
                <div className="poem">
                  <p>{t("intro.intro.poem.0")}</p>
                  <br />
                  <p>{t("intro.intro.poem.1")}</p>
                </div>
              </div>
            </div>
          </div>
        </Section>
      </div>
    </div>
  );
}

export default Intro;
