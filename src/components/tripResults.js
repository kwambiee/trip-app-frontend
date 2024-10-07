import React from "react";
import { Link } from "react-router-dom";
import { FaStar, FaStarHalfAlt, FaRegStar, FaCheckCircle, FaTimesCircle } from 'react-icons/fa'; 

const TripResults = ({ trips }) => {

    const renderStars = (rating) => {
      const stars = [];
      for (let i = 1; i <= 5; i++) {
        if (i <= rating) {
          stars.push(<FaStar key={i} className="text-yellow-500" />); 
        } else if (i - rating < 1) {
          stars.push(<FaStarHalfAlt key={i} className="text-yellow-500" />); 
        } else {
          stars.push(<FaRegStar key={i} className="text-yellow-500" />); 
        }
      }
      return stars;
    };

    const renderStatusIcon = (status) => {
      if (status === "COMPLETED") {
        return <FaCheckCircle className="text-green-500" size={24} />; // Green tick for completed
      } else if (status === "CANCELED") {
        return <FaTimesCircle className="text-red-500" size={24} />; // Red cross for canceled
      }
      return null;
    };
  return (
    <div className="mt-8">
      <h2 className="text-xl font-bold">Search </h2>
      <p className="text-sm text-gray-500">{trips.length} trip(s) found</p>
      <div className="mt-4 space-y-4">
        {trips.map((trip) => (
          <div
            key={trip.id}
            className="bg-white p-4 rounded-lg shadow-md space-y-2"
          >
            <p>
              <strong>Trip Start Time:</strong>{" "}
              {new Date(trip.pickup_date).toLocaleString()}
            </p>
            <p>
              <strong>Trip Final Cost:</strong> {trip.cost} {trip.cost_unit}
            </p>
            <p>
              <strong>Pickup Location:</strong> {trip.pickup_location}
            </p>
            <p>
              <strong>Dropoff Location:</strong> {trip.dropoff_location}
            </p>
            {/* Rating */}
            <div className="flex items-center space-x-2">
              <p>
                <strong>Driver Rating:</strong>
              </p>
              <div className="flex items-center space-x-2">
                <p>
                  <strong>Driver Rating:</strong>
                </p>
                <div className="flex items-center">
                  {renderStars(trip.driver_rating)}
                </div>
              </div>
            </div>

            {/* Trip Status */}
            {/* Trip Status */}
            <div className="flex items-center space-x-2">
              <p>
                <strong>Trip Status:</strong> {trip.status}
              </p>
              {renderStatusIcon(trip.status)}
            </div>
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
