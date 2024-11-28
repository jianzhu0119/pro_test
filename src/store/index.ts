import { configureStore } from "@reduxjs/toolkit";
import TodoReducer from "@/store/slice/todo";

const store = configureStore({
  reducer: { todo: TodoReducer },
});

export type RootState = ReturnType<typeof store.getState>;

export default store;
