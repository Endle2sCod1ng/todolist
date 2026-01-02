import { Todolist } from "@/widgets/Todolist";
import { useState } from "react";
import { AppButton } from "./shared/ui/AppButton/AppButton";
import { Header } from "./widgets/Header";

type Theme = "light" | "dark";

export const App = () => {
  const [theme, setTheme] = useState<Theme>("dark");
  return (
    <div className={`app app_${theme}_theme`}>
      <Header
        themeBtn={
          <AppButton
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          >
            {"Theme"}
          </AppButton>
        }
      />
      <main>
        <Todolist />
      </main>
    </div>
  );
};
