import { useEffect, useState } from "react";
import Script from "next/script";

export default function Home() {
  const [map, setMap] = useState(null);
  const [directionsRenderer, setDirectionsRenderer] = useState(null);
  const [from, setFrom] = useState("");
  const [destination, setDestination] = useState("");
  const [distance, setDistance] = useState("");

  useEffect(() => {
    if (typeof window !== "undefined" && window.google) {
      initAutocomplete("from", setFrom);
      initAutocomplete("destination", setDestination);
    }
  }, []);

  const initMap = () => {
    const mapInstance = new google.maps.Map(document.getElementById("map"), {
      center: { lat: 12.9716, lng: 77.5946 }, // Default to Bangalore, India
      zoom: 13,
    });
    setMap(mapInstance);

    const renderer = new google.maps.DirectionsRenderer();
    renderer.setMap(mapInstance);
    setDirectionsRenderer(renderer);
  };

  const calculateRoute = () => {
    if (from && destination && directionsRenderer) {
      const directionsService = new google.maps.DirectionsService();
      directionsService.route(
        {
          origin: from,
          destination: destination,
          travelMode: google.maps.TravelMode.DRIVING,
        },
        (result, status) => {
          if (status === google.maps.DirectionsStatus.OK) {
            directionsRenderer.setDirections(result);
            const route = result.routes[0];
            const dist = route.legs[0].distance.text;
            setDistance(dist);
          } else {
            console.error("Directions request failed due to: " + status);
          }
        }
      );
    }
  };

  const initAutocomplete = (inputId, setState) => {
    const input = document.getElementById(inputId);
    if (!input) return;
    const autocomplete = new google.maps.places.Autocomplete(input);
    autocomplete.addListener("place_changed", () => {
      const place = autocomplete.getPlace();
      setState(place.formatted_address || place.name);
    });
  };

  return (
    <>
      <Script
        src={`https://maps.googleapis.com/maps/api/js?key=AIzaSyCuZXzhCHlT5MejWNdiHtZe9ouxxzEAQC4&libraries=places`}
        onLoad={initMap}
      />
      <div style={{ padding: "20px" }}>
        <h1>Map Route Finder</h1>
        <div>
          <input
            id="from"
            type="text"
            placeholder="Enter starting location"
            value={from}
            onChange={(e) => setFrom(e.target.value)}
            style={{ width: "300px", marginRight: "10px", padding: "5px" }}
          />
          <input
            id="destination"
            type="text"
            placeholder="Enter destination"
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
            style={{ width: "300px", padding: "5px" }}
          />
        </div>
        <button
          onClick={calculateRoute}
          style={{
            marginTop: "10px",
            padding: "10px 20px",
            backgroundColor: "#007bff",
            color: "#fff",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          Show Route
        </button>
        <div style={{ marginTop: "10px" }}>
          {distance && <p>Distance: {distance}</p>}
        </div>
      </div>
      <div
        id="map"
        style={{
          height: "500px",
          width: "100%",
          marginTop: "20px",
          border: "1px solid #ddd",
        }}
      ></div>
    </>
  );
}
