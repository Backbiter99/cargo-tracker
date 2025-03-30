import { createSlice } from "@reduxjs/toolkit";

export const shipmentSlice = createSlice({
    name: "shipment",
    initialState: {
        shipments: [],
    },
    reducers: {
        setShipment: (state, action) => {
            state.shipments = action.payload;
        },
    },
});

export const { setShipment } = shipmentSlice.actions;

export default shipmentSlice.reducer;
