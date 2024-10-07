import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { fetchTripById } from "../services/tripService";
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";
import MapComponent from "./mapComponent";

const TripDetails = () => {
  const { id } = useParams();
  const [trip, setTrip] = useState(null);

  useEffect(() => {
    const loadTrip = async () => {
      try {
        const tripData = await fetchTripById(id);
        setTrip(tripData.data);
      } catch (error) {
        console.error("Error loading trip details:", error);
      }
    };

    loadTrip();
  }, [id]);

  if (!trip) {
    return <p className="text-gray-500">Loading trip details...</p>;
  }

  const renderStars = (rating) => {
    console.log(rating, "rating")
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      if (i <= rating) {
        stars.push(<FaStar key={i} className="text-yellow-500" />); // Full star for each full rating point
      } else if (i - rating < 1) {
        stars.push(<FaStarHalfAlt key={i} className="text-yellow-500" />); // Half star for half points
      } else {
        stars.push(<FaRegStar key={i} className="text-yellow-500" />); // Empty star for the rest
      }
    }
    return stars;
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md mt-8 space-y-4">
      <div className="flex justify-between">
        <div>
          <h2 className="text-2xl font-bold mb-4">Trip Details</h2>

          {/* Trip Information */}
          <p>
            <strong>Pick-up Location:</strong> {trip.pickup_location}
          </p>
          <p>
            <strong>Drop-off Location:</strong> {trip.dropoff_location}
          </p>
          <p>
            <strong>Request Date/Time:</strong>{" "}
            {new Date(trip.request_date).toLocaleString()}
          </p>
          <p>
            <strong>Trip Start Time:</strong>{" "}
            {new Date(trip.pickup_date).toLocaleTimeString()}
          </p>
          <p>
            <strong>Trip End Time:</strong>{" "}
            {new Date(trip.dropoff_date).toLocaleTimeString()}
          </p>
          <p>
            <strong>Trip Distance:</strong> {trip.distance} km
          </p>
          <p>
            <strong>Trip Duration:</strong> {trip.duration} {trip.duration_unit}
          </p>
          <p>
            <strong>Trip Final Price:</strong> {trip.cost} {trip.cost_unit}
          </p>
        </div>

        {/* Driver Information */}
        <div className="flex space-x-4">
          <div>
            <h3 className="text-lg font-bold">Driver Information</h3>
            <p>
              <strong>Name:</strong> {trip.driver_name}
            </p>
            <div className="flex items-center space-x-1">
              <strong>Rating:</strong>
              <div className="flex items-center">
                {renderStars(trip.driver_rating)}{" "}
                {/* Display rating as stars */}
              </div>
            </div>
            <img
              className="w-24 h-24 rounded-full mt-2"
              src={trip.driver_pic}
              alt={`${trip.driver_name}'s picture`}
            />
          </div>

          {/* Car Information */}
          <div>
            <h3 className="text-lg font-bold">Car Information</h3>
            <p>
              <strong>Car Make & Model:</strong> {trip.car_make}{" "}
              {trip.car_model}
            </p>
            <img
              className="w-32 h-32 mt-2"
              src={trip.car_pic}
              alt={`${trip.car_make} ${trip.car_model}`}
            />
          </div>
        </div>
      </div>

      {/* Reuse the Map Component */}
      <div>
        <h3 className="text-lg font-bold">Map of the Trip</h3>
        <MapComponent
          pickupCoords={{ lat: trip.pickup_lat, lng: trip.pickup_lng }}
          dropoffCoords={{ lat: trip.dropoff_lat, lng: trip.dropoff_lng }}
        />
      </div>
    </div>
  );
};

export default TripDetails;
