import { useState, ReactElement } from "react";
import { NavLink } from "react-router-dom";
import { ReactComponent as IcoHamburger } from "@icons/ico_hamburger.svg";
import i18next, { changeLanguage } from "i18next";

function Header(): ReactElement {
  const [lang, setLang] = useState<string>(i18next.language);

  const handleLang = () => {
    if (i18next.language === "ko") {
      changeLanguage("en");
      setLang("en");
    } else {
      changeLanguage("ko");
      setLang("ko");
    }
  };

  return (
    <div className="header-wrap">
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
