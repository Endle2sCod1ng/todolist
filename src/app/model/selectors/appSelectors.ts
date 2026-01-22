import type { RootState } from "@/app/providers/StoreProvider/store/store";
import type { AppState } from "../types/app";

export const selectApp = (state: RootState): AppState => state.app;