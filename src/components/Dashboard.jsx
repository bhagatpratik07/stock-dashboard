import { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
// eslint-disable-next-line no-unused-vars
import { Chart as ChartJS } from "chart.js/auto";
import { useTheme } from "../contexts/ThemeContext";
import { useStock } from "../contexts/StockContext";
import { fetchTimeSeries, fetchAllStocks } from "../utils/api";
import { LineChart } from "./LineChart";
import { StockInput } from "./StockInput";

export default function Dashboard() {
  const { stockSymbol, setStockSymbol } = useStock();
  const [timeFrame, setTimeFrame] = useState("1min");
  const [stockData, setStockData] = useState({});
  const [error, setError] = useState(null);
  const [suggestions, setSuggestions] = useState([]);

  const { theme } = useTheme();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetchTimeSeries(stockSymbol, timeFrame);
        if (response) {
          // Extract data from the response
          const chartData = response?.data?.values?.map((d) => ({
            x: d.datetime,
            y: parseFloat(d.close), // Parsing the string to a float
          }));

          setStockData({
            labels: chartData?.map((d) => d.x),
            datasets: [
              {
                label: `${stockSymbol} Stock Price`,
                data: chartData.map((d) => d.y),
                fill: false,
                backgroundColor: "rgb(75, 192, 192)",
                borderColor: "rgba(75, 192, 192, 0.2)",
              },
            ],
          });
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    // using debouncing to delay fetching data to avoid time limits
    const timeoutId = setTimeout(() => {
      fetchData();
    }, 1000);

    return () => clearTimeout(timeoutId);
  }, [stockSymbol, timeFrame]);

  // useEffect(() => {
  //   const fetchSuggestions = async () => {
  //     const symbolSuggestions = await fetchAllStocks();
  //     const symbolsArray = symbolSuggestions?.data?.data?.map(
  //       (stock) => stock.symbol
  //     );
  //     setSuggestions(symbolsArray);
  //   };

  //   fetchSuggestions();
  // }, []);

  return (
    <div className={`${theme === "dark" ? "dark" : ""}`}>
      <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white">
        <div className="container mx-auto p-4">
          <div className="mb-4 p-4 bg-white dark:bg-gray-800 rounded shadow">
            <StockInput
              setError={setError}
              timeFrame={timeFrame}
              setTimeFrame={setTimeFrame}
            />
            {error ? (
              <div className="text-red-500">{error}</div>
            ) : (
              <div>
                <LineChart stockData={stockData} />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
