import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";

function Layout() {
  return (
    <div className="page-wrap">
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
}

export default Layout;
