# React ACL

This is sample project that demonstrates implementation of ACL coming from BE and conditionally hiding UI elements.

## Interesting parts

- In `app-permission-map.ts` there are definitions for FE permissions. Feature can be locked by static ACL entry from BE or dynamically with some supplied data and custom check function.
  - Goal was to avoid going through all the components when some permission is added on BE. When this happens you just open `app-permission-map.ts` and change some definitions.
- In `Todos.tsx` or `TodoList.tsx` we can see the permissions in action.
- `AppPermissions.ts` definition of permissions used on FE
- `permissions.ts` definition if of permissions coming from BE
