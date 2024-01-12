import { useState, useEffect } from "react";
import { Bar } from "react-chartjs-2";
import { fetchPriceTarget } from "../utils/api";
import { useStock } from "../contexts/StockContext";

const PriceTargetGraph = () => {
  const { stockSymbol } = useStock();
  const [priceTarget, setPriceTarget] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchPriceTarget(stockSymbol);
      setPriceTarget(data.price_target);
    };

    fetchData();
  }, [stockSymbol]);

  const chartData = {
    labels: ["High", "Median", "Low", "Average", "Current"],
    datasets: [
      {
        label: "Price Target (USD)",
        data: priceTarget
          ? [
              priceTarget.high,
              priceTarget.median,
              priceTarget.low,
              priceTarget.average,
              priceTarget.current,
            ]
          : [],
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="m-20">
      {priceTarget ? (
        <Bar
          data={chartData}
          options={{ indexAxis: "y", scales: { x: { beginAtZero: true } } }}
        />
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default PriceTargetGraph;
