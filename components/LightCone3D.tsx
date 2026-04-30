"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Line } from "@react-three/drei";
import { useRef } from "react";
import * as THREE from "three";
import { installWebGLShim } from "./webglShim";

installWebGLShim();

function ConeMesh({
  color,
  pointDown,
}: {
  color: string;
  pointDown: boolean;
}) {
  const sign = pointDown ? -1 : 1;
  return (
    <mesh
      position={[0, sign * 1.5, 0]}
      rotation={[pointDown ? Math.PI : 0, 0, 0]}
    >
      <coneGeometry args={[1.5, 3, 64, 1, true]} />
      <meshBasicMaterial
        color={color}
        transparent
        opacity={0.2}
        side={THREE.DoubleSide}
      />
    </mesh>
  );
}

function ConeWireframe({ pointDown }: { pointDown: boolean }) {
  const sign = pointDown ? -1 : 1;
  const ringYs = [0.5, 1.0, 1.5, 2.0, 2.5, 3.0].map((v) => sign * v);
  const color = pointDown ? "#7c5cff" : "#f0b429";
  return (
    <>
      {ringYs.map((y, i) => {
        const r = Math.abs(y);
        const pts: [number, number, number][] = [];
        const seg = 64;
        for (let k = 0; k <= seg; k++) {
          const a = (k / seg) * Math.PI * 2;
          pts.push([Math.cos(a) * r, y, Math.sin(a) * r]);
        }
        return (
          <Line
            key={i}
            points={pts}
            color={color}
            lineWidth={1}
            transparent
            opacity={0.55}
          />
        );
      })}
      {Array.from({ length: 8 }).map((_, i) => {
        const a = (i / 8) * Math.PI * 2;
        const tip = 3;
        return (
          <Line
            key={`gen-${i}`}
            points={[
              [0, 0, 0],
              [Math.cos(a) * tip, sign * tip, Math.sin(a) * tip],
            ]}
            color={color}
            lineWidth={1}
            transparent
            opacity={0.4}
          />
        );
      })}
    </>
  );
}

function Axes() {
  const len = 3.5;
  return (
    <>
      <Line
        points={[
          [-len, 0, 0],
          [len, 0, 0],
        ]}
        color="#94a3b8"
        lineWidth={1.5}
      />
      <Line
        points={[
          [0, 0, -len],
          [0, 0, len],
        ]}
        color="#94a3b8"
        lineWidth={1.5}
      />
      <Line
        points={[
          [0, -len, 0],
          [0, len, 0],
        ]}
        color="#cbd5e1"
        lineWidth={1.5}
      />
    </>
  );
}

type EventPoint = {
  pos: [number, number, number];
  label: string;
  color: string;
  desc: string;
};

const events: EventPoint[] = [
  { pos: [0.4, 1.6, 0.3], label: "P", color: "#22d3ee", desc: "类时未来" },
  { pos: [-0.5, -1.4, -0.4], label: "Q", color: "#22d3ee", desc: "类时过去" },
  {
    pos: [1.5 / Math.SQRT2, 1.5, 1.5 / Math.SQRT2],
    label: "L",
    color: "#f0b429",
    desc: "类光",
  },
  { pos: [2.4, 0.4, -0.8], label: "S", color: "#a78bfa", desc: "类空（彼处）" },
];

function EventPoints() {
  return (
    <>
      {events.map((e, i) => (
        <mesh key={i} position={e.pos}>
          <sphereGeometry args={[0.08, 16, 12]} />
          <meshBasicMaterial color={e.color} />
        </mesh>
      ))}
      <mesh>
        <sphereGeometry args={[0.06, 16, 12]} />
        <meshBasicMaterial color="#ffffff" />
      </mesh>
    </>
  );
}

function SpinningGroup({ children }: { children: React.ReactNode }) {
  const ref = useRef<THREE.Group>(null);
  useFrame((_, dt) => {
    if (ref.current) ref.current.rotation.y += dt * 0.05;
  });
  return <group ref={ref}>{children}</group>;
}

export default function LightCone3D() {
  return (
    <div className="glass overflow-hidden">
      <div className="aspect-[16/10] w-full bg-cosmos-deep">
        <Canvas
          dpr={[1, 1.5]}
          camera={{ position: [4.5, 3.2, 4.5], fov: 50 }}
          gl={{
            precision: "mediump",
            powerPreference: "default",
            antialias: true,
            failIfMajorPerformanceCaveat: false,
          }}
        >
          <ambientLight intensity={0.6} />
          <pointLight position={[5, 5, 5]} intensity={0.8} />
          <SpinningGroup>
            <Axes />
            <ConeMesh color="#f0b429" pointDown={false} />
            <ConeMesh color="#7c5cff" pointDown={true} />
            <ConeWireframe pointDown={false} />
            <ConeWireframe pointDown={true} />
            <EventPoints />
          </SpinningGroup>
          <OrbitControls
            enablePan={false}
            enableZoom
            minDistance={3}
            maxDistance={12}
          />
        </Canvas>
      </div>
      <div className="space-y-3 border-t border-white/10 p-6 text-xs leading-relaxed text-white/60">
        <p className="text-white/80">
          可以拖动旋转、双指缩放。原点白点是「此时此地」。
        </p>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          <Legend dot="#f0b429" label="未来光锥（金）" />
          <Legend dot="#7c5cff" label="过去光锥（紫）" />
          <Legend dot="#22d3ee" label="类时事件 P / Q（与你有因果联系）" />
          <Legend dot="#a78bfa" label="类空事件 S（彼处）" />
        </div>
        <p>
          锥内 = 你能影响 / 影响你的事件；锥面 = 光信号；锥外 ={" "}
          <span className="text-cosmos-relativity">
            无法以任何信号联系，是「彼处」
          </span>
          。
        </p>
      </div>
    </div>
  );
}

function Legend({ dot, label }: { dot: string; label: string }) {
  return (
    <div className="flex items-center gap-2">
      <span
        className="h-2.5 w-2.5 flex-shrink-0 rounded-full"
        style={{ backgroundColor: dot }}
      />
      <span>{label}</span>
    </div>
  );
}
