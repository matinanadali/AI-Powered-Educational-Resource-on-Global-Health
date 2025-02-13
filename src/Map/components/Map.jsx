import React, { useRef, useState, useEffect } from "react";
import { MapContainer, TileLayer } from "react-leaflet";
import { Box } from '@mui/material';
import background from "../../Assets/map.png";
import "leaflet/dist/leaflet.css";
import MapMarker from "./MapMarker";

const Map = () => {
  const mapRef = useRef(null);
  const latitude = 40;
  const longitude = 0;

  const [locations, setLocations] = useState([]);

  useEffect(() => {
    // Assuming you're fetching data from a local file or an API
    const fetchLocations = async () => {
      const response = await fetch("/public/locations.json");
      const data = await response.json();
      setLocations(data);
    };

    fetchLocations();
  }, []);

  if (!locations || locations.length === 0) {
    return <Box
    sx={{
      width: "100vw",
      height: "100vh",
      background: `linear-gradient(rgba(255, 255, 255, 0.65), rgba(255, 255, 255, 0.65)), url(${background})`,
      backgroundSize: "cover",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      flexDirection: "column",
    }}
  >Loading...</Box>
  }
  const position = [51.505, -0.09];
  const popupText = "Hello, I am a custom marker!";
  return (
    <MapContainer
      center={[latitude, longitude]}
      zoom={2}
      ref={mapRef}
      style={{ height: "100vh", width: "100vw" }}
      dragging={false}
      zoomControl={false}
      scrollWheelZoom={false}
      doubleClickZoom={false}
      touchZoom={false}
    >
      <TileLayer
        attribution="Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community"
        url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
      />
      {locations.map((location, index) => (
        <MapMarker
          location = {location}
          key={index}
        ></MapMarker>
      ))}
    </MapContainer>
  );
};

export default Map;
