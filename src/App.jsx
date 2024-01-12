import Dashboard from "./components/Dashboard";
import { useTheme } from "./contexts/ThemeContext";

export default function App() {
  // theme context
  const { theme, toggleTheme } = useTheme();

  const themeClassNames =
    theme === "dark" ? "bg-gray-800 text-white" : "bg-white text-white-800";

  return (
    <div className={`App ${themeClassNames} `}>
      <header className="text-center mb-4 flex flex-col md:flex-row justify-between p-4">
        <h1 className="text-3xl font-bold mb-2">Stock Market Dashboard</h1>
        <button
          onClick={toggleTheme}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none transition"
        >
          {theme === "light" ? "Dark Mode" : "Light Mode"}
        </button>
      </header>
      <Dashboard />
    </div>
  );
}
