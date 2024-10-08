import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import SearchForm from "./components/searchForm";
import TripResults from "./components/tripResults";
import TripDetails from "./components/tripDetails";
import { fetchTrips } from "./services/tripService";
import { LoadScript } from "@react-google-maps/api";

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
      <div className="container bg-gray-200 mx-auto mt-6 p-0">
        <LoadScript googleMapsApiKey="AIzaSyBmf2ur5AF9cvKabEdPy729uv51Ke9qRHY">
          <Routes>
            <Route path="/" element={<SearchForm onSearch={handleSearch} />} />
            <Route path="/results" element={<TripResults trips={trips} loading={loading} />} />
            <Route path="/trips/:id" element={<TripDetails />} />
          </Routes>
        </LoadScript>
      </div>
    </Router>
  );
};

export default App;
