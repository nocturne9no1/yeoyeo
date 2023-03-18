import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import cn from "classnames";
import AOS from "aos";
import "aos/dist/aos.css";

interface Section123Type {
  title: string;
  desc: string;
  buttonTitle: string;
}

function Section123({ title, desc, buttonTitle }: Section123Type) {
  const navigate = useNavigate();

  useEffect(() => {
    AOS.init();
  }, []);

  const navigateToPurchase = (route: string) => {
    switch (route) {
      case "서비스":
        navigate("/service");
        break;
      case "공간":
        navigate("/room");
        break;
      case "예약하기":
        navigate("/reservation");
        break;
      default:
        break;
    }
  };

  return (
    <div className="section-wrap">
      <div className={cn("section-inner")}>
        <div className="top" data-aos="fade-down" data-aos-duration="700" data-aos-offset="100">
          <strong className={cn("section-title")}>{title}</strong>
        </div>
        <div className="body">
          <div
            className="desc"
            data-aos="fade-right"
            data-aos-duration="700"
            data-aos-offset="100"
            data-aos-delay="500"
          >
            {desc}
          </div>
          <div data-aos="fade-right" data-aos-duration="700" data-aos-offset="100" data-aos-delay="1000">
            <button className="nav-btn" type="button" onClick={() => navigateToPurchase(title)}>
              {buttonTitle}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Section123;
