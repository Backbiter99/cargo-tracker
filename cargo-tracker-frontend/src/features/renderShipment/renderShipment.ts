import { createSlice } from "@reduxjs/toolkit";

export const renderShipmentSlice = createSlice({
    name: "renderShipment",
    initialState: {
        isRender: false,
    },
    reducers: {
        setIsRenderShipment: (state) => {
            state.isRender = !state.isRender;
        },
    },
});

export const { setIsRenderShipment } = renderShipmentSlice.actions;

export default renderShipmentSlice.reducer;
