# Masanori 开源计划

## 概述

将私有博客项目清理并开源为 **masanori** 仓库，保留核心功能代码，移除所有个人化内容。

**原模板**：[Fuwari](https://github.com/saicaca/fuwari) (MIT License)

---

## 一、需要清理的内容清单

### 1.1 个人文章
**位置**：`src/content/posts/`

保留 `Temples/` 目录（模板示例），删除以下文件：
- `EUICC.md`
- `opencode.md`
- `nfc-copy/` 目录

### 1.2 个人页面
**位置**：`src/content/spec/`

删除：
- `about.md`

### 1.3 个人数据
**位置**：`src/data/`

清空 `friends.yml` 为：
```yaml
friends: []
```

### 1.4 个人图片资源
**位置**：`src/assets/images/`

删除：
- `avatar.jpg`
- `thumb-1920-1311951.jpg`

保留：
- `demo-banner.png`
- `demo-avatar.png`

### 1.5 个人 Favicon
**位置**：`public/favicon/`

删除：
- `icon.png`

### 1.6 Google Analytics 代码
**位置**：`src/layouts/Layout.astro`

移除第 116-121 行的 GA 脚本：
```html
<script is:inline async src="https://www.googletagmanager.com/gtag/js?id=G-NH9V6MQB5C"></script>
<script is:inline>
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', 'G-NH9V6MQB5C');
</script>
```

### 1.7 个人配置
**位置**：`src/config.ts` - 替换为通用模板（见第四节）

---

## 二、恢复当前更改的命令

```bash
git restore .gitignore
git restore README.md
del OPEN_SOURCE_PLAN.md
del src\config.example.ts
```

---

## 三、执行步骤

### 步骤 1：创建新分支
```bash
git checkout -b open-source-prep
```

### 步骤 2：删除个人文章
```bash
del src\content\posts\EUICC.md
del src\content\posts\opencode.md
rmdir /s /q src\content\posts\nfc-copy
```

### 步骤 3：删除个人页面
```bash
del src\content\spec\about.md
```

### 步骤 4：清空友链数据
```bash
echo friends: [] > src\data\friends.yml
```

### 步骤 5：删除个人图片
```bash
del src\assets\images\avatar.jpg
del src\assets\images\thumb-1920-1311951.jpg
del public\favicon\icon.png
```

### 步骤 6：移除 Google Analytics
编辑 `src/layouts/Layout.astro`，删除第 116-121 行。

### 步骤 7：创建配置文件模板
复制 `src/config.ts` 为 `src/config.example.ts`，替换为通用配置。

### 步骤 8：更新 .gitignore
添加：
```gitignore
src/config.ts
.env.local
pnpm-lock.yaml
.vscode/
*.swp
*.swo
Thumbs.db
```

### 步骤 9：更新 README.md
替换为开源版本 README（见第五节）。

### 步骤 10：提交并推送
```bash
git add .
git commit -m "chore: prepare for open source release"
git push origin open-source-prep
```

---

## 四、config.example.ts 模板

```typescript
import type {
	ExpressiveCodeConfig,
	LicenseConfig,
	NavBarConfig,
	ProfileConfig,
	SiteConfig,
	TwikooConfig,
} from "./types/config";
import { LinkPreset } from "./types/config";

export const siteConfig: SiteConfig = {
	title: "Your Blog Name",  // [CONFIG] 修改为你的博客标题
	subtitle: "Your subtitle",  // [CONFIG] 修改为你的副标题
	lang: "zh_CN",  // 语言代码，如 'en', 'zh_CN', 'ja', 'ko' 等
	themeColor: {
		hue: 250,  // [CONFIG] 主题色调 (0-360)
		fixed: false,
	},
	banner: {
		enable: true,
		src: "assets/images/demo-banner.png",  // 使用演示图片
		position: "center",
		credit: {
			enable: false,
			text: "",
			url: "",
		},
	},
	toc: {
		enable: true,
		depth: 2,
	},
	favicon: [
		{
			src: "/favicon/icon.png",  // [CONFIG] 将你的 favicon 放到 /public/favicon/ 目录
		},
	],
};

export const navBarConfig: NavBarConfig = {
	links: [
		LinkPreset.Home,
		LinkPreset.Archive,
		LinkPreset.About,
		// [CONFIG] 添加你的导航链接
	],
};

export const profileConfig: ProfileConfig = {
	avatar: "assets/images/demo-avatar.png",
	name: "Your Name",  // [CONFIG] 你的名字
	bio: "Your bio",  // [CONFIG] 你的简介
	links: [
		// [CONFIG] 添加你的社交链接
	],
};

export const licenseConfig: LicenseConfig = {
	enable: true,
	name: "CC BY-NC-SA 4.0",
	url: "https://creativecommons.org/licenses/by-nc-sa/4.0/",
};

export const expressiveCodeConfig: ExpressiveCodeConfig = {
	theme: "github-dark",
};

export const twikooConfig: TwikooConfig = {
	enable: false,  // [CONFIG] 设为 true 并填入 envId 启用评论
	envId: "",  // [CONFIG] 填入你的 Twikoo 环境 ID
	lang: "zh-CN",
};
```

---

## 五、README.md 内容

```markdown
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
git clone https://github.com/your-username/masanori.git
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

## 🚢 部署

### Cloudflare Workers
修改 `astro.config.mjs` 中的 `site`，运行 `pnpm run deploy`

### Vercel / Netlify
修改 adapter 为 `@astrojs/vercel` 或 `@astrojs/netlify`，参考 [Astro 部署文档](https://docs.astro.build/en/guides/deploy/)

---

## 📄 许可证

基于 [MIT License](LICENSE) 许可。

原模板 [Fuwari](https://github.com/saicaca/fuwari) 由 [saicaca](https://github.com/saicaca) 创建。
```

---

## 六、验证清单

- [ ] 所有个人文章已删除（Temples 目录保留）
- [ ] 个人关于页面已删除
- [ ] 友链数据已清空
- [ ] 个人头像和 banner 已删除
- [ ] Favicon 已删除
- [ ] Google Analytics 代码已移除
- [ ] config.ts 已替换为通用模板
- [ ] config.example.ts 已创建
- [ ] README.md 已更新
- [ ] .gitignore 已配置
- [ ] 项目可正常构建运行

---

## 七、构建验证

```bash
pnpm install
cp src/config.example.ts src/config.ts
pnpm run dev
pnpm run build
pnpm run check
```
