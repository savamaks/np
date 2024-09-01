import { useContext } from "react";
import { StoreContext } from "./provider";

export const useStore = () => {
    const context = useContext(StoreContext);
    if (context === null) {
        throw new Error("You have forgotten to wrap your root component with RootStoreProvider");
    }
    return context;
};
