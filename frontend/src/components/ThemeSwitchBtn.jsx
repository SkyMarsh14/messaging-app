import { useContext } from "react";
import { Sun, Moon } from "lucide-react";
import UserContext from "../helper/UserContext";
import styled from "styled-components";

const ToggleButton = styled.button`
  position: fixed;
  z-index: 1;
  top: 1em;
  right: 1em;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 4rem;
  height: 2rem;
  border-radius: 9999px;
  transition: all 0.3s;
  background-color: ${(props) => (props.$isDark ? "#4a5568" : "#cbd5e0")};
  border: none;
  cursor: pointer;

  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px white,
      0 0 0 4px ${(props) => (props.$isDark ? "#60a5fa" : "#3b82f6")};
  }
`;

const ToggleCircle = styled.span`
  position: absolute;
  left: 0.25rem;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 1.5rem;
  height: 1.5rem;
  border-radius: 9999px;
  transition: transform 0.3s;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
  background-color: ${(props) => (props.$isDark ? "#1f2937" : "#ffffff")};
  transform: ${(props) =>
    props.$isDark ? "translateX(32px)" : "translateX(0)"};
`;

const ThemeSwitcher = () => {
  const { preferredTheme, setPreferredTheme } = useContext(UserContext);

  function toggleTheme() {
    const newThemePreference = preferredTheme === "light" ? "dark" : "light";
    localStorage.setItem("theme", newThemePreference);
    setPreferredTheme(newThemePreference);
  }

  const isDark = preferredTheme === "dark";

  return (
    <ToggleButton
      onClick={toggleTheme}
      $isDark={isDark}
      aria-label={`Switch to ${
        preferredTheme === "light" ? "dark" : "light"
      } theme`}
    >
      <ToggleCircle $isDark={isDark}>
        {preferredTheme === "light" ? (
          <Sun size={14} color="#f59e0b" />
        ) : (
          <Moon size={14} color="#60a5fa" />
        )}
      </ToggleCircle>
    </ToggleButton>
  );
};

export default ThemeSwitcher;
