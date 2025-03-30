import { Button } from "./ui/button";
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
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { backendUrl } from "@/lib/config";
import axios from "axios";
import { useState } from "react";
import { useDispatch } from "react-redux";
import CurrentETA from "./CurrentETA";
import { setIsRenderShipment } from "@/features/renderShipment/renderShipment";

export default function AddShipmentTable({
    setIsFormOpen,
}: {
    setIsFormOpen: (arg: boolean) => void;
}) {
    const dispatch = useDispatch();

    const [shipmentId, setShipmentId] = useState<string>("");
    const [containerId, setContainerId] = useState<string>("");
    const [status, setStatus] = useState<string>("");
    const [eta, setEta] = useState<string>("");
    const [currentLatitude, setCurrentLatitude] = useState<string>("");
    const [currentLongitude, setCurrentLongitude] = useState<string>("");
    const [originLatitude, setOriginLatitude] = useState<string>("");
    const [originLongitude, setOriginLongitude] = useState<string>("");
    const [destinationLatitude, setDestinationLatitude] = useState<string>("");
    const [destinationLongitude, setDestinationLongitude] =
        useState<string>("");

    async function handleAddShipment() {
        if (
            shipmentId !== "" &&
            containerId !== "" &&
            status !== "" &&
            eta !== "" &&
            currentLatitude !== "" &&
            currentLongitude !== "" &&
            originLatitude !== "" &&
            originLongitude !== "" &&
            destinationLatitude !== "" &&
            destinationLongitude !== ""
        ) {
            setIsFormOpen(false);
            const res = await axios.post(`${backendUrl}/api/v1/shipment`, {
                shipmentId,
                containerId,
                status,
                currentETA: eta,
                currentLocation: `${currentLatitude} ${currentLongitude}`,
                route: [
                    `${originLatitude} ${originLongitude}`,
                    `${destinationLatitude} ${destinationLongitude}`,
                ],
            });

            console.log("Shipment Created:", res.data);
            dispatch(setIsRenderShipment());
        }
    }

    return (
        <div className="z-10 flex justify-center items-center fixed top-0 left-0 w-full h-full backdrop-blur-sm">
            <Card className="w-fit">
                <CardHeader>
                    <CardTitle>Create Shipment</CardTitle>
                    <CardDescription>
                        Add a new shipment for tracking.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form>
                        <div className="grid w-full items-center gap-4">
                            <div className="flex flex-col space-y-1.5">
                                <Label htmlFor="shipment-id">Shipment ID</Label>
                                <Input
                                    id="shipment-id"
                                    placeholder="Shipment ID"
                                    required
                                    onChange={(e) => {
                                        setShipmentId(e.target.value);
                                    }}
                                    value={shipmentId}
                                />
                            </div>
                            <div className="flex flex-col space-y-1.5">
                                <Label htmlFor="container-id">
                                    Container ID
                                </Label>
                                <Input
                                    id="container-id"
                                    placeholder="Container ID"
                                    required
                                    onChange={(e) => {
                                        setContainerId(e.target.value);
                                    }}
                                    value={containerId}
                                />
                            </div>
                            <div className="flex flex-col space-y-1.5">
                                <Label htmlFor="status">Status</Label>
                                <Select
                                    onValueChange={(value) => setStatus(value)}
                                >
                                    <SelectTrigger id="status">
                                        <SelectValue placeholder="Select" />
                                    </SelectTrigger>
                                    <SelectContent position="popper">
                                        <SelectItem value="In Transit">
                                            In Transit
                                        </SelectItem>
                                        <SelectItem value="Pending">
                                            Pending
                                        </SelectItem>
                                        <SelectItem value="Delivered">
                                            Delivered
                                        </SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <CurrentETA eta={eta} setEta={setEta} />
                            <div className="flex gap-2">
                                <div className="flex flex-col space-y-1.5">
                                    <Label htmlFor="latitude">
                                        Current Location (Latitude):
                                    </Label>
                                    <Input
                                        id="latitude"
                                        placeholder="Latitude"
                                        required
                                        onChange={(e) => {
                                            setCurrentLatitude(e.target.value);
                                        }}
                                        value={currentLatitude}
                                    />
                                </div>
                                <div className="flex flex-col space-y-1.5">
                                    <Label htmlFor="current-longitude">
                                        Current Location (Longitude):
                                    </Label>
                                    <Input
                                        id="current-longitude"
                                        placeholder="Longitude"
                                        required
                                        onChange={(e) => {
                                            setCurrentLongitude(e.target.value);
                                        }}
                                        value={currentLongitude}
                                    />
                                </div>
                            </div>
                            <div className="flex gap-2">
                                <div className="flex flex-col space-y-1.5">
                                    <Label htmlFor="origin-latitude">
                                        Origin Location (Latitude):
                                    </Label>
                                    <Input
                                        id="origin-latitude"
                                        placeholder="Origin Latitude"
                                        required
                                        onChange={(e) => {
                                            setOriginLatitude(e.target.value);
                                        }}
                                        value={originLatitude}
                                    />
                                </div>
                                <div className="flex flex-col space-y-1.5">
                                    <Label htmlFor="origin-longitude">
                                        Origin Location (Longitude):
                                    </Label>
                                    <Input
                                        id="origin-longitude"
                                        placeholder="Origin Longitude"
                                        required
                                        onChange={(e) => {
                                            setOriginLongitude(e.target.value);
                                        }}
                                        value={originLongitude}
                                    />
                                </div>
                            </div>
                            <div className="flex gap-2">
                                <div className="flex flex-col space-y-1.5">
                                    <Label htmlFor="destination-latitude">
                                        Destination Location (Latitude):
                                    </Label>
                                    <Input
                                        id="destination-latitude"
                                        placeholder="Destination Latitude"
                                        required
                                        onChange={(e) => {
                                            setDestinationLatitude(
                                                e.target.value
                                            );
                                        }}
                                        value={destinationLatitude}
                                    />
                                </div>
                                <div className="flex flex-col space-y-1.5">
                                    <Label htmlFor="destination-longitude">
                                        Destination Location (Longitude):
                                    </Label>
                                    <Input
                                        id="destination-longitude"
                                        placeholder="Destination Longitude"
                                        required
                                        onChange={(e) => {
                                            setDestinationLongitude(
                                                e.target.value
                                            );
                                        }}
                                        value={destinationLongitude}
                                    />
                                </div>
                            </div>
                        </div>
                    </form>
                </CardContent>
                <CardFooter className="flex justify-between">
                    <Button
                        className="cursor-pointer"
                        variant="outline"
                        onClick={() => {
                            setIsFormOpen(false);
                        }}
                    >
                        Cancel
                    </Button>
                    <Button
                        className="cursor-pointer"
                        onClick={handleAddShipment}
                    >
                        Add Shipment
                    </Button>
                </CardFooter>
            </Card>
        </div>
    );
}
