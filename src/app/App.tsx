import { CssBaseline, ThemeProvider } from "@mui/material";
import { useAppSelector } from "@/shared/hooks/hooks";
import { selectApp } from "./model/selectors/appSelectors";
import { getTheme } from "./providers/MuiThemeProvider/MuiTheme";
import { MuiHeader } from "@/sections/Header/ui/MuiHeader";
import { Main } from "@/sections/Main";

export const App = () => {
  const { themeMode } = useAppSelector(selectApp);
  const muiTheme = getTheme(themeMode);

  return (
    <ThemeProvider theme={muiTheme}>
      <CssBaseline />
      <MuiHeader />
      <Main />
    </ThemeProvider>
  );
};
