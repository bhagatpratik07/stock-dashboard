import Dashboard from "./components/Dashboard";
import Header from "./components/Header";
import { useTheme } from "./contexts/ThemeContext";

export default function App() {
  // theme context
  const { theme } = useTheme();

  const themeClassNames =
    theme === "dark" ? "bg-gray-800 text-white" : "bg-white text-white-800";

  return (
    <div className={`App ${themeClassNames} `}>
      <Header />
      <Dashboard />
    </div>
  );
}
