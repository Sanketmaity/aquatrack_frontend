import { motion } from "framer-motion";
import { Home, Users, Sparkles, TrendingUp } from "lucide-react";

export default function DashboardSummaryCards({ summary }) {
  const cards = [
    {
      title: "Total Households",
      value: summary?.totalHouseholds ?? 0,
      icon: Home,
      gradient: "from-blue-600 via-cyan-500 to-teal-400",
      glow: "shadow-cyan-500/25",
      ringGlow: "bg-blue-500/8",
      orb: "bg-cyan-500/8",
      ping: "bg-cyan-400",
      label: "Active Units",
      trend: "+2 this month",
    },
    {
      title: "Total Residents",
      value: summary?.totalResidents ?? 0,
      icon: Users,
      gradient: "from-emerald-600 via-teal-500 to-green-400",
      glow: "shadow-emerald-500/25",
      ringGlow: "bg-emerald-500/8",
      orb: "bg-green-500/8",
      ping: "bg-emerald-400",
      label: "Registered Members",
      trend: "+5 this week",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 24, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
    },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="grid grid-cols-1 md:grid-cols-2 gap-6"
    >
      {cards.map((card) => {
        const Icon = card.icon;

        return (
          <motion.div
            key={card.title}
            variants={cardVariants}
            whileHover={{ y: -6, scale: 1.015 }}
            transition={{ type: "spring", stiffness: 340, damping: 22 }}
            className={`
              group
              relative
              overflow-hidden
              rounded-3xl
              border
              border-slate-200/80
              bg-white/80
              backdrop-blur-xl
              p-7
              shadow-md
              ${card.glow}
              hover:shadow-xl
              transition-shadow
              duration-300
            `}
          >
            {/* Ambient Corner Orb */}
            <div className={`pointer-events-none absolute -bottom-10 -right-10 w-40 h-40 ${card.orb} rounded-full blur-2xl group-hover:scale-125 transition-transform duration-500`} />
            <div className={`pointer-events-none absolute -top-8 -left-8 w-28 h-28 ${card.ringGlow} rounded-full blur-xl`} />

            <div className="relative flex items-start justify-between gap-4">

              {/* Left — Text */}
              <div className="flex-1 min-w-0">

                {/* Label Pill */}
                <div className="mb-3 inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-slate-100 border border-slate-200 text-[11px] font-bold text-slate-500 uppercase tracking-wide">
                  <Sparkles size={11} className="text-cyan-500" />
                  {card.label}
                </div>

                <p className="text-sm font-semibold text-slate-500 mb-1">
                  {card.title}
                </p>

                {/* Value */}
                <motion.h2
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, duration: 0.4 }}
                  className="text-5xl font-black tracking-tight text-slate-900"
                >
                  {card.value}
                </motion.h2>

                {/* Trend Badge */}
                <div className="mt-3 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50 border border-emerald-100 text-[11px] font-bold text-emerald-600">
                  <TrendingUp size={11} />
                  {card.trend}
                </div>
              </div>

              {/* Right — Icon Block */}
              <div className="shrink-0 flex flex-col items-center gap-3">
                {/* Gradient Icon */}
                <div className={`
                  flex h-16 w-16 items-center justify-center
                  rounded-2xl
                  bg-gradient-to-tr ${card.gradient}
                  text-white
                  shadow-lg ${card.glow}
                  group-hover:scale-110
                  group-hover:rotate-6
                  transition-transform duration-300
                `}>
                  <Icon size={28} />
                </div>

                {/* Live Telemetry Ping */}
                <div className="flex items-center gap-1.5">
                  <span className="relative flex h-2.5 w-2.5">
                    <motion.span
                      animate={{ scale: [1, 2, 1], opacity: [0.7, 0, 0.7] }}
                      transition={{ repeat: Infinity, duration: 1.8 }}
                      className={`absolute inline-flex h-full w-full rounded-full ${card.ping} opacity-75`}
                    />
                    <span className={`relative inline-flex h-2.5 w-2.5 rounded-full ${card.ping}`} />
                  </span>
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wide">
                    Live
                  </span>
                </div>
              </div>
            </div>

            {/* Bottom Progress Bar */}
            <div className="relative mt-6 pt-4 border-t border-slate-100">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wide">
                  Occupancy Rate
                </span>
                <span className="text-[11px] font-bold text-slate-600">
                  {card.value > 0 ? "Active" : "Empty"}
                </span>
              </div>
              <div className="h-1.5 w-full rounded-full bg-slate-100 overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: card.value > 0 ? "72%" : "0%" }}
                  transition={{ delay: 0.4, duration: 0.9, ease: "easeOut" }}
                  className={`h-full rounded-full bg-gradient-to-r ${card.gradient}`}
                />
              </div>
            </div>

          </motion.div>
        );
      })}
    </motion.div>
  );
}