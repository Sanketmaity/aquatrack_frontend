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

  const billingStatus =
    summary?.billingStatus || "PENDING";

  const waterAlerts =
    summary?.waterAlerts || "None";

  // ============================================================
  // Helpers
  // ============================================================

  const normalizedBillingStatus =
    String(billingStatus).toUpperCase();

  const normalizedWaterAlerts =
    String(waterAlerts).toUpperCase();

  const isPaid =
    normalizedBillingStatus === "PAID";

  const hasWaterAlert =
    normalizedWaterAlerts !== "NONE" &&
    normalizedWaterAlerts !== "NO ALERTS";

  // ============================================================
  // Cards
  // ============================================================

  const cards = [
    {
      key: "usage",

      title: "Current Month Usage",

      value: `${currentMonthUsage.toFixed(2)} KL`,

      description: "Water consumed this month",

      icon: Droplets,

      iconClass:
        "bg-blue-50 text-blue-600 border-blue-100",

      valueClass: "text-blue-600",

      badge:
        currentMonthUsage > 0
          ? "Usage Recorded"
          : "No Usage",

      badgeClass:
        currentMonthUsage > 0
          ? "bg-blue-50 text-blue-600 border-blue-100"
          : "bg-slate-50 text-slate-500 border-slate-200",

      badgeIcon:
        currentMonthUsage > 0
          ? TrendingUp
          : Clock3,
    },

    {
      key: "bill",

      title: "Current Bill",

      value: `₹${currentBill.toFixed(2)}`,

      description: "Latest generated water bill",

      icon: ReceiptText,

      iconClass:
        "bg-emerald-50 text-emerald-600 border-emerald-100",

      valueClass: "text-emerald-600",

      badge:
        currentBill > 0
          ? "Bill Generated"
          : "No Current Bill",

      badgeClass:
        currentBill > 0
          ? "bg-emerald-50 text-emerald-600 border-emerald-100"
          : "bg-slate-50 text-slate-500 border-slate-200",

      badgeIcon:
        currentBill > 0
          ? ReceiptText
          : Clock3,
    },

    {
      key: "billing",

      title: "Billing Status",

      value:
        normalizedBillingStatus === "PAID"
          ? "Paid"
          : normalizedBillingStatus === "OVERDUE"
          ? "Overdue"
          : "Pending",

      description: "Current payment status",

      icon: CreditCard,

      iconClass: isPaid
        ? "bg-emerald-50 text-emerald-600 border-emerald-100"
        : normalizedBillingStatus === "OVERDUE"
        ? "bg-red-50 text-red-600 border-red-100"
        : "bg-amber-50 text-amber-600 border-amber-100",

      valueClass: isPaid
        ? "text-emerald-600"
        : normalizedBillingStatus === "OVERDUE"
        ? "text-red-600"
        : "text-amber-600",

      badge: isPaid
        ? "Payment Complete"
        : normalizedBillingStatus === "OVERDUE"
        ? "Payment Overdue"
        : "Payment Pending",

      badgeClass: isPaid
        ? "bg-emerald-50 text-emerald-600 border-emerald-100"
        : normalizedBillingStatus === "OVERDUE"
        ? "bg-red-50 text-red-600 border-red-100"
        : "bg-amber-50 text-amber-600 border-amber-100",

      badgeIcon: isPaid
        ? CheckCircle2
        : normalizedBillingStatus === "OVERDUE"
        ? AlertTriangle
        : Clock3,
    },

    {
      key: "alerts",

      title: "Water Alerts",

      value: hasWaterAlert
        ? waterAlerts
        : "None",

      description: hasWaterAlert
        ? "Attention may be required"
        : "No active water alerts",

      icon: BellRing,

      iconClass: hasWaterAlert
        ? "bg-red-50 text-red-600 border-red-100"
        : "bg-cyan-50 text-cyan-600 border-cyan-100",

      valueClass: hasWaterAlert
        ? "text-red-600"
        : "text-cyan-600",

      badge: hasWaterAlert
        ? "Attention Required"
        : "All Clear",

      badgeClass: hasWaterAlert
        ? "bg-red-50 text-red-600 border-red-100"
        : "bg-cyan-50 text-cyan-600 border-cyan-100",

      badgeIcon: hasWaterAlert
        ? AlertTriangle
        : CheckCircle2,
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
        staggerChildren: 0.1,
      },
    },
  };

  const cardVariants = {
    hidden: {
      opacity: 0,
      y: 20,
      scale: 0.97,
    },

    visible: {
      opacity: 1,
      y: 0,
      scale: 1,

      transition: {
        duration: 0.45,
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
        sm:grid-cols-2
        xl:grid-cols-4
        gap-5
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
              y: -5,
              scale: 1.01,
            }}
            transition={{
              type: "spring",
              stiffness: 320,
              damping: 22,
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
              shadow-slate-200/60
              hover:shadow-lg
              hover:shadow-slate-200/70
              transition-shadow
              duration-300
            "
          >
            {/* ==================================================
                Ambient Background
            ================================================== */}

            <div
              className="
                pointer-events-none
                absolute
                -right-10
                -top-10
                h-28
                w-28
                rounded-full
                bg-sky-50
                blur-2xl
                opacity-0
                group-hover:opacity-100
                transition-opacity
                duration-500
              "
            />

            {/* ==================================================
                Header
            ================================================== */}

            <div className="relative flex items-start justify-between gap-4">
              <div className="min-w-0">
                <p className="text-sm font-medium text-slate-500">
                  {card.title}
                </p>

                <motion.div
                  key={card.value}
                  initial={{
                    opacity: 0,
                    y: 6,
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                  }}
                  transition={{
                    duration: 0.35,
                  }}
                  className={`
                    mt-2
                    text-2xl
                    sm:text-3xl
                    font-extrabold
                    tracking-tight
                    truncate
                    ${card.valueClass}
                  `}
                >
                  {card.value}
                </motion.div>
              </div>

              {/* Icon */}

              <div
                className={`
                  shrink-0
                  flex
                  items-center
                  justify-center
                  w-12
                  h-12
                  rounded-xl
                  border
                  transition-all
                  duration-300
                  group-hover:scale-105
                  ${card.iconClass}
                `}
              >
                <Icon size={23} strokeWidth={2.2} />
              </div>
            </div>

            {/* ==================================================
                Description
            ================================================== */}

            <p className="relative mt-3 text-xs text-slate-500 leading-relaxed">
              {card.description}
            </p>

            {/* ==================================================
                Status Badge
            ================================================== */}

            <div className="relative mt-4">
              <span
                className={`
                  inline-flex
                  items-center
                  gap-1.5
                  rounded-full
                  border
                  px-2.5
                  py-1
                  text-[11px]
                  font-semibold
                  ${card.badgeClass}
                `}
              >
                <BadgeIcon size={12} />
                {card.badge}
              </span>
            </div>

            {/* ==================================================
                Bottom Accent
            ================================================== */}

            <div
              className="
                absolute
                bottom-0
                left-0
                h-0.5
                w-0
                bg-gradient-to-r
                from-sky-500
                via-cyan-500
                to-emerald-500
                group-hover:w-full
                transition-all
                duration-500
              "
            />
          </motion.div>
        );
      })}
    </motion.div>
  );
}