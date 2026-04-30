"use client";

import { Canvas } from "@react-three/fiber";
import { Line, Text, OrthographicCamera } from "@react-three/drei";
import { useMemo, useState } from "react";

const RANGE = 5; // half-extent of the diagram in coordinate units
const GRID_STEP = 1;

type Vec2 = [number, number];

function toVec3(p: Vec2, z = 0): [number, number, number] {
  return [p[0], p[1], z];
}

function GridLines({ color = "#1f2937" }: { color?: string }) {
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
          color={color}
          lineWidth={1}
          transparent
          opacity={0.35}
        />
      ))}
    </>
  );
}

function BoostedGrid({ beta, color }: { beta: number; color: string }) {
  // S' grid: lines of constant t' (parallel to x' axis) and constant x' (parallel to t' axis).
  // x' axis direction = (1, β), t' axis direction = (β, 1).
  const lines = useMemo(() => {
    const segs: Vec2[][] = [];
    const max = RANGE;
    for (let n = -RANGE; n <= RANGE; n += GRID_STEP) {
      if (n === 0) continue;
      // const t' = n: line through (0, n) along x' direction (1, β)
      // parametrize by s ∈ [-max, max]
      segs.push([
        [-max, n - max * beta],
        [max, n + max * beta],
      ]);
      // const x' = n: line through (n, 0) along t' direction (β, 1)
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
          color={color}
          lineWidth={1}
          transparent
          opacity={0.25}
        />
      ))}
    </>
  );
}

function Axis({
  from,
  to,
  color,
  label,
  labelOffset = [0.25, 0.25],
  thickness = 2,
}: {
  from: Vec2;
  to: Vec2;
  color: string;
  label: string;
  labelOffset?: Vec2;
  thickness?: number;
}) {
  return (
    <group>
      <Line
        points={[toVec3(from), toVec3(to)]}
        color={color}
        lineWidth={thickness}
      />
      <Text
        position={toVec3([to[0] + labelOffset[0], to[1] + labelOffset[1]])}
        fontSize={0.3}
        color={color}
        anchorX="left"
        anchorY="middle"
      >
        {label}
      </Text>
    </group>
  );
}

function LightCone() {
  return (
    <>
      <Line
        points={[toVec3([-RANGE, -RANGE]), toVec3([RANGE, RANGE])]}
        color="#f0b429"
        lineWidth={1.5}
        dashed
        dashSize={0.18}
        gapSize={0.12}
        transparent
        opacity={0.7}
      />
      <Line
        points={[toVec3([-RANGE, RANGE]), toVec3([RANGE, -RANGE])]}
        color="#f0b429"
        lineWidth={1.5}
        dashed
        dashSize={0.18}
        gapSize={0.12}
        transparent
        opacity={0.7}
      />
      <Text
        position={[RANGE - 0.15, RANGE + 0.25, 0]}
        fontSize={0.26}
        color="#f0b429"
        anchorX="right"
      >
        ct = x  (光速)
      </Text>
    </>
  );
}

function EventDot({
  x,
  t,
  beta,
  color = "#22d3ee",
  label,
}: {
  x: number;
  t: number;
  beta: number;
  color?: string;
  label: string;
}) {
  const gamma = 1 / Math.sqrt(1 - beta * beta);
  const xPrime = gamma * (x - beta * t);
  const tPrime = gamma * (t - beta * x);
  return (
    <group>
      <mesh position={[x, t, 0.01]}>
        <circleGeometry args={[0.09, 24]} />
        <meshBasicMaterial color={color} />
      </mesh>
      <Text
        position={[x + 0.18, t + 0.18, 0.02]}
        fontSize={0.22}
        color={color}
        anchorX="left"
      >
        {`${label}  ·  x'=${xPrime.toFixed(2)}, ct'=${tPrime.toFixed(2)}`}
      </Text>
    </group>
  );
}

function Diagram({ beta }: { beta: number }) {
  return (
    <>
      <GridLines />
      <BoostedGrid beta={beta} color="#f0b429" />

      {/* Static rest-frame axes */}
      <Axis
        from={[-RANGE, 0]}
        to={[RANGE, 0]}
        color="#cbd5e1"
        label="x"
        labelOffset={[0.25, -0.05]}
      />
      <Axis
        from={[0, -RANGE]}
        to={[0, RANGE]}
        color="#cbd5e1"
        label="ct"
        labelOffset={[0.15, 0.1]}
      />

      <LightCone />

      {/* Boosted axes */}
      <Axis
        from={[-RANGE * beta, -RANGE]}
        to={[RANGE * beta, RANGE]}
        color="#7c5cff"
        label="ct'"
        labelOffset={[0.18, 0.12]}
        thickness={3}
      />
      <Axis
        from={[-RANGE, -RANGE * beta]}
        to={[RANGE, RANGE * beta]}
        color="#7c5cff"
        label="x'"
        labelOffset={[0.25, -0.05]}
        thickness={3}
      />

      {/* Sample events */}
      <EventDot x={2} t={1} beta={beta} color="#22d3ee" label="A" />
      <EventDot x={-1} t={2.5} beta={beta} color="#22d3ee" label="B" />
      <EventDot x={3} t={3} beta={beta} color="#f0b429" label="光" />
    </>
  );
}

export default function MinkowskiBoost() {
  const [beta, setBeta] = useState(0.4);
  const gamma = 1 / Math.sqrt(1 - beta * beta);

  return (
    <div className="glass overflow-hidden">
      <div className="aspect-[4/3] w-full bg-cosmos-deep">
        <Canvas dpr={[1, 2]}>
          <OrthographicCamera makeDefault position={[0, 0, 10]} zoom={50} />
          <Diagram beta={beta} />
        </Canvas>
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
          <Legend dot="#22d3ee" label="事件（点击坐标见标签）" />
        </div>

        <p className="text-xs leading-relaxed text-white/55">
          提示：移动滑块时，S&apos; 的两条新坐标轴（紫色）像剪刀一样向 45°
          光锥靠拢 —— 这就是 Lorentz 变换的几何意义。注意事件 A、B
          的坐标值在两个参考系中如何同时变化，但事件之间的「时空间隔」 ds² =
          −(ct)² + x² 始终不变。
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

