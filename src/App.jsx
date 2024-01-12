// src/App.jsx
import { useState, useEffect } from "react";
import axios from "axios";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";

export default function App() {
  const [stockSymbol, setStockSymbol] = useState("AAPL");
  const [timeFrame, setTimeFrame] = useState("1min");
  const [stockData, setStockData] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://api.twelvedata.com/time_series?symbol=${stockSymbol}&interval=${timeFrame}&apikey=0846fd60140a4ec88455420b65c44886`
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
    <div className="App">
      <header>
        <h1>Stock Market Dashboard</h1>
      </header>
      <div>
        <input type="text" value={stockSymbol} onChange={handleSymbolChange} />
        <select value={timeFrame} onChange={handleTimeFrameChange}>
          <option value="1min">1 Minute</option>
          <option value="1day">Daily</option>
          <option value="1week">Weekly</option>
          <option value="1month">Monthly</option>
        </select>
      </div>
      <div>{stockData.datasets && <Line data={stockData} />}</div>
    </div>
  );
}
