import { createAction, createReducer } from "@reduxjs/toolkit";
import type { TasksState } from "../types/task";
import { createTodolistAC, deleteTodolistAC } from "./todolistsReducer";


const todolistId1 = "todolistId1";
const todolistId2 = "todolistId2";

const initialState: TasksState = {
  [todolistId1]: [
    { id: "1", title: "CSS", isDone: false },
    { id: "2", title: "JS", isDone: true },
    { id: "3", title: "React", isDone: false },
  ],
  [todolistId2]: [
    { id: "1", title: "bread", isDone: false },
    { id: "2", title: "milk", isDone: true },
    { id: "3", title: "tea", isDone: false },
  ],
};
export const deleteTaskAC = createAction<{ todolistId: string, taskId: string; }>("tasks/deleteTask");

export const createTaskAC = createAction<{ todolistId: string, title: string; }>("tasks/createTask");

export const changeTaskStatusAC = createAction<{ todolistId: string, taskId: string, isDone: boolean; }>("tasks/changeTaskStatus");

export const changeTaskTitleAC = createAction<{ todolistId: string, taskId: string, title: string; }>("tasks/changeTaskTitle");



export const tasksReducer = createReducer(initialState, builder => {
  builder.addCase(createTodolistAC, (state, action) => {
    state[action.payload.id] = [];
  }).addCase(deleteTodolistAC, (state, actoin) => {
    delete state[actoin.payload.id];
  
  }).addCase(deleteTaskAC, (state, action) => {
    const index = state[action.payload.todolistId].findIndex(t => t.id === action.payload.taskId);
    state[action.payload.todolistId].splice(index, 1);
  }).addCase(createTaskAC, (state, action) => {
    state[action.payload.todolistId].unshift({ id: action.payload.todolistId, title: action.payload.title, isDone: false });
  }).addCase(changeTaskStatusAC, (state, action) => {
    const task = state[action.payload.todolistId].find(t => t.id === action.payload.taskId);
    if (task) {
      task.isDone = action.payload.isDone;
    }
  }).addCase(changeTaskTitleAC, (state, action) => {
    const task = state[action.payload.todolistId].find(t => t.id === action.payload.taskId);
    if (task) {
      task.title = action.payload.title;
    }
  });
});