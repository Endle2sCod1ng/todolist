import type { ReactNode } from "react";

interface AppButtonProps {
  children: ReactNode;
}

export const AppButton = ({ children }: AppButtonProps) => {
  return <button>{children}</button>;
};
