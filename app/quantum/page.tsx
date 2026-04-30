import type { Metadata } from "next";
import SectionHeader from "@/components/SectionHeader";
import ConceptList from "@/components/ConceptList";

export const metadata: Metadata = {
  title: "量子力学",
  description:
    "波粒二象性、不确定性原理、量子叠加与纠缠 —— 一次面向现代读者的量子力学导览。",
};

const coreConcepts = [
  {
    title: "波粒二象性",
    formula: "λ = h / p",
    body:
      "电子既是粒子，也是波。德布罗意波长把动量与波动联系起来；双缝实验中，单个电子也会在屏幕上累积出干涉条纹。",
  },
  {
    title: "薛定谔方程",
    formula: "iℏ ∂ψ/∂t = Ĥψ",
    body:
      "波函数 ψ 随时间的演化由薛定谔方程决定。它是确定性的方程，但 |ψ|² 给出的是概率密度。",
  },
  {
    title: "海森堡不确定性原理",
    formula: "Δx · Δp ≥ ℏ/2",
    body:
      "位置与动量不能同时被精确确定。这并非测量精度的问题，而是自然本身的性质：共轭量之间存在最小不确定性。",
  },
  {
    title: "测量与坍缩",
    formula: "ψ → |a⟩  with  P = |⟨a|ψ⟩|²",
    body:
      "测量会让叠加态「选择」一个本征态。哥本哈根诠释、多世界、退相干等不同的诠释，对「坍缩」有截然不同的解释。",
  },
  {
    title: "量子叠加",
    formula: "|ψ⟩ = α|0⟩ + β|1⟩",
    body:
      "一个量子比特可以同时处于 0 与 1 的线性叠加。叠加态承载了量子计算的并行性，但只能在测量后塌缩为某个结果。",
  },
  {
    title: "量子纠缠",
    formula: "|Φ⁺⟩ = (|00⟩ + |11⟩) / √2",
    body:
      "纠缠粒子之间的关联超越任何经典隐变量解释。Bell 不等式的实验违反，确认了量子非定域性。",
  },
  {
    title: "泡利不相容原理",
    formula: "ψ(1,2) = −ψ(2,1)",
    body:
      "两个全同费米子不能占据同一量子态。这是原子壳层结构与化学元素周期表的根源。",
  },
  {
    title: "费曼路径积分",
    formula: "K = Σ exp(iS/ℏ)",
    body:
      "粒子从 A 到 B 同时尝试所有可能的路径，每条路径贡献一个复数振幅，相干叠加给出总传播子。",
  },
];

const experiments = [
  {
    title: "双缝实验",
    body:
      "即便一次只发射一个电子，干涉条纹仍会逐渐显现。一旦你「窥视」电子从哪条缝穿过，条纹立刻消失。",
  },
  {
    title: "贝尔实验",
    body:
      "对纠缠光子在不同方向上的偏振关联进行测量，结果违反贝尔不等式 —— 自然界没有定域隐变量。",
  },
  {
    title: "斯特恩-盖拉赫实验",
    body:
      "原子束被非均匀磁场分裂成离散的两束，揭示电子自旋的量子化 —— 这是「自旋 1/2」最早的直观证据。",
  },
];

export default function QuantumPage() {
  return (
    <div className="container-page py-20 sm:py-28">
      {/* Hero */}
      <section className="relative">
        <div className="absolute -left-20 top-0 h-72 w-72 rounded-full bg-cosmos-quantum/30 blur-[120px]" />
        <div className="relative">
          <p className="font-mono text-xs uppercase tracking-[0.4em] text-cosmos-quantum">
            Quantum Mechanics
          </p>
          <h1 className="mt-4 text-balance text-5xl font-semibold leading-tight tracking-tight sm:text-6xl">
            概率的世界，<span className="text-cosmos-quantum">不再可分</span>
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-white/70">
            原子、电子、光子 ——
            它们既不像台球，也不像水波，而是介于两者之间的「量子」。在这里，确定性让位给概率，状态可以叠加，远距离的粒子也能彼此「心意相通」。
          </p>
        </div>
      </section>

      {/* Core concepts */}
      <section className="mt-20">
        <SectionHeader
          eyebrow="Core Concepts"
          title="八个核心概念"
          description="从波函数到纠缠 —— 这些是理解现代量子理论的最小必要拼图。"
          accent="quantum"
        />
        <div className="mt-10">
          <ConceptList items={coreConcepts} accent="quantum" />
        </div>
      </section>

      {/* Famous experiments */}
      <section className="mt-20">
        <SectionHeader
          eyebrow="Experiments"
          title="改变了我们认知的实验"
          description="量子力学不是哲学思辨 —— 每一个奇异的结论都被实验反复确认。"
          accent="quantum"
        />
        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {experiments.map((exp) => (
            <article
              key={exp.title}
              className="glass p-6 transition hover:border-cosmos-quantum/40"
            >
              <h3 className="text-lg font-semibold text-white">{exp.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-white/65">
                {exp.body}
              </p>
            </article>
          ))}
        </div>
      </section>

      {/* Cat */}
      <section className="mt-20">
        <div className="glass relative overflow-hidden p-10 sm:p-14">
          <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-cosmos-quantum/20 blur-3xl" />
          <div className="relative grid gap-8 md:grid-cols-[1fr_auto] md:items-center">
            <div>
              <p className="font-mono text-xs uppercase tracking-[0.4em] text-cosmos-quantum">
                Schrödinger&apos;s Cat
              </p>
              <h2 className="mt-3 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
                那只既死又活的猫
              </h2>
              <p className="mt-4 max-w-2xl text-white/70">
                薛定谔的思想实验把量子叠加放大到宏观尺度：当微观事件触发箱中机制，猫的命运也成为叠加态。它逼问我们：测量到底意味着什么？观察者又意味着什么？
              </p>
              <p className="mt-3 max-w-2xl text-white/55">
                现代退相干理论给出更温和的答案：宏观体系与环境的耦合让叠加在极短时间内被「冲淡」，使经典世界从量子世界中浮现。
              </p>
            </div>
            <div className="font-mono text-6xl text-cosmos-quantum/80 sm:text-7xl">
              |alive⟩ + |dead⟩
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
