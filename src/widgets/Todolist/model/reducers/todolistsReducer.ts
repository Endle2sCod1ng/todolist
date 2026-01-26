import type { TodolistType } from "../types/todolist";
import type { FilterValues } from "../types/filter";
import { createAction, createReducer, nanoid } from "@reduxjs/toolkit";

const todolistId1 = "todolistId1";
const todolistId2 = "todolistId2";

const initialState: TodolistType[] = [
  { id: todolistId1, title: "What to learns", filter: "all" },
  { id: todolistId2, title: "What to read", filter: "all" },
];


export const deleteTodolistAC = createAction<{ id: string; }>("todolists/deleteTodolist");

export const createTodolistAC = createAction("todolists/createTodollist", (title: string) => { return { payload: { id: nanoid(), title } }; });

export const changeTodolistTitleAC = createAction<{ id: string, title: string; }>("todolists/changeTodolistTitle");

export const changeTodolistFilterAC = createAction<{ id: string, filter: FilterValues; }>("todolists/changeTodolistFilter");


export const todolistsReducer = createReducer(initialState, builder => {
  builder.addCase(deleteTodolistAC, (state, action) => {
    const index = state.findIndex(tl => tl.id === action.payload.id);
    if (index !== -1) {
      state.splice(index, 1);
    }
  }).addCase(createTodolistAC, (state, action) => {
    state.push({ ...action.payload, filter: "all" });
  }).addCase(changeTodolistTitleAC, (state, action) => {
    const index = state.findIndex(tl => tl.id === action.payload.id);
    if (index !== -1) {
      state[index].title = action.payload.title;
    }
  }).addCase(changeTodolistFilterAC, (state, action) => {
    const tl = state.find(tl => tl.id === action.payload.id);
    if (tl) {
      tl.filter = action.payload.filter;
    }
  });
});

