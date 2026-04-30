import type { Metadata } from "next";
import dynamic from "next/dynamic";
import SectionHeader from "@/components/SectionHeader";
import ConceptList from "@/components/ConceptList";
import TimeDilation from "@/components/TimeDilation";
import WebGLBoundary from "@/components/WebGLBoundary";

const MinkowskiBoost = dynamic(() => import("@/components/MinkowskiBoost"), {
  ssr: false,
  loading: () => <CanvasFallback label="加载 Minkowski 时空图…" />,
});

const LightCone3D = dynamic(() => import("@/components/LightCone3D"), {
  ssr: false,
  loading: () => <CanvasFallback label="加载 3D 光锥…" />,
});

function CanvasFallback({ label }: { label: string }) {
  return (
    <div className="glass flex aspect-[4/3] items-center justify-center text-sm text-white/50">
      {label}
    </div>
  );
}

export const metadata: Metadata = {
  title: "相对论",
  description:
    "狭义与广义相对论：时间膨胀、洛伦兹变换、弯曲时空、黑洞与引力波 —— 重新认识时空与因果。",
};

const specialConcepts = [
  {
    title: "光速不变",
    formula: "c = 299,792,458 m/s",
    body:
      "在任何惯性系中测量真空光速，结果都相同。这看似简单的假设，迫使时间和空间本身不能再是绝对的。",
  },
  {
    title: "时间膨胀",
    formula: "t = γτ,  γ = 1/√(1−v²/c²)",
    body:
      "运动的钟走得更慢。在 GPS 卫星与高能粒子衰变中，这一效应都被精确测量并必须修正。",
  },
  {
    title: "长度收缩",
    formula: "L = L₀ / γ",
    body:
      "高速运动方向上，物体的长度在静止参考系中看来更短 —— 但仅在沿运动方向。",
  },
  {
    title: "质能等价",
    formula: "E² = (mc²)² + (pc)²",
    body:
      "质量与能量是同一事物的两面。即便静止，物体也带有静能 mc²；这是恒星燃烧与核反应的根源。",
  },
];

const generalConcepts = [
  {
    title: "等效原理",
    formula: "g_local ≡ a_frame",
    body:
      "在小区域内，引力场与加速参考系无法区分。这是把引力几何化的起点。",
  },
  {
    title: "弯曲的时空",
    formula: "Rμν − ½ R gμν = 8πG/c⁴ Tμν",
    body:
      "爱因斯坦场方程：物质告诉时空如何弯曲，时空告诉物质如何运动。",
  },
  {
    title: "测地线",
    formula: "d²xᵘ/dτ² + Γᵘαβ uᵃ uᵝ = 0",
    body:
      "自由落体沿时空中最「直」的路径运动 —— 测地线。所谓引力，就是时空几何带来的轨迹弯曲。",
  },
  {
    title: "事件视界",
    formula: "r_s = 2GM / c²",
    body:
      "黑洞的史瓦西半径。一旦越过这个边界，连光也无法逃脱。视界并非物理屏障，而是因果结构的边缘。",
  },
];

const phenomena = [
  {
    title: "孪生佯谬",
    body:
      "其中一名孪生兄弟乘高速飞船远行返回，会比留守地球的兄弟更年轻。这不是悖论 —— 谁经历了加速，谁就走过了更短的固有时。",
  },
  {
    title: "引力红移",
    body:
      "光从强引力场逃出时频率降低、波长拉伸。Pound-Rebka 实验在哈佛塔楼内就成功测得了这一效应。",
  },
  {
    title: "引力波",
    body:
      "时空本身的涟漪，由加速运动的质量发出。LIGO 在 2015 年首次直接探测到了双黑洞合并产生的引力波信号。",
  },
  {
    title: "宇宙学红移",
    body:
      "宇宙整体在膨胀，遥远星系的光因此被拉长 —— 越远的天体退行得越快，这是大爆炸宇宙学的核心证据。",
  },
];

export default function RelativityPage() {
  return (
    <div className="container-page py-20 sm:py-28">
      {/* Hero */}
      <section className="relative">
        <div className="absolute -right-24 top-0 h-72 w-72 rounded-full bg-cosmos-relativity/25 blur-[120px]" />
        <div className="relative">
          <p className="font-mono text-xs uppercase tracking-[0.4em] text-cosmos-relativity">
            Relativity
          </p>
          <h1 className="mt-4 text-balance text-5xl font-semibold leading-tight tracking-tight sm:text-6xl">
            时空可以<span className="text-cosmos-relativity">被弯曲</span>
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-white/70">
            从「光速不变」这一条简洁的原则出发，狭义相对论把同时性、时间与长度从绝对降为相对。十年之后，广义相对论把引力解释为时空几何的弯曲
            —— 这就是我们今天理解黑洞、宇宙膨胀与引力波的根本框架。
          </p>
        </div>
      </section>

      {/* Special relativity */}
      <section className="mt-20">
        <SectionHeader
          eyebrow="Special Relativity · 1905"
          title="狭义相对论：在惯性系之间"
          description="光速不变 + 物理定律在所有惯性系中等价 —— 仅此两条假设，重写了时间与空间。"
          accent="relativity"
        />
        <div className="mt-10">
          <ConceptList items={specialConcepts} accent="relativity" />
        </div>
      </section>

      {/* Calculator */}
      <section className="mt-20">
        <SectionHeader
          eyebrow="Interactive · Time Dilation"
          title="动手感受时间膨胀"
          description="拖动速度滑块，看看以光速的某个比例飞行 1 年，地球上会过去多久。"
          accent="relativity"
        />
        <div className="mt-10">
          <TimeDilation />
        </div>
      </section>

      {/* Minkowski boost (WebGL) */}
      <section className="mt-20">
        <SectionHeader
          eyebrow="WebGL · Lorentz Boost"
          title="坐标轴的剪刀变换"
          description="拖动 β 滑块，看 S' 系的 ct' 与 x' 轴如何向 45° 光锥靠拢 —— 这就是 Lorentz 变换的几何形状。"
          accent="relativity"
        />
        <div className="mt-10">
          <WebGLBoundary label="Minkowski Boost">
            <MinkowskiBoost />
          </WebGLBoundary>
        </div>
      </section>

      {/* General relativity */}
      <section className="mt-20">
        <SectionHeader
          eyebrow="General Relativity · 1915"
          title="广义相对论：时空与物质共舞"
          description="把惯性系的限制取消，把引力升级为时空几何 —— 一组方程，定义了百年来的宇宙图景。"
          accent="relativity"
        />
        <div className="mt-10">
          <ConceptList items={generalConcepts} accent="relativity" />
        </div>
      </section>

      {/* Light cone (WebGL 3D) */}
      <section className="mt-20">
        <SectionHeader
          eyebrow="WebGL · Light Cone"
          title="光锥定义了你的因果"
          description="在时空里，任何事件都拥有一个过去与未来光锥。只有光锥之内的事件能与你建立因果联系 —— 因为信号最快也只能以光速传播。光锥之外的事件，对你而言既不是过去也不是未来，那是「类空相隔」。本网站的名字正是来自这一边界。"
          accent="relativity"
        />
        <div className="mt-10">
          <WebGLBoundary label="Light Cone 3D">
            <LightCone3D />
          </WebGLBoundary>
        </div>
      </section>

      {/* Phenomena */}
      <section className="mt-20">
        <SectionHeader
          eyebrow="Phenomena"
          title="可以被验证的奇异结论"
          description="从孪生佯谬到引力波 —— 相对论给出的预言，已经一一被实验证实。"
          accent="relativity"
        />
        <div className="mt-10 grid gap-4 md:grid-cols-2">
          {phenomena.map((p) => (
            <article
              key={p.title}
              className="glass p-6 transition hover:border-cosmos-relativity/40"
            >
              <h3 className="text-lg font-semibold text-white">{p.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-white/65">
                {p.body}
              </p>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
