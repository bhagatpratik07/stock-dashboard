// src/utils/api.js
import axios from "axios";

const API_KEY = import.meta.env.VITE_APP_API_KEY;

export const fetchTimeSeries = async (symbol, timeFrame) => {
  const response = await axios.get(
    `https://api.twelvedata.com/time_series?symbol=${symbol}&interval=${timeFrame}&apikey=${API_KEY}`
  );
  return response;
};

export const searchSymbol = async (symbol) => {
  const response = await axios.get(
    `https://api.twelvedata.com/stocks?symbol=${symbol}&apikey=${API_KEY}`
  );
  return response;
};

export const fetchAllStocks = async () => {
  const response = await axios.get(`https://api.twelvedata.com/stocks`);
  return response;
};

// export const fetchStatistics = async (symbol) => {
//   const response = await axios.get(
//     `https://api.twelvedata.com/statistics?symbol=${symbol}&apikey=${API_KEY}`
//   );
//   return response;
// };

export const fetchPriceTarget = async (symbol) => {
  const response = await axios.get(
    `https://api.twelvedata.com/price_target?symbol=${symbol}&apikey=${API_KEY}`
  );
  return response.data;
};
