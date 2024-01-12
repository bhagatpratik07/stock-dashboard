import { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";
import { useTheme } from "../contexts/ThemeContext";
import { useStock } from "../contexts/StockContext";
import { fetchTimeSeries } from "../utils/api";
import PriceTargetGraph from "./PriceTargetGraph";

export default function Dashboard() {
  const { stockSymbol, setStockSymbol } = useStock();
  const [timeFrame, setTimeFrame] = useState("1min");
  const [stockData, setStockData] = useState({});
  const [error, setError] = useState(null);

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
            labels: chartData.map((d) => d.x),
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
          setError(null);
        } else {
          setError(
            `Error displaying data for ${stockSymbol} due to rate limits. Please try again in some time.`
          );
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        setError(
          `Error displaying data for ${stockSymbol} due to rate limits. Please try again in some time.`
        );
      }
    };

    fetchData();
  }, [stockSymbol, timeFrame]);

  const handleSymbolChange = (e) => {
    setStockSymbol(e.target.value.toUpperCase());
    setError(null);
  };

  const handleTimeFrameChange = (e) => {
    setTimeFrame(e.target.value);
  };

  return (
    <div className={`${theme === "dark" ? "dark" : ""}`}>
      <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white">
        <div className="container mx-auto p-4">
          <div className="mb-4 p-4 bg-white dark:bg-gray-800 rounded shadow">
            <div className="flex flex-col md:flex-row justify-between mb-4">
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
            {error ? (
              <div className="text-red-500">{error}</div>
            ) : (
              <div>
                {stockData.datasets && (
                  <Line
                    data={stockData}
                    options={{
                      responsive: true,

                      scales: {
                        x: {
                          grid: {
                            color: "rgba(255, 255, 255, 0.1)",
                          },
                        },
                        y: {
                          grid: {
                            color: "rgba(255, 255, 255, 0.1)",
                          },
                        },
                      },
                    }}
                  />
                )}
                <PriceTargetGraph />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
