# Project Context

## 概述

- **项目名称**：Regex520's Blog（基于 [Fuwari](https://github.com/saicaca/fuwari) 模板）
- **站点**：`https://masno.top`
- **框架**：Astro 5.x + Svelte 5（混合模式：.astro 静态组件 + .svelte 交互组件）
- **部署**：Cloudflare Workers（`@astrojs/cloudflare` adapter）
- **包管理器**：pnpm（`preinstall` 钩子强制，禁止使用 npm/yarn）

## 目录结构约定

```
src/
├── assets/images/      # 经 Astro 处理的图片资源
├── components/         # 组件
│   ├── control/        # UI 控件：BackToTop, ButtonLink, ButtonTag, Pagination
│   ├── misc/           # 内容渲染：ImageWrapper, License, Markdown, Twikoo
│   └── widget/         # 侧边栏/面板组件
├── config.ts           # 核心博客配置（站点信息、导航栏、个人资料、许可协议等）
├── constants/          # 应用常量
│   ├── constants.ts    # 分页大小、主题模式、Banner 高度等
│   ├── icon.ts         # 默认 favicon 配置
│   └── link-presets.ts # 导航链接预设（首页/归档/关于/友链）
├── content/
│   ├── config.ts       # Astro 内容集合 Zod Schema
│   ├── posts/          # 博客文章（Markdown + frontmatter）
│   └── spec/           # 特殊页面内容（about.md）
├── data/               # 数据文件（YAML）
│   └── friends.yml     # 友链列表
├── i18n/               # 国际化（10 种语言）
│   ├── i18nKey.ts
│   ├── translation.ts
│   └── languages/      # 各语言翻译文件
├── layouts/            # 页面布局
├── pages/              # 路由页面（Astro 必须目录）
├── plugins/            # remark/rehype 插件 + Expressive Code 插件
├── styles/             # 样式（CSS + Stylus）
├── types/              # TypeScript 类型定义
├── utils/              # 工具函数
├── env.d.ts            # 环境类型声明
└── global.d.ts         # 全局类型声明（Swup、Pagefind）
```

## TypeScript 路径别名

```json
{
  "@components/*": "src/components/*",
  "@assets/*":     "src/assets/*",
  "@constants/*":  "src/constants/*",
  "@utils/*":      "src/utils/*",
  "@i18n/*":       "src/i18n/*",
  "@layouts/*":    "src/layouts/*",
  "@/*":           "src/*"
}
```

## 技术栈核心

| 功能 | 技术 |
|------|------|
| 样式 | Tailwind CSS 3 + Stylus（Material Design 3 色彩体系） |
| 代码高亮 | Expressive Code（可折叠、行号、语言徽章、自定义复制按钮） |
| 搜索 | Pagefind（构建时生成静态索引） |
| 页面过渡 | Swup（SPA 风格导航、预加载、缓存） |
| 图片灯箱 | PhotoSwipe 5 |
| 滚动条 | OverlayScrollbars（自定义滚动条） |
| 评论 | Twikoo（serverless 评论系统） |
| 数学公式 | KaTeX（remark-math + rehype-katex） |
| 图标 | astro-icon + Iconify（Material Symbols、Font Awesome 6、Remix Icons） |
| Markdown 扩展 | 自定义 admonitions（note/tip/important/caution/warning）、GitHub 仓库卡片 |
| 主题 | Material You 动态取色（从 Banner 图片提取色板） |

## 内容文章 Frontmatter

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

## 代码规范

- **格式化/检查**：Biome（tab 缩进、双引号、组织 imports）
- **扩展名**：TypeScript `.ts`、Astro `.astro`、Svelte `.svelte`
- **导入路径**：优先使用路径别名（`@components/`、`@utils/` 等），避免深层相对路径
- **提交前检查**：`pnpm run lint` 确保通过
- **文件命名**：组件 PascalCase（如 `PostCard.astro`），工具函数 kebab-case（如 `content-utils.ts`）

## 常用命令

```bash
pnpm run dev          # 开发服务器
pnpm run build        # 构建 + Pagefind 索引生成
pnpm run preview      # 构建后本地预览（wrangler）
pnpm run check        # astro check（类型 + 模板检查）
pnpm run lint         # Biome 检查 + 自动修复
pnpm run format       # Biome 格式化
pnpm run new-post     # 创建新文章模板
pnpm run deploy       # 构建并部署到 Cloudflare
```

## 架构注意事项

1. **src/config.ts** 被 `astro.config.mjs` 直接引用，修改配置类型需同步更新 `src/types/config.ts`
2. **双主题系统**：light/dark/auto 通过 `localStorage('theme')` 存储，`<html class="dark">` 切换
3. **动态主题色**：`localStorage('hue')` 存储色相值，首次访问从 Banner 图片提取（`src/utils/monet-extract.ts`）
4. **Swup** 与 Astro View Transitions 不兼容，本项使用 Swup 处理页面过渡
5. **内容集合**使用 Astro v5 旧版 API（`src/content/config.ts`），未升级到 `src/content.config.ts`
6. **图片路径**：`src/assets/` 下图片经 Astro 处理，`public/` 下直接复制不处理

## 帖文发布流程

1. `pnpm run new-post -- <filename>` 在 `src/content/posts/` 创建模板
2. 编辑 frontmatter，`draft: false` 才会在生产环境显示
3. `pnpm run build` 构建，`pnpm run deploy` 发布
