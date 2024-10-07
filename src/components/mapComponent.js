import React from "react";
import { GoogleMap, Marker } from "@react-google-maps/api";

const MapComponent = ({ pickupCoords, dropoffCoords }) => {
  // Google Maps container style
  const mapStyles = {
    height: "400px",
    width: "100%",
  };

  // Define the center point for the map (set it to pickup coordinates)
  const center = {
    lat: pickupCoords.lat,
    lng: pickupCoords.lng,
  };

  return (
   
      <GoogleMap mapContainerStyle={mapStyles} center={center} zoom={15}>
        {/* Marker for Pickup Location */}
        <Marker position={pickupCoords} label="Pickup" />
        {/* Marker for Dropoff Location */}
        <Marker position={dropoffCoords} label="Dropoff" />
      </GoogleMap>
    
  );
};

export default MapComponent;
