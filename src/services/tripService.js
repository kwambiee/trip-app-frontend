import axios from "axios";

const API_URL = "http://localhost:3000/api/trips";

export const fetchTrips = async (params) => {
  try {
    const response = await axios.get(API_URL, { params });
    return response.data;
  } catch (error) {
    console.error("Error fetching trips:", error);
    throw error;
  }
};