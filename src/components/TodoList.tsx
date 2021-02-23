import React from "react";
import { useUser } from "../hooks/useUser";
import { AppPermissions } from "../lib/AppPermissions";
import { Todo } from "../types/todo";
import { Can } from "./Can";

interface Props {
  todos: Todo[];
  toggleTodo(index: number): void;
  deleteTodo(index: number): void;
}

export const TodoList = ({ todos, deleteTodo, toggleTodo }: Props) => {
  const { user } = useUser();

  return (
    <>
      <h2>Todos</h2>
      {todos.map((todo, index) => (
        <div key={index}>
          <Can
            neededPermission={AppPermissions.todoUpdate}
            accessData={{ user, todo }}
          >
            <input
              type="checkbox"
              onChange={() => toggleTodo(index)}
              checked={todo.done}
            />
          </Can>
          {todo.text}{" "}
          <Can neededPermission={AppPermissions.todoRemove}>
            <button onClick={() => deleteTodo(index)}>X</button>
          </Can>
        </div>
      ))}
    </>
  );
};
