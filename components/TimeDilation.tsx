"use client";

import { useMemo, useState } from "react";

const C = 299_792_458; // m/s

export default function TimeDilation() {
  const [vFraction, setVFraction] = useState(0.5);
  const [properTime, setProperTime] = useState(1);

  const { gamma, dilatedTime, lengthFactor } = useMemo(() => {
    const beta = Math.min(Math.max(vFraction, 0), 0.999999);
    const g = 1 / Math.sqrt(1 - beta * beta);
    return {
      gamma: g,
      dilatedTime: properTime * g,
      lengthFactor: 1 / g,
    };
  }, [vFraction, properTime]);

  const speed = (vFraction * C).toLocaleString("en-US", {
    maximumFractionDigits: 0,
  });

  return (
    <div className="glass overflow-hidden p-6 sm:p-8">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-stretch">
        <div className="flex-1 space-y-5">
          <div>
            <label className="flex items-baseline justify-between text-sm text-white/70">
              <span>速度 v / c</span>
              <span className="font-mono text-cosmos-relativity">
                {vFraction.toFixed(4)} c
              </span>
            </label>
            <input
              type="range"
              min={0}
              max={0.999}
              step={0.001}
              value={vFraction}
              onChange={(e) => setVFraction(parseFloat(e.target.value))}
              className="mt-3 w-full accent-cosmos-relativity"
              aria-label="速度（光速的倍数）"
            />
            <p className="mt-1 font-mono text-xs text-white/40">
              ≈ {speed} m/s
            </p>
          </div>

          <div>
            <label className="flex items-baseline justify-between text-sm text-white/70">
              <span>固有时 τ（飞船上的时间，单位：年）</span>
              <span className="font-mono text-cosmos-relativity">
                {properTime} 年
              </span>
            </label>
            <input
              type="range"
              min={0.1}
              max={50}
              step={0.1}
              value={properTime}
              onChange={(e) => setProperTime(parseFloat(e.target.value))}
              className="mt-3 w-full accent-cosmos-relativity"
              aria-label="固有时（年）"
            />
          </div>
        </div>

        <div className="grid flex-1 grid-cols-1 gap-3 sm:grid-cols-2">
          <Stat
            label="洛伦兹因子 γ"
            value={gamma.toFixed(3)}
            sub="γ = 1 / √(1 − v²/c²)"
          />
          <Stat
            label="地球上经过的时间 t"
            value={`${dilatedTime.toFixed(2)} 年`}
            sub="t = γ · τ"
          />
          <Stat
            label="飞船方向收缩因子"
            value={lengthFactor.toFixed(3)}
            sub="L = L₀ / γ"
          />
          <Stat
            label="时间被拉伸了"
            value={`${(gamma - 1) * 100 > 0 ? "+" : ""}${((gamma - 1) * 100).toFixed(1)}%`}
            sub="(γ − 1) × 100%"
          />
        </div>
      </div>

      <p className="mt-6 text-xs leading-relaxed text-white/50">
        提示：当 v 趋近于 c，γ 急速发散。这是为什么有质量的物体永远到不了光速 ——
        加速到光速所需的能量是无限的。
      </p>
    </div>
  );
}

function Stat({
  label,
  value,
  sub,
}: {
  label: string;
  value: string;
  sub: string;
}) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
      <p className="text-xs uppercase tracking-widest text-white/50">{label}</p>
      <p className="mt-2 font-mono text-2xl text-cosmos-relativity">{value}</p>
      <p className="mt-1 font-mono text-[10px] text-white/40">{sub}</p>
    </div>
  );
}
