import React, { createContext, useContext, useState } from "react";

const ThemeContext = createContext({
  isDark: false,
  toggleTheme: () => {},
});

export const useManualTheme = () => useContext(ThemeContext);

export function ManualThemeProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isDark, setIsDark] = useState(false);

  const toggleTheme = () => setIsDark((prev) => !prev);

  return (
    <ThemeContext.Provider value={{ isDark, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}
