import React, { useState } from "react";
import { AppPermissions } from "../lib/AppPermissions";
import { CreateForm } from "../components/CreateForm";
import { TodoFilter } from "../components/TodoFilter";
import { TodoList } from "../components/TodoList";
import { Todo } from "../types/todo";
import { useAppPermissions } from "../hooks/useAppPermissions";
import { Can } from "../components/Can";
import { initialTodos } from "../lib/initialTodos";

export const Todos = () => {
  const [todos, setTodos] = useState(initialTodos);
  const [doneFilter, setDoneFilter] = useState<boolean>();

  const { hasAppPermission } = useAppPermissions();

  const toggleTodo = (index: number) =>
    setTodos((prev) =>
      prev.map((todo, i) =>
        i === index ? { ...todo, done: !todo.done } : todo
      )
    );

  const deleteTodo = (index: number) =>
    setTodos((prev) => prev.filter((_, i) => i !== index));

  const handleAddTodo = (todo: Todo) => setTodos((prev) => prev.concat(todo));

  const visibleTodos = todos.filter((todo) =>
    typeof doneFilter !== "undefined" ? doneFilter === todo.done : true
  );

  return (
    <div>
      <h1>Todo app</h1>
      <Can neededPermission={AppPermissions.todoFilter}>
        <TodoFilter onFilterChange={setDoneFilter} activeFilter={doneFilter} />
      </Can>
      <Can
        neededPermission={AppPermissions.todoList}
        fallback={<div>Not enough permissions to display list of todos</div>}
      >
        <TodoList
          deleteTodo={deleteTodo}
          todos={visibleTodos}
          toggleTodo={toggleTodo}
        />
      </Can>
      <Can neededPermission={AppPermissions.todoCreate}>
        <CreateForm onCreateNew={handleAddTodo} />
      </Can>
    </div>
  );
};
