import { Outlet } from "react-router";
import { FeatureProvider } from "@/context/FeatureProvider";

export const FeatureLayout = () => {
    return (
        <FeatureProvider>
            <Outlet />
        </FeatureProvider>
    )
}