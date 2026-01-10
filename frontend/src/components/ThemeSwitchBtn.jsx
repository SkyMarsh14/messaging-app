import { useState, useEffect, useContext } from "react";
import { Sun, Moon } from "lucide-react";
import UserContext from "../helper/UserContext";
const ThemeSwitcher = () => {
  const { preferredTheme, setPreferredTheme } = useContext(UserContext);
  function toggleTheme() {
    const newThemePreference = preferredTheme === "light" ? "dark" : "light";
    localStorage.setItem("theme", newThemePreference);
    setPreferredTheme(newThemePreference);
  }
  return (
    <button
      onClick={toggleTheme}
      className="relative inline-flex items-center justify-center w-16 h-8 rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2"
      style={{
        backgroundColor: preferredTheme === "dark" ? "#4a5568" : "#cbd5e0",
        focusRingColor: preferredTheme === "dark" ? "#60a5fa" : "#3b82f6",
      }}
      aria-label={`Switch to ${
        preferredTheme === "light" ? "dark" : "light"
      } theme`}
    >
      <span
        className="absolute left-1 inline-flex items-center justify-center w-6 h-6 rounded-full transition-transform duration-300 shadow-md"
        style={{
          backgroundColor: preferredTheme === "dark" ? "#1f2937" : "#ffffff",
          transform:
            preferredTheme === "dark" ? "translateX(32px)" : "translateX(0)",
        }}
      >
        {preferredTheme === "light" ? (
          <Sun size={14} color="#f59e0b" />
        ) : (
          <Moon size={14} color="#60a5fa" />
        )}
      </span>
    </button>
  );
};

export default ThemeSwitcher;
