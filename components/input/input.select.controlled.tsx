import React from "react";
import { ErrorMessage } from "@/components/error-message/error-message";
import { useController, type FieldValues, type Path, type UseFormReturn } from "react-hook-form";
import { getInputClasses, inputInnerClasses } from "./input.styles";
import { ChevronDown } from "lucide-react";

export interface ISelectOption {
  value: string | number;
  label: string;
}

export interface IControlledSelect<TFieldValues extends FieldValues = FieldValues> {
  name: Path<TFieldValues>;
  hookForm: UseFormReturn<TFieldValues>;
  options: ISelectOption[];
  placeholder?: string;
  disabled?: boolean;
  isLoading?: boolean;
  error?: string;
}

export function ControlledSelect<TFieldValues extends FieldValues = FieldValues>({
  name,
  hookForm,
  options,
  placeholder = "Selecione...",
  disabled,
  isLoading,
  error: customError,
}: IControlledSelect<TFieldValues>) {
  const {
    field: { value, onChange, onBlur, ref },
    fieldState: { error },
  } = useController({
    name,
    control: hookForm.control,
  });

  const errorMessage = customError || error?.message;

  return (
    <div className="flex w-full flex-col gap-1">
      <div className={`relative ${getInputClasses(errorMessage, isLoading, disabled)}`}>
        <select
          id={name}
          ref={ref}
          value={value ?? ""}
          onChange={(e) => onChange(e.target.value)}
          onBlur={onBlur}
          disabled={disabled || isLoading}
          className={`${inputInnerClasses} appearance-none pr-9 cursor-pointer [&>option]:bg-[#1E1E1E] [&>option]:text-[#faf3e0]`}
        >
          {placeholder ? (
            <option value="" disabled>
              {placeholder}
            </option>
          ) : null}
          {options.map((opt) => (
            <option key={String(opt.value)} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
        <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[#A1A1A1]">
          <ChevronDown className="w-4 h-4" />
        </div>
      </div>
      {errorMessage ? <ErrorMessage>{errorMessage}</ErrorMessage> : null}
    </div>
  );
}
