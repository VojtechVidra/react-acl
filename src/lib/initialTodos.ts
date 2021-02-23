import { Todo } from "../types/todo";

// mock of data coming from BE
export const initialTodos: Todo[] = [
  { text: "Eat lunch", done: false, userId: "currentUserId" },
  { text: "Someone else's todo", done: false, userId: "differentUserId" },
];
