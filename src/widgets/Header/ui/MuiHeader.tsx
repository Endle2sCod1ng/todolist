import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import { containerSx } from "./MuiHeader.styles";
import { MuiNavButton } from "@/shared/ui/MuiNavButton/MuiNavButton";
import { Switch } from "@mui/material";
import type { Theme } from "@mui/material/styles";

interface HeaderProps {
  muiTheme: Theme;
  changeMuiThemeMode: () => void;
  className?: string;
}
export const MuiHeader = ({
  muiTheme,
  changeMuiThemeMode,
  className,
}: HeaderProps) => {
  return (
    <AppBar
      className={`${className ? className : ""}`}
      position="static"
      sx={{ mb: "30px" }}
    >
      <Toolbar>
        <Container
          maxWidth={"lg"}
          sx={containerSx}
        >
          <IconButton color="inherit">
            <MenuIcon />
          </IconButton>
          <div>
            <MuiNavButton color="inherit">Sign in</MuiNavButton>
            <MuiNavButton color="inherit">Sign up</MuiNavButton>
            <MuiNavButton
              background={muiTheme.palette.primary.dark}
              color="inherit"
            >
              Faq
            </MuiNavButton>
            <Switch
              color={"default"}
              onChange={changeMuiThemeMode}
            />
          </div>
        </Container>
      </Toolbar>
    </AppBar>
  );
};
