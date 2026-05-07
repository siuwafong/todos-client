import { type ReactNode } from "react";

export const Container = ({ children}: { children: ReactNode}) => {
    return (
        <div className="mx-4 my-4">
            {children}
        </div>
    )
}