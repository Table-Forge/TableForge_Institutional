import React from "react";
import { BRAND_LOGOS } from "@/constants/logos";
import { BURN_ORIGIN, FORGE_PALETTE, FORGE_STAGE, FORGE_STAGE_CLASS } from "./forge-palette";

const MARK_SIZE = 160;

export function ForgeCurtain() {
  return (
    <>
      <canvas
        data-forge="burn-canvas"
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-20 h-full w-full"
      />
      <div aria-hidden="true" className={`pointer-events-none z-30 ${FORGE_STAGE_CLASS}`}>
        <svg viewBox={`0 0 ${FORGE_STAGE.width} ${FORGE_STAGE.height}`} className="block h-full w-full">
          <defs>
            <radialGradient id="forge-ignite-glow">
              <stop offset="0%" stopColor={FORGE_PALETTE.ember} stopOpacity={0.85} />
              <stop offset="45%" stopColor={FORGE_PALETTE.crimson} stopOpacity={0.3} />
              <stop offset="100%" stopColor={FORGE_PALETTE.crimson} stopOpacity={0} />
            </radialGradient>
          </defs>
          <g data-forge="ignite">
            <circle
              data-forge="ignite-glow"
              cx={BURN_ORIGIN.x}
              cy={BURN_ORIGIN.y}
              r={170}
              fill="url(#forge-ignite-glow)"
            />
            <image
              href={BRAND_LOGOS.local.markDark}
              x={BURN_ORIGIN.x - MARK_SIZE / 2}
              y={BURN_ORIGIN.y - MARK_SIZE / 2}
              width={MARK_SIZE}
              height={MARK_SIZE}
            />
          </g>
        </svg>
      </div>
    </>
  );
}
