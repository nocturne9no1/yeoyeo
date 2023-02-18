import { Outlet } from "react-router-dom";
import Header from "./Header";

function Layout() {
  return (
    <div className="page-wrap">
      <Header />
      <Outlet />
      {/* TODO: Insert Footer */}
    </div>
  );
}

export default Layout;
