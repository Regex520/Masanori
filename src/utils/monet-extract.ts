import {
	argbFromRgb,
	Hct,
	QuantizerCelebi,
	Score,
} from "@material/material-color-utilities";
import { applyM3Theme } from "./material-you";

export async function extractMonetFromImage(
	imgSrc: string,
	defaultHue: number,
): Promise<void> {
	try {
		const bannerImg = document.querySelector<HTMLImageElement>(
			"#banner img, #banner-wrapper img",
		);

		// Strategy 1: use the DOM banner image, waiting if necessary
		if (bannerImg) {
			const hue = await getHueFromDOMImage(bannerImg);
			if (hue !== null) {
				applyM3Theme(Math.round(hue));
				return;
			}
		}

		// Strategy 2: load the image manually using the DOM image's actual src
		const manualSrc =
			bannerImg?.currentSrc && bannerImg.currentSrc !== ""
				? bannerImg.currentSrc
				: imgSrc;
		const hue = await getHueFromUrl(manualSrc);
		if (hue !== null) {
			applyM3Theme(Math.round(hue));
			return;
		}
	} catch (err) {
		console.warn("[Monet] extraction error, falling back to default hue:", err);
	}
	console.warn(
		"[Monet] could not extract hue from banner, using default:",
		defaultHue,
	);
	applyM3Theme(defaultHue);
}

async function getHueFromDOMImage(
	img: HTMLImageElement,
): Promise<number | null> {
	if (img.complete && img.naturalWidth > 0) {
		return getHueFromImageElement(img);
	}

	// Wait up to 3s for the image to finish loading
	const hue = await new Promise<number | null>((resolve) => {
		const timeout = setTimeout(() => resolve(null), 3000);
		const onDone = (result: number | null) => {
			clearTimeout(timeout);
			img.removeEventListener("load", onLoad);
			img.removeEventListener("error", onError);
			resolve(result);
		};
		const onLoad = () => onDone(getHueFromImageElement(img));
		const onError = () => onDone(null);
		img.addEventListener("load", onLoad);
		img.addEventListener("error", onError);
	});

	return hue;
}

function getHueFromImageElement(img: HTMLImageElement): number | null {
	const pixels = getPixelsFromImage(img, 112);
	if (!pixels || pixels.length === 0) return null;
	return hueFromPixels(pixels);
}

async function getHueFromUrl(src: string): Promise<number | null> {
	const img = await loadImage(src);
	if (!img) return null;
	return getHueFromImageElement(img);
}

function hueFromPixels(pixels: Uint8ClampedArray): number | null {
	const pixelInts: number[] = [];
	for (let i = 0; i < pixels.length; i += 4) {
		const r = pixels[i];
		const g = pixels[i + 1];
		const b = pixels[i + 2];
		pixelInts.push(argbFromRgb(r, g, b));
	}

	const result = QuantizerCelebi.quantize(pixelInts, 128);
	const scored = Score.score(result, { desired: 4 });

	if (scored.length === 0) return null;

	const topColor = scored[0];
	const hct = Hct.fromInt(topColor);
	return hct.hue;
}

function loadImage(src: string): Promise<HTMLImageElement | null> {
	return new Promise((resolve) => {
		const img = new Image();
		const isSameOrigin =
			typeof URL === "function" &&
			new URL(src, window.location.origin).origin === window.location.origin;
		if (!isSameOrigin) {
			img.crossOrigin = "anonymous";
		}
		const timer = setTimeout(() => resolve(null), 5000);
		img.onload = () => {
			clearTimeout(timer);
			resolve(img);
		};
		img.onerror = () => {
			clearTimeout(timer);
			resolve(null);
		};
		img.src = src;
	});
}

function getPixelsFromImage(
	img: HTMLImageElement,
	maxSize: number,
): Uint8ClampedArray | null {
	const scale = Math.min(
		1,
		maxSize / Math.max(img.naturalWidth, img.naturalHeight),
	);
	const w = Math.round(img.naturalWidth * scale);
	const h = Math.round(img.naturalHeight * scale);

	const canvas = document.createElement("canvas");
	canvas.width = w;
	canvas.height = h;
	const ctx = canvas.getContext("2d", { willReadFrequently: true });
	if (!ctx) return null;

	try {
		ctx.drawImage(img, 0, 0, w, h);
		return ctx.getImageData(0, 0, w, h).data;
	} catch (err) {
		console.warn(
			"[Monet] canvas pixel read failed (likely CORS-tainted):",
			err,
		);
		return null;
	}
}
