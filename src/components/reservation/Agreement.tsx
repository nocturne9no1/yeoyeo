import cn from "classnames";
import { ReactComponent as ChevronDown } from "@icons/ico_chevrondown.svg";

function Agreement() {
  return (
    <div className={cn("agreement-wrap")}>
      <div className={cn("agreement-section")}>
        <div className={cn("agreement-title")}>
          <span>▪️ 여여 이용약관(필수)</span>
          <div className={cn("btn-wrap")}>
            <button type="button" aria-label="menu close" onClick={() => console.log("helelo")}>
              <ChevronDown />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Agreement;
