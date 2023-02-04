import { NavLink } from "react-router-dom";

function Header() {
  return (
    <div className="header-wrap">
      <div className="header">
        <h1 className="logo">
          <NavLink to="/">logo</NavLink>
        </h1>
      </div>
    </div>
  );
}

export default Header;
