import type { TasksState } from "../types/task";
import type { CreateTodolistAction, DeleteTodolistAction } from "./todolistsReducer";

const initialState: TasksState = {};

type Actions = CreateTodolistAction | DeleteTodolistAction;

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
  default:
   return state;
 }
};
