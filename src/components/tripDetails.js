import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { fetchTripById } from "../services/tripService";

const TripDetails = () => {
  const { id } = useParams();
  const [trip, setTrip] = useState(null);

  useEffect(() => {
    const loadTrip = async () => {
      try {
        const tripData = await fetchTripById(id);
        setTrip(tripData);
      } catch (error) {
        console.error("Error loading trip details:", error);
      }
    };

    loadTrip();
  }, [id]);

  if (!trip) {
    return <p className="text-gray-500">Loading trip details...</p>;
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-md mt-8">
      <h2 className="text-2xl font-bold mb-4">Trip Details</h2>
      <p>
        <strong>Pickup Location:</strong> {trip.pickup_location}
      </p>
      <p>
        <strong>Dropoff Location:</strong> {trip.dropoff_location}
      </p>
      <p>
        <strong>Distance:</strong> {trip.distance} km
      </p>
      <p>
        <strong>Status:</strong> {trip.status}
      </p>
      <p>
        <strong>Driver:</strong> {trip.driver.name}
      </p>
      <img
        className="w-24 h-24 rounded-full mt-4"
        src={trip.driver.picture}
        alt={`${trip.driver.name}`}
      />
      <p>
        <strong>Car:</strong> {trip.car.make} {trip.car.model}
      </p>
      <img
        className="w-32 h-32 mt-4"
        src={trip.car.picture}
        alt={`${trip.car.make} ${trip.car.model}`}
      />
    </div>
  );
};

export default TripDetails;
