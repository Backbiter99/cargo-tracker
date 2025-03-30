import { useState } from "react";
import { ModeToggle } from "./mode-toggle";
import { Button } from "./ui/button";
import AddShipmentTable from "./AddShipmentTable";
import { Link } from "react-router-dom";

export default function Appbar({ showAddButton = true }) {
    const [isFormOpen, setIsFormOpen] = useState(false);

    function handleAddShipment() {
        setIsFormOpen(true);
    }

    return (
        <>
            <div className="flex items-center justify-between px-6 py-4">
                <Link to="/" className="font-bold text-3xl cursor-pointer">
                    Shipment Tracker
                </Link>
                <div className="flex gap-3 items-center">
                    {showAddButton && (
                        <Button
                            size="lg"
                            className="text-lg font-semibold cursor-pointer"
                            onClick={handleAddShipment}
                        >
                            Add Shipment
                        </Button>
                    )}
                    <ModeToggle />
                </div>
            </div>
            {isFormOpen && <AddShipmentTable setIsFormOpen={setIsFormOpen} />}
        </>
    );
}
