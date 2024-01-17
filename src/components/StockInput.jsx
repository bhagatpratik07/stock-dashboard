import { useStock } from "../contexts/StockContext";
import { useTheme } from "../contexts/ThemeContext";

export const StockInput = ({ setError, timeFrame, setTimeFrame }) => {
  const { stockSymbol, setStockSymbol } = useStock();
  const { theme } = useTheme();

  const handleSymbolChange = (e) => {
    const userInput = e.target.value.toUpperCase();
    setStockSymbol(userInput);
    setError(null);

    if (userInput.trim() === "") {
      setError("No matching suggestions. Please enter a valid symbol.");
    } else {
      setError(null);
    }
  };

  const handleTimeFrameChange = (e) => {
    setTimeFrame(e.target.value);
  };
  return (
    <div className="flex flex-col md:flex-row justify-between mb-4 relative">
      <input
        placeholder="Enter stock symbol"
        type="text"
        value={stockSymbol}
        onChange={handleSymbolChange}
        className={`p-2 mb-2 md:mb-0 border rounded w-full md:w-auto ${
          theme === "dark"
            ? "bg-gray-700 text-gray-300 border-gray-600"
            : "text-gray-900 bg-white border-gray-300"
        } focus:ring-blue-500 focus:border-blue-500`}
      />

      <select
        value={timeFrame}
        onChange={handleTimeFrameChange}
        className={`p-2 border rounded w-full md:w-auto ${
          theme === "dark"
            ? "bg-gray-700 text-gray-300 border-gray-600"
            : "text-gray-900 bg-white border-gray-300"
        } focus:ring-blue-500 focus:border-blue-500`}
      >
        <option value="1min">1 Minute</option>
        <option value="1day">Daily</option>
        <option value="1week">Weekly</option>
        <option value="1month">Monthly</option>
      </select>
    </div>
  );
};
