import type { JSX } from "react";

export type TPrimitives = string | number | boolean;

export type TSelectOptions<TValue extends TPrimitives = TPrimitives> = {
  value: TValue | undefined | null;
  label?: string | JSX.Element;
  name: string;
  id?: number | string;
  allowSelect?: boolean;
};
