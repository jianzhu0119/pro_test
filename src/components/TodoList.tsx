import React, { useCallback, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";

import { selectAllTodos } from "@/store/slice/todo/selectors";
import {
  addTodo,
  deleteTodo,
  toggleCompleted,
  updateTodo,
} from "@/store/slice/todo";
import { type Todo } from "@/store/slice/todo/types";
import "@/styles/TodoList.css";
import TodoItem from "./TodoItem";
import TodoForm from "./TodoForm";

const TodoList: React.FC = () => {
  const todos = useSelector(selectAllTodos);
  const dispatch = useDispatch();

  const create = useCallback(
    (newTodo: string) => {
      dispatch(addTodo(newTodo));
    },
    [dispatch]
  );

  const remove = useCallback(
    (id: string) => {
      dispatch(deleteTodo(id));
    },
    [dispatch]
  );

  const update = useCallback(
    (id: string, updatedTask: string) => {
      const updatedTodo = todos.find((todo: Todo) => todo.id === id);
      if (updatedTodo) {
        dispatch(updateTodo({ ...updatedTodo, text: updatedTask }));
      }
    },
    [dispatch, todos]
  );

  const toggleComplete = useCallback(
    (id: string) => {
      dispatch(toggleCompleted(id));
    },
    [dispatch]
  );

  const todosList = useMemo(
    () =>
      todos.map((todo) => (
        <TodoItem
          toggleComplete={toggleComplete}
          update={update}
          remove={remove}
          key={todo.id}
          todo={todo}
        />
      )),
    [todos, toggleComplete, update, remove]
  );

  return (
    <div className="TodoList">
      <h1>Todo List</h1>
      <ul>{todosList}</ul>
      <TodoForm createTodo={create} />
    </div>
  );
};

export default TodoList;
