import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import SearchForm from "./components/searchForm";
import TripResults from "./components/tripResults";
import TripDetails from "./components/tripDetails";
import { fetchTrips } from "./services/tripService";
import { LoadScript } from "@react-google-maps/api";

const App = () => {
  const [trips, setTrips] = useState([]);

  const handleSearch = async (searchParams) => {
    try {
      const tripData = await fetchTrips(searchParams);
      setTrips(tripData.data);
    } catch (error) {
      console.error("Error fetching trips:", error);
    }
  };

  return (
    <Router>
      <div className="container mx-auto p-6">
        <LoadScript googleMapsApiKey="AIzaSyDgcIXChCiptMQJV5FRVdYYO_w6Nc7LSHE">
          <Routes>
            <Route path="/" element={<SearchForm onSearch={handleSearch} />} />
            <Route path="/results" element={<TripResults trips={trips} />} />
            <Route path="/trips/:id" element={<TripDetails />} />
          </Routes>
        </LoadScript>
      </div>
    </Router>
  );
};

export default App;
