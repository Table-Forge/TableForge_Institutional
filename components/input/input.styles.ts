export const getInputClasses = (
  error?: string,
  isLoading?: boolean,
  disabled?: boolean,
) => {
  const base =
    "flex h-11 w-full min-w-[80px] items-center overflow-hidden rounded-lg border bg-[#1E1E1E] transition-all duration-200 shadow-sm";
  const border = error
    ? "border-red-500 focus-within:ring-2 focus-within:ring-red-500/25"
    : "border-[#3a3a3a] focus-within:border-[#ff2400] focus-within:ring-2 focus-within:ring-[#ff2400]/25";
  const state =
    disabled || isLoading
      ? "cursor-not-allowed bg-white/5 opacity-60"
      : "hover:border-[#4A4A4A] hover:bg-[#252525]";

  return `${base} ${border} ${state}`;
};

export const inputInnerClasses =
  "h-full w-full border-none bg-transparent px-3.5 py-2 text-sm font-medium text-[#faf3e0] placeholder:font-normal placeholder:text-[#717171] focus:outline-none disabled:cursor-not-allowed";
