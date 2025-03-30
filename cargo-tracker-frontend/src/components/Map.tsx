import { LatLngTuple } from "leaflet";
import {
    MapContainer,
    TileLayer,
    Marker,
    Polyline,
    Popup,
} from "react-leaflet";
import "leaflet/dist/leaflet.css"; // Important: Don't forget to import the CSS

// Fixing the Leaflet marker icon issue
import L from "leaflet";
import icon from "leaflet/dist/images/marker-icon.png";
import iconShadow from "leaflet/dist/images/marker-shadow.png";
import { useEffect } from "react";

// Define CSS as a string
const redMarkerStyle = `
  .red-marker {
    filter: hue-rotate(140deg) brightness(1.5);
  }
`;

// Fix the default icon issue
let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41],
});

// Create a red icon for current location
let RedIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    className: "red-marker", // We'll use this for styling
});

L.Marker.prototype.options.icon = DefaultIcon;

const defaultCenter: LatLngTuple = [28.7041, 77.1025]; // Default: New Delhi

export default function Map({
    location,
    route,
}: {
    location?: LatLngTuple;
    route?: LatLngTuple[];
}) {
    // Add the CSS to the document when the component mounts
    useEffect(() => {
        // Create style element
        const styleEl = document.createElement("style");
        styleEl.innerHTML = redMarkerStyle;
        document.head.appendChild(styleEl);

        // Clean up when component unmounts
        return () => {
            document.head.removeChild(styleEl);
        };
    }, []);

    return (
        <div
            className="map-container"
            style={{
                height: "400px",
                width: "100%",
                border: "1px solid #ccc",
                borderRadius: "8px",
                overflow: "hidden",
                marginBottom: "20px",
            }}
        >
            <MapContainer
                center={location || defaultCenter}
                zoom={8}
                scrollWheelZoom={false}
                style={{ height: "100%", width: "100%" }}
            >
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />

                {location && (
                    <Marker position={location} icon={RedIcon}>
                        <Popup>Current Location</Popup>
                    </Marker>
                )}

                {route && route.length > 0 && (
                    <>
                        {/* Start marker */}
                        <Marker key="start" position={route[0]}>
                            <Popup>Start Point</Popup>
                        </Marker>

                        {/* End marker */}
                        <Marker key="end" position={route[route.length - 1]}>
                            <Popup>End Point</Popup>
                        </Marker>

                        {/* Route line */}
                        <Polyline
                            positions={route}
                            color="blue"
                            weight={4}
                            opacity={0.7}
                            dashArray="5, 10"
                        />
                    </>
                )}
            </MapContainer>
        </div>
    );
}
