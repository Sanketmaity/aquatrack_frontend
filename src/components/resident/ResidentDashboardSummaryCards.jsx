import { motion } from "framer-motion";
import {
    Droplets,
    ReceiptText,
    CreditCard,
    BellRing,
    TrendingUp,
    CheckCircle2,
    Clock3,
    AlertTriangle,
    ArrowUpRight,
} from "lucide-react";

export default function ResidentDashboardSummaryCards({
    summary = {},
}) {
    // ============================================================
    // Data
    // ============================================================

    const currentMonthUsage = Number(
        summary?.currentMonthUsage ?? 0
    );

    const currentBill = Number(
        summary?.currentBill ?? 0
    );

    const billingStatus = String(
        summary?.billingStatus ?? "PENDING"
    ).toUpperCase();

    const waterAlerts = String(
        summary?.waterAlerts ?? "NONE"
    );

    const normalizedWaterAlerts =
        waterAlerts.toUpperCase();

    const isPaid = billingStatus === "PAID";
    const isOverdue = billingStatus === "OVERDUE";

    const hasWaterAlert =
        normalizedWaterAlerts !== "NONE" &&
        normalizedWaterAlerts !== "NO ALERTS";

    // ============================================================
    // Helpers
    // ============================================================

    const getBillingConfig = () => {
        if (isPaid) {
            return {
                value: "Paid",
                description: "Your latest bill is settled",
                badge: "Payment Complete",
                icon: CheckCircle2,
                iconBg: "bg-emerald-50",
                iconColor: "text-emerald-600",
                valueColor: "text-emerald-600",
                badgeStyle:
                    "border-emerald-100 bg-emerald-50 text-emerald-700",
                accent:
                    "from-emerald-400 to-green-500",
            };
        }

        if (isOverdue) {
            return {
                value: "Overdue",
                description: "Please clear your outstanding bill",
                badge: "Payment Overdue",
                icon: AlertTriangle,
                iconBg: "bg-red-50",
                iconColor: "text-red-600",
                valueColor: "text-red-600",
                badgeStyle:
                    "border-red-100 bg-red-50 text-red-700",
                accent:
                    "from-red-400 to-rose-500",
            };
        }

        return {
            value: "Pending",
            description: "Payment is pending",
            badge: "Payment Pending",
            icon: Clock3,
            iconBg: "bg-amber-50",
            iconColor: "text-amber-600",
            valueColor: "text-amber-600",
            badgeStyle:
                "border-amber-100 bg-amber-50 text-amber-700",
            accent:
                "from-amber-400 to-orange-500",
        };
    };

    const billingConfig = getBillingConfig();

    // ============================================================
    // Cards
    // ============================================================

    const cards = [
        {
            key: "usage",
            title: "Current Month Usage",
            value: `${currentMonthUsage.toFixed(2)} KL`,
            description:
                "Water consumed during the current billing cycle",
            icon: Droplets,
            iconBg: "bg-blue-50",
            iconColor: "text-blue-600",
            valueColor: "text-slate-900",
            badge:
                currentMonthUsage > 0
                    ? "Usage Recorded"
                    : "No Usage",
            badgeIcon:
                currentMonthUsage > 0
                    ? TrendingUp
                    : Clock3,
            badgeStyle:
                currentMonthUsage > 0
                    ? "border-blue-100 bg-blue-50 text-blue-700"
                    : "border-slate-200 bg-slate-50 text-slate-500",
            accent:
                "from-blue-400 to-cyan-500",
        },

        {
            key: "bill",
            title: "Current Bill",
            value: `₹${currentBill.toFixed(2)}`,
            description:
                "Latest generated water bill",
            icon: ReceiptText,
            iconBg: "bg-emerald-50",
            iconColor: "text-emerald-600",
            valueColor: "text-slate-900",
            badge:
                currentBill > 0
                    ? "Bill Generated"
                    : "No Current Bill",
            badgeIcon:
                currentBill > 0
                    ? ReceiptText
                    : Clock3,
            badgeStyle:
                currentBill > 0
                    ? "border-emerald-100 bg-emerald-50 text-emerald-700"
                    : "border-slate-200 bg-slate-50 text-slate-500",
            accent:
                "from-emerald-400 to-teal-500",
        },

        {
            key: "billing",
            title: "Billing Status",
            value: billingConfig.value,
            description: billingConfig.description,
            icon: CreditCard,
            iconBg: billingConfig.iconBg,
            iconColor: billingConfig.iconColor,
            valueColor: billingConfig.valueColor,
            badge: billingConfig.badge,
            badgeIcon: billingConfig.icon,
            badgeStyle: billingConfig.badgeStyle,
            accent: billingConfig.accent,
        },

        {
            key: "alerts",
            title: "Water Alerts",
            value: hasWaterAlert
                ? waterAlerts
                : "All Clear",
            description: hasWaterAlert
                ? "Attention may be required"
                : "No active water alerts",
            icon: BellRing,
            iconBg: hasWaterAlert
                ? "bg-red-50"
                : "bg-cyan-50",
            iconColor: hasWaterAlert
                ? "text-red-600"
                : "text-cyan-600",
            valueColor: hasWaterAlert
                ? "text-red-600"
                : "text-cyan-600",
            badge: hasWaterAlert
                ? "Attention Required"
                : "Everything Looks Good",
            badgeIcon: hasWaterAlert
                ? AlertTriangle
                : CheckCircle2,
            badgeStyle: hasWaterAlert
                ? "border-red-100 bg-red-50 text-red-700"
                : "border-cyan-100 bg-cyan-50 text-cyan-700",
            accent: hasWaterAlert
                ? "from-red-400 to-rose-500"
                : "from-cyan-400 to-blue-500",
        },
    ];

    // ============================================================
    // Animation
    // ============================================================

    const containerVariants = {
        hidden: {
            opacity: 0,
        },

        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.08,
            },
        },
    };

    const cardVariants = {
        hidden: {
            opacity: 0,
            y: 18,
        },

        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.4,
                ease: [0.16, 1, 0.3, 1],
            },
        },
    };

    // ============================================================
    // UI
    // ============================================================

    return (
        <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="
                grid
                grid-cols-1
                gap-5
                sm:grid-cols-2
                xl:grid-cols-4
            "
        >
            {cards.map((card) => {
                const Icon = card.icon;
                const BadgeIcon = card.badgeIcon;

                return (
                    <motion.div
                        key={card.key}
                        variants={cardVariants}
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
                        {/* ========================================
                            Top Accent
                        ======================================== */}

                        <div
                            className={`
                                absolute
                                inset-x-0
                                top-0
                                h-1
                                bg-gradient-to-r
                                ${card.accent}
                            `}
                        />

                        {/* ========================================
                            Header
                        ======================================== */}

                        <div className="flex items-start justify-between gap-4">
                            <div className="min-w-0">
                                <p className="
                                    text-sm
                                    font-medium
                                    text-slate-500
                                ">
                                    {card.title}
                                </p>

                                <motion.h2
                                    key={card.value}
                                    initial={{
                                        opacity: 0,
                                        y: 5,
                                    }}
                                    animate={{
                                        opacity: 1,
                                        y: 0,
                                    }}
                                    transition={{
                                        duration: 0.3,
                                    }}
                                    className={`
                                        mt-2
                                        truncate
                                        text-2xl
                                        font-extrabold
                                        tracking-tight
                                        sm:text-3xl
                                        ${card.valueColor}
                                    `}
                                >
                                    {card.value}
                                </motion.h2>
                            </div>

                            {/* Icon */}

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
                                    transition-transform
                                    duration-300
                                    group-hover:scale-105
                                `}
                            >
                                <Icon
                                    size={21}
                                    strokeWidth={2.2}
                                />
                            </div>
                        </div>

                        {/* ========================================
                            Description
                        ======================================== */}

                        <p className="
                            mt-3
                            min-h-[36px]
                            text-xs
                            leading-5
                            text-slate-500
                        ">
                            {card.description}
                        </p>

                        {/* ========================================
                            Status + Action Indicator
                        ======================================== */}

                        <div className="
                            mt-4
                            flex
                            items-center
                            justify-between
                            gap-3
                            border-t
                            border-slate-100
                            pt-4
                        ">
                            <span
                                className={`
                                    inline-flex
                                    min-w-0
                                    items-center
                                    gap-1.5
                                    rounded-full
                                    border
                                    px-2.5
                                    py-1
                                    text-[11px]
                                    font-semibold
                                    ${card.badgeStyle}
                                `}
                            >
                                <BadgeIcon
                                    size={12}
                                    className="shrink-0"
                                />

                                <span className="truncate">
                                    {card.badge}
                                </span>
                            </span>

                            <ArrowUpRight
                                size={15}
                                className="
                                    shrink-0
                                    text-slate-300
                                    transition-all
                                    duration-300
                                    group-hover:-translate-y-0.5
                                    group-hover:translate-x-0.5
                                    group-hover:text-slate-500
                                "
                            />
                        </div>

                        {/* ========================================
                            Bottom Hover Accent
                        ======================================== */}

                        <div
                            className={`
                                absolute
                                bottom-0
                                left-0
                                h-0.5
                                w-0
                                bg-gradient-to-r
                                ${card.accent}
                                transition-all
                                duration-500
                                group-hover:w-full
                            `}
                        />
                    </motion.div>
                );
            })}
        </motion.div>
    );
}