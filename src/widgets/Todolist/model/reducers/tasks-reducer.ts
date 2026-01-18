import { nanoid } from "@reduxjs/toolkit";
import type { TasksState } from "../types/task";
import type { CreateTodolistAction, DeleteTodolistAction } from "./todolistsReducer";

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

export const deleteTaskAC = ({ todolistId, taskId }: { todolistId: string, taskId: string; }) => {
  return { type: "delete_task", payload: { todolistId, taskId } } as const;
};

export const createTaskAC = ({ todolistId, title }: { todolistId: string, title: string; }) => {
  return {
    type: "create_task",
    payload: {
      todolistId, title
    }
  } as const;
};


export const changeTaskStatusAC = ({ todolistId, taskId, isDone }: { todolistId: string, taskId: string, isDone: boolean; }) => {
  return {
    type: "chnage_task_status",
    payload: {
      todolistId, taskId, isDone
    }
  } as const;
};
export const changeTaskTitleAC = ({ todolistId, taskId, title }: { todolistId: string, taskId: string, title: string; }) => {
  return {
    type: "chnage_task_title",
    payload: {
      todolistId, taskId, title
    }
  } as const;
};

export type DeleteTaskAction = ReturnType<typeof deleteTaskAC>;
export type CreateTaskAction = ReturnType<typeof createTaskAC>;
export type ChangeTaskStatus = ReturnType<typeof changeTaskStatusAC>;
export type ChangeTaskTitle = ReturnType<typeof changeTaskTitleAC>;

type Actions = CreateTodolistAction | DeleteTodolistAction | DeleteTaskAction | CreateTaskAction | ChangeTaskStatus | ChangeTaskTitle;

export const tasksReducer = (state: TasksState = initialState, action: Actions): TasksState => {
  switch (action.type) {
    case 'create_todolist': {
      return { ...state, [action.payload.id]: [] };
    }
    case "delete_todolist": {
      const newState = { ...state };
      delete newState[action.payload.id];
      return newState;
    }
    case "delete_task": {
      return { ...state, [action.payload.todolistId]: [...state[action.payload.todolistId].filter(t => t.id !== action.payload.taskId)] };
    }
    case "create_task": {
      return { ...state, [action.payload.todolistId]: [{ id: nanoid(), title: action.payload.title, isDone: false }, ...state[action.payload.todolistId]] };
    }
    case "chnage_task_status": {
      return { ...state, [action.payload.todolistId]: [...state[action.payload.todolistId].map(t => t.id === action.payload.taskId ? { ...t, isDone: action.payload.isDone } : t)] };
    }
    case "chnage_task_title": {
      return { ...state, [action.payload.todolistId]: [...state[action.payload.todolistId].map(t => t.id === action.payload.taskId ? { ...t, title: action.payload.title } : t)] };
    }
    default:
      return state;
  }
};
