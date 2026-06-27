import {
  DynamicScheme,
  Hct,
  MaterialDynamicColors,
  Variant,
} from "@material/material-color-utilities";
import { hexFromArgb } from "@material/material-color-utilities";

const COLOR_KEYS = [
  "background",
  "on_background",
  "surface",
  "surface_dim",
  "surface_bright",
  "surface_container_lowest",
  "surface_container_low",
  "surface_container",
  "surface_container_high",
  "surface_container_highest",
  "on_surface",
  "surface_variant",
  "on_surface_variant",
  "inverse_surface",
  "inverse_on_surface",
  "outline",
  "outline_variant",
  "shadow",
  "scrim",
  "surface_tint",
  "primary",
  "primary_dim",
  "on_primary",
  "primary_container",
  "on_primary_container",
  "primary_fixed",
  "primary_fixed_dim",
  "on_primary_fixed",
  "on_primary_fixed_variant",
  "inverse_primary",
  "secondary",
  "secondary_dim",
  "on_secondary",
  "secondary_container",
  "on_secondary_container",
  "secondary_fixed",
  "secondary_fixed_dim",
  "on_secondary_fixed",
  "on_secondary_fixed_variant",
  "tertiary",
  "tertiary_dim",
  "on_tertiary",
  "tertiary_container",
  "on_tertiary_container",
  "tertiary_fixed",
  "tertiary_fixed_dim",
  "on_tertiary_fixed",
  "on_tertiary_fixed_variant",
  "error",
  "error_dim",
  "on_error",
  "error_container",
  "on_error_container",
] as const;

function snakeToCamel(key: string): string {
  return key.replace(/_([a-z])/g, (_, c) => c.toUpperCase());
}

function resolveColor(
  scheme: DynamicScheme,
  snakeKey: string,
): string | null {
  const camelKey = snakeToCamel(snakeKey) as keyof typeof MaterialDynamicColors;
  const fn = MaterialDynamicColors[camelKey];
  if (typeof fn !== "function") return null;
  const dynamicColor = (fn as () => { getArgb: (s: DynamicScheme) => number }).call(
    MaterialDynamicColors,
  );
  if (!dynamicColor || typeof dynamicColor.getArgb !== "function") return null;
  return hexFromArgb(dynamicColor.getArgb(scheme));
}

function buildCSSVars(
  scheme: DynamicScheme,
  prefix: string,
): Record<string, string> {
  const vars: Record<string, string> = {};
  for (const key of COLOR_KEYS) {
    const value = resolveColor(scheme, key);
    if (value) {
      vars[`${prefix}${key.replace(/_/g, "-")}`] = value;
    }
  }
  return vars;
}

type LegacyResolver = (vars: Record<string, string>) => string;

const LEGACY_MAPPINGS_LIGHT: Record<string, LegacyResolver> = {
  "--primary": (v) => v["--md-sys-color-primary"],
  "--page-bg": (v) => v["--md-sys-color-surface"],
  "--card-bg": (v) => v["--md-sys-color-surface-container-lowest"],
  "--btn-content": (v) => v["--md-sys-color-on-secondary-container"],
  "--btn-regular-bg": (v) => v["--md-sys-color-secondary-container"],
  "--btn-regular-bg-hover": (v) => v["--md-sys-color-secondary-container"],
  "--btn-regular-bg-active": (v) => v["--md-sys-color-secondary-container"],
  "--btn-plain-bg-hover": (v) => v["--md-sys-color-surface-container-highest"],
  "--btn-plain-bg-active": (v) => v["--md-sys-color-surface-container-high"],
  "--btn-card-bg-hover": (v) => v["--md-sys-color-surface-container-high"],
  "--btn-card-bg-active": (v) => v["--md-sys-color-surface-container-highest"],
  "--deep-text": (v) => v["--md-sys-color-on-surface"],
  "--title-active": (v) => v["--md-sys-color-primary"],
  "--line-divider": () => "rgba(0,0,0,0.08)",
  "--line-color": () => "rgba(0,0,0,0.1)",
  "--meta-divider": () => "rgba(0,0,0,0.2)",
  "--inline-code-bg": (v) => v["--md-sys-color-secondary-container"],
  "--inline-code-color": (v) => v["--md-sys-color-on-secondary-container"],
  "--selection-bg": (v) => v["--md-sys-color-secondary-container"],
  "--codeblock-selection": (v) => v["--md-sys-color-primary-container"],
  "--codeblock-bg": (v) => v["--md-sys-color-inverse-surface"],
  "--codeblock-topbar-bg": (v) => v["--md-sys-color-surface-dim"],
  "--license-block-bg": (v) => v["--md-sys-color-surface-container-lowest"],
  "--link-underline": (v) => v["--md-sys-color-outline-variant"],
  "--link-hover": (v) => v["--md-sys-color-primary"],
  "--link-active": (v) => v["--md-sys-color-primary"],
  "--float-panel-bg": (v) => v["--md-sys-color-surface-container-high"],
  "--toc-badge-bg": (v) => v["--md-sys-color-secondary-container"],
  "--toc-btn-hover": (v) => v["--md-sys-color-surface-container-high"],
  "--toc-btn-active": (v) => v["--md-sys-color-surface-container-highest"],
  "--toc-item-active": (v) => v["--md-sys-color-primary"],
};

const LEGACY_MAPPINGS_DARK: Record<string, LegacyResolver> = {
  "--primary": (v) => v["--md-sys-color-primary"],
  "--page-bg": (v) => v["--md-sys-color-surface"],
  "--card-bg": (v) => v["--md-sys-color-surface-container-lowest"],
  "--btn-content": (v) => v["--md-sys-color-on-secondary-container"],
  "--btn-regular-bg": (v) => v["--md-sys-color-secondary-container"],
  "--btn-regular-bg-hover": (v) => v["--md-sys-color-secondary-container"],
  "--btn-regular-bg-active": (v) => v["--md-sys-color-secondary-container"],
  "--btn-plain-bg-hover": (v) => v["--md-sys-color-surface-container-highest"],
  "--btn-plain-bg-active": (v) => v["--md-sys-color-surface-container-high"],
  "--btn-card-bg-hover": (v) => v["--md-sys-color-surface-container-high"],
  "--btn-card-bg-active": (v) => v["--md-sys-color-surface-container-highest"],
  "--deep-text": (v) => v["--md-sys-color-on-surface"],
  "--title-active": (v) => v["--md-sys-color-primary"],
  "--line-divider": () => "rgba(255,255,255,0.08)",
  "--line-color": () => "rgba(255,255,255,0.1)",
  "--meta-divider": () => "rgba(255,255,255,0.2)",
  "--inline-code-bg": (v) => v["--md-sys-color-secondary-container"],
  "--inline-code-color": (v) => v["--md-sys-color-on-secondary-container"],
  "--selection-bg": (v) => v["--md-sys-color-secondary-container"],
  "--codeblock-selection": (v) => v["--md-sys-color-primary-container"],
  "--codeblock-bg": (v) => v["--md-sys-color-inverse-surface"],
  "--codeblock-topbar-bg": (v) => v["--md-sys-color-surface-dim"],
  "--license-block-bg": (v) => v["--md-sys-color-surface-container-lowest"],
  "--link-underline": (v) => v["--md-sys-color-outline-variant"],
  "--link-hover": (v) => v["--md-sys-color-primary"],
  "--link-active": (v) => v["--md-sys-color-primary"],
  "--float-panel-bg": (v) => v["--md-sys-color-surface-container-high"],
  "--toc-badge-bg": (v) => v["--md-sys-color-secondary-container"],
  "--toc-btn-hover": (v) => v["--md-sys-color-surface-container-high"],
  "--toc-btn-active": (v) => v["--md-sys-color-surface-container-highest"],
  "--toc-item-active": (v) => v["--md-sys-color-primary"],
};

function parseNumber(value: string, fallback: number): number {
  const n = Number.parseInt(value, 10);
  return Number.isNaN(n) ? fallback : n;
}

export function generateM3Schemes(hue: number): {
  light: DynamicScheme;
  dark: DynamicScheme;
} {
  const hct = Hct.from(hue, 48, 100);
  return {
    light: new DynamicScheme({
      sourceColorHct: hct,
      variant: Variant.TONAL_SPOT,
      isDark: false,
      contrastLevel: 0,
    }),
    dark: new DynamicScheme({
      sourceColorHct: hct,
      variant: Variant.TONAL_SPOT,
      isDark: true,
      contrastLevel: 0,
    }),
  };
}

function generateCSS(
  lightVars: Record<string, string>,
  darkVars: Record<string, string>,
  legacyLight: Record<string, string>,
  legacyDark: Record<string, string>,
): string {
  const formatBlock = (vars: Record<string, string>) =>
    Object.entries(vars)
      .map(([k, v]) => `    ${k}: ${v};`)
      .join("\n");

  return [
    ":root {",
    formatBlock(lightVars),
    formatBlock(legacyLight),
    "  }",
    ":root.dark {",
    formatBlock(darkVars),
    formatBlock(legacyDark),
    "  }",
    "",
  ].join("\n");
}

let styleEl: HTMLStyleElement | null = null;

function ensureStyleElement(): HTMLStyleElement {
  if (!styleEl) {
    styleEl = document.getElementById("m3-theme-style") as HTMLStyleElement;
    if (!styleEl) {
      styleEl = document.createElement("style");
      styleEl.id = "m3-theme-style";
      document.head.appendChild(styleEl);
    }
  }
  return styleEl;
}

function resolveLegacy(
  m3Vars: Record<string, string>,
  mappings: Record<string, LegacyResolver>,
): Record<string, string> {
  const legacy: Record<string, string> = {};
  for (const [legacyKey, resolver] of Object.entries(mappings)) {
    const value = resolver(m3Vars);
    if (value) {
      legacy[legacyKey] = value;
    }
  }
  return legacy;
}

export function applyM3Theme(hue?: number): void {
  const root = document.documentElement;
  const storedHue = localStorage.getItem("hue");
  const configCarrier = document.getElementById("config-carrier");
  const defaultHue = parseNumber(configCarrier?.dataset.hue || "250", 250);
  const currentHue = hue ?? parseNumber(storedHue || "", defaultHue);

  root.style.setProperty("--hue", String(currentHue));
  localStorage.setItem("hue", String(currentHue));

  const schemes = generateM3Schemes(currentHue);
  const lightVars = buildCSSVars(schemes.light, "--md-sys-color-");
  const darkVars = buildCSSVars(schemes.dark, "--md-sys-color-");
  const legacyLight = resolveLegacy(lightVars, LEGACY_MAPPINGS_LIGHT);
  const legacyDark = resolveLegacy(darkVars, LEGACY_MAPPINGS_DARK);

  const el = ensureStyleElement();
  el.textContent = generateCSS(lightVars, darkVars, legacyLight, legacyDark);
}
