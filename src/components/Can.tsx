import React, { PropsWithChildren, ReactNode } from "react";
import { useAppPermissions } from "../hooks/useAppPermissions";
import { AppPermissions } from "../lib/AppPermissions";

type Props = PropsWithChildren<{
  neededPermission: AppPermissions;
  fallback?: ReactNode;
  accessData?: any;
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
