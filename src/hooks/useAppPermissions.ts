import { AppPermissions } from "../lib/AppPermissions";
import {
  appPermissionsMap,
  DynamicPermissionData,
} from "../lib/app-permission-map";
import { usePermissions } from "./usePermissions";

export const useAppPermissions = () => {
  const { hasPermission } = usePermissions();

  const hasAppPermission = (
    permission: AppPermissions,
    accessData?: DynamicPermissionData
  ) => {
    const appPermission = appPermissionsMap[permission];

    if (!appPermission) return false;

    if (typeof appPermission === "string") return hasPermission(appPermission);

    const hasStaticPermission = appPermission.staticPermissions
      ? appPermission.operator === "anyof"
        ? appPermission.staticPermissions?.some((p) => hasPermission(p))
        : appPermission.staticPermissions?.every((p) => hasPermission(p))
      : true;

    const hasDynamicPermission = appPermission.dynamicPermission
      ? accessData
        ? appPermission.dynamicPermission(accessData)
        : false
      : true;

    return hasStaticPermission && hasDynamicPermission;
  };

  return { hasAppPermission };
};
