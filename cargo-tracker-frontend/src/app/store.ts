import { configureStore } from "@reduxjs/toolkit";
import shipmentsReducer from "../features/shipment/shipmentSlice";
import renderShipmentReducer from "../features/renderShipment/renderShipment";

export const store = configureStore({
    reducer: {
        shipments: shipmentsReducer,
        renderShipment: renderShipmentReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
