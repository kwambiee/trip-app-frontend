import React from "react";
import { Link } from "react-router-dom";

const TripResults = ({ trips }) => {
  return (
    <div className="mt-8">
      <h2 className="text-xl font-bold">Search Results</h2>
      <p className="text-sm text-gray-500">{trips.length} trip(s) found</p>
      <div className="mt-4 space-y-4">
        {trips.map((trip) => (
          <div
            key={trip.id}
            className="bg-white p-4 rounded-lg shadow-md space-y-2"
          >
            <p>
              <strong>Pickup:</strong> {trip.pickup_location}
            </p>
            <p>
              <strong>Dropoff:</strong> {trip.dropoff_location}
            </p>
            <p>
              <strong>Status:</strong> {trip.status}
            </p>
            <Link
              to={`/trips/${trip.id}`}
              className="text-indigo-600 hover:underline"
            >
              View Details
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TripResults;
