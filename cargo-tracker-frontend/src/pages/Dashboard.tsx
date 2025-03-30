import Appbar from "@/components/Appbar";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { backendUrl } from "@/lib/config";
import { setShipment } from "../features/shipment/shipmentSlice";
import { ShipmentTable } from "@/components/ShipmentTable";
import { RootState } from "@/app/store";

export default function Dashboard() {
    const dispatch = useDispatch();
    const isRender = useSelector(
        (state: RootState) => state.renderShipment.isRender
    );

    useEffect(() => {
        async function fetchData() {
            const { data } = await axios.get(`${backendUrl}/api/v1/shipments`);
            console.log(data);
            dispatch(setShipment(data));
        }

        fetchData();
    }, [isRender]);

    return (
        <div>
            <Appbar />
            <ShipmentTable />
        </div>
    );
}
