import { NavLink } from "react-router";
import { Button } from "@/components/ui/button";
import { Moon, Sun } from "lucide-react";

type HeaderProps = {
    isDarkMode?: boolean;
    onToggleTheme?: () => void;
};

export function Header({
                           isDarkMode = false,
                           onToggleTheme,
                       }: HeaderProps) {
    const navLinkClass = ({ isActive }: { isActive: boolean }) =>
        [
            "rounded-md px-3 py-2 text-sm font-medium transition-colors",
            isActive
                ? "bg-white/20 text-white"
                : "text-white/80 hover:bg-white/10 hover:text-white",
        ].join(" ");

    return (
        <header className="border-b border-blue-700 bg-blue-600">
            <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
                {/* Left: logo */}
                <NavLink
                    to="/"
                    className="flex items-center gap-2 rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70"
                >
                    <div className="flex h-9 w-9 items-center justify-center rounded-md bg-white text-blue-600 font-bold">
                        L
                    </div>
                    <span className="text-sm font-semibold text-white">
            Logo
          </span>
                </NavLink>

                {/* Middle: nav */}
                <nav className="flex items-center gap-2">
                    <NavLink to="/" className={navLinkClass} end>
                        Home
                    </NavLink>
                    <NavLink to="/about" className={navLinkClass}>
                        About
                    </NavLink>
                </nav>

                {/* Right: theme toggle */}
                <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={onToggleTheme}
                    aria-label="Toggle theme"
                    className="text-white hover:bg-white/10 hover:text-white"
                >
                    {isDarkMode ? (
                        <Sun className="h-5 w-5" />
                    ) : (
                        <Moon className="h-5 w-5" />
                    )}
                </Button>
            </div>
        </header>
    );
}