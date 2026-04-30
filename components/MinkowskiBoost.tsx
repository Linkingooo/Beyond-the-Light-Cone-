"use client";

import { Canvas } from "@react-three/fiber";
import { Line, OrthographicCamera } from "@react-three/drei";
import { useMemo, useState } from "react";
import { installWebGLShim } from "./webglShim";

installWebGLShim();

const RANGE = 5;
const GRID_STEP = 1;

type Vec2 = [number, number];

function toVec3(p: Vec2, z = 0): [number, number, number] {
  return [p[0], p[1], z];
}

function GridLines() {
  const lines = useMemo(() => {
    const arr: Vec2[][] = [];
    for (let i = -RANGE; i <= RANGE; i += GRID_STEP) {
      if (i === 0) continue;
      arr.push([
        [i, -RANGE],
        [i, RANGE],
      ]);
      arr.push([
        [-RANGE, i],
        [RANGE, i],
      ]);
    }
    return arr;
  }, []);
  return (
    <>
      {lines.map((seg, i) => (
        <Line
          key={i}
          points={seg.map((p) => toVec3(p))}
          color="#1f2937"
          lineWidth={1}
          transparent
          opacity={0.45}
        />
      ))}
    </>
  );
}

function BoostedGrid({ beta }: { beta: number }) {
  const lines = useMemo(() => {
    const segs: Vec2[][] = [];
    const max = RANGE;
    for (let n = -RANGE; n <= RANGE; n += GRID_STEP) {
      if (n === 0) continue;
      segs.push([
        [-max, n - max * beta],
        [max, n + max * beta],
      ]);
      segs.push([
        [n - max * beta, -max],
        [n + max * beta, max],
      ]);
    }
    return segs;
  }, [beta]);
  return (
    <>
      {lines.map((seg, i) => (
        <Line
          key={i}
          points={seg.map((p) => toVec3(p))}
          color="#f0b429"
          lineWidth={1}
          transparent
          opacity={0.25}
        />
      ))}
    </>
  );
}

function LightCone() {
  return (
    <>
      <Line
        points={[toVec3([-RANGE, -RANGE]), toVec3([RANGE, RANGE])]}
        color="#f0b429"
        lineWidth={1.5}
        transparent
        opacity={0.7}
      />
      <Line
        points={[toVec3([-RANGE, RANGE]), toVec3([RANGE, -RANGE])]}
        color="#f0b429"
        lineWidth={1.5}
        transparent
        opacity={0.7}
      />
    </>
  );
}

type EventDef = { id: string; x: number; t: number; color: string; label: string };

const EVENTS: EventDef[] = [
  { id: "A", x: 2, t: 1, color: "#22d3ee", label: "A" },
  { id: "B", x: -1, t: 2.5, color: "#22d3ee", label: "B" },
  { id: "C", x: 3, t: 3, color: "#f0b429", label: "光" },
];

function EventDots() {
  return (
    <>
      {EVENTS.map((e) => (
        <mesh key={e.id} position={[e.x, e.t, 0.01]}>
          <circleGeometry args={[0.1, 24]} />
          <meshBasicMaterial color={e.color} />
        </mesh>
      ))}
    </>
  );
}

function Diagram({ beta }: { beta: number }) {
  return (
    <>
      <GridLines />
      <BoostedGrid beta={beta} />

      {/* Static rest-frame axes */}
      <Line
        points={[toVec3([-RANGE, 0]), toVec3([RANGE, 0])]}
        color="#cbd5e1"
        lineWidth={2}
      />
      <Line
        points={[toVec3([0, -RANGE]), toVec3([0, RANGE])]}
        color="#cbd5e1"
        lineWidth={2}
      />

      <LightCone />

      {/* Boosted axes */}
      <Line
        points={[toVec3([-RANGE * beta, -RANGE]), toVec3([RANGE * beta, RANGE])]}
        color="#7c5cff"
        lineWidth={3}
      />
      <Line
        points={[toVec3([-RANGE, -RANGE * beta]), toVec3([RANGE, RANGE * beta])]}
        color="#7c5cff"
        lineWidth={3}
      />

      <EventDots />
    </>
  );
}

// Convert (x, t) world coordinates into a 0..100 % position inside the canvas.
// Camera is centered at origin with zoom=50 and matches axis range RANGE on
// both sides; we just remap (-RANGE..RANGE) to (0..100%).
function mapToPct(x: number, t: number): { left: string; top: string } {
  const xPct = ((x + RANGE) / (2 * RANGE)) * 100;
  const tPct = ((RANGE - t) / (2 * RANGE)) * 100;
  return { left: `${xPct}%`, top: `${tPct}%` };
}

export default function MinkowskiBoost() {
  const [beta, setBeta] = useState(0.4);
  const gamma = 1 / Math.sqrt(1 - beta * beta);

  // Boosted-frame coordinates for sample events.
  const eventReadout = EVENTS.map((e) => ({
    ...e,
    xPrime: gamma * (e.x - beta * e.t),
    tPrime: gamma * (e.t - beta * e.x),
  }));

  return (
    <div className="glass overflow-hidden">
      <div className="relative aspect-[4/3] w-full bg-cosmos-deep">
        <Canvas
          dpr={[1, 1.5]}
          gl={{
            precision: "mediump",
            powerPreference: "default",
            antialias: true,
            failIfMajorPerformanceCaveat: false,
          }}
        >
          <OrthographicCamera makeDefault position={[0, 0, 10]} zoom={50} />
          <Diagram beta={beta} />
        </Canvas>

        {/* HTML axis labels (no remote font needed) */}
        <span
          className="pointer-events-none absolute font-mono text-xs text-white/80"
          style={{ left: "97%", top: "47%" }}
        >
          x
        </span>
        <span
          className="pointer-events-none absolute font-mono text-xs text-white/80"
          style={{ left: "51%", top: "1%" }}
        >
          ct
        </span>
        <span
          className="pointer-events-none absolute font-mono text-xs"
          style={{
            ...mapToPct(RANGE, RANGE * beta),
            color: "#7c5cff",
            transform: "translate(8px, -8px)",
          }}
        >
          x&apos;
        </span>
        <span
          className="pointer-events-none absolute font-mono text-xs"
          style={{
            ...mapToPct(RANGE * beta, RANGE),
            color: "#7c5cff",
            transform: "translate(8px, 0)",
          }}
        >
          ct&apos;
        </span>
        <span
          className="pointer-events-none absolute font-mono text-[10px] text-cosmos-relativity"
          style={{ left: "85%", top: "5%" }}
        >
          ct = ±x
        </span>

        {/* Event labels with live boosted coords */}
        {eventReadout.map((e) => (
          <span
            key={e.id}
            className="pointer-events-none absolute whitespace-nowrap font-mono text-[10px]"
            style={{
              ...mapToPct(e.x, e.t),
              color: e.color,
              transform: "translate(10px, -6px)",
            }}
          >
            {e.label} · x&apos;={e.xPrime.toFixed(2)}, ct&apos;=
            {e.tPrime.toFixed(2)}
          </span>
        ))}
      </div>

      <div className="space-y-4 border-t border-white/10 p-6">
        <div>
          <label className="flex items-baseline justify-between text-sm text-white/70">
            <span>boost 速度 β = v / c</span>
            <span className="font-mono text-cosmos-accent">
              β = {beta.toFixed(3)} · γ = {gamma.toFixed(3)}
            </span>
          </label>
          <input
            type="range"
            min={-0.95}
            max={0.95}
            step={0.01}
            value={beta}
            onChange={(e) => setBeta(parseFloat(e.target.value))}
            className="mt-3 w-full accent-cosmos-accent"
            aria-label="boost 速度"
          />
        </div>

        <div className="grid grid-cols-2 gap-3 text-xs text-white/60 sm:grid-cols-4">
          <Legend dot="#cbd5e1" label="静止系 S 的 x, ct" />
          <Legend dot="#7c5cff" label="运动系 S' 的 x', ct'" />
          <Legend dot="#f0b429" label="光锥 / S' 网格" />
          <Legend dot="#22d3ee" label="事件（标签实时更新）" />
        </div>

        <p className="text-xs leading-relaxed text-white/55">
          提示：移动滑块时，S&apos; 的两条新坐标轴（紫色）像剪刀一样向 45°
          光锥靠拢 —— 这就是 Lorentz 变换的几何意义。事件之间的「时空间隔」
          ds² = −(ct)² + x² 在变换下保持不变。
        </p>
      </div>
    </div>
  );
}

function Legend({ dot, label }: { dot: string; label: string }) {
  return (
    <div className="flex items-center gap-2">
      <span
        className="h-2.5 w-2.5 rounded-full"
        style={{ backgroundColor: dot }}
      />
      <span>{label}</span>
    </div>
  );
}
