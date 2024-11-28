import React, { useCallback, useState } from "react";

import "@/styles/TodoForm.css";

interface TodoFormProps {
  createTodo: (text: string) => void;
}

const TodoForm: React.FC<TodoFormProps> = ({ createTodo }) => {
  const [todoText, setTodoText] = useState<string>("");
  const [error, setError] = useState<string | null>(null);

  const handleChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>): void => {
      const value = event.target.value;
      setTodoText(value);
      if (value.trim()) {
        setError(null);
      }
    },
    []
  );

  const handleSubmit = useCallback(
    (event: React.FormEvent<HTMLFormElement>): void => {
      event.preventDefault();
      if (!todoText.trim()) {
        setError("Todo cannot be empty.");
        return;
      }
      createTodo(todoText.trim());
      setTodoText("");
    },
    [createTodo, todoText]
  );

  return (
    <form className="TodoForm" onSubmit={handleSubmit}>
      <input
        value={todoText}
        type="text"
        name="task"
        placeholder="New Todo"
        onChange={handleChange}
      />
      <button>Add Todo</button>
      {error && <p className="error-message">{error}</p>}
    </form>
  );
};

export default TodoForm;
