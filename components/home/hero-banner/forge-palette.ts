import { FORGE_COLORS } from "@/constants/forge-colors";

export const FORGE_PALETTE = FORGE_COLORS;

export const FORGE_STAGE = { width: 1920, height: 1080 } as const;

export const FORGE_STAGE_CLASS =
  "absolute left-1/2 top-1/2 h-[1080px] w-[1920px] [transform:translate(calc(-50%_+_var(--forge-stage-shift,0px)),-50%)_scale(var(--forge-stage-scale,1))]";

export const BURN_ORIGIN = { x: 960, y: 540 } as const;
