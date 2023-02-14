import { forwardRef, LegacyRef } from "react";

interface SectionProps {
  color: string;
}

function Section({ color }: SectionProps, ref: LegacyRef<HTMLDivElement>) {
  return (
    <div className={`section ${color}`} ref={ref}>
      <p>item2</p>
    </div>
  );
}

export default forwardRef(Section);
