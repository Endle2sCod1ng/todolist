import type { RootState } from "@/app/providers/StoreProvider/store/store";
import type { TodolistType } from "../types/todolist";

export const selectTodolists = (state: RootState): TodolistType[] => state.todolists;