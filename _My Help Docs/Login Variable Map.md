# Login Variable Map (ZITADEL Fork)

Last updated: 2026-03-26
Scope: `apps/login` in this fork, plus referenced `proto/zitadel/*` contracts.

## 1) Request/Flow Context Variables

| Variable | Source | Typical meaning | Used now |
|---|---|---|---|
| `organization` | URL query param / OIDC scope / org discovery | Target organization ID (tenant context) | Yes |
| `suffix` | URL query param / discovered from login input | Organization domain suffix (for org discovery) | Yes |
| `requestId` | URL query param | OIDC/SAML auth request context | Yes |
| `loginName` | URL query param/form input | Username/email/phone/login identifier | Yes |
| `sessionId` | URL query param/cookie | Session selection/continuation | Yes |
| `postErrorRedirectUrl` | URL query param/hidden field | Return path for IDP failures | Yes |

## 2) Organization Variables

From `zitadel.org.v2.Organization`:

| API field | App field | Meaning | Used now |
|---|---|---|---|
| `id` | `org.id` | Organization ID | Yes (default org resolution, routing) |
| `name` | `org.name` | Organization display name | Available, not directly rendered in current login pages |
| `primary_domain` | `org.primaryDomain` | Primary org domain | Yes (domain discovery workflows) |

From `GetGeneralSettings`:

| API field | App field | Meaning | Used now |
|---|---|---|---|
| `default_organization_id` | `defaultOrganizationId` | Instance default organization | Indirectly (app also resolves default org via org service) |
| `allowed_languages` | `allowedLanguages` | Allowed UI languages | Currently overridden by forced English |
| `default_language` | `defaultLanguage` | Instance default language | Currently overridden by forced English |

## 3) Branding Settings (`GetBrandingSettings`)

From `zitadel.settings.v2.BrandingSettings` / `Theme`:

| API field | App field | Meaning | Used now |
|---|---|---|---|
| `light_theme.logo_url` | `branding.lightTheme.logoUrl` | Light logo URL | Yes |
| `dark_theme.logo_url` | `branding.darkTheme.logoUrl` | Dark logo URL | Present in components; app is forced light |
| `light_theme.primary_color` | `branding.lightTheme.primaryColor` | Light primary color | Yes |
| `light_theme.background_color` | `branding.lightTheme.backgroundColor` | Light background color | Yes |
| `light_theme.font_color` | `branding.lightTheme.fontColor` | Light text color | Yes |
| `light_theme.warn_color` | `branding.lightTheme.warnColor` | Light warning color | Yes |
| `dark_theme.primary_color` | `branding.darkTheme.primaryColor` | Dark primary color | Present; app is forced light |
| `dark_theme.background_color` | `branding.darkTheme.backgroundColor` | Dark background color | Present; app is forced light |
| `dark_theme.font_color` | `branding.darkTheme.fontColor` | Dark text color | Present; app is forced light |
| `dark_theme.warn_color` | `branding.darkTheme.warnColor` | Dark warning color | Present; app is forced light |
| `font_url` | `branding.fontUrl` | Hosted brand font URL | Available; not wired in current UI |
| `icon_url` | `branding.iconUrl` | Brand icon URL | Available; not wired in current UI |
| `hide_login_name_suffix` | `branding.hideLoginNameSuffix` | Hide org suffix in login UI | Available; not wired in current UI |
| `disable_watermark` | `branding.disableWatermark` | Hide ZITADEL watermark | Available; not wired in current UI |
| `theme_mode` | `branding.themeMode` | Auto/light/dark mode policy | Currently ignored (fork forces light) |
| `resource_owner_type` | `branding.resourceOwnerType` | Org vs inherited instance setting | Available for diagnostics; not rendered |

## 4) Login Settings (`GetLoginSettings`)

Most relevant variables used by this app:

| API field | App field | Meaning | Used now |
|---|---|---|---|
| `allow_local_authentication` | `loginSettings.allowLocalAuthentication` | Enable local login methods | Yes |
| `allow_register` | `loginSettings.allowRegister` | Allow self-registration | Yes |
| `allow_external_idp` | `loginSettings.allowExternalIdp` | Allow external IDP login | Yes |
| `passkeys_type` | `loginSettings.passkeysType` | Passkey allowance mode | Yes |
| `hide_password_reset` | `loginSettings.hidePasswordReset` | Hide reset link | Yes |
| `ignore_unknown_usernames` | `loginSettings.ignoreUnknownUsernames` | Prevent user enumeration behavior | Yes |
| `disable_login_with_email` | `loginSettings.disableLoginWithEmail` | Disable email login alias | Yes |
| `disable_login_with_phone` | `loginSettings.disableLoginWithPhone` | Disable phone login alias | Yes |
| `default_redirect_uri` | `loginSettings.defaultRedirectUri` | Fallback redirect after auth flows | Yes |
| `second_factors` | `loginSettings.secondFactors` | Allowed second factors | Yes |
| `force_mfa` | `loginSettings.forceMfa` | Force MFA globally | Yes |
| `force_mfa_local_only` | `loginSettings.forceMfaLocalOnly` | Force MFA for local auth only | Yes |
| `mfa_init_skip_lifetime` | `loginSettings.mfaInitSkipLifetime` | Re-prompt delay for MFA init | Yes |
| `password_check_lifetime` | `loginSettings.passwordCheckLifetime` | Password re-check lifetime | Yes |
| `external_login_check_lifetime` | `loginSettings.externalLoginCheckLifetime` | External login freshness lifetime | Yes |
| `second_factor_check_lifetime` | `loginSettings.secondFactorCheckLifetime` | 2FA re-check lifetime | Yes |
| `multi_factor_check_lifetime` | `loginSettings.multiFactorCheckLifetime` | MFA re-check lifetime | Yes |
| `allow_domain_discovery` | `loginSettings.allowDomainDiscovery` | Org discovery by domain suffix | Yes |
| `resource_owner_type` | `loginSettings.resourceOwnerType` | Org vs inherited instance setting | Available; not directly rendered |

## 5) Legal & Support Settings (`GetLegalAndSupportSettings`)

| API field | App field | Meaning | Used now |
|---|---|---|---|
| `tos_link` | `legal.tosLink` | Terms of Service URL | Yes |
| `privacy_policy_link` | `legal.privacyPolicyLink` | Privacy Policy URL | Yes |
| `help_link` | `legal.helpLink` | Help URL | Yes |
| `support_email` | `legal.supportEmail` | Support email | Available; not currently rendered in login pages |
| `docs_link` | `legal.docsLink` | Docs URL | Available; not currently rendered in login pages |
| `custom_link` | `legal.customLink` | Custom URL | Available; not currently rendered in login pages |
| `custom_link_text` | `legal.customLinkText` | Label for custom link | Available; not currently rendered in login pages |

## 6) Password Complexity (`GetPasswordComplexitySettings`)

| API field | App field | Meaning | Used now |
|---|---|---|---|
| `min_length` | `passwordComplexity.minLength` | Minimum password length | Yes |
| `requires_uppercase` | `passwordComplexity.requiresUppercase` | Uppercase required | Yes |
| `requires_lowercase` | `passwordComplexity.requiresLowercase` | Lowercase required | Yes |
| `requires_number` | `passwordComplexity.requiresNumber` | Number required | Yes |
| `requires_symbol` | `passwordComplexity.requiresSymbol` | Symbol required | Yes |
| `resource_owner_type` | `passwordComplexity.resourceOwnerType` | Org vs inherited instance setting | Available; not directly rendered |

## 7) Active Identity Provider Variables (`GetActiveIdentityProviders`)

Per provider:

| API field | App field | Meaning | Used now |
|---|---|---|---|
| `id` | `idp.id` | Provider ID | Yes |
| `name` | `idp.name` | Provider display name | Yes |
| `type` | `idp.type` | Provider type enum | Yes |
| `options.is_creation_allowed` | `idp.options.isCreationAllowed` | Registration allowed via IDP | Yes (registration filtering) |
| `options.is_auto_creation` | `idp.options.isAutoCreation` | Auto user creation enabled | Yes (registration filtering) |
| `options.is_linking_allowed` | `idp.options.isLinkingAllowed` | Account linking allowed | Yes (IDP intent logic) |
| `options.is_auto_update` | `idp.options.isAutoUpdate` | Auto profile updates from IDP | Available; not directly rendered |
| `options.auto_linking` | `idp.options.autoLinking` | Auto-linking strategy enum | Used in IDP intent flow decisions |

## 8) Hosted Login Translation Variables

| Variable | Source | Meaning | Used now |
|---|---|---|---|
| `translations` | `GetHostedLoginTranslation` | Org/instance custom translation JSON | Yes |
| `x-zitadel-i18n-organization` | Proxy header from URL `organization` | Chooses org-level translation scope | Yes |
| `locale` | i18n request config | Requested translation locale | Forced to `"en"` in this fork |

## 9) Fork Overrides (Important)

Current fork decisions override part of upstream dynamic behavior:

1. Locale is hard-set to English (`locale = "en"`).
2. Theme is hard-forced to light (`defaultTheme="light"`, `forcedTheme="light"`, `enableSystem={false}`).
3. Language selector and theme selector are removed from login layout.

These mean language/theme-related tenant settings are fetched less or ignored for runtime behavior, while org branding, login policy, legal links, and IDP behavior still remain tenant-driven.

