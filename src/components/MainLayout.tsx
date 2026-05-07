import { Header } from "./Header"
import { Footer } from "./Footer"
import { Outlet } from "react-router"

export const MainLayout = () => {
    return (
        <div className="min-h-screen">
            <Header />
                <main className="h-full">
                    <Outlet />
                </main>
            <Footer />
        </div>
    )
}