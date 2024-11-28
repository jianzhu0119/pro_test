import React, { useCallback, useMemo, useState } from "react";
import { type Todo } from "@/store/slice/todo/types";

import "@/styles/TodoItem.css";

interface TodoItemProps {
  todo: Todo;
  remove: (id: string) => void;
  update: (id: string, updatedTask: string) => void;
  toggleComplete: (id: string) => void;
}

const TodoItem: React.FC<TodoItemProps> = ({
  todo,
  remove,
  update,
  toggleComplete,
}) => {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [task, setTask] = useState<string>(todo.text);
  const [error, setError] = useState<string | null>(null);

  const handleClick = useCallback(() => {
    remove(todo.id);
  }, [remove, todo.id]);

  const toggleForm = useCallback(() => {
    setIsEditing((prev) => !prev);
    setError(null);
  }, []);

  const handleUpdate = useCallback(
    (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      if (!task.trim()) {
        setError("Task cannot be empty.");
        return;
      }
      update(todo.id, task);
      toggleForm();
    },
    [task, todo.id, update, toggleForm]
  );

  const handleChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const value = event.target.value;
      setTask(value);
      if (value.trim()) {
        setError(null);
      }
    },
    []
  );

  const toggleCompleted = useCallback(() => {
    toggleComplete(todo.id);
  }, [toggleComplete, todo.id]);

  const result = useMemo(() => {
    if (isEditing) {
      return (
        <div className="Todo">
          <form className="Todo-edit-form" onSubmit={handleUpdate}>
            <input onChange={handleChange} value={task} type="text" required />
            <button type="submit">Save</button>
            {error && <p className="error-message">{error}</p>}
          </form>
        </div>
      );
    } else {
      return (
        <div className="Todo">
          <li
            id={todo.id}
            onClick={toggleCompleted}
            className={todo.completed ? "Todo-task completed" : "Todo-task"}
          >
            {todo.text}
          </li>
          <div className="Todo-buttons">
            <button onClick={toggleForm}>Update</button>
            <button onClick={handleClick}>Delete</button>
          </div>
        </div>
      );
    }
  }, [
    isEditing,
    todo.id,
    todo.completed,
    todo.text,
    toggleCompleted,
    handleUpdate,
    handleChange,
    task,
    error,
    toggleForm,
    handleClick,
  ]);

  return result;
};

export default TodoItem;
