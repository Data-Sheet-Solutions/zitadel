"use client";

import { useThemeConfig } from "@/lib/theme-hooks";
import { CSSProperties, ReactNode } from "react";

/**
 * BackgroundWrapper component handles applying background images from theme configuration.
 * This needs to be a client component to access environment variables via the theme hook.
 */
export function BackgroundWrapper({
  children,
  className = "",
  style,
}: {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
}) {
  const themeConfig = useThemeConfig();

  const backgroundStyle = themeConfig.backgroundImage
    ? {
        backgroundImage: `url(${themeConfig.backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }
    : {};

  const mergedStyle = { ...backgroundStyle, ...style };

  return (
    <div className={className} style={mergedStyle}>
      {children}
    </div>
  );
}
