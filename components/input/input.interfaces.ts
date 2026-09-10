import type { FieldValues, Path, UseFormReturn } from "react-hook-form";

export interface IInputStyles {
  error?: string;
  isLoading?: boolean;
  disabled?: boolean;
  uppercase?: boolean;
  removeSpaces?: boolean;
}

export interface IControllerInput<TFieldValues extends FieldValues = FieldValues>
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "name">,
    IInputStyles {
  hookForm: UseFormReturn<TFieldValues, unknown, unknown>;
  name: Path<TFieldValues>;
  sanitize?: boolean;
  sanitizeEmail?: boolean;
}

export interface IMaskedControllerInput<TFieldValues extends FieldValues = FieldValues>
  extends IControllerInput<TFieldValues> {
  mask: string;
}

export interface IControlledDateInput<TFieldValues extends FieldValues = FieldValues>
  extends IControllerInput<TFieldValues> {
  minDate?: string | Date;
  maxDate?: string | Date;
  showYearDropdown?: boolean;
  showTime?: boolean;
  startDate?: string | Date;
  endDate?: string | Date;
}

export interface IMaskedInput extends React.InputHTMLAttributes<HTMLInputElement> {
  mask: string;
  error?: string;
  isLoading?: boolean;
}
