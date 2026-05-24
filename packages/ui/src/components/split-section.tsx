import type { ReactNode } from "react";

type Props = {
  copy: ReactNode;
  visual: ReactNode;
  reverse?: boolean;
  className?: string;
};

export function SplitSection({ copy, visual, reverse = false, className = "" }: Props) {
  return (
    <div className={`split ${className}`} data-reverse={reverse ? "true" : "false"}>
      <div className="split__copy">{copy}</div>
      <div className="split__sticky">{visual}</div>
    </div>
  );
}
