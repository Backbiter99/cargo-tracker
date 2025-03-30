import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { IShipment } from "./ShipmentTable";
import { useState } from "react";
import axios from "axios";
import { backendUrl } from "@/lib/config";

export default function UpdateShipmentLocation({
    setIsUpdatingLocation,
    shipment,
}: {
    setIsUpdatingLocation: (arg: boolean) => void;
    shipment: IShipment;
}) {
    const [newLatitude, setNewLatitude] = useState("");
    const [newLongitude, setNewLongitude] = useState("");

    async function handleUpdate() {
        try {
            if (newLatitude !== "" && newLongitude !== "") {
                const res = await axios.put(
                    `${backendUrl}/api/v1/shipment/${shipment.shipmentId}/update-location`,
                    {
                        currentLocation: `${newLatitude} ${newLongitude}`,
                    }
                );
                console.log("Location Updated:", res.data);
                setIsUpdatingLocation(false);
            }
        } catch (error) {
            console.error("Error updating location:", error);
        }
    }

    return (
        <Card className="w-[350px]">
            <CardHeader>
                <CardTitle>Update Location</CardTitle>
                <CardDescription>
                    The current location of the shipment will be updated to the
                    new location.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <form>
                    <div className="grid w-full items-center gap-4">
                        <div className="flex flex-col space-y-1.5">
                            <Label htmlFor="new-latitude">New Latitude</Label>

                            <Input
                                id="new-latitude"
                                placeholder="Enter new latitude"
                                required
                                onChange={(e) => {
                                    setNewLatitude(e.target.value);
                                }}
                                value={newLatitude}
                            />
                        </div>
                        <div className="flex flex-col space-y-1.5">
                            <Label htmlFor="new-longitude">New Longitude</Label>

                            <Input
                                id="new-longitude"
                                placeholder="Enter new longitude"
                                required
                                onChange={(e) => {
                                    setNewLongitude(e.target.value);
                                }}
                                value={newLongitude}
                            />
                        </div>
                    </div>
                </form>
            </CardContent>
            <CardFooter className="flex justify-between">
                <Button
                    variant="outline"
                    className="cursor-pointer"
                    onClick={() => {
                        setIsUpdatingLocation(false);
                    }}
                >
                    Cancel
                </Button>
                <Button className="cursor-pointer" onClick={handleUpdate}>
                    Update Location
                </Button>
            </CardFooter>
        </Card>
    );
}
