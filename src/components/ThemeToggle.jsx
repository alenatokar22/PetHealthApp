import React, { useEffect, useState } from "react";
import "../styles/ThemeToggle.css";

const ThemeToggle = () => {
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  return (
    <div className="theme-toggle-wrapper">
      <button
        className="theme-toggle"
        onClick={() => setTheme(theme === "light" ? "dark" : "light")}
      >
        {theme === "light" ? "🌙 Темна" : "☀️ Світла"}
      </button>
    </div>
  );
};

export default ThemeToggle;
