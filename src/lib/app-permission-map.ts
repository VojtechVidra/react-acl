import { Todo } from "../types/todo";
import { User } from "../types/user";
import { AppPermissions } from "./AppPermissions";
import { Permissions } from "./permissions";

export type DynamicPermissionData =
  | {
      type: AppPermissions.todoUpdate;
      user: User;
      todo: Todo;
    }
  // Example of union
  | {
      type: "other permission";
      data: null;
    };

// key value pairs of app permissions and permissions coming from BE
export const appPermissionsMap: Record<
  AppPermissions,
  | Permissions
  | {
      staticPermissions?: Permissions[];
      /** @default "allof" */
      operator?: "anyof" | "allof";
      dynamicPermission?(data: DynamicPermissionData): boolean;
    }
> = {
  [AppPermissions.todoCreate]: Permissions.TODO_CREATE,
  [AppPermissions.todoFilter]: Permissions.TODO_READ,
  [AppPermissions.todoList]: Permissions.TODO_READ,
  [AppPermissions.todoRemove]: Permissions.TODO_DELETE,
  [AppPermissions.todoUpdate]: {
    staticPermissions: [Permissions.TODO_UPDATE],
    dynamicPermission: (data) => {
      // This check would need to be on top of every dynamicPermission check func
      if (data.type !== AppPermissions.todoUpdate) return false;

      return data.user.id === data.todo.userId;
    },
  },
  [AppPermissions.todoPage]: {
    staticPermissions: [Permissions.TODO_READ, Permissions.TODO_CREATE],
  },
};
