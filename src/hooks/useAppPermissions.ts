import { AppPermissions } from "../lib/AppPermissions";
import { appPermissionsMap } from "../lib/todo-permissions";
import { usePermissions } from "./usePermissions";

export const useAppPermissions = () => {
  const { hasPermission } = usePermissions();

  const hasAppPermission = (permission: AppPermissions, accessData?: any) => {
    const neededBePermission = appPermissionsMap[permission];

    if (!neededBePermission) return false;

    if (typeof neededBePermission === "string")
      return hasPermission(neededBePermission);

    const hasStaticPermission = neededBePermission.staticPermissions
      ? neededBePermission.requiredPermissions === "anyof"
        ? neededBePermission.staticPermissions?.some((p) => hasPermission(p))
        : !neededBePermission.staticPermissions?.some((p) => !hasPermission(p))
      : true;

    const hasDynamicPermission = neededBePermission.dynamicPermission
      ? neededBePermission.dynamicPermission(accessData)
      : true;

    return hasStaticPermission && hasDynamicPermission;
  };

  hasAppPermission(AppPermissions.todoFilter);

  return { hasAppPermission };
};
