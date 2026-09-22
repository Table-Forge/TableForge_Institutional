import React, { useId } from "react";
import { FORGE_COLORS as C } from "@/constants/forge-colors";
import { ANVIL_FACE_EDGE, ANVIL_HORN_EDGE, ANVIL_SILHOUETTE } from "@/constants/forge-shapes";

export interface ISpotArt {
  className?: string;
}

interface ISpotFrame extends ISpotArt {
  children: React.ReactNode;
}

function SpotFrame({ className = "", children }: ISpotFrame) {
  return (
    <svg viewBox="0 0 96 96" aria-hidden="true" className={className}>
      {children}
    </svg>
  );
}

interface IDie {
  center: { x: number; y: number };
  radius: number;
  showLabel?: boolean;
}

function Die({ center, radius, showLabel = false }: IDie) {
  const vertex = (x: number, y: number) =>
    `${(center.x + x * radius).toFixed(1)},${(center.y + y * radius).toFixed(1)}`;
  const top = vertex(0, -1);
  const upperRight = vertex(0.866, -0.5);
  const lowerRight = vertex(0.866, 0.5);
  const bottom = vertex(0, 1);
  const lowerLeft = vertex(-0.866, 0.5);
  const upperLeft = vertex(-0.866, -0.5);
  const faceTop = vertex(0, -0.44);
  const faceLeft = vertex(-0.5, 0.41);
  const faceRight = vertex(0.5, 0.41);
  const hull = [top, upperRight, lowerRight, bottom, lowerLeft, upperLeft];
  const faces = [
    { points: [top, upperLeft, faceTop], fill: C.ember },
    { points: [top, faceTop, upperRight], fill: C.ember },
    { points: [upperLeft, lowerLeft, faceLeft], fill: C.ember },
    { points: [upperRight, faceRight, lowerRight], fill: C.ember },
    { points: [lowerLeft, bottom, faceLeft], fill: C.ember },
    { points: [faceRight, bottom, lowerRight], fill: C.ember },
    { points: [faceTop, upperLeft, faceLeft], fill: C.orange },
    { points: [faceTop, faceRight, upperRight], fill: C.orange },
    { points: [faceLeft, bottom, faceRight], fill: C.orange },
    { points: [faceTop, faceLeft, faceRight], fill: C.gold },
  ];

  return (
    <g>
      {faces.map((face) => (
        <polygon
          key={face.points.join(" ")}
          points={face.points.join(" ")}
          fill={face.fill}
          stroke={C.clothShadow}
          strokeWidth={radius * 0.035}
          strokeLinejoin="round"
        />
      ))}
      <polygon points={hull.join(" ")} fill="none" stroke={C.outline} strokeWidth={radius * 0.09} strokeLinejoin="round" />
      {showLabel && (
        <text
          x={center.x}
          y={center.y + radius * 0.14}
          fontSize={radius * 0.4}
          fontWeight={900}
          fill={C.clothShadow}
          textAnchor="middle"
          dominantBaseline="central"
        >
          20
        </text>
      )}
    </g>
  );
}

export function DieSpot({ className }: ISpotArt) {
  return (
    <SpotFrame className={className}>
      <Die center={{ x: 48, y: 50 }} radius={34} showLabel />
    </SpotFrame>
  );
}

export function MasterScreenSpot({ className }: ISpotArt) {
  return (
    <SpotFrame className={className}>
      <path d="M8 32 L32 26 V78 L8 72 Z" fill={C.leather} stroke={C.outline} strokeWidth={3} strokeLinejoin="round" />
      <path d="M64 26 L88 32 V72 L64 78 Z" fill={C.leather} stroke={C.outline} strokeWidth={3} strokeLinejoin="round" />
      <rect x={32} y={22} width={32} height={56} fill={C.woodLight} stroke={C.outline} strokeWidth={3} />
      <path d="M14 40 h12 M14 48 h12 M14 56 h12 M70 40 h12 M70 48 h12 M70 56 h12" stroke={C.cream} strokeOpacity={0.45} strokeWidth={2} strokeLinecap="round" />
      <path d="M48 36 l9 12 -9 12 -9 -12 z" fill={C.crimson} stroke={C.outline} strokeWidth={2} strokeLinejoin="round" />
      <circle cx={48} cy={48} r={3} fill={C.gold} />
      <path d="M38 68 h20" stroke={C.cream} strokeOpacity={0.6} strokeWidth={2} strokeLinecap="round" />
    </SpotFrame>
  );
}

const SIGN_BOARD = "M24 34 Q48 29 72 34 V54 C72 68 62 78 48 86 C34 78 24 68 24 54 Z";
const SIGN_BOARD_INNER = "M29 38 Q48 34 67 38 V54 C67 65 59 74 48 81 C37 74 29 65 29 54 Z";

export function StoreSignSpot({ className }: ISpotArt) {
  return (
    <SpotFrame className={className}>
      <rect x={8} y={8} width={9} height={28} fill={C.iron} stroke={C.outline} strokeWidth={3} />
      <circle cx={12.5} cy={14} r={1.6} fill={C.ironHighlight} />
      <circle cx={12.5} cy={30} r={1.6} fill={C.ironHighlight} />
      <rect x={14} y={13} width={66} height={7} fill={C.iron} stroke={C.outline} strokeWidth={3} />
      <circle cx={82} cy={16.5} r={5} fill={C.iron} stroke={C.outline} strokeWidth={3} />
      <path d="M32 20 V32 M64 20 V32" stroke={C.ironHighlight} strokeWidth={3} strokeLinecap="round" />
      <path d={SIGN_BOARD} fill={C.woodLight} stroke={C.outline} strokeWidth={3} strokeLinejoin="round" />
      <path d={SIGN_BOARD_INNER} fill="none" stroke={C.leather} strokeWidth={2} />
      <circle cx={32} cy={33} r={3.4} fill={C.iron} stroke={C.outline} strokeWidth={2} />
      <circle cx={64} cy={33} r={3.4} fill={C.iron} stroke={C.outline} strokeWidth={2} />
      <Die center={{ x: 48, y: 56 }} radius={12.5} />
    </SpotFrame>
  );
}

export function EventBannerSpot({ className }: ISpotArt) {
  return (
    <SpotFrame className={className}>
      <rect x={14} y={12} width={68} height={6} rx={3} fill={C.leather} stroke={C.outline} strokeWidth={2.5} />
      <circle cx={14} cy={15} r={5} fill={C.iron} stroke={C.outline} strokeWidth={2} />
      <circle cx={82} cy={15} r={5} fill={C.iron} stroke={C.outline} strokeWidth={2} />
      <path d="M24 18 H72 V64 L48 80 L24 64 Z" fill={C.clothDeep} stroke={C.clothShadow} strokeWidth={3} strokeLinejoin="round" />
      <path d="M30 24 H66" stroke={C.gold} strokeWidth={2} strokeOpacity={0.7} />
      <path d="M48 32 l5.5 11 12 1.5 -8.8 8.2 2.3 12 -10.9 -5.9 -10.9 5.9 2.3 -12 -8.8 -8.2 12 -1.5 z" fill={C.gold} stroke={C.outline} strokeWidth={2} strokeLinejoin="round" />
    </SpotFrame>
  );
}

export function CompassSpot({ className }: ISpotArt) {
  return (
    <SpotFrame className={className}>
      <circle cx={48} cy={48} r={36} fill={C.iron} stroke={C.outline} strokeWidth={3} />
      <circle cx={48} cy={48} r={28} fill={C.stone} stroke={C.ironLight} strokeWidth={2} />
      <path d="M48 14 v6 M48 76 v6 M14 48 h6 M76 48 h6" stroke={C.cream} strokeWidth={3} strokeLinecap="round" />
      <path d="M48 22 L56 48 L48 44 L40 48 Z" fill={C.crimson} stroke={C.outline} strokeWidth={2} strokeLinejoin="round" />
      <path d="M48 74 L40 48 L48 52 L56 48 Z" fill={C.cream} stroke={C.outline} strokeWidth={2} strokeLinejoin="round" />
      <circle cx={48} cy={48} r={4} fill={C.gold} stroke={C.outline} strokeWidth={2} />
    </SpotFrame>
  );
}

export function ScrollSpot({ className }: ISpotArt) {
  return (
    <SpotFrame className={className}>
      <rect x={22} y={20} width={52} height={58} fill={C.cream} stroke={C.outline} strokeWidth={3} />
      <path d="M30 36 h36 M30 46 h36 M30 56 h24" stroke={C.leather} strokeWidth={3} strokeLinecap="round" />
      <rect x={16} y={12} width={64} height={12} rx={6} fill={C.cream} stroke={C.outline} strokeWidth={3} />
      <rect x={16} y={72} width={64} height={12} rx={6} fill={C.cream} stroke={C.outline} strokeWidth={3} />
      <circle cx={62} cy={64} r={8} fill={C.crimson} stroke={C.clothShadow} strokeWidth={2} />
      <path d="M62 59 l3.2 5 -3.2 5 -3.2 -5 z" fill={C.gold} />
    </SpotFrame>
  );
}

export function TableSpot({ className }: ISpotArt) {
  return (
    <SpotFrame className={className}>
      <path d="M18 54 V84 M78 54 V84" stroke={C.wood} strokeWidth={6} strokeLinecap="round" />
      <path d="M18 56 L32 70 M78 56 L64 70" stroke={C.wood} strokeWidth={4} strokeLinecap="round" />
      <rect x={10} y={44} width={76} height={10} rx={2} fill={C.woodLight} stroke={C.outline} strokeWidth={3} />
      <rect x={44} y={26} width={8} height={18} fill={C.cream} stroke={C.outline} strokeWidth={2} />
      <path d="M48 12 C55 19 55 26 48 27 C41 26 41 19 48 12 Z" fill={C.gold} stroke={C.ember} strokeWidth={2} />
      <rect x={24} y={34} width={10} height={10} rx={2} fill={C.crimson} stroke={C.outline} strokeWidth={2} />
      <circle cx={29} cy={39} r={1.5} fill={C.cream} />
      <rect x={62} y={32} width={10} height={10} rx={2} fill={C.cream} stroke={C.outline} strokeWidth={2} />
      <circle cx={65.5} cy={35.5} r={1.3} fill={C.outline} />
      <circle cx={68.5} cy={38.5} r={1.3} fill={C.outline} />
    </SpotFrame>
  );
}

const CALENDAR_DOTS = [28, 40, 52, 64];

export function SealCalendarSpot({ className }: ISpotArt) {
  return (
    <SpotFrame className={className}>
      <rect x={18} y={22} width={60} height={58} rx={2} fill={C.stoneMid} stroke={C.outline} strokeWidth={3} />
      <rect x={18} y={22} width={60} height={14} fill={C.crimson} stroke={C.outline} strokeWidth={3} />
      <path d="M30 14 v14 M66 14 v14" stroke={C.iron} strokeWidth={4} strokeLinecap="round" />
      {CALENDAR_DOTS.map((x) => (
        <g key={x}>
          <circle cx={x} cy={46} r={2.2} fill={C.cream} fillOpacity={0.7} />
          <circle cx={x} cy={56} r={2.2} fill={C.cream} fillOpacity={0.7} />
        </g>
      ))}
      <circle cx={28} cy={66} r={2.2} fill={C.cream} fillOpacity={0.7} />
      <circle cx={40} cy={66} r={2.2} fill={C.cream} fillOpacity={0.7} />
      <circle cx={64} cy={68} r={9} fill={C.crimson} stroke={C.clothShadow} strokeWidth={2} />
      <path d="M64 62 l3.6 6 -3.6 6 -3.6 -6 z" fill={C.gold} />
    </SpotFrame>
  );
}

const HORN_BODY = "M60 14 L82 38 C84 66 56 90 14 86 C30 78 58 62 60 14 Z";
const HORN_BANDS = [
  { d: "M55.5 29.3 L82.5 58.7", width: 9 },
  { d: "M31 70 V94", width: 5.5 },
];
const HORN_RIVETS = [
  { x: 64.3, y: 38.8 },
  { x: 69, y: 44 },
  { x: 73.7, y: 49.2 },
];

export function HornSpot({ className }: ISpotArt) {
  const clipId = useId();
  return (
    <SpotFrame className={className}>
      <defs>
        <clipPath id={clipId}>
          <path d={HORN_BODY} />
        </clipPath>
      </defs>
      <path d="M2 92 C8 86 16 84 24 84 L20 92 Z" fill={C.iron} stroke={C.outline} strokeWidth={2} strokeLinejoin="round" />
      <path d={HORN_BODY} fill={C.cream} />
      <g clipPath={`url(#${clipId})`}>
        {HORN_BANDS.map((band) => (
          <g key={band.d}>
            <path d={band.d} stroke={C.outline} strokeWidth={band.width + 3} />
            <path d={band.d} stroke={C.iron} strokeWidth={band.width} />
          </g>
        ))}
      </g>
      {HORN_RIVETS.map((rivet) => (
        <circle key={rivet.x} cx={rivet.x} cy={rivet.y} r={1.7} fill={C.cream} />
      ))}
      <path d={HORN_BODY} fill="none" stroke={C.outline} strokeWidth={3} strokeLinejoin="round" />
      <ellipse cx={71} cy={26} rx={16.3} ry={5.5} transform="rotate(47.5 71 26)" fill={C.cream} stroke={C.outline} strokeWidth={2.5} />
      <ellipse cx={71} cy={26} rx={12} ry={3} transform="rotate(47.5 71 26)" fill={C.leather} />
    </SpotFrame>
  );
}

const MUG_STAVES = [
  "M20.9 17 L20.4 24",
  "M30.9 17 L30.7 24",
  "M42.1 17 L42.3 24",
  "M52.2 17 L52.7 24",
  "M20.1 35 L18.1 64",
  "M30.7 35 L30 64",
  "M42.4 35 L43.1 64",
  "M52.9 35 L54.9 64",
  "M17.5 73 L17.2 79",
  "M29.4 73 L29.3 79",
  "M43.5 73 L43.6 79",
  "M55.4 73 L55.7 79",
];

export function MugSpot({ className }: ISpotArt) {
  return (
    <SpotFrame className={className}>
      <circle cx={67} cy={38} r={16.5} fill="none" stroke={C.outline} strokeWidth={9.5} />
      <circle cx={67} cy={38} r={16.5} fill="none" stroke={C.iron} strokeWidth={5.5} />
      <path d="M13 12 H60 L61 25 H12 Z" fill={C.leather} stroke={C.outline} strokeWidth={3} strokeLinejoin="round" />
      <path d="M12 30 H61 L64 66 H9 Z" fill={C.leather} stroke={C.outline} strokeWidth={3} strokeLinejoin="round" />
      <path d="M8 70 H65 L67 84 H6 Z" fill={C.leather} stroke={C.outline} strokeWidth={3} strokeLinejoin="round" />
      {MUG_STAVES.map((d) => (
        <path key={d} d={d} stroke={C.woodDeep} strokeWidth={2} strokeLinecap="round" />
      ))}
      <rect x={11} y={24.5} width={51} height={6} fill={C.iron} stroke={C.outline} strokeWidth={2} />
      <rect x={8} y={65.5} width={57} height={5} fill={C.iron} stroke={C.outline} strokeWidth={2} />
    </SpotFrame>
  );
}

const ANVIL_SPOT_SCALE = 0.34;
const ANVIL_SPOT_OFFSET = { x: 4.3, y: 5.2 };
const STUMP_GRAIN = [
  "M38 72 Q37 79 38.5 86",
  "M52 72 Q53 79 51.5 86",
  "M64 72 Q65 79 63.5 86",
];

export function AnvilSpot({ className }: ISpotArt) {
  return (
    <SpotFrame className={className}>
      <ellipse cx={48} cy={89} rx={36} ry={4} fill={C.black} opacity={0.55} />
      <path d="M30 70 H72 L77 88 H25 Z" fill={C.woodLight} stroke={C.outline} strokeWidth={3} strokeLinejoin="round" />
      {STUMP_GRAIN.map((d) => (
        <path key={d} d={d} fill="none" stroke={C.woodDeep} strokeWidth={2} strokeLinecap="round" />
      ))}
      <rect x={28} y={76} width={46} height={4} fill={C.iron} />

      <g transform={`translate(${ANVIL_SPOT_OFFSET.x} ${ANVIL_SPOT_OFFSET.y}) scale(${ANVIL_SPOT_SCALE})`}>
        <path d={ANVIL_SILHOUETTE} fill={C.iron} stroke={C.outline} strokeWidth={8.8} strokeLinejoin="round" />
        <path d={ANVIL_FACE_EDGE} fill={C.ironHighlight} opacity={0.75} />
        <path d={ANVIL_HORN_EDGE} fill={C.ironHighlight} opacity={0.5} />
      </g>

      <Die center={{ x: 52, y: 19 }} radius={9} />
    </SpotFrame>
  );
}
