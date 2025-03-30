import { RootState } from "@/app/store";
import { useSelector } from "react-redux";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Link } from "react-router-dom";

export interface IShipment {
    _id: string;
    shipmentId: string;
    containerId: string;
    route: string[];
    currentLocation: string;
    currentETA: string;
    status: string;
}

export function ShipmentTable() {
    const shipments: IShipment[] = useSelector(
        (state: RootState) => state.shipments.shipments
    );
    return (
        <div>
            <div className="p-2">
                {shipments ? (
                    <Table>
                        <TableCaption>A list of all the shipments</TableCaption>
                        <TableHeader>
                            <TableRow className="text-xl">
                                <TableHead className="w-[100px]">
                                    Shipment ID
                                </TableHead>
                                <TableHead>Container ID</TableHead>
                                <TableHead>Current Location</TableHead>
                                <TableHead>
                                    ETA (MM-DD-YYYY , HH:MM:SS)
                                </TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead className="text-right">
                                    Actions
                                </TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {shipments.map((shipment) => (
                                <TableRow
                                    key={shipment._id}
                                    className="text-lg"
                                >
                                    <TableCell className="font-medium">
                                        {shipment.shipmentId}
                                    </TableCell>
                                    <TableCell>
                                        {shipment.containerId}
                                    </TableCell>
                                    <TableCell>
                                        {" "}
                                        {shipment.currentLocation}{" "}
                                    </TableCell>
                                    <TableCell>
                                        {" "}
                                        {shipment.currentETA ? (
                                            <span>
                                                {" "}
                                                {new Date(
                                                    shipment.currentETA
                                                ).toLocaleString()}
                                            </span>
                                        ) : (
                                            "N/A"
                                        )}{" "}
                                    </TableCell>
                                    <TableCell> {shipment.status} </TableCell>
                                    <TableCell className="text-right">
                                        <Link
                                            to={`/shipment/${shipment.shipmentId}`}
                                        >
                                            View in Map
                                        </Link>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                ) : (
                    "No Shipment Found"
                )}
            </div>
        </div>
    );
}
