import { motion } from "framer-motion";
import {
    Building2,
    Home,
    Users,
    Droplets,
    ArrowUpRight,
} from "lucide-react";

export default function DashboardSummaryCards({ summary }) {
    const cards = [
        {
            title: "Buildings",
            value: summary?.totalBuildings ?? 0,
            icon: Building2,
            description: "Active buildings",
            accent: "blue",
            iconBg: "bg-blue-50",
            iconColor: "text-blue-600",
            indicator: "bg-blue-500",
        },
        {
            title: "Households",
            value: summary?.totalHouseholds ?? 0,
            icon: Home,
            description: "Registered households",
            accent: "indigo",
            iconBg: "bg-indigo-50",
            iconColor: "text-indigo-600",
            indicator: "bg-indigo-500",
        },
        {
            title: "Residents",
            value: summary?.totalResidents ?? 0,
            icon: Users,
            description: "Active residents",
            accent: "violet",
            iconBg: "bg-violet-50",
            iconColor: "text-violet-600",
            indicator: "bg-violet-500",
        },
        {
            title: "Water Usage",
            value: `${summary?.totalWaterConsumption ?? 0} KL`,
            icon: Droplets,
            description: "Total consumption",
            accent: "cyan",
            iconBg: "bg-cyan-50",
            iconColor: "text-cyan-600",
            indicator: "bg-cyan-500",
        },
    ];

    return (
        <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
            {cards.map((card, index) => {
                const Icon = card.icon;

                return (
                    <motion.div
                        key={card.title}
                        initial={{
                            opacity: 0,
                            y: 16,
                        }}
                        animate={{
                            opacity: 1,
                            y: 0,
                        }}
                        transition={{
                            delay: index * 0.06,
                            duration: 0.35,
                            ease: "easeOut",
                        }}
                        whileHover={{
                            y: -4,
                        }}
                        className="
                            group
                            relative
                            overflow-hidden
                            rounded-2xl
                            border
                            border-slate-200
                            bg-white
                            p-5
                            shadow-sm
                            transition-all
                            duration-300
                            hover:border-slate-300
                            hover:shadow-lg
                            hover:shadow-slate-200/60
                        "
                    >
                        {/* =========================================
                            Top Accent
                        ========================================= */}

                        <div
                            className={`
                                absolute
                                left-0
                                top-0
                                h-1
                                w-full
                                ${card.indicator}
                                opacity-80
                            `}
                        />

                        {/* =========================================
                            Header
                        ========================================= */}

                        <div className="flex items-start justify-between">
                            <div className="min-w-0">
                                <p
                                    className="
                                        text-sm
                                        font-medium
                                        text-slate-500
                                    "
                                >
                                    {card.title}
                                </p>

                                <div className="mt-2 flex items-baseline gap-2">
                                    <h2
                                        className="
                                            truncate
                                            text-3xl
                                            font-bold
                                            tracking-tight
                                            text-slate-900
                                        "
                                    >
                                        {card.value}
                                    </h2>
                                </div>
                            </div>

                            {/* =====================================
                                Icon
                            ===================================== */}

                            <div
                                className={`
                                    flex
                                    h-11
                                    w-11
                                    shrink-0
                                    items-center
                                    justify-center
                                    rounded-xl
                                    ${card.iconBg}
                                    ${card.iconColor}
                                    transition-all
                                    duration-300
                                    group-hover:scale-105
                                `}
                            >
                                <Icon
                                    size={22}
                                    strokeWidth={2}
                                />
                            </div>
                        </div>

                        {/* =========================================
                            Footer / Context
                        ========================================= */}

                        <div
                            className="
                                mt-5
                                flex
                                items-center
                                justify-between
                                border-t
                                border-slate-100
                                pt-4
                            "
                        >
                            <div className="flex items-center gap-2">
                                <span
                                    className={`
                                        h-2
                                        w-2
                                        rounded-full
                                        ${card.indicator}
                                    `}
                                />

                                <span
                                    className="
                                        text-xs
                                        font-medium
                                        text-slate-500
                                    "
                                >
                                    {card.description}
                                </span>
                            </div>

                            <ArrowUpRight
                                size={16}
                                className="
                                    text-slate-300
                                    transition-all
                                    duration-200
                                    group-hover:-translate-y-0.5
                                    group-hover:translate-x-0.5
                                    group-hover:text-slate-500
                                "
                            />
                        </div>
                    </motion.div>
                );
            })}
        </div>
    );
}