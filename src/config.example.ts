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
		// 留空则使用默认 favicon，或在此添加你的 favicon
		// {
		// 	src: "/favicon/icon.png",  // 将你的 favicon 放到 /public/favicon/ 目录
		// },
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
	avatar: "assets/images/demo-avatar.png",  // 使用演示头像
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
