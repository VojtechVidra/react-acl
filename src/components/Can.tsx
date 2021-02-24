import React, { PropsWithChildren, ReactNode } from "react";
import { useAppPermissions } from "../hooks/useAppPermissions";
import { DynamicPermissionData } from "../lib/app-permission-map";
import { AppPermissions } from "../lib/AppPermissions";

type Props = PropsWithChildren<{
  neededPermission: AppPermissions;
  fallback?: ReactNode;
  accessData?: DynamicPermissionData;
}>;

export const Can = ({
  neededPermission,
  children,
  fallback,
  accessData,
}: Props) => {
  const { hasAppPermission } = useAppPermissions();

  return (
    <>
      {hasAppPermission(neededPermission, accessData)
        ? children
        : fallback ?? null}
    </>
  );
};
