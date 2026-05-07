import { useState, useEffect } from "react"
import { Header } from "./Header"
import { Footer } from "./Footer"
import { Outlet } from "react-router"

export const MainLayout = () => {
    const [isDarkMode, setIsDarkMode] = useState(
        () => document.documentElement.classList.contains("dark")
    )

    useEffect(() => {
        document.documentElement.classList.toggle("dark", isDarkMode)
    }, [isDarkMode])

    return (
        <div className="min-h-screen">
            <Header isDarkMode={isDarkMode} onToggleTheme={() => setIsDarkMode(prev => !prev)} />
                <main className="h-full">
                    <Outlet />
                </main>
            <Footer />
        </div>
    )
}