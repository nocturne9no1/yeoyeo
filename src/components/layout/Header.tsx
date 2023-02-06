import { useState, useEffect, useRef, ReactElement } from "react";
import { NavLink } from "react-router-dom";
import { ReactComponent as IcoHamburger } from "@icons/ico_hamburger.svg";
import i18next, { changeLanguage } from "i18next";

function Header(): ReactElement {
  const [lang, setLang] = useState<string>(i18next.language);
  const [scroll, setScroll] = useState(false);

  const headerRef = useRef<HTMLDivElement>(null);

  const handleLang = () => {
    if (i18next.language === "ko") {
      changeLanguage("en");
      setLang("en");
    } else {
      changeLanguage("ko");
      setLang("ko");
    }
  };

  const windowScroll = () => {
    const scrollTop = window.scrollY;

    if (headerRef && headerRef.current) {
      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      scrollTop >= headerRef.current.clientHeight - 40 ? setScroll(true) : setScroll(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", windowScroll);
    return () => {
      window.removeEventListener("scroll", windowScroll);
    };
  }, []);

  return (
    <div className={`header-wrap ${scroll ? "scroll" : "top"}`} ref={headerRef}>
      <div className="header">
        <button type="button" aria-label="SNB button">
          <IcoHamburger />
        </button>
        <h1 className="logo">
          <NavLink to="/">logo</NavLink>
        </h1>
        <button type="button" aria-label="language button" className="lang-btn" onClick={() => handleLang()}>
          {lang}
        </button>
      </div>
    </div>
  );
}

export default Header;
