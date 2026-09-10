import React from "react";
import { Check, X } from "lucide-react";
import { PASSWORD_RULES } from "@/utils/custom-schema-validations";

export function PasswordRequirements({ value }: { value?: string }) {
  const password = value ?? "";

  return (
    <div className="w-full rounded-xl border border-[#3a3a3a] bg-[#161616] p-3 shadow-md mt-1.5">
      <p className="text-[11px] font-bold text-[#faf3e0] uppercase tracking-wider mb-2">
        Requisitos da senha:
      </p>
      <ul className="flex flex-col gap-1.5">
        {PASSWORD_RULES.map((rule) => {
          const isValid = rule.test(password);

          return (
            <li
              key={rule.label}
              className={`flex items-center gap-1.5 text-xs transition-colors ${
                isValid ? "text-emerald-400 font-medium" : "text-[#A1A1A1]"
              }`}
            >
              {isValid ? (
                <Check size={14} className="text-emerald-400 shrink-0" />
              ) : (
                <X size={14} className="text-red-500 shrink-0" />
              )}
              <span>{rule.label}</span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
