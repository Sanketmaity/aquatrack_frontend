import { Bell, Search, ChevronDown, Sparkles } from "lucide-react";

export default function Topbar() {
    const email = localStorage.getItem("email") || "Guest";
    const role = localStorage.getItem("role") || "USER";

    return (
        <header
            className="
                sticky
                top-0
                z-30
                bg-white/80
                backdrop-blur-md
                border-b
                border-slate-200/80
                h-20
                flex
                items-center
                justify-between
                px-8
                shadow-sm
                shadow-slate-100/50
                transition-all
                duration-300
            "
        >
            {/* ==========================================
                Left: Title & Greeting
            ========================================== */}
            <div className="flex items-center gap-3">
                <div>
                    <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
                        Dashboard
                        <Sparkles size={18} className="text-amber-500 animate-pulse" />
                    </h1>
                    <p className="text-xs font-medium text-slate-400">
                        Welcome back, <span className="text-slate-600 font-semibold">{email.split("@")[0]}</span>
                    </p>
                </div>
            </div>

            {/* ==========================================
                Right: Controls & Profile
            ========================================== */}
            <div className="flex items-center gap-4">
                {/* Profile Card Button */}
                <button
                    className="
                        group
                        flex
                        items-center
                        gap-3
                        rounded-xl
                        bg-slate-100/80
                        hover:bg-slate-200/70
                        border
                        border-slate-200/60
                        px-3.5
                        py-1.5
                        transition-all
                        duration-200
                        active:scale-98
                        hover:shadow-sm
                    "
                >
                    {/* Avatar with Status Ring */}
                    <div className="relative">
                        <div
                            className="
                                flex
                                h-9
                                w-9
                                items-center
                                justify-center
                                rounded-full
                                bg-gradient-to-tr
                                from-blue-600
                                to-cyan-500
                                text-white
                                font-bold
                                text-sm
                                shadow-sm
                                shadow-blue-500/30
                                group-hover:scale-105
                                transition-transform
                                duration-200
                            "
                        >
                            {email.charAt(0).toUpperCase()}
                        </div>
                        
                        {/* Green Online Dot */}
                        <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-500 border-2 border-white" />
                    </div>

                    {/* User Info */}
                    <div className="hidden lg:block text-left">
                        <p className="font-semibold text-xs text-slate-800 tracking-tight group-hover:text-blue-600 transition-colors">
                            {email}
                        </p>
                        <span className="inline-block px-1.5 py-0.2 text-[10px] font-semibold text-slate-500 bg-slate-200/80 rounded uppercase tracking-wider">
                            {role}
                        </span>
                    </div>

                    <ChevronDown
                        size={16}
                        className="text-slate-400 group-hover:text-slate-700 group-hover:rotate-180 transition-transform duration-300"
                    />
                </button>

            </div>
        </header>
    );
}