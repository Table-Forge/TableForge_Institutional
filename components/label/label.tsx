import React from "react";

export interface ILabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
  spaced?: boolean;
  isRequired?: boolean;
  infoText?: string;
}

export const Label: React.FC<ILabelProps> = ({
  children,
  htmlFor,
  spaced,
  isRequired = false,
  className,
  ...props
}) => {
  return (
    <label
      {...props}
      htmlFor={htmlFor}
      className={`flex w-full items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#A1A1A1] ${
        spaced ? "justify-between" : "justify-start"
      } ${className ?? ""}`}
    >
      {children}
      {isRequired ? <span className="text-danger">*</span> : null}
    </label>
  );
};
