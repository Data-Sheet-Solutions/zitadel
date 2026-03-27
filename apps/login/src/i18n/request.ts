import { getServiceConfig } from "@/lib/service-url";
import { getHostedLoginTranslation } from "@/lib/zitadel";
import { JsonObject } from "@zitadel/client";
import deepmerge from "deepmerge";
import { getRequestConfig } from "next-intl/server";
import { headers } from "next/headers";

/** Fixed description copy for the loginname step in the hosted login flow. */
const HARDCODED_LOGINNAME_DESCRIPTION = "Login to your Administrative Dashboard";
/** Fixed field label copy for the loginname input in the hosted login flow. */
const HARDCODED_LOGINNAME_LABEL = "Email Address";

/**
 * Resolves login-app i18n messages and enforces fixed copy for the loginname step.
 *
 * @returns Request config containing locale and merged translation messages.
 */
export default getRequestConfig(async () => {
  const locale = "en";

  const _headers = await headers();
  const { serviceConfig } = getServiceConfig(_headers);

  const fallback = "en";

  const i18nOrganization = _headers.get("x-zitadel-i18n-organization") || ""; // You may need to set this header in middleware

  let translations: JsonObject | Record<string, never> = {};
  try {
    const i18nJSON = await getHostedLoginTranslation({
      serviceConfig,
      locale,
      organization: i18nOrganization,
    });

    if (i18nJSON) {
      translations = i18nJSON;
    }
  } catch (error) {
    console.warn("Error fetching custom translations:", error);
  }

  const customMessages = translations;

  // Load locale messages, fall back to default language messages if locale not found
  let localeMessages;
  try {
    localeMessages = (await import(`../../locales/${locale}.json`)).default;
  } catch {
    localeMessages = (await import(`../../locales/${fallback}.json`)).default;
  }

  const fallbackMessages = (await import(`../../locales/${fallback}.json`)).default;
  const mergedMessages = deepmerge.all([fallbackMessages, localeMessages, customMessages]) as Record<string, any>;

  return {
    locale,
    messages: deepmerge.all([
      mergedMessages,
      {
        loginname: {
          description: HARDCODED_LOGINNAME_DESCRIPTION,
          labels: {
            loginname: HARDCODED_LOGINNAME_LABEL,
          },
        },
      },
    ]) as Record<string, string>,
  };
});
