import type { Metadata } from "next";
import Link from "next/link";
import SectionHeader from "@/components/SectionHeader";

export const metadata: Metadata = {
  title: "关于",
  description: "Beyond the Light Cone：项目背景、内容来源与延伸阅读。",
};

const reading = [
  {
    title: "Feynman Lectures on Physics",
    author: "Richard Feynman",
    note: "免费在线版：feynmanlectures.caltech.edu，量子力学卷直观又锋利。",
  },
  {
    title: "Spacetime and Geometry",
    author: "Sean Carroll",
    note: "广义相对论的现代教材，几何视角清晰，附 GR 笔记可免费下载。",
  },
  {
    title: "Quantum Mechanics: The Theoretical Minimum",
    author: "Leonard Susskind",
    note: "给一切想真正动手算的人，最少必要的数学，最大量的物理。",
  },
  {
    title: "Six Not-So-Easy Pieces",
    author: "Richard Feynman",
    note: "进阶版科普，相对论与对称性专章值得反复读。",
  },
];

export default function AboutPage() {
  return (
    <div className="container-page py-20 sm:py-28">
      <section className="relative">
        <p className="font-mono text-xs uppercase tracking-[0.4em] text-cosmos-accent">
          About
        </p>
        <h1 className="mt-4 text-balance text-5xl font-semibold leading-tight tracking-tight sm:text-6xl">
          为什么是<span className="heading-gradient"> 光锥之外</span>
        </h1>
        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-white/70">
          这是一份写给好奇心的入门导览。我们相信物理学的美感来自概念之间的连贯，而不是公式的堆叠。这里的每一条目都尽量做到三件事：给出直觉、给出关键方程、给出一个可记住的实验或场景。
        </p>
      </section>

      <section className="mt-16 grid gap-6 md:grid-cols-3">
        <Card title="面向谁" body="对宇宙感到好奇、希望系统性了解现代物理但暂时不想啃完整教材的读者。" />
        <Card title="不做什么" body="我们不会把概念稀释到失真，也不会让「类比」掩盖「事实」—— 该有公式的时候不会回避。" />
        <Card title="如何阅读" body="按主题任意顺序浏览即可。每一页都是相对独立的小专题，可以从你最感兴趣的那一个开始。" />
      </section>

      <section className="mt-20">
        <SectionHeader
          eyebrow="Further Reading"
          title="想读更多？"
          description="如果某个章节让你停不下来，下面是几本作者们认为值得反复打开的书。"
        />
        <ul className="mt-10 grid gap-4 md:grid-cols-2">
          {reading.map((b) => (
            <li
              key={b.title}
              className="glass p-6 transition hover:border-cosmos-accent/40"
            >
              <h3 className="text-lg font-semibold text-white">{b.title}</h3>
              <p className="mt-1 text-sm text-white/60">{b.author}</p>
              <p className="mt-3 text-sm leading-relaxed text-white/65">
                {b.note}
              </p>
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-20">
        <div className="glass relative overflow-hidden p-10 sm:p-14">
          <div className="absolute -right-32 -top-32 h-72 w-72 rounded-full bg-lightcone opacity-30 blur-3xl animate-spin-slow" />
          <div className="relative">
            <p className="font-mono text-xs uppercase tracking-[0.4em] text-cosmos-accent">
              Colophon
            </p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
              站点说明
            </h2>
            <p className="mt-4 max-w-2xl text-white/65">
              本站基于 Next.js（App Router）与 Tailwind CSS 构建，部署在 Vercel
              上。所有内容均为科普性质，不构成学术参考；如果你发现错误或希望补充，欢迎在
              GitHub 上提交 issue。
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                href="/quantum"
                className="rounded-full bg-cosmos-quantum/90 px-5 py-2.5 text-sm font-medium text-cosmos-bg transition hover:bg-cosmos-quantum"
              >
                看量子力学
              </Link>
              <Link
                href="/relativity"
                className="rounded-full border border-white/20 px-5 py-2.5 text-sm text-white/90 transition hover:border-white/40 hover:bg-white/5"
              >
                看相对论
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

function Card({ title, body }: { title: string; body: string }) {
  return (
    <article className="glass p-6">
      <h3 className="text-lg font-semibold text-white">{title}</h3>
      <p className="mt-3 text-sm leading-relaxed text-white/65">{body}</p>
    </article>
  );
}
