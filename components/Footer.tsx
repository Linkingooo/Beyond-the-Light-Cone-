export default function Footer() {
  return (
    <footer className="border-t border-white/5 py-10 text-sm text-white/50">
      <div className="container-page flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
        <div>
          <p className="font-mono text-xs uppercase tracking-[0.3em] text-white/40">
            ds² = −c²dt² + dx² + dy² + dz²
          </p>
          <p className="mt-2">
            © {new Date().getFullYear()} Beyond the Light Cone · 探索时空的尽头
          </p>
        </div>
        <div className="flex items-center gap-4 text-xs text-white/50">
          <span className="chip">v0.1 · physics</span>
          <span>Built with Next.js · Deployed on Vercel</span>
        </div>
      </div>
    </footer>
  );
}
