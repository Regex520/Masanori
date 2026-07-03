# 🍥 Masanori  
![Node.js >= 20](https://img.shields.io/badge/node.js-%3E%3D20-brightgreen) 
![pnpm >= 9](https://img.shields.io/badge/pnpm-%3E%3D9-blue) 

基于 [Fuwari](https://github.com/saicaca/fuwari) 模板的博客框架，使用 [Astro](https://astro.build) + [Svelte](https://svelte.dev) + [Tailwind CSS](https://tailwindcss.com) 构建。

**由 [Fuwari](https://github.com/saicaca/fuwari) 修改**

---

## ✨ 特性

- [x] 基于 [Astro 5](https://astro.build) + [Svelte 5](https://svelte.dev) 混合模式
- [x] [Tailwind CSS 3](https://tailwindcss.com) + [Stylus](https://stylus-lang.com/) (Material Design 3 色彩体系)
- [x] 平滑动画与页面过渡 ([Swup](https://swup.js.org/))
- [x] 浅色/深色/自动主题模式
- [x] Material You 动态取色
- [x] 响应式设计
- [x] 搜索功能 ([Pagefind](https://pagefind.app/))
- [x] Markdown 扩展功能 (Admonitions、GitHub 仓库卡片、数学公式 KaTeX)
- [x] 代码高亮 ([Expressive Code](https://expressive-code.com/))
- [x] 图片灯箱 ([PhotoSwipe 5](https://photoswipe.com/))
- [x] 自定义滚动条 ([OverlayScrollbars](https://github.com/KingSora/OverlayScrollbars))
- [x] 评论系统 ([Twikoo](https://twikoo.js.org/))
- [x] 目录、RSS 订阅、站点地图
- [x] 国际化支持 (10 种语言)

## 🚀 快速开始

### 1. 克隆仓库
```bash
git clone https://github.com/Regex520/masanori.git
cd masanori
```

### 2. 安装依赖
```bash
pnpm install
```

### 3. 配置博客
```bash
cp src/config.example.ts src/config.ts
```

编辑 `src/config.ts`，修改标记为 `[CONFIG]` 的配置项。

### 4. 启动开发服务器
```bash
pnpm run dev
```

### 5. 创建文章
```bash
pnpm run new-post
```

---

## ⚙️ 配置说明

### 站点配置 (`siteConfig`)

| 配置项 | 说明 |
|:-------|:-----|
| `title` | 博客标题 |
| `subtitle` | 博客副标题 |
| `lang` | 站点语言 (`zh_CN`, `en`, `ja` 等) |
| `themeColor.hue` | 主题色调 (0-360) |
| `banner.src` | Banner 图片路径 |
| `toc.enable` | 是否显示目录 |

### 个人资料配置 (`profileConfig`)

```typescript
export const profileConfig: ProfileConfig = {
  avatar: "assets/images/avatar.png",
  name: "Your Name",
  bio: "Your bio",
  links: [
    {
      name: "GitHub",
      icon: "mdi:github",
      url: "https://github.com/your-username",
    },
  ],
};
```

图标代码请参考 [Iconify](https://icones.js.org/)。

---

## 💬 Twikoo 部署指南

1. 访问 [Twikoo 官网](https://twikoo.js.org/) 部署评论系统
2. 选择部署方式：[Vercel](https://twikoo.js.org/vercel) | [Netlify](https://twikoo.js.org/netlify) | [Cloudflare Workers](https://twikoo.js.org/cloudflare-workers)
3. 获取环境 ID (envId)
4. 编辑 `src/config.ts`：
```typescript
export const twikooConfig: TwikooConfig = {
  enable: true,
  envId: "your-env-id",
  lang: "zh-CN",
};
```

---

## ⚡ 常用命令

| 命令 | 作用 |
|:---------------------------|:----------------------------------------------------|
| `pnpm install`             | 安装依赖 |
| `pnpm run dev`             | 启动开发服务器 |
| `pnpm run build`           | 构建生产站点 |
| `pnpm run preview`         | 本地预览构建结果 |
| `pnpm run check`           | 类型检查 |
| `pnpm run lint`            | Biome 检查 |
| `pnpm run format`          | Biome 格式化 |
| `pnpm run new-post`        | 创建新文章 |
| `pnpm run deploy`          | 部署到 Cloudflare Workers |

---

## 📄 许可证

基于 [MIT License](LICENSE) 许可。

原模板 [Fuwari](https://github.com/saicaca/fuwari) 由 [saicaca](https://github.com/saicaca) 创建。
