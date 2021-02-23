import { User } from "../types/user";

// This would come from some API or JWT
const loggedInUser: User = {
  id: "currentUserId",
  name: "Bob Jones",
};

export const useUser = (): { user: User } => {
  return { user: loggedInUser };
};
