import Link from "next/link";
import TopicCard from "@/components/TopicCard";
import SectionHeader from "@/components/SectionHeader";

const milestones = [
  {
    year: "1900",
    title: "普朗克的量子假说",
    body: "为解释黑体辐射，普朗克提出能量以离散的「量子」形式发射，开启了量子物理的序幕。",
  },
  {
    year: "1905",
    title: "爱因斯坦的奇迹年",
    body: "光电效应、布朗运动、狭义相对论、质能等价 E=mc² —— 一年内重塑物理学的根基。",
  },
  {
    year: "1915",
    title: "广义相对论",
    body: "爱因斯坦把引力诠释为时空的弯曲，时空不再是被动舞台，而是主动参与者。",
  },
  {
    year: "1927",
    title: "哥本哈根诠释",
    body: "海森堡、玻尔、玻恩等人确立了量子力学的概率性诠释与不确定性原理。",
  },
  {
    year: "2015",
    title: "引力波首次直接探测",
    body: "LIGO 探测到双黑洞合并产生的引力波，验证了广义相对论一个世纪前的预言。",
  },
  {
    year: "2022",
    title: "诺奖：量子纠缠实验",
    body: "Aspect、Clauser、Zeilinger 的实验确认贝尔不等式被违反，量子非定域性成为既成事实。",
  },
];

export default function HomePage() {
  return (
    <div className="container-page py-20 sm:py-28">
      {/* Hero */}
      <section className="relative">
        <div className="absolute -left-16 top-1/2 h-72 w-72 -translate-y-1/2 rounded-full bg-cosmos-accent/30 blur-[120px]" />
        <div className="relative flex flex-col gap-8">
          <span className="chip w-fit">现代物理 · 入门到形而上</span>
          <h1 className="text-balance text-5xl font-semibold leading-tight tracking-tight sm:text-6xl md:text-7xl">
            <span className="heading-gradient">光锥之外</span>
            <br />
            <span className="text-white/90">是什么在等着我们？</span>
          </h1>
          <p className="max-w-2xl text-lg leading-relaxed text-white/70">
            两个世纪以来，物理学因为
            <span className="text-cosmos-quantum"> 量子力学 </span>
            与
            <span className="text-cosmos-relativity"> 相对论 </span>
            的诞生而被彻底改写。前者描绘了最微小尺度上的概率与跃迁，后者揭示了最宏大尺度上的弯曲与因果。这里是一份用现代视角写给你的导览。
          </p>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/quantum"
              className="rounded-full bg-cosmos-quantum/90 px-6 py-3 text-sm font-medium text-cosmos-bg transition hover:bg-cosmos-quantum"
            >
              开始探索量子世界
            </Link>
            <Link
              href="/relativity"
              className="rounded-full border border-white/20 px-6 py-3 text-sm font-medium text-white/90 transition hover:border-white/40 hover:bg-white/5"
            >
              进入相对论时空
            </Link>
          </div>
        </div>
      </section>

      {/* Two pillars */}
      <section className="mt-24">
        <SectionHeader
          eyebrow="The Two Pillars"
          title="两根支柱，一个宇宙"
          description="从原子到星系，从皮秒到亿万年。请选择一条入口，开始你的旅程。"
        />
        <div className="mt-10 grid gap-6 md:grid-cols-2">
          <TopicCard
            href="/quantum"
            eyebrow="Quantum Mechanics"
            title="量子力学"
            description="探索波粒二象性、不确定性原理、量子叠加与纠缠 —— 概率主宰的微观世界。"
            symbol="ψ"
            accent="quantum"
          />
          <TopicCard
            href="/relativity"
            eyebrow="Relativity"
            title="相对论"
            description="跨越时间膨胀、洛伦兹变换、弯曲时空与黑洞 —— 重新定义引力与因果。"
            symbol="gμν"
            accent="relativity"
          />
        </div>
      </section>

      {/* Timeline */}
      <section className="mt-24">
        <SectionHeader
          eyebrow="Timeline"
          title="塑造现代物理的瞬间"
          description="从一个炉火的辐射难题，到被探测到的引力涟漪 —— 这是百年间最关键的几束光。"
        />
        <ol className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {milestones.map((m) => (
            <li
              key={m.year}
              className="glass p-6 transition hover:-translate-y-1 hover:border-cosmos-accent/40"
            >
              <p className="font-mono text-xs uppercase tracking-[0.3em] text-cosmos-accent">
                {m.year}
              </p>
              <h3 className="mt-3 text-lg font-semibold text-white">
                {m.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-white/65">
                {m.body}
              </p>
            </li>
          ))}
        </ol>
      </section>

      {/* CTA */}
      <section className="mt-24">
        <div className="glass relative overflow-hidden p-10 sm:p-14">
          <div className="absolute -right-32 -top-32 h-72 w-72 rounded-full bg-lightcone opacity-30 blur-3xl animate-spin-slow" />
          <div className="relative flex flex-col gap-4">
            <p className="font-mono text-xs uppercase tracking-[0.4em] text-cosmos-accent">
              About this site
            </p>
            <h2 className="max-w-3xl text-3xl font-semibold leading-snug tracking-tight text-white sm:text-4xl">
              一份给好奇心的礼物 —— 不需要数学背景，也能读懂现代物理。
            </h2>
            <p className="max-w-3xl text-white/65">
              我们用最少的公式与最直观的类比，搭配关键方程与可交互模块，让抽象的概念有迹可循。
            </p>
            <Link
              href="/about"
              className="mt-2 inline-flex w-fit items-center gap-2 text-sm text-white/80 hover:text-white"
            >
              了解更多 <span aria-hidden>→</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
