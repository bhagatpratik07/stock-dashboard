// src/utils/api.js
import axios from "axios";

const API_KEY = "0846fd60140a4ec88455420b65c44886";

export async function fetchStockData(symbol, timeFrame) {
  try {
    const response = await axios.get(
      `https://api.twelvedata.com/time_series?symbol=${symbol}&interval=${timeFrame}&apikey=${API_KEY}`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
}
