const getPreferredTheme = () => {
  const savedThemePreference = localStorage.getItem("theme");
  if (savedThemePreference === null) {
    const preferesDarkTheme = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches; // Reads browser theme preferenece
    if (preferesDarkTheme) {
      localStorage.setItem("theme", "dark");
      return "dark";
    } else {
      localStorage.setItem("theme", "light");
      return "light";
    }
  }
  return savedThemePreference;
};
export default getPreferredTheme;
