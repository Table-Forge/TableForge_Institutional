import React from "react";

export interface IInputGroupProps {
  children: React.ReactNode;
  className?: string;
}

export const InputGroup = ({ children, className }: IInputGroupProps) => {
  return <div className={`flex min-w-[135px] flex-1 flex-col gap-1.5 ${className ?? ""}`}>{children}</div>;
};
