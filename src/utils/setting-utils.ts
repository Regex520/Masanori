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

export function getHue(): number {
	const stored = localStorage.getItem("hue");
	return stored ? Number.parseInt(stored, 10) : getDefaultHue();
}

export function setHue(hue: number): void {
	localStorage.setItem("hue", String(hue));
	import("./material-you").then(({ applyM3Theme }) => {
		applyM3Theme(hue);
	});
}

export async function initMonetTheme(): Promise<void> {
	// Only run Monet extraction on first visit (no stored hue yet)
	if (localStorage.getItem("hue")) {
		return;
	}

	const defaultHue = getDefaultHue();

	const configCarrier = document.getElementById("config-carrier");
	const bannerSrc = configCarrier?.dataset.banner || "";

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
