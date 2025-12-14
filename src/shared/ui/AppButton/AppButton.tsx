import type { ButtonHTMLAttributes, ReactNode } from "react";

interface AppButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
}

export const AppButton = ({ children, ...otherProps }: AppButtonProps) => {
  return <button {...otherProps}>{children}</button>;
};
