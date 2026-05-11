import { type ReactNode } from "react";
import { Toaster } from "@/components/ui/sonner"

export const Container = ({ children}: { children: ReactNode}) => {
    return (
        <div className="mx-4 my-4">
            <Toaster />
            {children}
        </div>
    )
}