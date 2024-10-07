import React, { useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import SearchForm from "./components/SearchForm";
import TripResults from "./components/TripResults";
import TripDetails from "./components/TripDetails";
import { fetchTrips } from "./services/tripService";

const App = () => {
  const [trips, setTrips] = useState([]);

  const handleSearch = async (searchParams) => {
    try {
      const tripData = await fetchTrips(searchParams);
      setTrips(tripData);
    } catch (error) {
      console.error("Error fetching trips:", error);
    }
  };

  return (
    <Router>
      <div className="container mx-auto p-6">
        <Switch>
          <Route exact path="/">
            <SearchForm onSearch={handleSearch} />
            <TripResults trips={trips} />
          </Route>
          <Route path="/trips/:id">
            <TripDetails />
          </Route>
        </Switch>
      </div>
    </Router>
  );
};

export default App;
