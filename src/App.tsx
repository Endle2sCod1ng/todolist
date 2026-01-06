import { createTheme, CssBaseline, ThemeProvider } from "@mui/material";
import { MuiHeader } from "./widgets/Header/ui/MuiHeader";
import { MuiTodolist } from "./widgets/Todolist/ui/Todolist/MuiTodolist";
import { useState } from "react";

export type MuiThemeMode = "dark" | "light";

export const App = () => {
  const [themeMode, setThemeMode] = useState<MuiThemeMode>("light");

  const muiTheme = createTheme({
    palette: {
      mode: themeMode,
      primary: {
        main: "#087EA4",
      },
    },
  });

  const changeMuiThemeMode = () => {
    setThemeMode(themeMode === "light" ? "dark" : "light");
  };

  return (
    <ThemeProvider theme={muiTheme}>
      <CssBaseline />
      <MuiHeader
        muiTheme={muiTheme}
        changeMuiThemeMode={changeMuiThemeMode}
      />
      <main className="main">
        <MuiTodolist />
      </main>
    </ThemeProvider>
  );
};
