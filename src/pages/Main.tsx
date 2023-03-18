import { useRef, useEffect } from "react";
import { useTranslation } from "react-i18next";
import Section from "@components/Intro/Section";
import Section123 from "@components/Intro/Section123";
import cn from "classnames";
import AOS from "aos";
import "aos/dist/aos.css";

function Intro() {
  const sectionWrapRef = useRef<HTMLDivElement>(null);
  const introRef = useRef<HTMLDivElement>(null);
  const serviceRef = useRef<HTMLDivElement>(null);
  const roomRef = useRef<HTMLDivElement>(null);
  const reservationRef = useRef<HTMLDivElement>(null);
  const { t } = useTranslation("common");

  useEffect(() => {
    AOS.init();
  }, []);

  return (
    <div className="intro">
      <div ref={sectionWrapRef} className="section-wrap">
        <Section sectionType="intro-top" ref={introRef}>
          <div className="section-wrap">
            <div className={cn("section-inner")}>
              <div className="top" data-aos="fade-down" data-aos-duration="1500">
                <strong className={cn("section-title")}>{t("intro.intro.title")}</strong>
                <span className={cn("desc")}>{t("intro.intro.desc")}</span>
              </div>
              <div className="body" data-aos="fade-left" data-aos-duration="1500" data-aos-delay="1000">
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
            </div>
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
        {/* <Section sectionType="grid-routing" ref={gridRoutingRef}>
          <GridRouting />
        </Section> */}
      </div>
    </div>
  );
}

export default Intro;
