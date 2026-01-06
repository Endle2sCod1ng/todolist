import {  CssBaseline, ThemeProvider } from "@mui/material";
import { type ReactNode } from "react";
import { muiTheme } from "./MuiTheme";

interface MuiThemeProviderProps {
  children: ReactNode;
  className?: string;
}
export const MuiThemeProvider = ({ children }: MuiThemeProviderProps) => {

  return (
    <ThemeProvider theme={muiTheme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
};
