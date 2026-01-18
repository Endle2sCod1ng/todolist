import type { RootState } from "@/app/providers/StoreProvider/store/store";
import type { TasksState } from "../types/task";

export const selectTasks = (state: RootState): TasksState => state.tasks;