import cn from "classnames";
import { ReactComponent as ChevronDown } from "@icons/ico_chevrondown.svg";
import { RefObject, useRef, useState } from "react";

function Agreement() {
  const contentRef = useRef<HTMLDivElement>(null);
  const contentRef2 = useRef<HTMLDivElement>(null);
  const [selectedRef, setSelectedRef] = useState<RefObject<HTMLDivElement> | null>(null);

  function handleAgreementOpen(ref: RefObject<HTMLDivElement>) {
    const refDiv = ref.current;

    if (selectedRef !== ref) {
      selectedRef?.current?.style.removeProperty("max-height");
    }

    if (refDiv && !refDiv?.style.maxHeight) {
      // eslint-disable-next-line no-param-reassign
      refDiv.style.maxHeight = `${refDiv.scrollHeight}px`;
      setSelectedRef(ref);
    } else {
      refDiv?.style.removeProperty("max-height");
    }
  }

  return (
    <div className={cn("agreement-wrap")}>
      <div className={cn("agreement-section")}>
        <div className={cn("agreement-title")}>
          <span>▪️ 여여 이용약관(필수)</span>
          <div className={cn("btn-wrap")}>
            <button type="button" aria-label="menu close" onClick={() => handleAgreementOpen(contentRef)}>
              <ChevronDown />
            </button>
          </div>
        </div>
        <div className={cn("agreement-content-wrap")} ref={contentRef}>
          <div className={cn("agreement-content")}>
            <div>
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Alias delectus ipsam facere earum, cumque cum!
              Ducimus sequi corrupti cum laboriosam, dolorem rerum quis minus consectetur repellat ex illum fugiat
              praesentium!
            </div>
          </div>
        </div>
      </div>
      <div className={cn("agreement-section")}>
        <div className={cn("agreement-title")}>
          <span>▪️ 여여 이용약관(필수)</span>
          <div className={cn("btn-wrap")}>
            <button type="button" aria-label="menu close" onClick={() => handleAgreementOpen(contentRef2)}>
              <ChevronDown />
            </button>
          </div>
        </div>
        <div className={cn("agreement-content-wrap")} ref={contentRef2}>
          <div className={cn("agreement-content")}>
            <div>
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Alias delectus ipsam facere earum, cumque cum!
              Ducimus sequi corrupti cum laboriosam, dolorem rerum quis minus consectetur repellat ex illum fugiat
              praesentium!
            </div>
            <div>
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Alias delectus ipsam facere earum, cumque cum!
              Ducimus sequi corrupti cum laboriosam, dolorem rerum quis minus consectetur repellat ex illum fugiat
              praesentium!
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Agreement;
