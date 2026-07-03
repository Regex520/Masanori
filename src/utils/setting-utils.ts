import {
	AUTO_MODE,
	DARK_MODE,
	DEFAULT_THEME,
	LIGHT_MODE,
} from "@constants/constants.ts";
import { expressiveCodeConfig } from "@/config";
import type { LIGHT_DARK_MODE } from "@/types/config";

export function getDefaultHue(): number {
	const fallback = "250";
	const configCarrier = document.getElementById("config-carrier");
	return Number.parseInt(configCarrier?.dataset.hue || fallback, 10);
}

function getBannerSrc(): string {
	const configCarrier = document.getElementById("config-carrier");
	return configCarrier?.dataset.banner || "";
}

export function getHue(): number {
	const stored = localStorage.getItem("hue");
	return stored ? Number.parseInt(stored, 10) : getDefaultHue();
}

export function setHue(hue: number): void {
	localStorage.setItem("hue", String(hue));
	const st = document.documentElement.style;
	st.setProperty("--hue", String(hue));
	import("./material-you")
		.then(({ applyM3Theme }) => {
			applyM3Theme(hue);
		})
		.catch((err) => {
			console.warn(
				"[Color] failed to load material-you module, using static defaults:",
				err,
			);
		});
}

export async function initMonetTheme(): Promise<void> {
	const storedHue = localStorage.getItem("hue");
	if (storedHue) {
		console.log(
			"[Color] hue already stored:",
			storedHue,
			"- skipping Monet extraction",
		);
		return;
	}

	console.log("[Color] no stored hue, attempting Monet extraction...");
	const defaultHue = getDefaultHue();
	const bannerSrc = getBannerSrc();

	if (bannerSrc) {
		const { extractMonetFromImage } = await import("./monet-extract");

		// Resolve relative URLs using the current origin
		const resolvedUrl = bannerSrc.startsWith("http")
			? bannerSrc
			: new URL(bannerSrc, window.location.origin).href;

		try {
			await extractMonetFromImage(resolvedUrl, defaultHue);
			return;
		} catch {
			// fall through
		}
	}

	setHue(defaultHue);
}

// Used for post-load theme changes. Keep in sync with Layout.astro inline <script> (anti-FOUC).
export function applyThemeToDocument(theme: LIGHT_DARK_MODE) {
	switch (theme) {
		case LIGHT_MODE:
			document.documentElement.classList.remove("dark");
			break;
		case DARK_MODE:
			document.documentElement.classList.add("dark");
			break;
		case AUTO_MODE:
			if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
				document.documentElement.classList.add("dark");
			} else {
				document.documentElement.classList.remove("dark");
			}
			break;
	}

	document.documentElement.setAttribute(
		"data-theme",
		expressiveCodeConfig.theme,
	);
}

export function setTheme(theme: LIGHT_DARK_MODE): void {
	localStorage.setItem("theme", theme);
	applyThemeToDocument(theme);
}

export function getStoredTheme(): LIGHT_DARK_MODE {
	return (localStorage.getItem("theme") as LIGHT_DARK_MODE) || DEFAULT_THEME;
}
