import express, { Router } from "express";
import { z } from "zod";
import Shipment from "./models/Shipment";

const appRouter: Router = express.Router();

appRouter.get("/", (req, res) => {
    res.send("Hello, World!");
});

const CreateShipmentInputs = z.object({
    shipmentId: z.string(),
    containerId: z.string(),
    route: z.array(z.string()),
    currentLocation: z.string(),
    currentETA: z.string(),
    status: z.enum(["In Transit", "Delivered", "Pending"]).default("Pending"),
});

appRouter.post("/shipment", async (req, res) => {
    try {
        const reqBody = await req.body;
        const { success, error } = CreateShipmentInputs.safeParse(reqBody);

        if (!success) {
            res.status(400).json({ error: "Invalid input" });
            console.error("Invalid input", error);

            return;
        }

        const {
            shipmentId,
            containerId,
            route,
            currentLocation,
            currentETA,
            status,
        } = reqBody;

        const newShipment = await Shipment.create({
            shipmentId,
            containerId,
            route,
            currentLocation,
            currentETA,
            status,
        });

        console.log("New Shipment Created", newShipment);
        res.status(201).json(newShipment);
    } catch (error) {
        console.error("Error at /shipment", error);
        res.status(500).json({ error: "Failed to create shipment" });
        return;
    }
});

appRouter.get("/shipments", async (req, res) => {
    try {
        const shipments = await Shipment.find();
        res.json(shipments);
    } catch (error) {
        console.error("Error at /shipments", error);
        res.status(500).json({ error: "Failed to get shipments" });
        return;
    }
});

appRouter.get("/shipment/:id", async (req, res) => {
    try {
        const shipment = await Shipment.findOne({ shipmentId: req.params.id });
        if (!shipment) {
            res.status(404).json({ error: "Shipment not found" });
            return;
        }
        res.json(shipment);
    } catch (error) {
        console.error("Error at /shipment/:id", error);
        res.status(500).json({ error: "Failed to get shipment" });
        return;
    }
});

appRouter.get("/shipment/:id/eta", async (req, res) => {
    try {
        const shipment = await Shipment.findOne({ shipmentId: req.params.id });
        if (!shipment) {
            res.status(404).json({ error: "Shipment not found" });
            return;
        }
        const currentETA = shipment.currentETA;
        res.json({ currentETA });
    } catch (error) {
        console.error("Error at /shipment/:id/eta", error);
        res.status(500).json({ error: "Failed to get ETA" });
        return;
    }
});

appRouter.put("/shipment/:id/update-location", async (req, res) => {
    try {
        const shipment = await Shipment.findOne({ shipmentId: req.params.id });
        if (!shipment) {
            res.status(404).json({ error: "Shipment not found" });
            return;
        }
        shipment.currentLocation = req.body.currentLocation;
        await shipment.save();
        res.json(shipment);
    } catch (error) {
        console.error("Error at /shipment/:id/update-location", error);
        res.status(500).json({ error: "Failed to update location" });
        return;
    }
});

export default appRouter;
