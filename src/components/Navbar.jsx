import { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { FaBars, FaTimes, FaMoon, FaSun } from "react-icons/fa";
import { Droplets, Sparkles, LogIn } from "lucide-react";
import useTheme from "../hooks/useTheme";

export default function Navbar() {
  const { theme, setTheme } = useTheme();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <motion.nav
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="
        fixed top-0 left-0 w-full z-50
        bg-white/70 dark:bg-slate-900/80
        backdrop-blur-xl border-b border-slate-200/80 dark:border-slate-800/80
        shadow-sm shadow-slate-900/5
        text-slate-800 dark:text-white
        transition-all duration-300
      "
    >
      <div className="max-w-6xl mx-auto flex justify-between items-center px-6 py-3.5">
        
        {/* ==========================================
            Logo & Brand
        ========================================== */}
        <Link to="/" className="flex items-center gap-2.5 group">
          <div className="relative flex items-center justify-center">
            {/* Glowing aura ring */}
            <div className="absolute inset-0 bg-cyan-400 rounded-xl blur-md opacity-30 group-hover:opacity-75 transition-opacity duration-300 animate-pulse" />
            
            <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 via-cyan-500 to-teal-400 text-white shadow-md shadow-cyan-500/30 group-hover:scale-105 transition-transform duration-300">
              <Droplets size={22} />
            </div>
          </div>

          <div className="flex flex-col">
            <span className="text-xl font-black tracking-tight bg-gradient-to-r from-blue-600 via-cyan-500 to-teal-400 bg-clip-text text-transparent">
              AquaTrack
            </span>
            <span className="text-[10px] font-semibold text-slate-400 dark:text-slate-500 -mt-1 tracking-wider uppercase">
              Water Platform
            </span>
          </div>
        </Link>

        {/* ==========================================
            Desktop Menu Links
        ========================================== */}
        <div className="hidden md:flex gap-7 items-center">
          <Link
            to="/"
            className="text-sm font-semibold text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-cyan-400 transition-colors"
          >
            Home
          </Link>

          <Link
            to="/"
            className="text-sm font-semibold text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-cyan-400 transition-colors"
          >
            Features
          </Link>

          <Link
            to="/"
            className="text-sm font-semibold text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-cyan-400 transition-colors"
          >
            About
          </Link>

          {/* 🌙 Dark / Light Mode Toggle */}
          <button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="
              p-2.5 
              rounded-xl 
              bg-slate-100 
              dark:bg-slate-800 
              text-slate-600 
              dark:text-amber-400 
              hover:scale-105 
              active:scale-95 
              transition-all 
              duration-200 
              border 
              border-slate-200/80 
              dark:border-slate-700/80
            "
            title="Toggle Theme"
          >
            {theme === "dark" ? <FaSun size={17} /> : <FaMoon size={17} />}
          </button>

          {/* Login Action Button */}
          <Link
            to="/login"
            className="
              flex
              items-center
              gap-2
              bg-gradient-to-r
              from-blue-600
              to-cyan-500
              hover:from-blue-700
              hover:to-cyan-600
              text-white
              font-semibold
              text-sm
              px-5
              py-2.5
              rounded-xl
              shadow-md
              shadow-cyan-500/25
              hover:shadow-lg
              hover:shadow-cyan-500/40
              transition-all
              duration-300
              active:scale-95
            "
          >
            <LogIn size={16} />
            <span>Login</span>
          </Link>
        </div>

        {/* ==========================================
            Mobile Hamburger Button
        ========================================== */}
        <div className="flex items-center gap-3 md:hidden">
          <button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-amber-400 text-lg"
          >
            {theme === "dark" ? <FaSun /> : <FaMoon />}
          </button>

          <button
            className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 text-xl"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </div>

      {/* ==========================================
          Animated Mobile Menu Drawer
      ========================================== */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="
              md:hidden 
              border-t 
              border-slate-200/80 
              dark:border-slate-800/80 
              bg-white/95 
              dark:bg-slate-900/95 
              backdrop-blur-2xl 
              px-6 
              py-5 
              flex 
              flex-col 
              gap-4 
              shadow-xl
            "
          >
            <Link
              to="/"
              onClick={() => setMenuOpen(false)}
              className="text-base font-semibold text-slate-700 dark:text-slate-200 hover:text-cyan-400 py-1"
            >
              Home
            </Link>

            <Link
              to="/"
              onClick={() => setMenuOpen(false)}
              className="text-base font-semibold text-slate-700 dark:text-slate-200 hover:text-cyan-400 py-1"
            >
              Features
            </Link>

            <Link
              to="/"
              onClick={() => setMenuOpen(false)}
              className="text-base font-semibold text-slate-700 dark:text-slate-200 hover:text-cyan-400 py-1"
            >
              About
            </Link>

            <Link
              to="/login"
              onClick={() => setMenuOpen(false)}
              className="
                w-full 
                flex 
                items-center 
                justify-center 
                gap-2 
                bg-gradient-to-r 
                from-blue-600 
                to-cyan-500 
                text-white 
                font-semibold 
                py-3 
                rounded-xl 
                shadow-md 
                mt-2
              "
            >
              <LogIn size={18} />
              <span>Login</span>
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}