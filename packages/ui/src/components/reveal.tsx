import type { ReactNode, ElementType, CSSProperties } from "react";

type Props = {
  children: ReactNode;
  as?: ElementType;
  delay?: number;
  className?: string;
};

export function Reveal({ children, as: Tag = "div", delay = 0, className = "" }: Props) {
  const style: CSSProperties = delay ? { animationDelay: `${delay}ms` } : {};
  return (
    <Tag className={`reveal ${className}`} style={style}>
      {children}
    </Tag>
  );
}
