import type { ReactNode } from "react";
import s from "./Header.module.scss";

interface HeaderProps {
  themeBtn: ReactNode;
  className?: string;
}
export const Header = ({ themeBtn, className }: HeaderProps) => {
  return (
    <header className={`${s.header} ${className ? className : ""}`}>
      <div>Header</div>
      {themeBtn}
    </header>
  );
};
