import { clsx } from "clsx";
import Image from "next/image";

import styles from "./Avatar.module.css";
import type { AvatarProps } from "./Avatar.types";

const sizeStyles = {
  sm: styles.sizeSm,
  md: styles.sizeMd,
  lg: styles.sizeLg,
};

const sizePixels = {
  sm: 28,
  md: 36,
  lg: 48,
} as const;

const hashString = (value: string) => {
  let hash = 0;
  for (let i = 0; i < value.length; i += 1) {
    hash = value.charCodeAt(i) + ((hash << 5) - hash);
  }
  return hash;
};

const hslToRgb = (h: number, s: number, l: number) => {
  if (s === 0) {
    const gray = Math.round(l * 255);
    return { r: gray, g: gray, b: gray };
  }

  const hue2rgb = (p: number, q: number, t: number) => {
    if (t < 0) t += 1;
    if (t > 1) t -= 1;
    if (t < 1 / 6) return p + (q - p) * 6 * t;
    if (t < 1 / 2) return q;
    if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
    return p;
  };

  const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
  const p = 2 * l - q;
  const r = hue2rgb(p, q, h + 1 / 3);
  const g = hue2rgb(p, q, h);
  const b = hue2rgb(p, q, h - 1 / 3);
  return { r: Math.round(r * 255), g: Math.round(g * 255), b: Math.round(b * 255) };
};

const toHex = (value: number) => value.toString(16).padStart(2, "0");

const getAvatarColors = (seed: string) => {
  const hash = Math.abs(hashString(seed));
  const hue = (hash % 360) / 360;
  const saturation = 0.55;
  const lightness = 0.52;
  const { r, g, b } = hslToRgb(hue, saturation, lightness);
  const background = `#${toHex(r)}${toHex(g)}${toHex(b)}`;
  const luminance = (0.2126 * r + 0.7152 * g + 0.0722 * b) / 255;
  const foreground = luminance > 0.62 ? "#1c1c1c" : "#ffffff";
  return { background, foreground };
};

const getInitials = (name?: string) => {
  if (!name) {
    return "?";
  }
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) {
    return "?";
  }
  const first = parts[0]?.[0] ?? "";
  const last = parts.length > 1 ? (parts[parts.length - 1]?.[0] ?? "") : "";
  return `${first}${last}`.toUpperCase();
};

/**
 * Avatar component for displaying user profile images or initials.
 */
export const Avatar = ({
  imageURL,
  name,
  ariaLabel,
  size = "md",
  onClick,
  className,
}: AvatarProps) => {
  const label = ariaLabel ?? name ?? "User avatar";
  const initials = getInitials(name);
  const dimension = sizePixels[size];
  const fallbackColors = imageURL ? undefined : getAvatarColors(label);
  const fallbackStyle = fallbackColors
    ? { backgroundColor: fallbackColors.background, color: fallbackColors.foreground }
    : undefined;

  if (onClick) {
    return (
      <button
        type="button"
        onClick={onClick}
        aria-label={label}
        className={clsx(
          styles.avatar,
          sizeStyles[size],
          styles.interactive,
          className
        )}
        style={fallbackStyle}
      >
        {imageURL ? (
          <Image
            className={styles.image}
            src={imageURL}
            alt={label}
            width={dimension}
            height={dimension}
            sizes={`${dimension}px`}
          />
        ) : (
          <span className={styles.fallback} aria-hidden="true">
            {initials}
          </span>
        )}
      </button>
    );
  }

  return (
    <span
      className={clsx(styles.avatar, sizeStyles[size], className)}
      role={imageURL ? undefined : "img"}
      aria-label={!imageURL ? label : undefined}
      style={fallbackStyle}
    >
      {imageURL ? (
        <Image
          className={styles.image}
          src={imageURL}
          alt={label}
          width={dimension}
          height={dimension}
          sizes={`${dimension}px`}
        />
      ) : (
        <span className={styles.fallback} aria-hidden="true">
          {initials}
        </span>
      )}
    </span>
  );
};
