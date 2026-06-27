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
    // First try: use the already-loaded banner image from DOM
    const bannerImg = document.querySelector<HTMLImageElement>(
      "#banner img, #banner-wrapper img",
    );
    if (bannerImg?.complete && bannerImg.naturalWidth > 0) {
      const hue = getHueFromImageElement(bannerImg);
      if (hue !== null) {
        applyM3Theme(Math.round(hue));
        return;
      }
    }

    // Second try: load the image manually
    const hue = await getHueFromUrl(imgSrc);
    if (hue !== null) {
      applyM3Theme(Math.round(hue));
      return;
    }
  } catch {
    // fall through
  }
  applyM3Theme(defaultHue);
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
    img.crossOrigin = "anonymous";
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

  ctx.drawImage(img, 0, 0, w, h);
  return ctx.getImageData(0, 0, w, h).data;
}
