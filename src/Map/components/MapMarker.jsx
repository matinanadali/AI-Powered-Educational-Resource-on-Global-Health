import { Marker, Popup } from "react-leaflet";
import { useState } from "react";
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { useGlobalContext } from "../../GlobalPrompt";

const customIcon = new L.Icon({
  iconUrl: '/src/Assets/marker.png', 
  iconSize: [25, 30], 
  iconAnchor: [12, 41], 
  popupAnchor: [1, -30], 
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.3.4/images/marker-shadow.png',
  shadowSize: [41, 41]
});

const MapMarker = ({ location }) => {
  const [generatedText, setGeneratedText] = useState("");
  const [error, setError] = useState("");

  const {globalPrompt, setGlobalPrompt} = useGlobalContext();

  const prompt = location.prompt + globalPrompt;
  const name = location.name;
  const title = location.title;
  const position = location.position;


  // Function to call the backend and generate text
  const handleGenerateText = async () => {
    setError(""); // Reset error state before the request
    try {
      // Sending prompt to the backend
      const response = await fetch("http://localhost:3000/generate-text", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt }), // Passing the prompt to the backend
      });

      const data = await response.json();

      // Handle the response
      if (data.generatedText) {
        setGeneratedText(data.generatedText); // Update generated text
      } else {
        setError(data.error || "An error occurred while generating content.");
      }
    } catch (err) {
      console.error("Error during fetch:", err);
      setError("An error occurred while generating content.");
    }
  };

  const handleMarkerClick = () => {
    handleGenerateText(); // Start the text generation after marker click
  };

  return (
    <Marker position={position} eventHandlers={{ click: handleMarkerClick }} icon={customIcon}>
        <Popup>
          <h3>{name}</h3>
          <h4>{title}</h4>
          {generatedText}
          {error && <p style={{ color: 'red' }}><strong>Error:</strong> {error}</p>}
        </Popup>
    </Marker>
  );
};

export default MapMarker;
