import type { MuiThemeMode } from "@/app/model/types/theme";
import { createTheme } from "@mui/material";

export const getTheme = (themeMode: MuiThemeMode) => {
  return createTheme({
    palette: {
      mode: themeMode,
      primary: {
        main: "#0839a4",
      },
    },
  });
};
