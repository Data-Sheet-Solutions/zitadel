"use client";

import { APPEARANCE_STYLES, getComponentRoundness, getThemeConfig } from "@/lib/theme";
import { clsx } from "clsx";
import Link from "next/link";
import { ReactNode } from "react";
import { useRouter } from "next/navigation";
import { Button, ButtonColors, ButtonSizes, ButtonVariants, getButtonClasses } from "./button";
import { Translated } from "./translated";

type BackButtonProps = {
  href?: string;
  label?: ReactNode;
  className?: string;
  ["data-testid"]?: string;
};

export function BackButton({ href, label, className, ...props }: BackButtonProps) {
  const router = useRouter();

  const content = label ?? <Translated i18nKey="back" namespace="common" />;

  if (href) {
    const themeConfig = getThemeConfig();
    const appearance = APPEARANCE_STYLES[themeConfig.appearance];
    const roundness = getComponentRoundness("button");
    const linkClasses = getButtonClasses(
      ButtonSizes.Small,
      ButtonVariants.Secondary,
      ButtonColors.Primary,
      roundness,
      appearance?.button || "border border-button-light-border dark:border-button-dark-border",
    );

    return (
      <Link className={clsx(linkClasses, className)} href={href} {...props}>
        {content}
      </Link>
    );
  }

  return (
    <Button onClick={() => router.back()} type="button" variant={ButtonVariants.Secondary} className={className} {...props}>
      {content}
    </Button>
  );
}
