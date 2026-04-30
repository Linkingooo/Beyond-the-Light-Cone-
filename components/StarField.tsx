"use client";

import { useMemo } from "react";

type Star = {
  top: string;
  left: string;
  size: number;
  delay: string;
  duration: string;
  opacity: number;
};

function seededRandom(seed: number) {
  let s = seed;
  return () => {
    s = (s * 9301 + 49297) % 233280;
    return s / 233280;
  };
}

export default function StarField() {
  const stars = useMemo<Star[]>(() => {
    const rng = seededRandom(42);
    return Array.from({ length: 120 }, () => ({
      top: `${rng() * 100}%`,
      left: `${rng() * 100}%`,
      size: rng() * 1.6 + 0.4,
      delay: `${rng() * 4}s`,
      duration: `${3 + rng() * 4}s`,
      opacity: 0.4 + rng() * 0.6,
    }));
  }, []);

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
    >
      {stars.map((star, i) => (
        <span
          key={i}
          className="absolute rounded-full bg-cosmos-star animate-twinkle"
          style={{
            top: star.top,
            left: star.left,
            width: `${star.size}px`,
            height: `${star.size}px`,
            opacity: star.opacity,
            animationDelay: star.delay,
            animationDuration: star.duration,
            boxShadow: "0 0 6px rgba(226,232,240,0.6)",
          }}
        />
      ))}
      <div className="absolute -top-40 left-1/2 h-[640px] w-[640px] -translate-x-1/2 rounded-full bg-cosmos-accent/20 blur-[140px]" />
      <div className="absolute bottom-[-300px] right-[-160px] h-[520px] w-[520px] rounded-full bg-cosmos-quantum/10 blur-[120px]" />
    </div>
  );
}
