import { motion } from "framer-motion";
import { FaTint, FaChartLine, FaBell } from "react-icons/fa";
import { Sparkles, ArrowUpRight } from "lucide-react";

export default function Features() {
  const features = [
    {
      icon: <FaTint size={26} />,
      title: "Real-time Tracking",
      tag: "Live Sensor Telemetry",
      desc: "Monitor household and building water consumption continuously with IoT smart meters and instant flow indicators.",
    },
    {
      icon: <FaChartLine size={26} />,
      title: "Usage Analytics",
      tag: "Predictive Insights",
      desc: "Visualize consumption patterns, track daily peak trends, and optimize water distribution with clear interactive charts.",
    },
    {
      icon: <FaBell size={26} />,
      title: "Smart Alerts",
      tag: "Instant Leak Detection",
      desc: "Receive instant notifications when abnormal usage, unexpected flow bursts, or billing limit thresholds are exceeded.",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  };

  return (
    <section className="relative py-28 px-6 bg-slate-950 text-white overflow-hidden">
      {/* Background Ambient Glows */}
      <div className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 w-[40rem] h-[40rem] bg-cyan-500/10 rounded-full blur-[120px]" />
      <div className="pointer-events-none absolute bottom-0 -left-20 w-96 h-96 bg-blue-600/10 rounded-full blur-[100px]" />

      <div className="max-w-6xl mx-auto relative z-10">
        
        {/* Header Section */}
        <div className="text-center max-w-2xl mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 text-xs font-semibold uppercase tracking-wider mb-4"
          >
            <Sparkles size={14} className="text-cyan-400" />
            <span>Next-Gen Water Intelligence</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-extrabold tracking-tight text-white"
          >
            Features That Power{" "}
            <span className="bg-gradient-to-r from-blue-400 via-cyan-400 to-teal-300 bg-clip-text text-transparent">
              AquaTrack
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="mt-4 text-lg text-slate-400 leading-relaxed"
          >
            Everything you need to manage building water distribution, monitor telemetry, and eliminate wastage from one intuitive portal.
          </motion.p>
        </div>

        {/* Features Cards Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mt-16 grid md:grid-cols-3 gap-8"
        >
          {features.map((f, i) => (
            <motion.div
              key={i}
              variants={cardVariants}
              whileHover={{ y: -8, scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="
                group
                relative
                p-8
                rounded-3xl
                bg-slate-900/80
                backdrop-blur-xl
                border
                border-slate-800
                hover:border-cyan-500/40
                shadow-xl
                hover:shadow-2xl
                hover:shadow-cyan-500/10
                transition-all
                duration-500
                overflow-hidden
                flex
                flex-col
                justify-between
              "
            >
              {/* Card Ambient Glow Corner */}
              <div className="pointer-events-none absolute -right-12 -bottom-12 w-36 h-36 bg-cyan-500/10 rounded-full blur-2xl group-hover:bg-cyan-500/20 transition-colors duration-500" />

              <div>
                {/* Header Row: Icon + Arrow */}
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-tr from-blue-600 to-cyan-500 text-white shadow-lg shadow-cyan-500/25 group-hover:scale-110 group-hover:rotate-6 transition-transform duration-300">
                    {f.icon}
                  </div>

                  <span className="p-2 rounded-xl bg-slate-800/80 text-slate-400 group-hover:text-cyan-400 group-hover:bg-slate-800 transition-colors">
                    <ArrowUpRight size={18} />
                  </span>
                </div>

                {/* Title & Tag */}
                <span className="inline-block text-[11px] font-mono font-semibold text-cyan-400 uppercase tracking-wider mb-1">
                  {f.tag}
                </span>

                <h3 className="text-2xl font-bold text-white group-hover:text-cyan-300 transition-colors">
                  {f.title}
                </h3>

                {/* Description */}
                <p className="mt-3 text-sm text-slate-400 leading-relaxed">
                  {f.desc}
                </p>
              </div>

              {/* Bottom Decorative Indicator Bar */}
              <div className="mt-8 pt-4 border-t border-slate-800/60 flex items-center justify-between text-xs text-slate-500">
                <span>AquaTrack Engine</span>
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 group-hover:animate-ping" />
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}