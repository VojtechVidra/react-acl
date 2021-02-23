import { AppPermissions } from "./AppPermissions";
import { Permissions } from "./permissions";

// key value pairs of app permissions and permissions coming from BE
export const appPermissionsMap: Record<
  AppPermissions,
  | Permissions
  | {
      staticPermissions?: Permissions[];
      /** @default "allof" */
      requiredPermissions?: "anyof" | "allof";
      dynamicPermission?(data: any): boolean;
    }
> = {
  [AppPermissions.todoCreate]: Permissions.TODO_CREATE,
  [AppPermissions.todoFilter]: Permissions.TODO_READ,
  [AppPermissions.todoList]: Permissions.TODO_READ,
  [AppPermissions.todoRemove]: Permissions.TODO_DELETE,
  [AppPermissions.todoUpdate]: {
    staticPermissions: [Permissions.TODO_UPDATE],
    dynamicPermission: (data) => data?.user?.id === data?.todo?.userId,
  },
  [AppPermissions.todoPage]: {
    staticPermissions: [Permissions.TODO_READ, Permissions.TODO_CREATE],
  },
};
