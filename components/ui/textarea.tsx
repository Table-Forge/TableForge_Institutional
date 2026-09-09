import React from "react";

export interface ITextarea extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
}

export const Textarea = React.forwardRef<HTMLTextAreaElement, ITextarea>(
  ({ label, error, className = "", id, ...props }, ref) => {
    const textareaId = id || (label ? label.toLowerCase().replace(/\s+/g, "-") : undefined);

    return (
      <div className="w-full space-y-1.5">
        {label && (
          <label htmlFor={textareaId} className="block text-xs font-medium text-[#D1D1D1]">
            {label}
          </label>
        )}
        <textarea
          ref={ref}
          id={textareaId}
          className={`w-full bg-[#1E1E1E] text-[#faf3e0] placeholder-[#717171] border rounded-lg px-3.5 py-2.5 text-sm transition-colors focus:outline-none focus:ring-1 ${
            error
              ? "border-red-500 focus:border-red-500 focus:ring-red-500"
              : "border-[#3a3a3a] focus:border-[#ff2400] focus:ring-[#ff2400]"
          } ${className}`}
          {...props}
        />
        {error && <p className="text-xs text-red-400 mt-1">{error}</p>}
      </div>
    );
  }
);

Textarea.displayName = "Textarea";
