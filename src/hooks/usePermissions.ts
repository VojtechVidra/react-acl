import { Permissions } from "../lib/permissions";

// This could come from BE
const userPermissions = [
  Permissions.TODO_CREATE,
  Permissions.TODO_DELETE,
  Permissions.TODO_READ,
  Permissions.TODO_UPDATE,
];

const userPermissionsSet = new Set(userPermissions);

export const usePermissions = () => {
  const hasPermission = (permission: Permissions) =>
    userPermissionsSet.has(permission);

  return { permissions: userPermissions, hasPermission };
};
