import { Plus, UsersRound, Sparkles } from "lucide-react";

export default function ManagerHeader({
    onCreate,
}) {
    return (
        <div
            className="
                flex
                flex-col
                gap-5
                lg:flex-row
                lg:items-center
                lg:justify-between
            "
        >
            {/* ==========================================
                Page Information
            ========================================== */}

            <div className="flex items-start gap-4">

                {/* Icon */}
                <div
                    className="
                        flex
                        h-12
                        w-12
                        shrink-0
                        items-center
                        justify-center
                        rounded-2xl
                        bg-blue-50
                        text-blue-600
                        ring-1
                        ring-inset
                        ring-blue-100
                    "
                >
                    <UsersRound
                        size={23}
                        strokeWidth={2.2}
                    />
                </div>

                {/* Title */}
                <div>

                    <div className="flex items-center gap-2">

                        <h1
                            className="
                                text-2xl
                                font-bold
                                tracking-tight
                                text-slate-900
                                sm:text-3xl
                            "
                        >
                            Managers
                        </h1>

                        <Sparkles
                            size={18}
                            className="text-amber-500"
                            strokeWidth={2}
                        />

                    </div>

                    <p
                        className="
                            mt-1.5
                            max-w-xl
                            text-sm
                            leading-6
                            text-slate-500
                            sm:text-[15px]
                        "
                    >
                        Invite and manage apartment managers,
                        permissions, and access.
                    </p>

                </div>
            </div>

            {/* ==========================================
                Invite Manager Button
            ========================================== */}

            <button
                type="button"
                onClick={onCreate}
                className="
                    group
                    inline-flex
                    w-full
                    items-center
                    justify-center
                    gap-2.5
                    rounded-xl
                    bg-blue-600
                    px-5
                    py-3
                    text-sm
                    font-semibold
                    text-white
                    shadow-sm
                    shadow-blue-600/20
                    transition-all
                    duration-200
                    hover:bg-blue-700
                    hover:shadow-md
                    hover:shadow-blue-600/25
                    active:scale-[0.98]
                    sm:w-auto
                "
            >
                <span
                    className="
                        flex
                        h-5
                        w-5
                        items-center
                        justify-center
                        rounded-md
                        bg-white/15
                        transition-transform
                        duration-200
                        group-hover:rotate-90
                    "
                >
                    <Plus
                        size={16}
                        strokeWidth={2.5}
                    />
                </span>

                <span>
                    Invite Manager
                </span>
            </button>

        </div>
    );
}