import React, { useRef, useState, useEffect } from "react";
import { MapContainer, TileLayer, useMap } from "react-leaflet";
import { Box } from "@mui/material";
import background from "/Assets/map.png";
import "leaflet/dist/leaflet.css";
import MapMarker from "./MapMarker";
import Header from "./Header";

const Map = () => {

  // Vertical margin to center map
  const latitude = 40;
  const longitude = 0;

  // To avoid wrapping around the globe
  const maxBounds = L.latLngBounds(L.latLng(-80, 180), L.latLng(90, -180));

  const [locations, setLocations] = useState([]);

  useEffect(() => {
    // Fetch marker locations from local file
    const fetchLocations = async () => {
      const response = await fetch("locations.json");
      const data = await response.json();
      setLocations(data);
    };

    fetchLocations();
  }, []);

  if (!locations || locations.length === 0) {
    // Display loading page
    return (
      <Box
        sx={{
          width: "100vw",
          maxHeight: "100%",
          background: `linear-gradient(rgba(255, 255, 255, 0.65), rgba(255, 255, 255, 0.65)), url(${background})`,
          backgroundSize: "cover",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        Loading...
      </Box>
    );
  }

  return (
    <>
      <Header></Header>
      <MapContainer
        center={[latitude, longitude]}
        zoom={2}
        style={{ height: "85vh", width: "100vw" }}
        zoomControl={false}
        scrollWheelZoom={false}
        doubleClickZoom={false}
        touchZoom={false}
        worldCopyJump={false}
        continuousWorld={false}
        noWrap={true}
        bounceAtZoomLimits={true}
        maxBounds={maxBounds}
      >
        <TileLayer
          attribution="Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community"
          url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
        />
        {locations.map((location, index) => (
          <MapMarker location={location} key={index}></MapMarker>
        ))}
      </MapContainer>
    </>
  );
};

export default Map;
