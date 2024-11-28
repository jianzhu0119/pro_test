import { RootState } from "@/store";

export const selectAllTodos = (state: RootState) => state.todo.todos;
