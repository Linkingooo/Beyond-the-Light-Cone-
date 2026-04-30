"use client";

import { Component, type ReactNode } from "react";

type Props = { children: ReactNode; label?: string };
type State = { error: Error | null };

export default class WebGLBoundary extends Component<Props, State> {
  state: State = { error: null };

  static getDerivedStateFromError(error: Error): State {
    return { error };
  }

  componentDidCatch(error: Error, info: { componentStack?: string }) {
    if (typeof console !== "undefined") {
      console.error("WebGL component error", error, info);
    }
  }

  render() {
    if (this.state.error) {
      return (
        <div className="glass p-6">
          <p className="font-mono text-xs uppercase tracking-[0.3em] text-cosmos-relativity">
            {this.props.label || "WebGL"} · 渲染异常
          </p>
          <p className="mt-3 text-sm text-white/70">
            可视化在你的设备上初始化失败，下方是错误信息（请截图反馈）：
          </p>
          <pre className="mt-3 max-h-48 overflow-auto rounded-lg bg-black/40 p-3 font-mono text-[11px] leading-snug text-white/70">
            {this.state.error.name}: {this.state.error.message}
            {this.state.error.stack ? "\n\n" + this.state.error.stack : ""}
          </pre>
          <button
            onClick={() => this.setState({ error: null })}
            className="mt-4 rounded-full border border-white/20 px-4 py-2 text-xs text-white/80 transition hover:border-white/40 hover:bg-white/5"
          >
            重试
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}
