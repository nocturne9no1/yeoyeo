import { NavLink } from "react-router-dom";
import { ReactComponent as IcoHamburger } from "@icons/ico_hamburger.svg";
import { ReactElement } from "react";

function Header(): ReactElement {
  return (
    <div className="header-wrap">
      <div className="header">
        <button type="button" aria-label="SNB button">
          <IcoHamburger />
        </button>
        <h1 className="logo">
          <NavLink to="/">logo</NavLink>
        </h1>
        <button type="button" aria-label="language button" className="lang-btn">
          ko
        </button>
      </div>
    </div>
  );
}

export default Header;
