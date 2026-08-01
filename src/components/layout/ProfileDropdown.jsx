import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";

import {
  ChevronDown,
  ChevronRight,
  User,
  Settings,
  CircleHelp,
  LogOut,
} from "lucide-react";

export default function ProfileDropdown({ mobile = false }) {
  // ==========================================
  // Navigation
  // ==========================================

  const navigate = useNavigate();

  // ==========================================
  // State
  // ==========================================

  const [open, setOpen] = useState(false);

  const dropdownRef = useRef(null);

  // ==========================================
// Temporary User
// (Replace with Auth Context Later)
// ==========================================

const email =
  localStorage.getItem("email") ??
  "guest@aquatrack.com";

const role =
  localStorage.getItem("role") ??
  "SUPER_ADMIN";

// ==========================================
// User Information
// ==========================================

const userName = email
  .split("@")[0]
  .replaceAll(".", " ");

const initials = userName
  .split(" ")
  .map((word) => word.charAt(0))
  .join("")
  .toUpperCase()
  .slice(0, 2);

// ==========================================
// Role Routing
// ==========================================

const rolePrefix = {
  SUPER_ADMIN: "/admin",
  PROPERTY_ADMIN: "/property",
  MANAGER: "/manager",
  RESIDENT: "/resident",
};

const basePath =
  rolePrefix[role] ?? "/";

// ==========================================
// Close Dropdown
// ==========================================

useEffect(() => {
  function handleClickOutside(event) {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target)
    ) {
      setOpen(false);
    }
  }

  function handleEscape(event) {
    if (event.key === "Escape") {
      setOpen(false);
    }
  }

  document.addEventListener(
    "mousedown",
    handleClickOutside
  );

  document.addEventListener(
    "keydown",
    handleEscape
  );

  return () => {
    document.removeEventListener(
      "mousedown",
      handleClickOutside
    );

    document.removeEventListener(
      "keydown",
      handleEscape
    );
  };
}, []);

// ==========================================
// Menu Actions
// ==========================================

const handleProfile = () => {
  setOpen(false);
  navigate(`${basePath}/profile`);
};

const handleSettings = () => {
  setOpen(false);
  navigate(`${basePath}/settings`);
};

const handleHelp = () => {
  setOpen(false);
  navigate(`${basePath}/help`);
};

const handleLogout = () => {
  setOpen(false);

  localStorage.removeItem("token");
  localStorage.removeItem("role");
  localStorage.removeItem("email");

  navigate("/login", {
    replace: true,
  });
};

  // ==========================================
  // UI
  // ==========================================

  return (
    <div
      ref={dropdownRef}
      className="relative"
    >
    {/* ======================================
    Profile Trigger
====================================== */}

{mobile ? (

  /* ===============================
      Mobile Trigger
  =============================== */

  <motion.button
    type="button"
    onClick={() => setOpen((prev) => !prev)}
    whileTap={{ scale: 0.95 }}
    className="
      flex
      h-11
      w-11
      items-center
      justify-center

      rounded-full

      bg-gradient-to-br
      from-blue-600
      to-cyan-500

      text-sm
      font-bold
      text-white

      shadow-md
      shadow-cyan-500/20

      transition-all
      duration-200

      hover:shadow-lg
      active:scale-95
    "
  >
    {initials}
  </motion.button>

) : (

  /* ===============================
      Desktop Trigger
  =============================== */

  <motion.button
    type="button"
    onClick={() => setOpen((prev) => !prev)}
    whileHover={{ scale: 1.02 }}
    whileTap={{ scale: 0.98 }}
    className="
      group

      flex
      items-center
      gap-3

      rounded-2xl

      border
      border-slate-200

      bg-white

      px-4
      py-2

      shadow-sm

      transition-all
      duration-300

      hover:border-cyan-300
      hover:bg-slate-50
      hover:shadow-md
      hover:shadow-cyan-100
    "
  >
    {/* Avatar */}

    <div className="relative">

      <div
        className="
          flex
          h-11
          w-11
          items-center
          justify-center

          rounded-full

          bg-gradient-to-br
          from-blue-600
          to-cyan-500

          text-sm
          font-bold
          text-white

          shadow-md
          shadow-cyan-500/20

          transition-transform
          duration-300

          group-hover:scale-105
        "
      >
        {initials}
      </div>

      {/* Online Indicator */}

      <span
        className="
          absolute
          bottom-0
          right-0

          h-3
          w-3

          rounded-full

          border-2
          border-white

          bg-emerald-500

          animate-pulse
        "
      />

    </div>

    {/* User Details */}

    <div className="text-left">

      <h4 className="text-sm font-semibold capitalize text-slate-800">
        {userName}
      </h4>

      <span
        className="
          mt-1
          inline-flex

          rounded-full

          bg-cyan-50

          px-2.5
          py-0.5

          text-[10px]
          font-bold
          uppercase

          tracking-wider

          text-cyan-700
        "
      >
        {role.replaceAll("_", " ")}
      </span>

    </div>

    {/* Dropdown Icon */}

    <ChevronDown
      size={18}
      className={`
        transition-all
        duration-300

        ${
          open
            ? "rotate-180 text-cyan-600"
            : "text-slate-400 group-hover:text-slate-700"
        }
      `}
    />

  </motion.button>

)}

{/* ======================================
    Dropdown
====================================== */}

<AnimatePresence>
  {open && (
    <motion.div
      initial={{
        opacity: 0,
        y: -8,
        scale: 0.96,
      }}
      animate={{
        opacity: 1,
        y: 0,
        scale: 1,
      }}
      exit={{
        opacity: 0,
        y: -8,
        scale: 0.96,
      }}
      transition={{
        type: "spring",
        stiffness: 380,
        damping: 28,
      }}
      className={`
        absolute
        z-50
        mt-3

        overflow-hidden

        rounded-2xl

        border
        border-slate-200

        bg-white/95
        backdrop-blur-xl

        shadow-2xl
        shadow-slate-900/10

        ${
          mobile
            ? "right-0 w-80 max-w-[90vw]"
            : "right-0 w-72"
        }
      `}
    >

      {/* ===============================
          User Header
      =============================== */}

      <div className="border-b border-slate-200 px-5 py-4">

        <div className="flex items-center gap-4">

          <div
            className="
              flex
              h-14
              w-14
              items-center
              justify-center

              rounded-full

              bg-gradient-to-br
              from-blue-600
              to-cyan-500

              text-base
              font-bold
              text-white

              shadow-lg
              shadow-cyan-500/20
            "
          >
            {initials}
          </div>

          <div className="min-w-0 flex-1">

            <h3 className="truncate text-sm font-semibold capitalize text-slate-800">
              {userName}
            </h3>

            <p className="truncate text-xs text-slate-500">
              {email}
            </p>

            <span
              className="
                mt-2
                inline-flex

                rounded-full

                bg-cyan-50

                px-2.5
                py-0.5

                text-[10px]
                font-semibold
                uppercase

                tracking-wider

                text-cyan-700
              "
            >
              {role.replaceAll("_", " ")}
            </span>

          </div>

        </div>

      </div>

      {/* ===============================
          Menu
      =============================== */}

      <div className="py-2">

        {/* My Profile */}

        <motion.button
          whileHover={{ x: 4 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleProfile}
          className="
            group

            flex
            w-full
            items-center
            justify-between

            px-5
            py-3

            text-sm
            text-slate-700

            transition-all
            duration-200

            hover:bg-slate-100
            hover:text-cyan-600
          "
        >
          <div className="flex items-center gap-3">

            <User
              size={18}
              className="transition-transform group-hover:scale-110"
            />

            <span>My Profile</span>

          </div>

          <ChevronRight
            size={16}
            className="
              text-slate-400

              transition-all
              duration-200

              group-hover:translate-x-1
              group-hover:text-cyan-600
            "
          />

        </motion.button>

      </div>

            {/* ===============================
                Footer
            =============================== */}

            <div className="border-t border-slate-200 p-2">

              <motion.button
                whileHover={{ x: 4 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleLogout}
                className="
                  group

                  flex
                  w-full
                  items-center
                  justify-between

                  rounded-xl

                  px-4
                  py-3

                  text-sm
                  font-medium

                  text-red-600

                  transition-all
                  duration-200

                  hover:bg-red-50
                  hover:text-red-700
                "
              >
                <div className="flex items-center gap-3">

                  <LogOut
                    size={18}
                    className="
                      transition-all
                      duration-200

                      group-hover:-translate-x-1
                    "
                  />

                  <span>Logout</span>

                </div>

                <ChevronRight
                  size={16}
                  className="
                    transition-all
                    duration-200

                    group-hover:translate-x-1
                  "
                />

              </motion.button>

            </div>

          </motion.div>
        )}

      </AnimatePresence>

    </div>
  );
}
        
    