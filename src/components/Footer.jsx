import { motion } from "framer-motion";
import { FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa";
import { Droplets, ArrowUpRight, ShieldCheck, Heart } from "lucide-react";
import { Link } from "react-router-dom";

export default function Footer() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  };

  return (
    <footer className="relative bg-slate-950 text-white pt-20 pb-12 px-6 overflow-hidden border-t border-slate-800/80">
      
      {/* Background Ambient Glows */}
      <div className="pointer-events-none absolute -bottom-20 left-1/2 -translate-x-1/2 w-[35rem] h-[35rem] bg-cyan-500/10 rounded-full blur-[120px]" />
      <div className="pointer-events-none absolute top-0 right-0 w-80 h-80 bg-blue-600/10 rounded-full blur-[100px]" />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="max-w-6xl mx-auto relative z-10"
      >
        <div className="grid md:grid-cols-12 gap-10 pb-16 border-b border-slate-800/80">
          
          {/* Brand Section (Col 1 to 5) */}
          <motion.div variants={itemVariants} className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-11 h-11 rounded-2xl bg-gradient-to-tr from-blue-600 via-cyan-500 to-teal-400 text-white shadow-lg shadow-cyan-500/30">
                <Droplets size={22} />
              </div>
              <h2 className="text-2xl font-extrabold tracking-tight bg-gradient-to-r from-white via-slate-100 to-cyan-300 bg-clip-text text-transparent">
                AquaTrack
              </h2>
            </div>

            <p className="text-slate-400 text-sm leading-relaxed max-w-sm">
              Smart Water Consumption, Telemetry & Billing Management Platform built for modern apartment communities and smart cities.
            </p>

            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-900 border border-slate-800 text-slate-400 text-xs font-mono">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <ShieldCheck size={13} className="text-emerald-400" />
              <span>Enterprise Grade Security</span>
            </div>
          </motion.div>

          {/* Navigation Links (Col 6 to 8) */}
          <motion.div variants={itemVariants} className="md:col-span-3 space-y-4">
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-200">
              Quick Navigation
            </h3>

            <ul className="space-y-2.5 text-sm text-slate-400">
              <li>
                <Link
                  to="/"
                  className="hover:text-cyan-400 transition-colors inline-flex items-center gap-1 group"
                >
                  <span className="transition-transform group-hover:translate-x-1">Home</span>
                </Link>
              </li>
              <li>
                <Link
                  to="/"
                  className="hover:text-cyan-400 transition-colors inline-flex items-center gap-1 group"
                >
                  <span className="transition-transform group-hover:translate-x-1">Features</span>
                </Link>
              </li>
              <li>
                <Link
                  to="/login"
                  className="hover:text-cyan-400 transition-colors inline-flex items-center gap-1 group"
                >
                  <span className="transition-transform group-hover:translate-x-1">Portal Login</span>
                  <ArrowUpRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>
              </li>
            </ul>
          </motion.div>

          {/* Social & Connect (Col 9 to 12) */}
          <motion.div variants={itemVariants} className="md:col-span-4 space-y-4">
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-200">
              Connect With Us
            </h3>
            <p className="text-xs text-slate-400">
              Follow AquaTrack updates, developer guides, and release notes across social networks.
            </p>

            <div className="flex items-center gap-3 pt-1">
              <a
                href="#"
                className="w-10 h-10 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-cyan-400 hover:border-cyan-500/40 hover:bg-slate-800 transition-all flex items-center justify-center text-lg active:scale-95 shadow-sm"
                title="GitHub"
              >
                <FaGithub />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-cyan-400 hover:border-cyan-500/40 hover:bg-slate-800 transition-all flex items-center justify-center text-lg active:scale-95 shadow-sm"
                title="LinkedIn"
              >
                <FaLinkedin />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-cyan-400 hover:border-cyan-500/40 hover:bg-slate-800 transition-all flex items-center justify-center text-lg active:scale-95 shadow-sm"
                title="Twitter"
              >
                <FaTwitter />
              </a>
            </div>
          </motion.div>

        </div>

        {/* Footer Bottom Line */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} AquaTrack Platform. All rights reserved.</p>
          
          <div className="flex items-center gap-1 text-slate-500">
            <span>Built with precision for smart water management</span>
          </div>
        </div>
      </motion.div>
    </footer>
  );
}