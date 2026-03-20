// import { NavLink } from "react-router";

export function Footer() {
    // const navLinkClass = ({ isActive }: { isActive: boolean }) =>
    //     [
    //         "text-sm transition-colors",
    //         isActive
    //             ? "text-white"
    //             : "text-white/80 hover:text-white",
    //     ].join(" ");

    return (
        <footer className="border-t border-blue-700 bg-blue-600 bottom-0 absolute w-full">
            <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-4 py-6 md:flex-row">
                {/* Left: copyright */}
                <div className="text-sm text-white/80">
                    © Wilson Fong 2026
                </div>

                {/* Right: nav links */}
                {/*<nav className="flex items-center gap-4">*/}
                {/*    <NavLink to="/" className={navLinkClass} end>*/}
                {/*        Home*/}
                {/*    </NavLink>*/}
                {/*    <NavLink to="/about" className={navLinkClass}>*/}
                {/*        About*/}
                {/*    </NavLink>*/}
                {/*</nav>*/}
            </div>
        </footer>
    );
}