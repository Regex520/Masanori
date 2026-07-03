# 🍥 Masanori  
![Node.js >= 20](https://img.shields.io/badge/node.js-%3E%3D20-brightgreen) 
![pnpm >= 9](https://img.shields.io/badge/pnpm-%3E%3D9-blue) 

- 基于 [Fuwari](https://github.com/saicaca/fuwari) 模板构建的个人博客，使用 [Astro](https://astro.build) + [Svelte](https://svelte.dev) + [Tailwind CSS](https://tailwindcss.com) 构建。

🌏 **站点**：[https://masno.top](https://masno.top)

---

**由 [Fuwari](https://github.com/saicaca/fuwari) 修改**

---

## ✨ 特性

- [x] 基于 [Astro 5](https://astro.build) + [Svelte 5](https://svelte.dev) 混合模式
- [x] [Tailwind CSS 3](https://tailwindcss.com) + [Stylus](https://stylus-lang.com/) (Material Design 3 色彩体系)
- [x] 平滑动画与页面过渡 ([Swup](https://swup.js.org/))
- [x] 浅色/深色/自动主题模式
- [x] Material You 动态取色 (从 Banner 图片提取色板)
- [x] 响应式设计
- [x] 搜索功能 ([Pagefind](https://pagefind.app/))
- [x] Markdown 扩展功能 (Admonitions、GitHub 仓库卡片、数学公式 KaTeX)
- [x] 代码高亮 ([Expressive Code](https://expressive-code.com/))
- [x] 图片灯箱 ([PhotoSwipe 5](https://photoswipe.com/))
- [x] 自定义滚动条 ([OverlayScrollbars](https://github.com/KingSora/OverlayScrollbars))
- [x] 评论系统 ([Twikoo](https://twikoo.js.org/))
- [x] 目录、RSS 订阅、站点地图
- [x] 国际化支持 (10 种语言)

## 📝 文章 Frontmatter

```yaml
---
title: 文章标题
published: 2024-01-01
updated: 2024-06-01      # 可选
description: 文章摘要
image: 封面图路径
tags: [标签1, 标签2]
category: 分类
draft: false              # true 时生产环境隐藏
lang: zh_CN               # 文章语言
---
```

## ⚡ 常用命令

所有命令均在项目根目录下运行：

| 命令 | 作用 |
|:---------------------------|:----------------------------------------------------|
| `pnpm install`             | 安装依赖 (强制使用 pnpm，禁止 npm/yarn) |
| `pnpm run dev`             | 启动开发服务器 (`localhost:4321`) |
| `pnpm run build`           | 构建生产站点到 `./dist/` 并生成 Pagefind 索引 |
| `pnpm run preview`         | 本地预览构建结果 (使用 Wrangler 模拟 Cloudflare) |
| `pnpm run check`           | 类型检查 + Astro 模板检查 |
| `pnpm run lint`            | Biome 检查 + 自动修复 |
| `pnpm run format`          | Biome 格式化代码 |
| `pnpm run new-post`        | 创建新文章模板 (交互式输入文件名) |
| `pnpm run deploy`          | 构建并部署到 Cloudflare Workers |

详细命令说明请查看 [AGENTS.md](AGENTS.md)。

## 📝 Markdown 扩展语法

本博客支持丰富的 Markdown 扩展语法，详细演示请参考原模板演示：

- [Markdown 扩展语法演示](https://fuwari.vercel.app/posts/markdown-extended-syntax/) (Fuwari 官方演示站)
- [Expressive Code 语法高亮](https://expressive-code.com/key-features/)

主要支持：
- ✅ Admonitions (提示框): `note`、`tip`、`important`、`caution`、`warning`
- ✅ GitHub 仓库卡片
- ✅ 数学公式 (KaTeX)
- ✅ 代码折叠、行号、语言标签、自定义复制按钮

## 🌏 多语言支持

支持 10 种语言：简体中文、繁体中文、英语、日语、韩语、法语、德语、西班牙语、葡萄牙语、俄语。

语言文件位于 `src/i18n/languages/` 目录。

## 🤝 贡献指南

欢迎贡献！请查看 [CONTRIBUTING.md](CONTRIBUTING.md) 了解详情。

主要原则：
- 使用 [Conventional Commits](https://www.conventionalcommits.org/) 格式提交信息
- 提交前请运行 `pnpm check` 和 `pnpm format`
- 重大变更请先开 Issue 或 Discussion

## 🔗 相关链接

- [原模板 Fuwari](https://github.com/saicaca/fuwari) - MIT 许可证
- [Fuwari 演示站](https://fuwari.vercel.app/)
- [Astro 文档](https://docs.astro.build/)
- [Svelte 文档](https://svelte.dev/docs)

## 📄 许可证

基于 [MIT License](LICENSE) 许可。

原模板 [Fuwari](https://github.com/saicaca/fuwari) 由 [saicaca](https://github.com/saicaca) 创建，遵循 MIT 许可证。