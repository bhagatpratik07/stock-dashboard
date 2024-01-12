import axios from "axios";

const BASE_URL =
  "https://finnhub.io/api/v1/stock/symbol?exchange=US&symbol=XNYS&token=cmglcd1r01qilgs0pil0cmglcd1r01qilgs0pilg";

// Function to fetch historical stock data
export const fetchHistoricalData = async (symbol, timeFrame) => {
  try {
    const response = await axios.get(`${BASE_URL}`);

    return response.data; // Parse the data as needed for your application
  } catch (error) {
    console.error("Error fetching historical data:", error);
    return null;
  }
};
