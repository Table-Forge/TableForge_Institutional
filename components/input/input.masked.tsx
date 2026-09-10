import React, { forwardRef } from "react";
import { ErrorMessage } from "@/components/error-message/error-message";
import type { IMaskedInput } from "./input.interfaces";
import { inputInnerClasses } from "./input.styles";

export function applyMask(value: string, mask: string) {
  const digits = value.replace(/\D/g, "");
  let result = "";
  let digitIndex = 0;

  for (let i = 0; i < mask.length; i += 1) {
    if (mask[i] === "9") {
      if (digitIndex >= digits.length) break;
      result += digits[digitIndex];
      digitIndex += 1;
    } else {
      result += mask[i];
    }
  }

  return result;
}

export const MaskedInput = forwardRef<HTMLInputElement, IMaskedInput>(
  ({ error, isLoading, mask, value, onChange, className, ...props }, ref) => {
    return (
      <>
        {isLoading ? (
          <div className="px-3 text-xs text-[#A1A1A1]">Carregando...</div>
        ) : (
          <input
            {...props}
            ref={ref}
            type="text"
            value={typeof value === "string" ? applyMask(value, mask) : value}
            onChange={(event) => {
              const maskedValue = applyMask(event.target.value, mask);
              event.target.value = maskedValue;
              onChange?.(event);
            }}
            className={`${inputInnerClasses} ${className ?? ""}`}
          />
        )}

        {error ? <ErrorMessage>{error}</ErrorMessage> : null}
      </>
    );
  },
);

MaskedInput.displayName = "MaskedInput";
