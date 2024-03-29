import { useTheme } from "../contexts/ThemeContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSun, faMoon } from "@fortawesome/free-solid-svg-icons";

export default function Header() {
  const { theme, toggleTheme } = useTheme();
  return (
    <header className="text-center mb-4 flex flex-col md:flex-row justify-between p-4">
      <h1 className="text-3xl font-bold mb-2">Stock Market Dashboard</h1>
      <button
        onClick={toggleTheme}
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none transition"
      >
        {theme === "light" ? (
          <FontAwesomeIcon icon={faMoon} />
        ) : (
          <FontAwesomeIcon icon={faSun} />
        )}
      </button>
    </header>
  );
}
