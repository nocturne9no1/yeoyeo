import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

function ReservationDetail() {
  const { state } = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (!state) {
      navigate("/");
    }
  });
  console.log(state);
  if (state) {
    return (
      <div className="reservation-success-wrap">
        <div className="section-wrap">detail</div>
      </div>
    );
  }

  return null;
}

export default ReservationDetail;
