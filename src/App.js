import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import SearchForm from "./components/searchForm";
import TripResults from "./components/tripResults";
import TripDetails from "./components/tripDetails";
import { fetchTrips } from "./services/tripService";
import { LoadScript } from "@react-google-maps/api";

let googleMapsApiKey = process.env.GOOSLE_MAPS_API_KEY;

const App = () => {
  const [trips, setTrips] = useState([]);
  const [loading, setLoading] = useState(true);

  const handleSearch = async (searchParams) => {
    try {
      setLoading(true);
      const tripData = await fetchTrips(searchParams);
      setTrips(tripData.data);
    } catch (error) {
      console.error("Error fetching trips:", error);
    } finally {
      setLoading(false); 
    }
  };

  return (
    <Router>
      <div className="w-full h-full bg-gray-200 mx-auto p-6">
        <LoadScript googleMapsApiKey={googleMapsApiKey}>
          <Routes>
            <Route path="/" element={<SearchForm onSearch={handleSearch} />} />
            <Route
              path="/results"
              element={<TripResults trips={trips} loading={loading} />}
            />
            <Route path="/trips/:id" element={<TripDetails />} />
          </Routes>
        </LoadScript>
      </div>
    </Router>
  );
};

export default App;
