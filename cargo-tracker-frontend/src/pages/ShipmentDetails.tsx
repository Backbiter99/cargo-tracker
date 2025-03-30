import Appbar from "@/components/Appbar";
import { backendUrl } from "@/lib/config";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { IShipment } from "@/components/ShipmentTable";
import { Button } from "@/components/ui/button";
import Map from "@/components/Map";
import { LatLngTuple } from "leaflet";
import UpdateShipmentLocation from "@/components/UpdateShipmentLocation";

export default function ShipmentDetails() {
    const { shipmentId } = useParams();
    const [shipment, setShipment] = useState<IShipment>();
    const [isUpdatingLocation, setIsUpdatingLocation] = useState(false);

    function handleUpdateLocation() {
        setIsUpdatingLocation(true);
    }

    useEffect(() => {
        async function fetchShipmentDetails() {
            try {
                const res = await axios.get(
                    `${backendUrl}/api/v1/shipment/${shipmentId}`
                );
                console.log("Shipment Details:", res.data);
                setShipment(res.data);
            } catch (error) {
                console.error("Error fetching shipment details:", error);
            }
        }
        fetchShipmentDetails();
    }, [shipmentId, isUpdatingLocation]);

    // Parse location from "lat long" string to LatLngTuple [lat, long]
    const parseLocation = (locationStr: string): LatLngTuple | undefined => {
        try {
            // For a string like "28.7041 77.1025"
            const parts = locationStr
                .split(" ")
                .map((part) => parseFloat(part.trim()));

            if (parts.length === 2 && !isNaN(parts[0]) && !isNaN(parts[1])) {
                return [parts[0], parts[1]];
            }
            return undefined;
        } catch (e) {
            console.error("Error parsing location:", e);
            return undefined;
        }
    };

    // Parse route from string array to LatLngTuple array
    const parseRoute = (routeArr: string[]): LatLngTuple[] | undefined => {
        try {
            const parsedRoute = routeArr
                .map((point) => parseLocation(point))
                .filter(Boolean) as LatLngTuple[];
            return parsedRoute.length > 0 ? parsedRoute : undefined;
        } catch (e) {
            console.error("Error parsing route:", e);
            return undefined;
        }
    };

    // Parse location and route data
    const location = shipment?.currentLocation
        ? parseLocation(shipment.currentLocation)
        : undefined;
    const route = shipment?.route ? parseRoute(shipment.route) : undefined;

    return (
        <div>
            <Appbar showAddButton={false} />
            <div className="p-4">
                {shipment && location && (
                    <Map location={location} route={route} />
                )}
                <div className="flex justify-center items-center gap-3">
                    {shipment && (
                        <Card className="mt-4 w-fit">
                            <CardHeader>
                                <CardTitle>Shipment Details</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p>Container ID: {shipment.containerId}</p>
                                <p>Status: {shipment.status}</p>
                                <p>
                                    ETA:{" "}
                                    {new Date(
                                        shipment.currentETA
                                    ).toLocaleString()}
                                </p>
                                <p>
                                    Current Location: {shipment.currentLocation}
                                </p>
                            </CardContent>
                            <CardFooter>
                                <Button
                                    className="cursor-pointer w-full"
                                    onClick={handleUpdateLocation}
                                >
                                    Update Location
                                </Button>
                            </CardFooter>
                        </Card>
                    )}
                    {isUpdatingLocation && shipment && (
                        <UpdateShipmentLocation
                            setIsUpdatingLocation={setIsUpdatingLocation}
                            shipment={shipment}
                        />
                    )}
                </div>
            </div>
        </div>
    );
}
