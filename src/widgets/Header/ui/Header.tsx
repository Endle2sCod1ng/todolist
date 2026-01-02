import type { ReactNode } from "react";

interface HeaderProps {
  themeBtn: ReactNode;
  className?: string;
}
export const Header = ({ themeBtn, className }: HeaderProps) => {
  return (
    <header className={`${className ? className : ""}`}>
      <div>Header</div>
      {themeBtn}
    </header>
  );
};
