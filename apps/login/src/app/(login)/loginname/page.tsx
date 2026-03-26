import { DynamicTheme } from "@/components/dynamic-theme";
import { SignInWithIdp } from "@/components/sign-in-with-idp";
import { Translated } from "@/components/translated";
import { UsernameForm } from "@/components/username-form";
import { getServiceConfig } from "@/lib/service-url";
import { getActiveIdentityProviders, getBrandingSettings, getDefaultOrg, getLoginSettings, getOrgById } from "@/lib/zitadel";
import { Organization } from "@zitadel/proto/zitadel/org/v2/org_pb";
import { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { headers } from "next/headers";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("loginname");
  return { title: t("title") };
}

export default async function Page(props: { searchParams: Promise<Record<string | number | symbol, string | undefined>> }) {
  const searchParams = await props.searchParams;

  const loginName = searchParams?.loginName;
  const requestId = searchParams?.requestId;
  const organization = searchParams?.organization;
  const suffix = searchParams?.suffix;
  const submit: boolean = searchParams?.submit === "true";

  const _headers = await headers();
  const { serviceConfig } = getServiceConfig(_headers);

  let defaultOrganization: Organization | null = null;
  if (!organization) {
    defaultOrganization = await getDefaultOrg({ serviceConfig });
  }

  const defaultOrganizationId = defaultOrganization?.id;
  const resolvedOrganizationId = organization ?? defaultOrganizationId;

  let organizationName = defaultOrganization?.name ?? "";
  if (organization) {
    const org = await getOrgById({ serviceConfig, organizationId: organization });
    organizationName = org?.name ?? organizationName;
  }
  if (!organizationName) {
    organizationName = "your organization";
  }

  const loginSettings = await getLoginSettings({ serviceConfig, organization: resolvedOrganizationId });

  const identityProviders = await getActiveIdentityProviders({
    serviceConfig,
    orgId: resolvedOrganizationId,
  }).then((resp) => {
    return resp.identityProviders;
  });

  const branding = await getBrandingSettings({ serviceConfig, organization: resolvedOrganizationId });

  return (
    <DynamicTheme branding={branding}>
      <div className="flex flex-col space-y-4">
        <h1>
          <Translated i18nKey="sdsTitle" namespace="loginname" data={{ organization: organizationName }} />
        </h1>
        <p className="ztdl-p">
          <Translated i18nKey="description" namespace="loginname" />
        </p>
      </div>

      <div className="w-full">
        {loginSettings?.allowLocalAuthentication && (
          <UsernameForm
            loginName={loginName}
            requestId={requestId}
            organization={organization} // stick to "organization" as we still want to do user discovery based on the searchParams not the default organization, later the organization is determined by the found user
            defaultOrganization={defaultOrganizationId}
            loginSettings={loginSettings}
            suffix={suffix}
            submit={submit}
            allowRegister={!!loginSettings?.allowRegister}
          ></UsernameForm>
        )}

        {loginSettings?.allowExternalIdp && !!identityProviders?.length && (
          <div className="w-full pb-4 pt-6">
            <SignInWithIdp
              identityProviders={identityProviders}
              requestId={requestId}
              organization={organization}
              postErrorRedirectUrl="/loginname"
              showLabel={loginSettings?.allowLocalAuthentication}
            ></SignInWithIdp>
          </div>
        )}
      </div>
    </DynamicTheme>
  );
}
