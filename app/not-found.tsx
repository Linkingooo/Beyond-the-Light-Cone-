import Link from "next/link";

export default function NotFound() {
  return (
    <div className="container-page flex min-h-[60vh] flex-col items-center justify-center text-center">
      <p className="font-mono text-xs uppercase tracking-[0.4em] text-cosmos-accent">
        404 · spacelike separated
      </p>
      <h1 className="mt-4 text-5xl font-semibold tracking-tight text-white">
        这条路径不在你的光锥内
      </h1>
      <p className="mt-4 max-w-md text-white/60">
        所请求的页面无法到达 —— 也许它从未被发出过。回到首页，重新选择一条世界线。
      </p>
      <Link
        href="/"
        className="mt-6 rounded-full border border-white/20 px-5 py-2.5 text-sm text-white/90 transition hover:border-white/40 hover:bg-white/5"
      >
        返回首页
      </Link>
    </div>
  );
}
