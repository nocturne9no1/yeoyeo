import { useNavigate } from "react-router-dom";

interface Section123Type {
  title: string;
  desc: string;
  buttonTitle: string;
}

function Section123({ title, desc, buttonTitle }: Section123Type) {
  const navigate = useNavigate();

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
    <div className="grid-container">
      <div className="top">
        <h1>{title}</h1>
      </div>
      <div className="body">
        <div className="desc">
          <p>{desc}</p>
        </div>
        <button className="nav-resrve-btn" type="button" onClick={() => navigateToPurchase(title)}>
          {buttonTitle}
        </button>
      </div>
    </div>
  );
}

export default Section123;
