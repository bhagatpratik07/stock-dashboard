import { Line } from "react-chartjs-2";
// eslint-disable-next-line no-unused-vars
import { Chart as ChartJS } from "chart.js/auto";
export const LineChart = ({ stockData }) => {
  return (
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
    </div>
  );
};
