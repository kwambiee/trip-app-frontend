import React from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FaStar,
  FaStarHalfAlt,
  FaRegStar,
  FaCheckCircle,
  FaTimesCircle,
  FaSpinner,
} from "react-icons/fa";
import { FaCircleArrowLeft } from "react-icons/fa6"; 

const TripResults = ({ trips, loading }) => {
  const navigate = useNavigate();

  
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
        return <FaCheckCircle className="text-green-500" size={24} />; 
      } else if (status === "CANCELED") {
        return <FaTimesCircle className="text-red-500" size={24} />; 
      }
      return null;
    };

  return (
    <>
    <div>
      <button onClick={() => navigate(-1)} className="">
        <FaCircleArrowLeft className="mr-2" size={30} />
        </button>
    </div>
    <div className="">
      <h2 className="text-xl font-bold text-center">Search Results</h2>
      {loading ? (
        // Show loading icon or spinner when loading
        <div className="flex justify-center items-center text-center  mt-4 ">
          {/* Loading spinner */}
          <FaSpinner className="animate-spin text-3xl text-indigo-500" size={40}/>
          <p className="ml-2 text-indigo-500 ">Loading trips...</p>
        </div>
      ) : (
        <>
      <p className="text-sm text-gray-500 text-center">{trips.length} trip(s) found</p>
      <div className="mx-auto w-1/2 mt-4 grid grid-cols-1 gap-6">
        {trips.map((trip) => (
          <div
            key={trip.id}
            className="bg-white p-8 rounded-lg shadow-md flex flex-col justify-between space-y-2"
          >
            <div className="flex justify-between">
              {/* Trip Start Time */}
              <p className="text-gray-500">
                Trip Date: {new Date(trip.pickup_date).toLocaleString()}
              </p>
              {/* Trip Final Cost */}
              <p className="font-semibold text-gray-800">
                Trip Cost: {trip.cost} {trip.cost_unit}
              </p>
            </div>

            {/* Pickup & Dropoff Locations */}
            <div>
              <p className="text-gray-700">
                Pickup: <span className="text-green-500">●</span> {trip.pickup_location}
              </p>
              <p className="text-gray-700">
                Dropoff: <span className="text-red-500">●</span> {trip.dropoff_location}
              </p>
            </div>

            {/* Driver Rating */}
            <div className="flex items-center space-x-2">
              <p className="font-medium text-gray-700">Driver Rating:</p>
              <div className="flex items-center">
                {renderStars(trip.driver_rating)}
              </div>
            </div>

            {/* Trip Status */}
            <div className="flex items-center justify-between">
              <p className="font-medium text-gray-700">{trip.status}</p>
              {renderStatusIcon(trip.status)}
            </div>

            {/* View Details Link */}
            <Link
              to={`/trips/${trip.id}`}
              className="text-indigo-600 hover:underline"
            >
              View Details
            </Link>
          </div>
        ))}
      </div>
      </>
      )}
    </div>
    </>
  );
};

export default TripResults;
