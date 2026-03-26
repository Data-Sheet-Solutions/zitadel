import "@/styles/globals.scss";

import { BackgroundWrapper } from "@/components/background-wrapper";
import { LanguageProvider } from "@/components/language-provider";
import { Skeleton } from "@/components/skeleton";
import { ThemeProvider } from "@/components/theme-provider";
import * as Tooltip from "@radix-ui/react-tooltip";
import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { Lato } from "next/font/google";
import React, { Suspense } from "react";

const lato = Lato({
  weight: ["400", "700", "900"],
  subsets: ["latin"],
});

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("common");
  return { title: t("title") };
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const configuredBasePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
  const normalizedBasePath = configuredBasePath
    ? `${configuredBasePath.startsWith("/") ? "" : "/"}${configuredBasePath.replace(/\/$/, "")}`
    : "";
  const adminBackgroundImageUrl = `${normalizedBasePath}/admin-back.jpg`;

  const backgroundImageStyle = {
    backgroundImage: `url('${adminBackgroundImageUrl}')`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
  };

  return (
    <html className={`${lato.className}`} suppressHydrationWarning>
      <head />
      <body>
        <ThemeProvider>
          <Tooltip.Provider>
            <Suspense
              fallback={
                <BackgroundWrapper
                  className={`relative flex min-h-screen flex-col justify-center bg-background-light-600 dark:bg-background-dark-600`}
                  style={backgroundImageStyle}
                >
                  <div className="pointer-events-none absolute inset-0 bg-black/25" aria-hidden="true" />
                  <div className="relative z-10 mx-auto w-full max-w-[580px] py-8">
                    <Skeleton>
                      <div className="h-40"></div>
                    </Skeleton>
                  </div>
                </BackgroundWrapper>
              }
            >
              <LanguageProvider>
                <BackgroundWrapper
                  className={`relative flex min-h-screen flex-col justify-center bg-background-light-600 dark:bg-background-dark-600`}
                  style={backgroundImageStyle}
                >
                  <div className="pointer-events-none absolute inset-0 bg-black/25" aria-hidden="true" />
                  <div className="relative z-10 mx-auto w-full max-w-[1100px] py-8">
                    <div>{children}</div>
                  </div>
                </BackgroundWrapper>
              </LanguageProvider>
            </Suspense>
          </Tooltip.Provider>
        </ThemeProvider>
      </body>
    </html>
  );
}
