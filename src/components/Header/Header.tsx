import React from "react";
import { ThemeSwitcher } from '../ThemeSwitcher';

export const Header = (): React.ReactElement => {
  
  return (
    <header className="fixed top-0">
      <ThemeSwitcher />
    </header>
  );
}