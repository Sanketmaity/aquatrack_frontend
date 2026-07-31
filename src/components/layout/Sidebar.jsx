import { NavLink, useNavigate } from "react-router-dom";
import { Droplets } from "lucide-react";

import { menuConfig } from "../../config/menuConfig";

export default function Sidebar() {
    const navigate = useNavigate();

    const role = localStorage.getItem("role");

    const menuItems = menuConfig[role] || [];

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("role");
        localStorage.removeItem("email");

        navigate("/login");
    };

    return (
        <aside
            className="
                fixed
                left-0
                top-0
                h-screen
                w-72
                bg-slate-900/95
                backdrop-blur-xl
                text-white
                flex
                flex-col
                border-r
                border-slate-800/80
                shadow-2xl
                relative
                overflow-hidden
                z-50
            "
        >
            {/* ==========================================
                Background Ambient Glows (Water Effects)
            ========================================== */}
            <div className="pointer-events-none absolute -top-20 -left-20 w-56 h-56 bg-blue-600/15 rounded-full blur-3xl animate-pulse" />
            <div className="pointer-events-none absolute bottom-12 -right-20 w-52 h-52 bg-cyan-500/10 rounded-full blur-3xl animate-pulse delay-1000" />

            {/* ==========================================
                Logo Section
            ========================================== */}
            <div className="flex items-center gap-3.5 px-7 py-6 border-b border-slate-800/80 relative z-10">
                <div className="relative group flex items-center justify-center">
                    {/* Glowing pulse behind logo */}
                    <div className="absolute inset-0 bg-blue-500 rounded-xl blur-md opacity-40 group-hover:opacity-75 transition-opacity duration-300 animate-pulse" />

                    <div className="relative flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-tr from-blue-600 to-cyan-500 shadow-lg shadow-blue-500/30 text-white transform group-hover:scale-105 transition-transform duration-300">
                        <Droplets size={24} />
                    </div>
                </div>

                <div>
                    <h2 className="text-xl font-bold tracking-wide bg-gradient-to-r from-white via-slate-100 to-slate-300 bg-clip-text text-transparent">
                        AquaTrack
                    </h2>
                    <div className="flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                        <p className="text-xs text-slate-400 font-medium">
                            Water Management
                        </p>
                    </div>
                </div>
            </div>

            {/* ==========================================
                Menu
            ========================================== */}
            <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto relative z-10">
                {menuItems.map((item) => {
                    const Icon = item.icon;

                    if (item.title === "Logout") {
                        return (
                            <button
                                key={item.title}
                                onClick={handleLogout}
                                className="
                                    group
                                    w-full
                                    flex
                                    items-center
                                    gap-3.5
                                    px-4
                                    py-3
                                    rounded-xl
                                    text-slate-400
                                    hover:bg-red-500/10
                                    hover:text-red-400
                                    border
                                    border-transparent
                                    hover:border-red-500/20
                                    transition-all
                                    duration-300
                                    ease-out
                                    transform
                                    hover:translate-x-1.5
                                    active:scale-95
                                "
                            >
                                <Icon
                                    size={20}
                                    className="transition-transform duration-300 group-hover:-translate-x-0.5 group-hover:rotate-12"
                                />
                                <span className="font-medium text-sm">
                                    {item.title}
                                </span>
                            </button>
                        );
                    }

                    return (
                        <NavLink
                            key={item.title}
                            to={item.path}
                            className={({ isActive }) =>
                                `group relative flex items-center gap-3.5 px-4 py-3 rounded-xl transition-all duration-300 ease-out transform hover:translate-x-1.5 active:scale-95
                                ${
                                    isActive
                                        ? "bg-gradient-to-r from-blue-600 to-cyan-600 text-white shadow-lg shadow-blue-500/25 font-semibold"
                                        : "text-slate-300 hover:bg-slate-800/60 hover:text-white hover:shadow-md hover:shadow-slate-900/50"
                                }`
                            }
                        >
                            {({ isActive }) => (
                                <>
                                    {/* Active Left Pill Indicator */}
                                    {isActive && (
                                        <span className="absolute left-0 top-1/2 -translate-y-1/2 w-1.5 h-6 bg-cyan-300 rounded-r-full shadow-sm shadow-cyan-300/50" />
                                    )}

                                    <Icon
                                        size={20}
                                        className={`transition-transform duration-300 ${
                                            isActive
                                                ? "scale-110 text-white"
                                                : "text-slate-400 group-hover:text-cyan-400 group-hover:scale-110 group-hover:rotate-3"
                                        }`}
                                    />

                                    <span className="text-sm tracking-wide">
                                        {item.title}
                                    </span>
                                </>
                            )}
                        </NavLink>
                    );
                })}
            </nav>

            {/* ==========================================
                Footer
            ========================================== */}
            <div className="border-t border-slate-800/80 p-4 bg-slate-950/40 relative z-10">
                <div className="flex items-center justify-between text-xs text-slate-500">
                    <p>© {new Date().getFullYear()} AquaTrack</p>
                    <span className="px-2 py-0.5 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20 text-[10px] font-mono">
                        v1.0.0
                    </span>
                </div>
            </div>
        </aside>
    );
}