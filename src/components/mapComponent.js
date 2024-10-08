import React from "react";
import { GoogleMap, Marker } from "@react-google-maps/api";
import {FaLocationPin} from "react-icons/fa";

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
    <GoogleMap
      mapContainerStyle={mapStyles}
      center={center}
      zoom={15}
    >
      {/* Marker for Pickup Location */}
      <Marker
        position={pickupCoords}
        label="Pickup"
        icon={{
          url: "https://img.icons8.com/?size=100&id=7880&format=png&color=000000", 
          scaledSize: new window.google.maps.Size(30, 30), 
        }}
      />
      {/* Marker for Dropoff Location */}
      <Marker
        position={dropoffCoords}
        label="Dropoff"
        icon={{
          url: "https://img.icons8.com/?size=100&id=7880&format=png&color=000000", 
          scaledSize: new window.google.maps.Size(30, 30), 
        }}
      />
    </GoogleMap>
  );
};

export default MapComponent;
