import React from "react";
import { BRAND_LOGOS } from "@/constants/logos";
import { FORGE_PALETTE as P, FORGE_STAGE, FORGE_STAGE_CLASS } from "./forge-palette";

interface IPlane {
  forgeKey?: string;
  left: number;
  top: number;
  width: number;
  height: number;
  transform: string;
  origin?: string;
  children: React.ReactNode;
}

function Plane({ forgeKey, left, top, width, height, transform, origin = "50% 50%", children }: IPlane) {
  return (
    <div
      data-forge={forgeKey}
      className="absolute will-change-transform"
      style={{ left, top, width, height, transform, transformOrigin: origin, backfaceVisibility: "hidden" }}
    >
      {children}
    </div>
  );
}

interface IStonePattern {
  id: string;
}

function StonePattern({ id }: IStonePattern) {
  return (
    <pattern id={id} width={240} height={120} patternUnits="userSpaceOnUse">
      <rect width={240} height={120} fill={P.stoneDeep} />
      <rect x={3} y={3} width={112} height={54} rx={4} fill={P.stone} />
      <rect x={123} y={3} width={114} height={54} rx={4} fill={P.stone} />
      <rect x={3} y={63} width={52} height={54} rx={4} fill={P.stone} />
      <rect x={63} y={63} width={112} height={54} rx={4} fill={P.stone} />
      <rect x={183} y={63} width={54} height={54} rx={4} fill={P.stone} />
      <path
        d="M22 22l26-6M152 42l30-5M92 92l28-5M200 80l18-4"
        stroke={P.stoneMid}
        strokeWidth={3}
        strokeLinecap="round"
      />
    </pattern>
  );
}

const ARCH_CENTER_X = 960;
const ARCH_CENTER_Y = 460;
const OPENING_RADIUS = 260;
const OPENING_PATH = "M700 1080 V460 A260 260 0 0 1 1220 460 V1080 Z";
const WALL_WITH_OPENING = `M0 0 H1920 V1080 H0 Z ${OPENING_PATH}`;
const VOUSSOIR_COUNT = 11;
const KEYSTONE_INDEX = 5;
const JAMB_BLOCKS = [0, 1, 2, 3, 4, 5, 6];
const TORCH_POSITIONS = [590, 1330];

function polar(radius: number, angle: number) {
  const x = ARCH_CENTER_X + Math.cos(angle) * radius;
  const y = ARCH_CENTER_Y + Math.sin(angle) * radius;
  return `${x.toFixed(1)} ${y.toFixed(1)}`;
}

function voussoirPath(index: number, outerRadius: number) {
  const step = Math.PI / VOUSSOIR_COUNT;
  const start = Math.PI + index * step;
  const end = start + step;
  const inner = OPENING_RADIUS + 2;
  return `M${polar(inner, start)} L${polar(outerRadius, start)} A${outerRadius} ${outerRadius} 0 0 1 ${polar(outerRadius, end)} L${polar(inner, end)} A${inner} ${inner} 0 0 0 ${polar(inner, start)} Z`;
}

interface ITorch {
  x: number;
  y: number;
}

function Torch({ x, y }: ITorch) {
  return (
    <g>
      <circle cx={x} cy={y - 90} r={190} fill="url(#forge-torch-glow)" />
      <path
        d={`M${x - 18} ${y + 36} L${x} ${y + 8} L${x + 18} ${y + 36}`}
        stroke={P.iron}
        strokeWidth={7}
        fill="none"
        strokeLinecap="round"
      />
      <rect x={x - 8} y={y - 50} width={16} height={64} rx={4} fill={P.woodLight} stroke={P.outline} strokeWidth={3} />
      <rect x={x - 11} y={y - 60} width={22} height={18} rx={3} fill={P.leather} stroke={P.outline} strokeWidth={3} />
      <g data-forge="torch-flame">
        <path
          d={`M${x} ${y - 165} C${x + 34} ${y - 120} ${x + 30} ${y - 85} ${x} ${y - 58} C${x - 30} ${y - 85} ${x - 34} ${y - 120} ${x} ${y - 165} Z`}
          fill={P.ember}
        />
        <path
          d={`M${x} ${y - 135} C${x + 18} ${y - 108} ${x + 16} ${y - 84} ${x} ${y - 62} C${x - 16} ${y - 84} ${x - 18} ${y - 108} ${x} ${y - 135} Z`}
          fill={P.gold}
        />
        <path
          d={`M${x} ${y - 100} C${x + 8} ${y - 88} ${x + 8} ${y - 74} ${x} ${y - 64} C${x - 8} ${y - 74} ${x - 8} ${y - 88} ${x} ${y - 100} Z`}
          fill={P.hot}
        />
      </g>
    </g>
  );
}

function ArchArt() {
  return (
    <svg viewBox="0 0 1920 1080" className="block h-full w-full">
      <defs>
        <StonePattern id="forge-stone-front" />
        <radialGradient id="forge-front-vignette" cx="50%" cy="55%" r="62%">
          <stop offset="0%" stopColor={P.black} stopOpacity={0} />
          <stop offset="55%" stopColor={P.black} stopOpacity={0.2} />
          <stop offset="100%" stopColor={P.black} stopOpacity={0.9} />
        </radialGradient>
        <radialGradient id="forge-torch-glow">
          <stop offset="0%" stopColor={P.ember} stopOpacity={0.5} />
          <stop offset="100%" stopColor={P.ember} stopOpacity={0} />
        </radialGradient>
        <linearGradient id="forge-seam-soft" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor={P.ember} stopOpacity={0} />
          <stop offset="50%" stopColor={P.ember} stopOpacity={0.55} />
          <stop offset="100%" stopColor={P.ember} stopOpacity={0} />
        </linearGradient>
        <radialGradient id="forge-seam-floor">
          <stop offset="0%" stopColor={P.gold} stopOpacity={0.75} />
          <stop offset="100%" stopColor={P.ember} stopOpacity={0} />
        </radialGradient>
      </defs>
      <path d={WALL_WITH_OPENING} fill="url(#forge-stone-front)" fillRule="evenodd" />
      <path d={WALL_WITH_OPENING} fill="url(#forge-front-vignette)" fillRule="evenodd" />
      {TORCH_POSITIONS.map((x) => (
        <Torch key={x} x={x} y={600} />
      ))}
      {JAMB_BLOCKS.map((index) => {
        const y = 460 + index * 88;
        const wide = index % 2 === 0;
        const width = wide ? 74 : 60;
        return (
          <g key={index}>
            <rect x={700 - width} y={y} width={width} height={86} rx={3} fill={P.stoneMid} stroke={P.stoneDeep} strokeWidth={4} />
            <rect x={1220} y={y} width={width} height={86} rx={3} fill={P.stoneMid} stroke={P.stoneDeep} strokeWidth={4} />
          </g>
        );
      })}
      {Array.from({ length: VOUSSOIR_COUNT }, (_, index) => {
        const isKeystone = index === KEYSTONE_INDEX;
        return (
          <path
            key={index}
            d={voussoirPath(index, isKeystone ? 372 : 336)}
            fill={isKeystone ? P.stoneLight : P.stoneMid}
            stroke={P.stoneDeep}
            strokeWidth={4}
          />
        );
      })}
      <path d="M960 118 L978 142 L960 166 L942 142 Z" fill={P.iron} stroke={P.outline} strokeWidth={3} />
      <rect x={680} y={1058} width={560} height={22} fill={P.stoneLight} stroke={P.stoneDeep} strokeWidth={4} />
      <g data-forge="seam-glow">
        <g data-forge="seam-pulse">
          <rect x={936} y={470} width={48} height={610} fill="url(#forge-seam-soft)" />
          <rect x={957} y={470} width={6} height={610} fill={P.orange} opacity={0.9} />
          <ellipse cx={960} cy={1076} rx={240} ry={28} fill="url(#forge-seam-floor)" />
        </g>
      </g>
    </svg>
  );
}

interface IDoorArt {
  side: "left" | "right";
}

const DOOR_BANDS = [200, 720];
const EMBLEM_SIZE = 300;

function DoorArt({ side }: IDoorArt) {
  const isLeft = side === "left";
  const width = isLeft ? 270 : 272;
  const leaf = isLeft ? "M0 270 A270 270 0 0 1 270 0 V890 H0 Z" : "M2 0 A270 270 0 0 1 272 270 V890 H2 Z";
  const clipId = `forge-door-${side}-clip`;
  const shadeId = `forge-door-${side}-shade`;
  const plankStart = isLeft ? 0 : 2;
  const planks = [0, 1, 2, 3].map((index) => plankStart + index * 68);
  const studs = (isLeft ? [40, 100, 160, 220] : [52, 112, 172, 232]).map((x) => x);
  const strapPath = (y: number) =>
    isLeft
      ? `M0 ${y - 2} H118 L150 ${y + 13} L118 ${y + 28} H0 Z`
      : `M272 ${y - 2} H154 L122 ${y + 13} L154 ${y + 28} H272 Z`;
  const handleX = isLeft ? 232 : 40;
  const emblemX = isLeft ? 270 - EMBLEM_SIZE / 2 : 2 - EMBLEM_SIZE / 2;

  return (
    <svg viewBox={`0 0 ${width} 890`} className="block h-full w-full">
      <defs>
        <clipPath id={clipId}>
          <path d={leaf} />
        </clipPath>
        <linearGradient id={shadeId} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={P.black} stopOpacity={0.1} />
          <stop offset="55%" stopColor={P.black} stopOpacity={0} />
          <stop offset="100%" stopColor={P.black} stopOpacity={0.6} />
        </linearGradient>
      </defs>
      <g clipPath={`url(#${clipId})`}>
        <rect width={width} height={890} fill={P.wood} />
        {planks.map((x, index) => (
          <rect key={x} x={x} y={0} width={68} height={890} fill={index % 2 === 0 ? P.wood : P.woodDark} />
        ))}
        {planks.slice(1).map((x) => (
          <line key={x} x1={x} y1={0} x2={x} y2={890} stroke={P.woodDeep} strokeWidth={4} />
        ))}
        <path
          d={`M${plankStart + 30} 300 Q${plankStart + 38} 420 ${plankStart + 28} 560 M${plankStart + 170} 80 Q${plankStart + 178} 200 ${plankStart + 166} 330 M${plankStart + 236} 380 Q${plankStart + 244} 520 ${plankStart + 232} 680`}
          stroke={P.woodDeep}
          strokeWidth={3}
          fill="none"
          opacity={0.7}
        />
        <image
          href={BRAND_LOGOS.local.markDark}
          x={emblemX}
          y={320}
          width={EMBLEM_SIZE}
          height={EMBLEM_SIZE}
          opacity={0.9}
        />
        {DOOR_BANDS.map((y) => (
          <g key={y}>
            <rect x={0} y={y} width={width} height={28} fill={P.iron} />
            <rect x={0} y={y} width={width} height={5} fill={P.ironLight} />
            <path d={strapPath(y)} fill={P.stoneLight} stroke={P.outline} strokeWidth={3} strokeLinejoin="round" />
            {studs.map((x) => (
              <g key={x}>
                <circle cx={x} cy={y + 14} r={7} fill={P.stoneMid} stroke={P.outline} strokeWidth={2} />
                <circle cx={x - 2} cy={y + 12} r={2.5} fill={P.ironHighlight} />
              </g>
            ))}
          </g>
        ))}
        <circle cx={handleX} cy={800} r={17} fill={P.stoneLight} stroke={P.outline} strokeWidth={3} />
        <circle cx={handleX} cy={834} r={26} fill="none" stroke={P.outline} strokeWidth={12} opacity={0.6} />
        <circle cx={handleX} cy={834} r={26} fill="none" stroke={P.ironLight} strokeWidth={8} />
        <rect width={width} height={890} fill={`url(#${shadeId})`} />
      </g>
      <path d={leaf} fill="none" stroke={P.woodDeep} strokeWidth={8} />
    </svg>
  );
}

function FloorArt() {
  return (
    <svg viewBox="0 0 1800 1900" className="block h-full w-full">
      <defs>
        <pattern id="forge-flagstone" width={200} height={150} patternUnits="userSpaceOnUse">
          <rect width={200} height={150} fill={P.stoneDeep} />
          <rect x={4} y={4} width={92} height={66} rx={5} fill={P.stone} />
          <rect x={104} y={4} width={92} height={66} rx={5} fill={P.stone} />
          <rect x={4} y={80} width={42} height={66} rx={5} fill={P.stone} />
          <rect x={54} y={80} width={92} height={66} rx={5} fill={P.stoneMid} opacity={0.8} />
          <rect x={154} y={80} width={42} height={66} rx={5} fill={P.stone} />
        </pattern>
        <radialGradient id="forge-floor-fire" cx="50%" cy="0%" r="55%">
          <stop offset="0%" stopColor={P.ember} stopOpacity={0.6} />
          <stop offset="50%" stopColor={P.crimson} stopOpacity={0.2} />
          <stop offset="100%" stopColor={P.crimson} stopOpacity={0} />
        </radialGradient>
        <linearGradient id="forge-floor-depth" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={P.black} stopOpacity={0.1} />
          <stop offset="60%" stopColor={P.black} stopOpacity={0.35} />
          <stop offset="100%" stopColor={P.black} stopOpacity={0.8} />
        </linearGradient>
        <linearGradient id="forge-floor-sides" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor={P.black} stopOpacity={0.85} />
          <stop offset="22%" stopColor={P.black} stopOpacity={0} />
          <stop offset="78%" stopColor={P.black} stopOpacity={0} />
          <stop offset="100%" stopColor={P.black} stopOpacity={0.85} />
        </linearGradient>
      </defs>
      <rect width={1800} height={1900} fill="url(#forge-flagstone)" />
      <rect width={1800} height={1900} fill="url(#forge-floor-depth)" />
      <rect width={1800} height={1900} fill="url(#forge-floor-fire)" />
      <rect width={1800} height={1900} fill="url(#forge-floor-sides)" />
    </svg>
  );
}

const CEILING_BEAMS = [150, 620, 1090, 1560];

function CeilingArt() {
  return (
    <svg viewBox="0 0 1800 1900" className="block h-full w-full">
      <defs>
        <radialGradient id="forge-ceiling-fire" cx="50%" cy="100%" r="50%">
          <stop offset="0%" stopColor={P.crimson} stopOpacity={0.3} />
          <stop offset="100%" stopColor={P.crimson} stopOpacity={0} />
        </radialGradient>
      </defs>
      <rect width={1800} height={1900} fill={P.void} />
      {CEILING_BEAMS.map((y) => (
        <rect key={y} x={0} y={y} width={1800} height={64} fill={P.woodDark} stroke={P.woodDeep} strokeWidth={5} />
      ))}
      <rect x={860} y={0} width={80} height={1900} fill={P.woodDeep} />
      <rect width={1800} height={1900} fill="url(#forge-ceiling-fire)" />
    </svg>
  );
}

interface ISideWallArt {
  side: "left" | "right";
}

function SideWallArt({ side }: ISideWallArt) {
  const mirrored = side === "right";
  return (
    <svg viewBox="0 0 1900 1280" className="block h-full w-full">
      <defs>
        <StonePattern id={`forge-stone-${side}`} />
        <linearGradient id={`forge-side-depth-${side}`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor={P.black} stopOpacity={0.92} />
          <stop offset="45%" stopColor={P.black} stopOpacity={0.55} />
          <stop offset="100%" stopColor={P.black} stopOpacity={0.05} />
        </linearGradient>
        <radialGradient id={`forge-side-fire-${side}`} cx="100%" cy="60%" r="45%">
          <stop offset="0%" stopColor={P.ember} stopOpacity={0.4} />
          <stop offset="100%" stopColor={P.ember} stopOpacity={0} />
        </radialGradient>
      </defs>
      <g transform={mirrored ? "translate(1900 0) scale(-1 1)" : undefined}>
        <rect width={1900} height={1280} fill={`url(#forge-stone-${side})`} />
        <rect x={1330} y={188} width={240} height={16} rx={4} fill={P.leather} stroke={P.outline} strokeWidth={3} />
        <path
          d="M1350 204 H1550 V560 L1450 632 L1350 560 Z"
          fill={P.clothDeep}
          stroke={P.clothShadow}
          strokeWidth={6}
          strokeLinejoin="round"
        />
        <image href={BRAND_LOGOS.local.markDark} x={1375} y={280} width={150} height={150} opacity={0.9} />
        <rect width={1900} height={1280} fill={`url(#forge-side-depth-${side})`} />
        <rect width={1900} height={1280} fill={`url(#forge-side-fire-${side})`} />
      </g>
    </svg>
  );
}

const HEARTH_COURSES = [1000, 1100, 1200];
const HEARTH_JOINTS = [700, 840, 980, 1120];
const HOOD_RIVETS = [660, 720, 780, 840, 900, 960, 1020, 1080, 1140];
const WALL_HAMMERS = [1530, 1620, 1710];
const SHELF_HELMETS = [180, 280, 380];
const TROUGH_STAVES = [395, 450, 505];

function BackWallArt() {
  return (
    <svg viewBox="0 0 1800 1280" className="block h-full w-full">
      <defs>
        <StonePattern id="forge-stone-back" />
        <radialGradient id="forge-furnace-glow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor={P.gold} stopOpacity={0.5} />
          <stop offset="35%" stopColor={P.ember} stopOpacity={0.4} />
          <stop offset="70%" stopColor={P.crimson} stopOpacity={0.15} />
          <stop offset="100%" stopColor={P.crimson} stopOpacity={0} />
        </radialGradient>
        <radialGradient id="forge-back-vignette" cx="50%" cy="60%" r="70%">
          <stop offset="0%" stopColor={P.black} stopOpacity={0} />
          <stop offset="60%" stopColor={P.black} stopOpacity={0.25} />
          <stop offset="100%" stopColor={P.black} stopOpacity={0.9} />
        </radialGradient>
        <linearGradient id="forge-chimney-soot" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={P.black} stopOpacity={0.7} />
          <stop offset="100%" stopColor={P.black} stopOpacity={0} />
        </linearGradient>
      </defs>
      <rect width={1800} height={1280} fill="url(#forge-stone-back)" />
      <circle data-forge="furnace-glow" cx={900} cy={800} r={900} fill="url(#forge-furnace-glow)" />

      <rect x={800} y={0} width={200} height={392} fill={P.stoneMid} stroke={P.outline} strokeWidth={6} />
      <rect x={800} y={0} width={200} height={392} fill="url(#forge-chimney-soot)" />
      <path d="M760 386 H1040 L1180 626 H620 Z" fill={P.stoneLight} stroke={P.outline} strokeWidth={6} strokeLinejoin="round" />
      <path d="M700 520 H1100" stroke={P.ironLight} strokeWidth={4} opacity={0.5} />
      {HOOD_RIVETS.map((x) => (
        <circle key={x} cx={x} cy={604} r={5} fill={P.ironLight} />
      ))}
      <path d="M640 630 H1160" stroke={P.ember} strokeWidth={5} opacity={0.6} />
      <rect x={640} y={626} width={520} height={284} fill={P.black} />

      <rect x={560} y={900} width={680} height={380} fill={P.stoneMid} stroke={P.outline} strokeWidth={6} />
      {HEARTH_COURSES.map((y) => (
        <path key={y} d={`M560 ${y} H1240`} stroke={P.stoneDeep} strokeWidth={5} />
      ))}
      {HEARTH_JOINTS.map((x) => (
        <path
          key={x}
          d={`M${x} 900 V1000 M${x + 70} 1000 V1100 M${x} 1100 V1200 M${x + 70} 1200 V1280`}
          stroke={P.stoneDeep}
          strokeWidth={5}
        />
      ))}
      <rect x={540} y={878} width={720} height={36} rx={3} fill={P.stoneLight} stroke={P.outline} strokeWidth={5} />
      <ellipse cx={900} cy={896} rx={250} ry={26} fill={P.black} />

      <path d="M1240 900 L1470 838 L1470 900 Z" fill={P.leather} stroke={P.outline} strokeWidth={5} strokeLinejoin="round" />
      <path d="M1240 900 L1470 962 L1470 900 Z" fill={P.woodLight} stroke={P.outline} strokeWidth={5} strokeLinejoin="round" />
      <rect x={1466} y={826} width={110} height={18} rx={7} fill={P.woodLight} stroke={P.outline} strokeWidth={4} />
      <rect x={1466} y={956} width={110} height={18} rx={7} fill={P.woodLight} stroke={P.outline} strokeWidth={4} />
      <rect x={1190} y={890} width={60} height={20} rx={4} fill={P.iron} stroke={P.outline} strokeWidth={3} />

      <rect x={340} y={1056} width={220} height={224} rx={10} fill={P.wood} stroke={P.outline} strokeWidth={5} />
      {TROUGH_STAVES.map((x) => (
        <line key={x} x1={x} y1={1060} x2={x} y2={1280} stroke={P.woodDeep} strokeWidth={4} />
      ))}
      <rect x={336} y={1120} width={228} height={16} fill={P.iron} stroke={P.outline} strokeWidth={3} />
      <rect x={336} y={1220} width={228} height={16} fill={P.iron} stroke={P.outline} strokeWidth={3} />
      <ellipse cx={450} cy={1060} rx={104} ry={16} fill={P.water} stroke={P.outline} strokeWidth={4} />
      <path d="M380 1058 Q450 1046 520 1058" stroke={P.ironHighlight} strokeWidth={3} fill="none" opacity={0.5} />

      <rect x={1480} y={300} width={280} height={420} rx={6} fill={P.woodDark} stroke={P.outline} strokeWidth={5} />
      {WALL_HAMMERS.map((x, index) => (
        <g key={x}>
          <line x1={x} y1={360} x2={x} y2={560 + index * 30} stroke={P.woodLight} strokeWidth={12} strokeLinecap="round" />
          <rect x={x - 30} y={330} width={60} height={34} rx={6} fill={P.ironLight} stroke={P.outline} strokeWidth={4} />
        </g>
      ))}
      <path d="M1520 640 L1600 690 M1600 640 L1520 690" stroke={P.ironLight} strokeWidth={8} strokeLinecap="round" />

      <rect x={120} y={440} width={320} height={18} fill={P.woodLight} stroke={P.outline} strokeWidth={4} />
      {SHELF_HELMETS.map((x) => (
        <g key={x}>
          <path d={`M${x - 40} 440 V400 A40 40 0 0 1 ${x + 40} 400 V440 Z`} fill={P.iron} stroke={P.outline} strokeWidth={4} />
          <rect x={x - 24} y={408} width={48} height={8} fill={P.outline} />
        </g>
      ))}

      <rect width={1800} height={1280} fill="url(#forge-back-vignette)" />
    </svg>
  );
}

const FURNACE_EMBERS = [250, 290, 320, 350, 300, 270, 340, 310, 280, 330];
const COALS = [180, 250, 320, 390, 450];

function FireArt() {
  return (
    <svg viewBox="0 0 600 520" className="block h-full w-full overflow-visible">
      <defs>
        <radialGradient id="forge-fire-glow">
          <stop offset="0%" stopColor={P.gold} stopOpacity={0.7} />
          <stop offset="45%" stopColor={P.ember} stopOpacity={0.3} />
          <stop offset="100%" stopColor={P.crimson} stopOpacity={0} />
        </radialGradient>
        <filter id="forge-flame-wobble" x="-20%" y="-20%" width="140%" height="140%">
          <feTurbulence
            data-forge="flame-noise"
            type="fractalNoise"
            baseFrequency="0.02"
            numOctaves={2}
            seed={1}
            result="noise"
          />
          <feDisplacementMap in="SourceGraphic" in2="noise" scale={18} xChannelSelector="R" yChannelSelector="G" />
        </filter>
      </defs>
      <ellipse data-forge="fire-glow" cx={300} cy={440} rx={330} ry={210} fill="url(#forge-fire-glow)" />
      <g data-forge="furnace-flames" filter="url(#forge-flame-wobble)">
        <path
          data-forge="flame"
          d="M120 500 C110 420 170 380 160 300 C150 230 230 220 250 150 C265 100 290 90 300 60 C315 100 340 120 350 170 C365 230 440 240 430 310 C420 380 490 420 480 500 Z"
          fill={P.crimson}
        />
        <path
          data-forge="flame"
          d="M170 500 C165 440 215 400 210 330 C205 270 260 250 275 190 C285 150 300 140 300 120 C310 150 335 170 340 220 C350 270 405 290 400 350 C395 410 440 450 430 500 Z"
          fill={P.orange}
        />
        <path
          data-forge="flame"
          d="M220 500 C220 450 255 420 255 370 C255 320 290 300 300 250 C310 300 345 320 345 370 C345 420 380 450 380 500 Z"
          fill={P.gold}
        />
        <path d="M255 500 C255 465 275 440 300 400 C325 440 345 465 345 500 Z" fill={P.hot} />
      </g>
      {COALS.map((x, index) => (
        <g key={x}>
          <ellipse cx={x} cy={index % 2 === 0 ? 500 : 508} rx={44} ry={16} fill={P.woodLight} stroke={P.outline} strokeWidth={3} />
          <ellipse cx={x + 10} cy={index % 2 === 0 ? 498 : 506} rx={16} ry={6} fill={P.ember} opacity={0.9} />
        </g>
      ))}
      <g data-forge="furnace-ember-group">
        {FURNACE_EMBERS.map((x, index) => (
          <circle
            key={index}
            data-forge="furnace-ember"
            cx={x}
            cy={470}
            r={index % 3 === 0 ? 5 : 3.5}
            fill={index % 2 === 0 ? P.gold : P.ember}
            opacity={0}
          />
        ))}
      </g>
    </svg>
  );
}

function HazeArt() {
  return (
    <svg viewBox="0 0 1600 900" className="block h-full w-full">
      <defs>
        <radialGradient id="forge-haze">
          <stop offset="0%" stopColor={P.ember} stopOpacity={0.28} />
          <stop offset="55%" stopColor={P.crimson} stopOpacity={0.1} />
          <stop offset="100%" stopColor={P.crimson} stopOpacity={0} />
        </radialGradient>
      </defs>
      <ellipse data-forge="haze-pulse" cx={800} cy={450} rx={800} ry={450} fill="url(#forge-haze)" />
    </svg>
  );
}

const ANVIL_SCALE = 1.9;
const ANVIL_OFFSET = { x: 38.4, y: -45.3 };
const ANVIL_SILHOUETTE =
  "M248,91.3V67H80v8H9c0,0,10.7,40.6,67.3,40.6c30.3,0,34.4,12.7,34.4,19.1c0,8.4-5.1,21.9-36.7,32.8V191h38.7c6.8-5.2,15.3-8.2,24.5-8.2s17.7,3.1,24.5,8.2H201c0,0,0-15.1,0-22.9c-23.4-7.7-38.7-20.4-38.7-34.8C162.3,110.6,200.1,92.5,248,91.3z";
const ANVIL_FACE_EDGE = "M88,79v-4h152v4H88z";
const ANVIL_HORN_EDGE = "M80,87c-52,0-52-4-52-4h52C80,83,80,85.4,80,87z";

const DIE_RADIUS = 44;
const DIE_CENTER = { x: 350, y: 82 - DIE_RADIUS };
const dieVertex = (x: number, y: number) =>
  `${(DIE_CENTER.x + x * DIE_RADIUS).toFixed(1)},${(DIE_CENTER.y + y * DIE_RADIUS).toFixed(1)}`;
const DIE_TOP = dieVertex(0, -1);
const DIE_UPPER_RIGHT = dieVertex(0.866, -0.5);
const DIE_LOWER_RIGHT = dieVertex(0.866, 0.5);
const DIE_BOTTOM = dieVertex(0, 1);
const DIE_LOWER_LEFT = dieVertex(-0.866, 0.5);
const DIE_UPPER_LEFT = dieVertex(-0.866, -0.5);
const DIE_FACE_TOP = dieVertex(0, -0.44);
const DIE_FACE_LEFT = dieVertex(-0.5, 0.41);
const DIE_FACE_RIGHT = dieVertex(0.5, 0.41);
const DIE_HULL = [DIE_TOP, DIE_UPPER_RIGHT, DIE_LOWER_RIGHT, DIE_BOTTOM, DIE_LOWER_LEFT, DIE_UPPER_LEFT];
const DIE_FACES = [
  { points: [DIE_TOP, DIE_UPPER_LEFT, DIE_FACE_TOP], fill: P.ember },
  { points: [DIE_TOP, DIE_FACE_TOP, DIE_UPPER_RIGHT], fill: P.ember },
  { points: [DIE_UPPER_LEFT, DIE_LOWER_LEFT, DIE_FACE_LEFT], fill: P.ember },
  { points: [DIE_UPPER_RIGHT, DIE_FACE_RIGHT, DIE_LOWER_RIGHT], fill: P.ember },
  { points: [DIE_LOWER_LEFT, DIE_BOTTOM, DIE_FACE_LEFT], fill: P.ember },
  { points: [DIE_FACE_RIGHT, DIE_BOTTOM, DIE_LOWER_RIGHT], fill: P.ember },
  { points: [DIE_FACE_TOP, DIE_UPPER_LEFT, DIE_FACE_LEFT], fill: P.orange },
  { points: [DIE_FACE_TOP, DIE_FACE_RIGHT, DIE_UPPER_RIGHT], fill: P.orange },
  { points: [DIE_FACE_LEFT, DIE_BOTTOM, DIE_FACE_RIGHT], fill: P.orange },
  { points: [DIE_FACE_TOP, DIE_FACE_LEFT, DIE_FACE_RIGHT], fill: P.gold },
];

function AnvilArt() {
  return (
    <svg viewBox="0 0 700 460" className="block h-full w-full overflow-visible">
      <defs>
        <linearGradient id="forge-anvil-iron" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={P.ironLight} />
          <stop offset="50%" stopColor={P.iron} />
          <stop offset="100%" stopColor={P.stone} />
        </linearGradient>
        <radialGradient id="forge-die-glow">
          <stop offset="0%" stopColor={P.gold} stopOpacity={0.85} />
          <stop offset="45%" stopColor={P.crimson} stopOpacity={0.4} />
          <stop offset="100%" stopColor={P.crimson} stopOpacity={0} />
        </radialGradient>
      </defs>
      <ellipse cx={300} cy={446} rx={250} ry={16} fill={P.black} opacity={0.7} />
      <path d="M205 314 H395 L425 442 H175 Z" fill={P.woodLight} stroke={P.outline} strokeWidth={5} strokeLinejoin="round" />
      <path d="M262 340 Q270 400 258 430 M338 340 Q332 400 344 430" stroke={P.woodDeep} strokeWidth={4} fill="none" opacity={0.8} />
      <rect x={196} y={352} width={208} height={18} fill={P.iron} stroke={P.outline} strokeWidth={3} />
      <rect x={184} y={408} width={232} height={18} fill={P.iron} stroke={P.outline} strokeWidth={3} />

      <g transform={`translate(${ANVIL_OFFSET.x} ${ANVIL_OFFSET.y}) scale(${ANVIL_SCALE})`}>
        <path
          d={ANVIL_SILHOUETTE}
          fill="url(#forge-anvil-iron)"
          stroke={P.outline}
          strokeWidth={2.2}
          strokeLinejoin="round"
        />
        <path d={ANVIL_FACE_EDGE} fill={P.ironHighlight} opacity={0.7} />
        <path d={ANVIL_HORN_EDGE} fill={P.ironHighlight} opacity={0.5} />
      </g>

      <ellipse data-forge="die-glow" cx={DIE_CENTER.x} cy={DIE_CENTER.y} rx={120} ry={80} fill="url(#forge-die-glow)" />
      <g data-forge="die">
        {DIE_FACES.map((face) => (
          <polygon
            key={face.points.join(" ")}
            points={face.points.join(" ")}
            fill={face.fill}
            stroke={P.clothShadow}
            strokeWidth={1.5}
            strokeLinejoin="round"
          />
        ))}
        <polygon points={DIE_HULL.join(" ")} fill="none" stroke={P.outline} strokeWidth={3} strokeLinejoin="round" />
        <polygon data-forge="die-heat" points={DIE_HULL.join(" ")} fill={P.hot} opacity={0} />
        <text
          x={DIE_CENTER.x}
          y={DIE_CENTER.y + DIE_RADIUS * 0.14}
          fontSize={DIE_RADIUS * 0.4}
          fontWeight={900}
          fill={P.clothShadow}
          textAnchor="middle"
          dominantBaseline="central"
          letterSpacing={-1}
        >
          20
        </text>
      </g>

      <path d="M200 320 L112 442 M212 326 L136 448" stroke={P.iron} strokeWidth={9} strokeLinecap="round" />
      <path d="M200 320 L188 292 M212 326 L222 294" stroke={P.iron} strokeWidth={9} strokeLinecap="round" />
      <circle cx={188} cy={340} r={6} fill={P.ironLight} stroke={P.outline} strokeWidth={2} />

      <path d="M556 336 L574 442 H666 L684 336 Z" fill={P.stoneMid} stroke={P.outline} strokeWidth={4} strokeLinejoin="round" />
      <path d="M562 372 H678 M570 412 H670" stroke={P.iron} strokeWidth={5} />
      <ellipse cx={620} cy={336} rx={64} ry={13} fill={P.water} stroke={P.outline} strokeWidth={4} />
      <path d="M566 330 Q620 290 674 330" stroke={P.ironLight} strokeWidth={6} fill="none" strokeLinecap="round" />
    </svg>
  );
}

function RackArt() {
  return (
    <svg viewBox="0 0 360 460" className="block h-full w-full">
      <ellipse cx={180} cy={452} rx={170} ry={10} fill={P.black} opacity={0.6} />
      <rect x={20} y={40} width={18} height={420} fill={P.woodLight} stroke={P.outline} strokeWidth={3} />
      <rect x={322} y={40} width={18} height={420} fill={P.woodLight} stroke={P.outline} strokeWidth={3} />
      <rect x={20} y={120} width={320} height={14} fill={P.woodLight} stroke={P.outline} strokeWidth={3} />
      <rect x={20} y={300} width={320} height={14} fill={P.woodLight} stroke={P.outline} strokeWidth={3} />
      <line x1={80} y1={60} x2={80} y2={330} stroke={P.ironLight} strokeWidth={10} strokeLinecap="round" />
      <line x1={80} y1={60} x2={80} y2={330} stroke={P.ironHighlight} strokeWidth={3} strokeLinecap="round" />
      <rect x={55} y={330} width={50} height={10} rx={3} fill={P.leather} stroke={P.outline} strokeWidth={2} />
      <line x1={80} y1={340} x2={80} y2={384} stroke={P.woodLight} strokeWidth={12} strokeLinecap="round" />
      <circle cx={80} cy={392} r={8} fill={P.ironLight} stroke={P.outline} strokeWidth={2} />
      <line x1={280} y1={60} x2={280} y2={330} stroke={P.ironLight} strokeWidth={10} strokeLinecap="round" />
      <line x1={280} y1={60} x2={280} y2={330} stroke={P.ironHighlight} strokeWidth={3} strokeLinecap="round" />
      <rect x={255} y={330} width={50} height={10} rx={3} fill={P.leather} stroke={P.outline} strokeWidth={2} />
      <line x1={280} y1={340} x2={280} y2={384} stroke={P.woodLight} strokeWidth={12} strokeLinecap="round" />
      <circle cx={280} cy={392} r={8} fill={P.ironLight} stroke={P.outline} strokeWidth={2} />
      <circle cx={180} cy={210} r={82} fill={P.stoneMid} stroke={P.outline} strokeWidth={6} />
      <rect x={168} y={130} width={24} height={160} fill={P.clothDeep} />
      <rect x={100} y={198} width={160} height={24} fill={P.clothDeep} />
      <circle cx={180} cy={210} r={68} fill="none" stroke={P.iron} strokeWidth={6} />
      <circle cx={180} cy={210} r={16} fill={P.ironLight} stroke={P.outline} strokeWidth={3} />
    </svg>
  );
}

function BarrelsArt() {
  return (
    <svg viewBox="0 0 300 300" className="block h-full w-full">
      <ellipse cx={150} cy={294} rx={140} ry={8} fill={P.black} opacity={0.6} />
      <rect x={20} y={60} width={130} height={240} rx={28} fill={P.woodLight} stroke={P.outline} strokeWidth={5} />
      <path d="M52 66 V294 M85 62 V298 M118 66 V294" stroke={P.woodDeep} strokeWidth={4} />
      <rect x={14} y={100} width={142} height={14} fill={P.iron} stroke={P.outline} strokeWidth={3} />
      <rect x={14} y={240} width={142} height={14} fill={P.iron} stroke={P.outline} strokeWidth={3} />
      <ellipse cx={85} cy={62} rx={64} ry={14} fill={P.wood} stroke={P.outline} strokeWidth={4} />
      <rect x={164} y={120} width={116} height={180} rx={24} fill={P.wood} stroke={P.outline} strokeWidth={5} />
      <path d="M194 124 V298 M222 122 V300 M250 124 V298" stroke={P.woodDeep} strokeWidth={4} />
      <rect x={158} y={156} width={128} height={12} fill={P.iron} stroke={P.outline} strokeWidth={3} />
      <rect x={158} y={256} width={128} height={12} fill={P.iron} stroke={P.outline} strokeWidth={3} />
      <ellipse cx={222} cy={122} rx={58} ry={12} fill={P.woodDark} stroke={P.outline} strokeWidth={4} />
    </svg>
  );
}

interface IPillarArt {
  lightSide: "left" | "right";
}

const PILLAR_COURSES = [220, 340, 460, 580, 700, 820, 940, 1060];

function PillarArt({ lightSide }: IPillarArt) {
  const lightX = lightSide === "right" ? 104 : 40;
  const darkX = lightSide === "right" ? 40 : 104;
  return (
    <svg viewBox="0 0 160 1280" className="block h-full w-full">
      <rect x={40} y={100} width={80} height={1080} fill={P.stoneMid} stroke={P.outline} strokeWidth={4} />
      <rect x={lightX} y={100} width={16} height={1080} fill={P.iron} opacity={0.8} />
      <rect x={darkX} y={100} width={16} height={1080} fill={P.stone} />
      {PILLAR_COURSES.map((y) => (
        <line key={y} x1={40} y1={y} x2={120} y2={y} stroke={P.outline} strokeWidth={3} />
      ))}
      <rect x={20} y={60} width={120} height={50} rx={4} fill={P.stoneLight} stroke={P.outline} strokeWidth={4} />
      <rect x={30} y={106} width={100} height={22} fill={P.stoneLight} stroke={P.outline} strokeWidth={3} />
      <rect x={30} y={1160} width={100} height={30} fill={P.stoneLight} stroke={P.outline} strokeWidth={3} />
      <rect x={20} y={1186} width={120} height={94} rx={4} fill={P.stoneLight} stroke={P.outline} strokeWidth={4} />
    </svg>
  );
}

const CHAIN_POSITIONS = [560, 1240];

function ChainsArt() {
  return (
    <svg viewBox="0 0 1800 640" className="block h-full w-full">
      {CHAIN_POSITIONS.map((x) => (
        <g key={x}>
          <line x1={x} y1={0} x2={x} y2={440} stroke={P.iron} strokeWidth={8} strokeLinecap="round" strokeDasharray="16 10" />
          <path d={`M${x} 440 V470 A22 22 0 0 0 ${x + 44} 470`} stroke={P.ironLight} strokeWidth={8} fill="none" strokeLinecap="round" />
        </g>
      ))}
    </svg>
  );
}

function createSeededRandom(seed: number) {
  let state = seed;
  return () => {
    state = (state * 1664525 + 1013904223) % 4294967296;
    return state / 4294967296;
  };
}

const sparkRandom = createSeededRandom(2026);
const SPARK_COLORS = [P.hot, P.gold, P.ember, P.crimson];
const IMPACT_X = 960;
const HAMMER_REST_SHIFT = 64;
const IMPACT_Y = 676 - HAMMER_REST_SHIFT;

const SPARK_SPECS = Array.from({ length: 44 }, (_, index) => {
  const angle = sparkRandom() * Math.PI * 2;
  const length = 8 + sparkRandom() * 16;
  return {
    id: index,
    isDot: index % 3 === 0,
    color: SPARK_COLORS[index % SPARK_COLORS.length],
    width: 2 + sparkRandom() * 3,
    dx: Math.cos(angle) * length,
    dy: Math.sin(angle) * length,
  };
});

const GRIP_WRAPS = [
  [1233, 681, 1239, 655],
  [1221, 679, 1227, 653],
  [1210, 676, 1216, 650],
  [1198, 673, 1204, 647],
];

function ForegroundArt() {
  return (
    <svg
      data-forge="foreground"
      viewBox={`0 0 ${FORGE_STAGE.width} ${FORGE_STAGE.height}`}
      className="absolute inset-0 block h-full w-full overflow-visible"
    >
      <defs>
        <linearGradient id="forge-hammer-steel" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor={P.ironHighlight} />
          <stop offset="45%" stopColor={P.iron} />
          <stop offset="100%" stopColor={P.stone} />
        </linearGradient>
        <radialGradient id="forge-impact-glow">
          <stop offset="0%" stopColor={P.hot} stopOpacity={0.95} />
          <stop offset="30%" stopColor={P.gold} stopOpacity={0.6} />
          <stop offset="100%" stopColor={P.crimson} stopOpacity={0} />
        </radialGradient>
      </defs>
      <circle data-forge="impact-glow" cx={IMPACT_X} cy={IMPACT_Y + 4} r={260} fill="url(#forge-impact-glow)" opacity={0} />
      <g data-forge="hammer-layer">
        <g data-forge="hammer-shake">
          <g data-forge="hammer">
            <g transform={`translate(0 ${-HAMMER_REST_SHIFT})`}>
              <line x1={1236} y1={668} x2={978} y2={605} stroke={P.outline} strokeWidth={32} strokeLinecap="round" />
              <line x1={1236} y1={668} x2={978} y2={605} stroke={P.leather} strokeWidth={22} strokeLinecap="round" />
              <line x1={1230} y1={662} x2={984} y2={602} stroke={P.woodLight} strokeWidth={6} strokeLinecap="round" opacity={0.7} />
              {GRIP_WRAPS.map(([x1, y1, x2, y2]) => (
                <line key={x1} x1={x1} y1={y1} x2={x2} y2={y2} stroke={P.cream} strokeWidth={3} opacity={0.75} />
              ))}
              <circle cx={1236} cy={668} r={16} fill={P.iron} stroke={P.outline} strokeWidth={4} />
              <g transform="translate(978 605) rotate(-76)">
                <rect x={-76} y={-52} width={152} height={104} rx={12} fill={P.outline} />
                <rect x={-72} y={-48} width={144} height={96} rx={10} fill="url(#forge-hammer-steel)" />
                <rect x={-72} y={-48} width={18} height={96} rx={4} fill={P.ironLight} />
                <rect x={54} y={-48} width={18} height={96} rx={4} fill={P.ironLight} />
                <line x1={-66} y1={-40} x2={66} y2={-40} stroke={P.ironHighlight} strokeWidth={6} strokeLinecap="round" />
                <rect x={-14} y={-52} width={28} height={104} fill={P.stone} opacity={0.5} />
              </g>
            </g>
          </g>
        </g>
      </g>
      <ellipse data-forge="shockwave" cx={IMPACT_X} cy={IMPACT_Y + 14} rx={0} ry={0} fill="none" stroke={P.hot} strokeWidth={12} opacity={0} />
      <g data-forge="sparks">
        {SPARK_SPECS.map((spark) =>
          spark.isDot ? (
            <circle key={spark.id} data-forge="spark" cx={IMPACT_X} cy={IMPACT_Y} r={spark.width} fill={spark.color} opacity={0} />
          ) : (
            <line
              key={spark.id}
              data-forge="spark"
              x1={IMPACT_X}
              y1={IMPACT_Y}
              x2={IMPACT_X + spark.dx}
              y2={IMPACT_Y + spark.dy}
              stroke={spark.color}
              strokeWidth={spark.width}
              strokeLinecap="round"
              opacity={0}
            />
          ),
        )}
      </g>
      <rect data-forge="flash" width={FORGE_STAGE.width} height={FORGE_STAGE.height} fill={P.hot} opacity={0} />
    </svg>
  );
}

const HALL_LEFT = 60;
const HALL_WIDTH = 1800;
const HALL_DEPTH = 1900;
const HALL_TOP = -200;
const HALL_HEIGHT = 1280;
const FLOOR_Y = 1080;

export function ForgeScene() {
  return (
    <div aria-hidden="true" data-forge="scene" className="absolute inset-0 overflow-hidden">
      <div className={FORGE_STAGE_CLASS}>
        <div data-forge="shaker" className="absolute inset-0">
          <div className="absolute inset-0 perspective-distant perspective-origin-center">
            <div data-forge="world" className="absolute inset-0 transform-3d">
              <Plane left={HALL_LEFT} top={HALL_TOP} width={HALL_WIDTH} height={HALL_DEPTH} origin="50% 0%" transform="rotateX(-90deg)">
                <CeilingArt />
              </Plane>
              <Plane left={HALL_LEFT} top={FLOOR_Y - HALL_DEPTH} width={HALL_WIDTH} height={HALL_DEPTH} origin="50% 100%" transform="rotateX(90deg)">
                <FloorArt />
              </Plane>
              <Plane left={HALL_LEFT} top={HALL_TOP} width={HALL_DEPTH} height={HALL_HEIGHT} origin="0% 50%" transform="rotateY(90deg)">
                <SideWallArt side="left" />
              </Plane>
              <Plane left={HALL_LEFT + HALL_WIDTH - HALL_DEPTH} top={HALL_TOP} width={HALL_DEPTH} height={HALL_HEIGHT} origin="100% 50%" transform="rotateY(-90deg)">
                <SideWallArt side="right" />
              </Plane>
              <Plane left={HALL_LEFT} top={HALL_TOP} width={HALL_WIDTH} height={HALL_HEIGHT} transform="translateZ(-1900px)">
                <BackWallArt />
              </Plane>
              <Plane left={660} top={180} width={600} height={520} transform="translateZ(-1895px)">
                <FireArt />
              </Plane>
              <Plane left={160} top={100} width={1600} height={900} transform="translateZ(-1650px)">
                <HazeArt />
              </Plane>
              <Plane left={220} top={620} width={360} height={460} transform="translateZ(-1500px)">
                <RackArt />
              </Plane>
              <Plane left={1370} top={780} width={300} height={300} transform="translateZ(-1500px)">
                <BarrelsArt />
              </Plane>
              <Plane left={340} top={HALL_TOP} width={160} height={HALL_HEIGHT} transform="translateZ(-1200px)">
                <PillarArt lightSide="right" />
              </Plane>
              <Plane left={1420} top={HALL_TOP} width={160} height={HALL_HEIGHT} transform="translateZ(-1200px)">
                <PillarArt lightSide="left" />
              </Plane>
              <Plane forgeKey="anvil" left={610} top={620} width={700} height={460} transform="translateZ(-1000px)">
                <AnvilArt />
              </Plane>
              <Plane left={HALL_LEFT} top={HALL_TOP} width={HALL_WIDTH} height={640} transform="translateZ(-800px)">
                <ChainsArt />
              </Plane>
              <Plane left={220} top={HALL_TOP} width={160} height={HALL_HEIGHT} transform="translateZ(-500px)">
                <PillarArt lightSide="right" />
              </Plane>
              <Plane left={1540} top={HALL_TOP} width={160} height={HALL_HEIGHT} transform="translateZ(-500px)">
                <PillarArt lightSide="left" />
              </Plane>
              <Plane forgeKey="door-left" left={690} top={190} width={270} height={890} origin="10px 50%" transform="translateZ(-4px)">
                <DoorArt side="left" />
              </Plane>
              <Plane forgeKey="door-right" left={958} top={190} width={272} height={890} origin="262px 50%" transform="translateZ(-4px)">
                <DoorArt side="right" />
              </Plane>
              <Plane forgeKey="arch" left={0} top={0} width={FORGE_STAGE.width} height={FORGE_STAGE.height} transform="translateZ(0px)">
                <ArchArt />
              </Plane>
            </div>
          </div>
          <ForegroundArt />
        </div>
      </div>
    </div>
  );
}
