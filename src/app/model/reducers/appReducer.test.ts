import { test, beforeEach, expect } from "vitest";
import { appReducer, changeMuiThemeModeAC } from "./appReducer";
import { type MuiThemeMode } from "../types/theme";

let startState: {
  themeMode: MuiThemeMode;
};

beforeEach(() => {
  startState = {
    themeMode: "dark" as MuiThemeMode
  };
});
test("changeTheme", () => {
  const endState = appReducer(startState, changeMuiThemeModeAC({ themeMode: "light" }));
  expect(endState.themeMode).toBe("light");
});