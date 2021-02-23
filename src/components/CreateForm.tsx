import React, { FormEvent, useState } from "react";
import { useUser } from "../hooks/useUser";
import { Todo } from "../types/todo";

interface Props {
  onCreateNew(todo: Todo): void;
}

export const CreateForm = ({ onCreateNew }: Props) => {
  const [newText, setNewText] = useState("");
  const { user } = useUser();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onCreateNew({ done: false, text: newText, userId: user.id });
    setNewText("");
  };

  return (
    <>
      <h2>Create new</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="new-todo">new todo text</label>
        <br />
        <input
          id="new-todo"
          value={newText}
          onChange={(e) => setNewText(e.target.value)}
        />
        <br />
        <button type="submit">Create</button>
      </form>
    </>
  );
};
