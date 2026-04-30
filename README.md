# Beyond the Light Cone · 光锥之外

一个关于 **量子力学** 与 **相对论** 的现代物理学科普网站。

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new)

## 技术栈

- **Next.js 14**（App Router）
- **TypeScript**
- **Tailwind CSS**
- 部署：**Vercel**

## 目录结构

```
.
├── app/
│   ├── layout.tsx        # 根布局（导航、星空背景、页脚）
│   ├── page.tsx          # 首页
│   ├── globals.css       # 全局样式 + Tailwind
│   ├── quantum/page.tsx  # 量子力学
│   ├── relativity/page.tsx # 相对论（含时间膨胀计算器）
│   ├── about/page.tsx    # 关于
│   └── not-found.tsx     # 404
├── components/
│   ├── Navbar.tsx
│   ├── Footer.tsx
│   ├── StarField.tsx     # 星空动效背景
│   ├── TopicCard.tsx
│   ├── SectionHeader.tsx
│   ├── ConceptList.tsx
│   └── TimeDilation.tsx  # 互动：洛伦兹因子计算
├── tailwind.config.ts
├── next.config.mjs
└── tsconfig.json
```

## 本地开发

```bash
# 安装依赖
npm install

# 启动开发服务器
npm run dev
# 打开 http://localhost:3000
```

其它脚本：

```bash
npm run build   # 生产构建
npm run start   # 启动生产服务器
npm run lint    # 代码检查
```

## 部署到 Vercel

最简单的方式：

1. 把这个仓库推送到 GitHub。
2. 登录 [vercel.com](https://vercel.com)，点击 **Add New → Project**。
3. 选择本仓库，Vercel 会自动识别 Next.js 项目，所有默认配置即可使用：
   - **Framework Preset**：Next.js
   - **Build Command**：`next build`
   - **Output**：自动
4. 点击 **Deploy**。几十秒后即可获得线上 URL。

每次 `git push` 到主分支，Vercel 会自动重新部署；PR 会得到独立的预览环境。

也可以使用 Vercel CLI：

```bash
npm i -g vercel
vercel        # 第一次会引导你登录与连接项目
vercel --prod # 部署到生产
```

## 内容定位

- 面向有好奇心、希望系统了解现代物理但暂时不想啃完整教材的读者。
- 每一条概念尽量给出：直觉解释 + 关键方程 + 一个可记住的实验或场景。
- 不构成学术参考；如发现错误或希望补充，欢迎提交 issue / PR。

## License

MIT
