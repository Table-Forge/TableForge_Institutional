import React, { useRef } from "react";
import { type FieldValues, type Path, type PathValue, useController } from "react-hook-form";
import { Calendar } from "lucide-react";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import { ErrorMessage } from "@/components/error-message/error-message";
import type { IControlledDateInput } from "./input.interfaces";
import { getInputClasses, inputInnerClasses } from "./input.styles";
import { applyMask } from "./input.masked";

dayjs.extend(customParseFormat);

const serializeDateOnly = (date: Date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

const formatDateForDisplay = (value: unknown): string => {
  if (!value || typeof value !== "string") return "";
  const trimmed = value.trim();
  if (/^\d{4}-\d{2}-\d{2}/.test(trimmed)) {
    const [year, month, day] = trimmed.slice(0, 10).split("-");
    return `${day}/${month}/${year}`;
  }
  return trimmed;
};

export function DateInput<TFieldValues extends FieldValues = FieldValues>({
  hookForm,
  name,
  placeholder = "DD/MM/AAAA",
  disabled,
  isLoading,
  minDate,
  maxDate,
  className,
  defaultValue,
  error: externalError,
}: IControlledDateInput<TFieldValues>) {
  const datePickerRef = useRef<HTMLInputElement>(null);

  const {
    field: { value, onChange, onBlur, ref },
    fieldState: { error },
  } = useController({
    name,
    control: hookForm.control,
    defaultValue: (defaultValue ?? undefined) as PathValue<
      TFieldValues,
      Path<TFieldValues>
    >,
  });

  const errorMessage = externalError || error?.message;
  const displayValue = formatDateForDisplay(value);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const masked = applyMask(e.target.value, "99/99/9999");
    const digits = masked.replace(/\D/g, "");

    if (digits.length === 8) {
      const parsed = dayjs(masked, "DD/MM/YYYY", true);
      if (parsed.isValid()) {
        onChange(parsed.format("YYYY-MM-DD"));
        return;
      }
    }

    if (digits.length === 0) {
      onChange("");
      return;
    }

    onChange(masked);
  };

  const handleNativeDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const nativeVal = e.target.value;
    if (nativeVal) {
      onChange(nativeVal);
    }
  };

  const minDateStr = minDate instanceof Date ? serializeDateOnly(minDate) : (minDate ?? "");
  const maxDateStr = maxDate instanceof Date ? serializeDateOnly(maxDate) : (maxDate ?? "");

  return (
    <div className={`flex w-full flex-col gap-1 ${className ?? ""}`}>
      <div className={getInputClasses(errorMessage, isLoading, disabled)}>
        {isLoading ? (
          <div className="px-3 text-xs text-[#A1A1A1]">Carregando...</div>
        ) : (
          <div className="relative flex h-full w-full items-center">
            <input
              ref={ref}
              id={String(name)}
              type="text"
              placeholder={placeholder}
              value={displayValue}
              onChange={handleInputChange}
              onBlur={onBlur}
              disabled={disabled}
              className={`${inputInnerClasses} pr-11`}
            />

            <input
              ref={datePickerRef}
              type="date"
              tabIndex={-1}
              aria-hidden="true"
              min={minDateStr}
              max={maxDateStr}
              value={typeof value === "string" && /^\d{4}-\d{2}-\d{2}$/.test(value) ? value : ""}
              onChange={handleNativeDateChange}
              className="sr-only"
            />

            <button
              type="button"
              disabled={disabled || isLoading}
              onClick={() => {
                if (datePickerRef.current) {
                  if ("showPicker" in HTMLInputElement.prototype) {
                    datePickerRef.current.showPicker();
                  } else {
                    datePickerRef.current.focus();
                  }
                }
              }}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-[#A1A1A1] hover:text-[#ff2400] transition-colors p-1"
              aria-label="Selecionar data no calendário"
            >
              <Calendar size={18} />
            </button>
          </div>
        )}
      </div>

      {errorMessage ? <ErrorMessage>{errorMessage}</ErrorMessage> : null}
    </div>
  );
}

DateInput.displayName = "DateInput";
