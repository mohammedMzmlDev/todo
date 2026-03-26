import { configureStore } from "@reduxjs/toolkit";
import todoReducer from "./features/todo/todoSlice.ts";

export const store = configureStore({
    reducer : {
        todo: todoReducer
    }
});