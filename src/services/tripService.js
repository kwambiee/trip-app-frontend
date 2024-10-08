import axios from "axios";

const API_URL = "https://trip-search-mu.vercel.app/api/trips";

export const fetchTrips = async (params) => {
  try {
    const response = await axios.get(API_URL, { params });
    return response.data;
  } catch (error) {
    console.error("Error fetching trips:", error);
    throw error;
  }
};

export const fetchTripById = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching trip details:", error);
    throw error;
  }
};