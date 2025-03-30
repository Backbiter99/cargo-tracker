import { model, models, Schema } from "mongoose";

const shipmentSchema = new Schema({
    shipmentId: { type: String, required: true, unique: true },
    containerId: { type: String, required: true, unique: true },
    route: [{ type: String, required: true }], // Two elements, both having a latitude and longitude pair representing the start and end points of the route eg ["lat long", "lat long"]
    currentLocation: { type: String }, // Latitude and longitude pair representing the current location of the shipment eg "lat long"
    currentETA: { type: Date },
    status: {
        type: String,
        enum: ["In Transit", "Delivered", "Pending"],
        default: "Pending",
    },
});

const Shipment = models.shipments || model("Shipment", shipmentSchema);

export default Shipment;
