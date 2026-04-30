"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Text, Line } from "@react-three/drei";
import { useRef } from "react";
import * as THREE from "three";

// In this scene the world is (x, y, ct):
//   - horizontal plane (x, y) is space
//   - vertical axis is ct (time, upward = future)
// Light cones are 45° cones (x² + y² = (ct)²).

function ConeMesh({
  color,
  pointDown,
}: {
  color: string;
  pointDown: boolean;
}) {
  // ConeGeometry(radius, height, radialSegments, heightSegments, openEnded)
  // Default cone in three.js points along +Y, apex at +Y, base at −Y. We'll
  // place it so that apex sits at origin.
  const sign = pointDown ? -1 : 1;
  return (
    <mesh position={[0, sign * 1.5, 0]} rotation={[pointDown ? Math.PI : 0, 0, 0]}>
      <coneGeometry args={[1.5, 3, 64, 1, true]} />
      <meshBasicMaterial
        color={color}
        transparent
        opacity={0.18}
        side={THREE.DoubleSide}
      />
    </mesh>
  );
}

function ConeWireframe({ pointDown }: { pointDown: boolean }) {
  const sign = pointDown ? -1 : 1;
  // Draw circles at every 0.5 unit of |ct|
  const ringYs = [0.5, 1.0, 1.5, 2.0, 2.5, 3.0].map((v) => sign * v);
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
            color={pointDown ? "#7c5cff" : "#f0b429"}
            lineWidth={1}
            transparent
            opacity={0.55}
          />
        );
      })}
      {/* generators (8 radial lines) */}
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
            color={pointDown ? "#7c5cff" : "#f0b429"}
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
      <Text position={[len + 0.2, 0, 0]} fontSize={0.22} color="#94a3b8">
        x
      </Text>
      <Text position={[0, 0, len + 0.2]} fontSize={0.22} color="#94a3b8">
        y
      </Text>
      <Text position={[0, len + 0.25, 0]} fontSize={0.24} color="#cbd5e1">
        ct (future)
      </Text>
      <Text position={[0, -len - 0.25, 0]} fontSize={0.22} color="#94a3b8">
        ct (past)
      </Text>
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
  // Inside future cone (timelike future): x²+y² < ct²  ==>  reachable
  { pos: [0.4, 1.6, 0.3], label: "P", color: "#22d3ee", desc: "类时未来" },
  // Inside past cone
  { pos: [-0.5, -1.4, -0.4], label: "Q", color: "#22d3ee", desc: "类时过去" },
  // On the cone (lightlike)
  { pos: [1.5 / Math.SQRT2, 1.5, 1.5 / Math.SQRT2], label: "L", color: "#f0b429", desc: "类光" },
  // Outside cone (spacelike — elsewhere)
  { pos: [2.4, 0.4, -0.8], label: "S", color: "#a78bfa", desc: "类空（彼处）" },
];

function EventPoints() {
  return (
    <>
      {events.map((e, i) => (
        <group key={i}>
          <mesh position={e.pos}>
            <sphereGeometry args={[0.08, 24, 16]} />
            <meshBasicMaterial color={e.color} />
          </mesh>
          <Text
            position={[e.pos[0] + 0.15, e.pos[1] + 0.18, e.pos[2]]}
            fontSize={0.2}
            color={e.color}
            anchorX="left"
          >
            {e.label} · {e.desc}
          </Text>
        </group>
      ))}
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
          dpr={[1, 2]}
          camera={{ position: [4.5, 3.2, 4.5], fov: 50 }}
        >
          <ambientLight intensity={0.6} />
          <pointLight position={[5, 5, 5]} intensity={0.8} />
          <SpinningGroup>
            <Axes />
            <ConeMesh color="#f0b429" pointDown={false} />
            <ConeMesh color="#7c5cff" pointDown={true} />
            <ConeWireframe pointDown={false} />
            <ConeWireframe pointDown={true} />
            <mesh>
              <sphereGeometry args={[0.06, 24, 16]} />
              <meshBasicMaterial color="#ffffff" />
            </mesh>
            <Text
              position={[0.18, 0.18, 0]}
              fontSize={0.2}
              color="#ffffff"
              anchorX="left"
            >
              此时此地
            </Text>
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
      <div className="border-t border-white/10 p-6 text-xs leading-relaxed text-white/60">
        <p className="mb-2 text-white/80">
          可以拖动旋转、滚轮缩放。原点是「此时此地」，金色锥是未来光锥，紫色锥是过去光锥。
        </p>
        <p>
          锥内的事件（青色）与你有因果联系；锥面上是光信号；锥外（紫色 S
          点）是「彼处」，无法以任何信号与你联系。
        </p>
      </div>
    </div>
  );
}
