import { Header } from "./Header"
import { Footer } from "./Footer"
import { Outlet } from "react-router"

export const MainLayout = () => {
    return (
        <>
            <Header />
                <main>
                    <Outlet />
                </main>
            <Footer />
        </>
    )
}