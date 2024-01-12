import { useState, useEffect } from "react";
import axios from "axios";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";

export default function Dashboard() {
  const [stockSymbol, setStockSymbol] = useState("AAPL");
  const [timeFrame, setTimeFrame] = useState("1min");
  const [stockData, setStockData] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://api.twelvedata.com/time_series?symbol=${stockSymbol}&interval=${timeFrame}&apikey=${
            import.meta.env.VITE_APP_API_KEY
          }`
        );

        // Extract the necessary data from the response
        const chartData = response.data.values.map((d) => ({
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
      } catch (error) {
        console.error("Error fetching data:", error);
        // Handle error appropriately
      }
    };

    fetchData();
  }, [stockSymbol, timeFrame]);

  const handleSymbolChange = (e) => {
    setStockSymbol(e.target.value.toUpperCase());
  };

  const handleTimeFrameChange = (e) => {
    setTimeFrame(e.target.value);
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white">
      <div className="container mx-auto p-4">
        <div className="mb-4 p-4 bg-white dark:bg-gray-800 rounded shadow">
          <div className="flex flex-col md:flex-row justify-between mb-4">
            <input
              type="text"
              value={stockSymbol}
              onChange={handleSymbolChange}
              className="p-2 mb-2 md:mb-0 border rounded w-full md:w-auto text-gray-900 dark:text-gray-100 dark:border-gray-700 focus:ring-blue-500 focus:border-blue-500"
            />
            <select
              value={timeFrame}
              onChange={handleTimeFrameChange}
              className="p-2 border rounded w-full md:w-auto text-gray-900 dark:text-gray-100 dark:border-gray-700 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="1min">1 Minute</option>
              <option value="1day">Daily</option>
              <option value="1week">Weekly</option>
              <option value="1month">Monthly</option>
            </select>
          </div>
          <div>
            {stockData.datasets && (
              <Line
                data={stockData}
                options={{
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
          </div>
        </div>
      </div>
    </div>
  );
}
