import { createAction, createReducer } from "@reduxjs/toolkit";
import type { MuiThemeMode } from "../types/theme";

const initialState = {
  themeMode: "dark" as MuiThemeMode
};

export const changeMuiThemeModeAC = createAction<{ themeMode: MuiThemeMode; }>("app/chnageTheme");

export const appReducer = createReducer(initialState, builder => {
  builder.addCase(changeMuiThemeModeAC, (state, action) => {
    state.themeMode = action.payload.themeMode;
  });
});



