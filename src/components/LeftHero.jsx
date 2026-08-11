import { motion } from "framer-motion";
import {
  Building2,
  Droplets,
  ShieldCheck,
  BarChart3,
  Sparkles,
} from "lucide-react";

export default function LeftHero() {
  // ============================================================
  // Animation Variants
  // ============================================================

  const containerVariants = {
    hidden: {
      opacity: 0,
    },

    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: {
      opacity: 0,
      x: -30,
    },

    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="
        hidden
        md:flex
        flex-col
        justify-center
        h-full
        px-12
        xl:px-16
        relative
        z-10
      "
    >
      {/* ============================================================
          1. Logo & Brand
      ============================================================ */}

      <motion.div
        variants={itemVariants}
        className="flex items-center gap-4 mb-8"
      >
        {/* Logo */}

        <div className="relative group">

          {/* Soft Logo Aura */}

          <div
            className="
              pointer-events-none
              absolute
              inset-0
              rounded-2xl
              bg-cyan-400
              blur-md
              opacity-20
              group-hover:opacity-40
              transition-opacity
              duration-300
            "
          />

          {/* Logo Icon */}

          <div
            className="
              relative
              flex
              items-center
              justify-center
              w-14
              h-14
              rounded-2xl
              bg-gradient-to-tr
              from-sky-500
              via-cyan-500
              to-teal-400
              text-white
              shadow-lg
              shadow-cyan-500/20
              transform
              group-hover:scale-105
              transition-transform
              duration-300
            "
          >
            <Droplets size={30} />
          </div>
        </div>

        {/* Brand Text */}

        <div>
          <div className="flex items-center gap-2">

            <h1
              className="
                text-4xl
                font-extrabold
                tracking-tight
                text-slate-900
              "
            >
              AquaTrack
            </h1>

            {/* Smart Water Badge */}

            <span
              className="
                inline-flex
                items-center
                gap-1
                px-2.5
                py-0.5
                rounded-full
                text-xs
                font-semibold
                bg-cyan-50
                text-cyan-700
                border
                border-cyan-200
              "
            >
              <Sparkles
                size={12}
                className="text-cyan-500"
              />

              Smart Water
            </span>

          </div>

          <p
            className="
              mt-0.5
              text-sm
              font-medium
              text-slate-500
            "
          >
            Smart Apartment Water Management
          </p>
        </div>
      </motion.div>

      {/* ============================================================
          2. Main Headline
      ============================================================ */}

      <motion.h2
        variants={itemVariants}
        className="
          text-5xl
          xl:text-6xl
          font-black
          leading-tight
          tracking-tight
          text-slate-900
        "
      >
        Manage Apartments
        <br />

        <span
          className="
            bg-gradient-to-r
            from-sky-500
            via-cyan-500
            to-teal-500
            bg-clip-text
            text-transparent
          "
        >
          Smarter.
        </span>
      </motion.h2>

      {/* ============================================================
          3. Description
      ============================================================ */}

      <motion.p
        variants={itemVariants}
        className="
          mt-6
          max-w-xl
          text-lg
          leading-relaxed
          text-slate-600
        "
      >
        AquaTrack helps apartment communities manage buildings,
        managers, residents, water usage, billing, and real-time
        analytics from one secure platform.
      </motion.p>

      {/* ============================================================
          4. Feature Cards
      ============================================================ */}

      <motion.div
        variants={itemVariants}
        className="
          grid
          grid-cols-2
          gap-5
          mt-10
          max-w-xl
        "
      >
        <FeatureCard
          icon={<Building2 size={24} />}
          title="Apartments"
          subtitle="Multi-building hub"
        />

        <FeatureCard
          icon={<BarChart3 size={24} />}
          title="Analytics"
          subtitle="Real-time usage"
        />

        <FeatureCard
          icon={<Droplets size={24} />}
          title="Water Tracking"
          subtitle="Smart meter sync"
        />

        <FeatureCard
          icon={<ShieldCheck size={24} />}
          title="Secure Access"
          subtitle="Role-based portal"
        />
      </motion.div>
    </motion.div>
  );
}

// ==================================================================
// Feature Card
// ==================================================================

function FeatureCard({ icon, title, subtitle }) {
  return (
    <motion.div
      whileHover={{
        y: -6,
        scale: 1.02,
      }}
      transition={{
        type: "spring",
        stiffness: 300,
        damping: 20,
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
        shadow-lg
        shadow-slate-200/50
        transition-all
        duration-300
        hover:border-cyan-300
        hover:shadow-xl
        hover:shadow-cyan-500/10
      "
    >
      {/* ==========================================================
          Ambient Card Glow
      ========================================================== */}

      <div
        className="
          pointer-events-none
          absolute
          -right-10
          -bottom-10
          h-28
          w-28
          rounded-full
          bg-cyan-100
          blur-2xl
          transition-all
          duration-500
          group-hover:bg-cyan-200
        "
      />

      {/* ==========================================================
          Icon
      ========================================================== */}

      <div
        className="
          relative
          flex
          h-11
          w-11
          items-center
          justify-center
          rounded-xl
          border
          border-cyan-200
          bg-cyan-50
          text-cyan-600
          transition-all
          duration-300
          group-hover:border-transparent
          group-hover:bg-gradient-to-tr
          group-hover:from-sky-500
          group-hover:to-cyan-500
          group-hover:text-white
          group-hover:shadow-md
          group-hover:shadow-cyan-500/20
        "
      >
        {icon}
      </div>

      {/* ==========================================================
          Title
      ========================================================== */}

      <h3
        className="
          relative
          mt-3.5
          font-bold
          text-slate-900
          transition-colors
          duration-300
          group-hover:text-sky-600
        "
      >
        {title}
      </h3>

      {/* ==========================================================
          Subtitle
      ========================================================== */}

      {subtitle && (
        <p
          className="
            relative
            mt-0.5
            text-xs
            font-medium
            text-slate-500
          "
        >
          {subtitle}
        </p>
      )}
    </motion.div>
  );
}