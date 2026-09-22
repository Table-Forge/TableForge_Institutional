import React from "react";

export interface IForgeBand extends React.HTMLAttributes<HTMLElement> {
  contained?: boolean;
}

export function ForgeBand({ children, className = "", contained = true, ...props }: IForgeBand) {
  return (
    <section
      className={`stone-pattern relative isolate border-y border-[#1E1E1E] py-16 lg:py-24 ${className}`}
      {...props}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_40%,rgba(0,0,0,0.7)_100%)]"
      />
      <div className={contained ? "relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8" : "relative"}>{children}</div>
    </section>
  );
}
