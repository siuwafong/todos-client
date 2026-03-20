import { Header } from "./Header"
import { Footer } from "./Footer"
import { Outlet } from "react-router"

export const MainLayout = () => {
    return (
        <div className="min-h-[100vh]">
            <Header />
                <main>
                    <Outlet />
                </main>
            <Footer />
        </div>
    )
}