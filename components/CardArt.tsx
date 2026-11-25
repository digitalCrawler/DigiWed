import type { ReactElement } from "react";
import { CARD_H, CARD_W, FrameKey, MotifKey, Palette } from "@/lib/templates";

/** Node and V8-in-the-browser disagree on the last bits of Math.sin/cos, which
 *  makes React complain about a hydration mismatch. Round every trig result. */
const r2 = (n: number) => Math.round(n * 100) / 100;

/* ============================ MOTIFS ============================ */
/* Each motif draws inside a nested 120x96 viewBox centred at the card top. */

function Motif({ kind, p }: { kind: MotifKey; p: Palette }) {
  if (kind === "none") {
    return (
      <g stroke={p.gold} strokeWidth={1.6} fill="none">
        <path d="M360 176 H455" />
        <path d="M545 176 H640" />
        <path d="M500 164 L512 176 L500 188 L488 176 Z" fill={p.accent} stroke="none" />
      </g>
    );
  }
  const common = { x: 500 - 60, y: 172 - 48, width: 120, height: 96 };
  const A = p.accent, G = p.gold;

  const inner = (() => {
    switch (kind) {
      case "om":
        return (
          <text x={60} y={80} textAnchor="middle" fontSize={84} fill={A}
            fontFamily='"Tiro Devanagari Hindi", serif'>ॐ</text>
        );
      case "bismillah": // crescent & star
        return (
          <g strokeLinejoin="round">
            {/* crescent: outer disc with an offset disc punched out (even-odd) */}
            <path
              fillRule="evenodd"
              fill={A}
              d="M54 12 a36 36 0 1 0 0 72 a36 36 0 1 0 0 -72 Z M70 16 a32 32 0 1 0 0 64 a32 32 0 1 0 0 -64 Z"
            />
            <path d="M99 26 l4.6 9.6 10.4 1.5 -7.5 7.5 1.8 10.5 -9.3 -5 -9.3 5 1.8 -10.5 -7.5 -7.5 10.4 -1.5 Z"
              fill={G} />
          </g>
        );
      case "cross":
        return (
          <g fill={A}>
            <path d="M54 6 h12 v26 h26 v12 h-26 v46 h-12 v-46 h-26 v-12 h26 Z" />
            <circle cx={60} cy={4} r={3} fill={G} />
          </g>
        );
      case "khanda":
        return (
          <g stroke={A} strokeWidth={4} fill="none" strokeLinecap="round">
            <circle cx={60} cy={54} r={22} />
            <path d="M60 6 v76" strokeWidth={5} />
            <path d="M60 6 l6 12 -6 8 -6 -8 Z" fill={A} stroke="none" />
            <path d="M28 20 C 10 44 16 76 44 88" />
            <path d="M92 20 C 110 44 104 76 76 88" />
          </g>
        );
      case "chakra":
        return (
          <g stroke={A} strokeWidth={3.4} fill="none">
            <circle cx={60} cy={48} r={34} />
            <circle cx={60} cy={48} r={9} fill={G} stroke="none" />
            {Array.from({ length: 8 }).map((_, i) => {
              const a = (i * Math.PI) / 4;
              return <path key={i} d={`M${r2(60 + 9 * Math.cos(a))} ${r2(48 + 9 * Math.sin(a))} L${r2(60 + 34 * Math.cos(a))} ${r2(48 + 34 * Math.sin(a))}`} />;
            })}
          </g>
        );
      case "lotus":
        return (
          <g fill="none" stroke={A} strokeWidth={3}>
            <path d="M60 86 C 40 74 32 56 34 36 C 48 46 56 62 60 86 Z" fill={`${A}22`} />
            <path d="M60 86 C 80 74 88 56 86 36 C 72 46 64 62 60 86 Z" fill={`${A}22`} />
            <path d="M60 86 C 44 70 38 46 46 18 C 60 36 64 60 60 86 Z" fill={`${A}18`} />
            <path d="M60 86 C 76 70 82 46 74 18 C 60 36 56 60 60 86 Z" fill={`${A}18`} />
            <path d="M60 86 C 52 62 52 36 60 10 C 68 36 68 62 60 86 Z" fill={`${G}33`} />
          </g>
        );
      case "kalash":
        return (
          <g stroke={A} strokeWidth={3} fill="none" strokeLinejoin="round">
            <path d="M34 48 C 34 80 46 90 60 90 C 74 90 86 80 86 48 Z" fill={`${A}18`} />
            <path d="M30 44 h60 v6 h-60 Z" fill={G} stroke="none" />
            <path d="M44 44 C 44 32 52 26 60 26 C 68 26 76 32 76 44" />
            <circle cx={60} cy={18} r={9} fill={`${G}55`} />
            <path d="M44 32 C 30 24 24 16 26 8 C 38 10 44 20 46 30" />
            <path d="M76 32 C 90 24 96 16 94 8 C 82 10 76 20 74 30" />
          </g>
        );
      case "rings":
        return (
          <g fill="none" stroke={G} strokeWidth={5}>
            <circle cx={44} cy={50} r={26} />
            <circle cx={78} cy={50} r={26} stroke={A} />
          </g>
        );
      case "jain": // open palm of ahimsa with a wheel
        return (
          <g fill="none" stroke={A} strokeWidth={3.2} strokeLinejoin="round" strokeLinecap="round">
            <path d="M42 90 L42 44 C 42 36 36 30 36 22 C 36 16 42 14 44 20 L48 34 L48 12 C 48 6 56 6 56 12 L56 32 L56 8 C 56 2 64 2 64 8 L64 32 L64 14 C 64 8 72 8 72 14 L72 42 C 72 62 78 70 78 90 Z" fill={`${A}14`} />
            <circle cx={60} cy={62} r={12} stroke={G} strokeWidth={2.6} />
            {Array.from({ length: 6 }).map((_, i) => {
              const a = (i * Math.PI) / 3;
              return <path key={i} stroke={G} strokeWidth={2} d={`M${r2(60 + 4 * Math.cos(a))} ${r2(62 + 4 * Math.sin(a))} L${r2(60 + 12 * Math.cos(a))} ${r2(62 + 12 * Math.sin(a))}`} />;
            })}
          </g>
        );
      case "dove":
        return (
          <g fill={A} stroke="none">
            <path d="M18 56 C 22 36 44 24 68 28 C 84 31 96 24 104 14 C 106 30 98 42 84 48 C 92 58 92 72 84 84 C 74 72 60 68 48 70 C 32 72 20 68 18 56 Z" />
            <path d="M52 44 C 62 36 78 36 88 42 C 76 54 60 56 52 50 Z" fill={G} />
            <circle cx={96} cy={22} r={2.4} fill={p.bg} />
          </g>
        );
      case "heart":
        return (
          <g fill="none" stroke={A} strokeWidth={3.4} strokeLinejoin="round">
            <path d="M60 86 C 28 62 16 44 22 28 C 28 12 50 12 60 32 C 70 12 92 12 98 28 C 104 44 92 62 60 86 Z" fill={`${A}14`} />
            <path d="M60 32 C 60 52 60 68 60 84" stroke={G} strokeWidth={2} />
            <path d="M60 50 C 48 46 42 38 42 30" stroke={G} strokeWidth={2} />
            <path d="M60 50 C 72 46 78 38 78 30" stroke={G} strokeWidth={2} />
          </g>
        );
      default:
        return null;
    }
  })();

  return <svg {...common} viewBox="0 0 120 96">{inner}</svg>;
}

/* ============================ FRAMES ============================ */

function Mandala({ p }: { p: Palette }) {
  /** fan of petals around (500, cy); `spread` degrees either side of `facing` */
  const petals = (
    r: number, n: number, cy: number, w: number, h: number,
    stroke: string, sw: number, facing = 0, spread = 92
  ) =>
    Array.from({ length: n }).map((_, i) => {
      const a = r2(facing - spread + ((spread * 2) / (n - 1)) * i);
      return (
        <ellipse key={`${r}-${i}`} cx={500} cy={cy - r} rx={w} ry={h}
          stroke={stroke} strokeWidth={sw} fill="none"
          transform={`rotate(${a} 500 ${cy})`} />
      );
    });
  return (
    <g>
      <rect x={42} y={42} width={CARD_W - 84} height={CARD_H - 84} fill="none" stroke={p.gold} strokeWidth={2.5} />
      <rect x={56} y={56} width={CARD_W - 112} height={CARD_H - 112} fill="none" stroke={p.accent} strokeWidth={0.9} opacity={0.6} />
      <g opacity={0.5}>{petals(116, 15, 172, 13, 28, p.gold, 1.2)}</g>
      <g opacity={0.75}>{petals(90, 11, 172, 14, 24, p.accent, 1.2)}</g>
      <path d="M382 196 A 130 130 0 0 0 618 196" fill="none" stroke={p.gold} strokeWidth={1.2} opacity={0.55} />
      <g opacity={0.45}>{petals(70, 11, 1320, 10, 18, p.gold, 1.1, 180, 88)}</g>
      <g opacity={0.7}>{petals(48, 9, 1320, 10, 15, p.accent, 1.1, 180, 88)}</g>
      <circle cx={500} cy={1320} r={9} fill={p.gold} opacity={0.5} />
    </g>
  );
}

function Arch({ p }: { p: Palette }) {
  const d = "M130 1310 L130 430 C130 250 320 120 500 92 C680 120 870 250 870 430 L870 1310";
  const d2 = "M152 1310 L152 438 C152 268 330 146 500 118 C670 146 848 268 848 438 L848 1310";
  const star = (cx: number, cy: number, r: number) =>
    Array.from({ length: 8 }).map((_, i) => {
      const a = (i * Math.PI) / 4;
      return `${i === 0 ? "M" : "L"}${r2(cx + r * Math.cos(a))} ${r2(cy + r * Math.sin(a))}`;
    }).join(" ") + " Z";
  return (
    <g>
      <rect x={44} y={44} width={CARD_W - 88} height={CARD_H - 88} fill="none" stroke={p.gold} strokeWidth={2.5} />
      <path d={d} fill="none" stroke={p.gold} strokeWidth={2.2} />
      <path d={d2} fill="none" stroke={p.accent} strokeWidth={1} opacity={0.55} />
      <g opacity={0.6}>
        {Array.from({ length: 7 }).map((_, i) => (
          <path key={i} d={star(260 + i * 80, 1348, 13)} fill="none" stroke={p.accent} strokeWidth={1.3} />
        ))}
      </g>
      <path d="M200 1310 H800" stroke={p.gold} strokeWidth={1.4} opacity={0.6} />
    </g>
  );
}

function Wreath({ p }: { p: Palette }) {
  const leaves = (cx: number, cy: number, r: number, from: number, to: number, n: number, rx: number, ry: number) =>
    Array.from({ length: n }).map((_, i) => {
      const t = from + ((to - from) * i) / (n - 1);
      const a = (t * Math.PI) / 180;
      const x = r2(cx + r * Math.cos(a)), y = r2(cy + r * Math.sin(a));
      return (
        <ellipse key={`${cx}-${t}`} cx={x} cy={y} rx={rx} ry={ry}
          fill={`${p.accent}2E`} stroke={p.accent} strokeWidth={1.1}
          transform={`rotate(${r2(t + 90)} ${x} ${y})`} />
      );
    });
  return (
    <g>
      <rect x={50} y={50} width={CARD_W - 100} height={CARD_H - 100} fill="none" stroke={p.gold} strokeWidth={1.4} opacity={0.8} />
      <g>
        {leaves(500, 158, 110, 166, 250, 8, 9, 21)}
        {leaves(500, 158, 110, 290, 374, 8, 9, 21)}
        {leaves(500, 158, 86, 176, 240, 5, 7, 15)}
        {leaves(500, 158, 86, 300, 364, 5, 7, 15)}
      </g>
      <circle cx={500} cy={64} r={5} fill={p.gold} />
      <g>
        {leaves(500, 1300, 88, 10, 80, 6, 8, 18)}
        {leaves(500, 1300, 88, 100, 170, 6, 8, 18)}
      </g>
      <path d="M430 1300 H570" stroke={p.gold} strokeWidth={1.3} />
    </g>
  );
}

function Minimal({ p }: { p: Palette }) {
  return (
    <g>
      <rect x={58} y={58} width={CARD_W - 116} height={CARD_H - 116} fill="none" stroke={p.gold} strokeWidth={1.3} opacity={0.85} />
      <rect x={70} y={70} width={CARD_W - 140} height={CARD_H - 140} fill="none" stroke={p.accent} strokeWidth={0.6} opacity={0.35} />
      <path d="M150 1340 H850" stroke={p.gold} strokeWidth={1} opacity={0.5} />
      <path d="M500 1330 l9 10 -9 10 -9 -10 Z" fill={p.accent} opacity={0.7} />
    </g>
  );
}

function Corners({ p }: { p: Palette }) {
  const flourish = (
    <g fill="none" stroke={p.gold} strokeWidth={2}>
      <path d="M0 110 C 0 40 40 0 110 0" />
      <path d="M14 110 C 14 52 52 14 110 14" stroke={p.accent} strokeWidth={1} opacity={0.6} />
      <path d="M30 96 C 46 60 60 46 96 30" />
      <path d="M46 92 C 54 74 74 54 92 46" stroke={p.accent} strokeWidth={1} opacity={0.7} />
      <circle cx={104} cy={104} r={4.5} fill={p.gold} stroke="none" />
      <path d="M0 150 C 10 150 14 146 14 136" />
      <path d="M150 0 C 150 10 146 14 136 14" />
    </g>
  );
  return (
    <g>
      <rect x={52} y={52} width={CARD_W - 104} height={CARD_H - 104} fill="none" stroke={p.accent} strokeWidth={0.8} opacity={0.4} />
      <g transform="translate(66,66)">{flourish}</g>
      <g transform={`translate(${CARD_W - 66},66) scale(-1,1)`}>{flourish}</g>
      <g transform={`translate(66,${CARD_H - 66}) scale(1,-1)`}>{flourish}</g>
      <g transform={`translate(${CARD_W - 66},${CARD_H - 66}) scale(-1,-1)`}>{flourish}</g>
    </g>
  );
}

function Temple({ p }: { p: Palette }) {
  return (
    <g>
      <rect x={46} y={46} width={CARD_W - 92} height={CARD_H - 92} fill="none" stroke={p.gold} strokeWidth={2.4} />
      {/* stepped gopuram with a kalash finial */}
      <g fill="none" stroke={p.gold} strokeWidth={2.2} strokeLinejoin="round">
        <path d="M316 118 H684 V100 H316 Z" fill={`${p.accent}1A`} />
        <path d="M332 100 L364 70 H636 L668 100 Z" fill={`${p.accent}14`} />
        <path d="M372 70 L398 44 H602 L628 70 Z" fill={`${p.accent}1A`} />
        <path d="M406 44 L428 22 H572 L594 44 Z" fill={`${p.accent}22`} />
        <g stroke={p.accent} strokeWidth={1} opacity={0.55}>
          <path d="M404 100 V70 M460 100 V70 M540 100 V70 M596 100 V70" />
          <path d="M440 70 V44 M500 70 V44 M560 70 V44" />
        </g>
        <path d="M500 22 V10" strokeWidth={2.6} />
        <circle cx={500} cy={4} r={7} fill={p.gold} stroke="none" />
        <path d="M296 118 H704" strokeWidth={3.2} />
      </g>
      {/* mandap pillars */}
      <g fill="none" stroke={p.gold} strokeWidth={2}>
        <path d="M114 272 V1228 M138 272 V1228" />
        <path d="M886 272 V1228 M862 272 V1228" />
        <path d="M96 258 H156 M96 272 H156 M844 258 H904 M844 272 H904" strokeWidth={2.4} />
        <path d="M96 1242 H156 M96 1228 H156 M844 1242 H904 M844 1228 H904" strokeWidth={2.4} />
        {[0, 1, 2, 3, 4].map((i) => (
          <circle key={i} cx={126} cy={380 + i * 180} r={4.5} fill={p.accent} stroke="none" opacity={0.55} />
        ))}
        {[0, 1, 2, 3, 4].map((i) => (
          <circle key={`r${i}`} cx={874} cy={380 + i * 180} r={4.5} fill={p.accent} stroke="none" opacity={0.55} />
        ))}
      </g>
      <path d="M260 1318 H740" stroke={p.gold} strokeWidth={1.6} opacity={0.7} />
    </g>
  );
}

function Ring({ p }: { p: Palette }) {
  const laurel = (dir: number) =>
    Array.from({ length: 7 }).map((_, i) => {
      const x = 500 + dir * (40 + i * 26);
      const y = 1332 - i * i * 1.1;
      return (
        <ellipse key={i} cx={x} cy={y} rx={6} ry={15} fill={`${p.accent}33`} stroke={p.accent} strokeWidth={1}
          transform={`rotate(${dir * (40 + i * 5)} ${x} ${y})`} />
      );
    });
  return (
    <g>
      <rect x={54} y={54} width={CARD_W - 108} height={CARD_H - 108} fill="none" stroke={p.gold} strokeWidth={1.6} />
      <circle cx={500} cy={166} r={96} fill="none" stroke={p.gold} strokeWidth={1} opacity={0.4} strokeDasharray="3 9" />
      <g>{laurel(-1)}{laurel(1)}</g>
      <path d="M470 1334 H530" stroke={p.gold} strokeWidth={1.6} />
    </g>
  );
}

function Paisley({ p }: { p: Palette }) {
  const ambi = "M0 0 C 26 -26 64 -8 56 26 C 50 52 18 60 4 46 C -8 34 0 16 13 17 C 24 18 28 29 21 36";
  const row = (y: number, flip: number) =>
    Array.from({ length: 8 }).map((_, i) => (
      <g key={i} transform={`translate(${118 + i * 109},${y}) scale(${i % 2 ? -0.62 : 0.62},${0.62 * flip})`}>
        <path d={ambi} fill={`${p.accent}1F`} stroke={p.accent} strokeWidth={2.4} strokeLinecap="round" />
      </g>
    ));
  const col = (x: number) =>
    Array.from({ length: 9 }).map((_, i) => (
      <circle key={i} cx={x} cy={300 + i * 100} r={4} fill={p.gold} opacity={0.55} />
    ));
  return (
    <g>
      <rect x={48} y={48} width={CARD_W - 96} height={CARD_H - 96} fill="none" stroke={p.gold} strokeWidth={2.2} />
      <rect x={62} y={62} width={CARD_W - 124} height={CARD_H - 124} fill="none" stroke={p.accent} strokeWidth={0.8} opacity={0.4} />
      <g>{row(86, 1)}</g>
      <g>{row(1322, -1)}</g>
      <g>{col(88)}{col(912)}</g>
    </g>
  );
}

const FRAMES: Record<FrameKey, (props: { p: Palette }) => ReactElement> = {
  mandala: Mandala, arch: Arch, wreath: Wreath, minimal: Minimal,
  corners: Corners, temple: Temple, ring: Ring, paisley: Paisley,
};

/* ============================ TEXTURE ============================ */

function Texture({ kind, p, uid }: { kind: string; p: Palette; uid: string }) {
  if (kind === "dots") {
    return (
      <>
        <defs>
          <pattern id={`dots-${uid}`} width={30} height={30} patternUnits="userSpaceOnUse">
            <circle cx={5} cy={5} r={1.8} fill={p.soft} opacity={0.22} />
          </pattern>
        </defs>
        <rect x={0} y={0} width={CARD_W} height={CARD_H} fill={`url(#dots-${uid})`} />
      </>
    );
  }
  if (kind === "rays") {
    return (
      <g opacity={0.05}>
        {Array.from({ length: 36 }).map((_, i) => {
          const a = (i * Math.PI) / 18;
          return (
            <path key={i} d={`M500 172 L${r2(500 + 1500 * Math.cos(a))} ${r2(172 + 1500 * Math.sin(a))}`}
              stroke={p.accent} strokeWidth={10} />
          );
        })}
      </g>
    );
  }
  if (kind === "paper") {
    return (
      <>
        <defs>
          <radialGradient id={`pap-${uid}`} cx="50%" cy="35%" r="78%">
            <stop offset="55%" stopColor={p.bg} stopOpacity={0} />
            <stop offset="100%" stopColor={p.bg2} stopOpacity={0.95} />
          </radialGradient>
        </defs>
        <rect x={0} y={0} width={CARD_W} height={CARD_H} fill={`url(#pap-${uid})`} />
      </>
    );
  }
  return null;
}

/* ============================ EXPORT ============================ */

export default function CardArt({
  frame, motif, texture, p, uid = "a",
}: { frame: FrameKey; motif: MotifKey; texture: string; p: Palette; uid?: string }) {
  const Frame = FRAMES[frame] ?? Minimal;
  return (
    <svg
      viewBox={`0 0 ${CARD_W} ${CARD_H}`}
      width={CARD_W}
      height={CARD_H}
      style={{ position: "absolute", inset: 0, pointerEvents: "none" }}
      aria-hidden="true"
    >
      <defs>
        <linearGradient id={`bg-${uid}`} x1="0" y1="0" x2="0.4" y2="1">
          <stop offset="0%" stopColor={p.bg} />
          <stop offset="100%" stopColor={p.bg2} stopOpacity={0.55} />
        </linearGradient>
      </defs>
      <rect x={0} y={0} width={CARD_W} height={CARD_H} fill={`url(#bg-${uid})`} />
      <Texture kind={texture} p={p} uid={uid} />
      <Frame p={p} />
      <Motif kind={motif} p={p} />
    </svg>
  );
}
