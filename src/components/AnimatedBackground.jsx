import { motion } from "framer-motion";

export default function AnimatedBackground() {
  // ============================================================
  // Floating Bubble Parameters
  // ============================================================

  const bubbles = [
    { size: 28, left: "8%", duration: 14, delay: 0 },
    { size: 16, left: "22%", duration: 18, delay: 2 },
    { size: 36, left: "35%", duration: 15, delay: 5 },
    { size: 20, left: "48%", duration: 20, delay: 1 },
    { size: 44, left: "62%", duration: 16, delay: 4 },
    { size: 24, left: "76%", duration: 19, delay: 3 },
    { size: 32, left: "88%", duration: 13, delay: 6 },
    { size: 18, left: "94%", duration: 17, delay: 7 },
  ];

  // ============================================================
  // Water Ripple Impact Points
  // ============================================================

  const ripples = [
    { top: "25%", left: "30%", delay: 0 },
    { top: "65%", left: "75%", delay: 3.5 },
    { top: "45%", left: "45%", delay: 7 },
  ];

  return (
    <div
      className="
        fixed
        inset-0
        overflow-hidden
        -z-10
        pointer-events-none
        select-none
      "
    >
      {/* ========================================================
          1. Light Aqua Base
      ======================================================== */}

      <div
        className="
          absolute
          inset-0
          bg-gradient-to-br
          from-white
          via-sky-50
          to-cyan-50
        "
      />

      {/* ========================================================
          2. Soft Moving Aqua Shimmer
      ======================================================== */}

      <motion.div
        animate={{
          x: ["-100%", "200%"],
        }}
        transition={{
          duration: 14,
          repeat: Infinity,
          repeatDelay: 3,
          ease: "easeInOut",
        }}
        className="
          absolute
          -top-1/2
          left-0
          h-[200%]
          w-96
          -rotate-45
          transform
          bg-gradient-to-r
          from-transparent
          via-cyan-400/8
          to-transparent
          blur-2xl
        "
      />

      {/* ========================================================
          3. Soft Aqua Blob — Top Left
      ======================================================== */}

      <motion.div
        animate={{
          x: [0, 90, -40, 0],
          y: [0, 60, 30, 0],
          scale: [1, 1.3, 0.9, 1],
          rotate: [0, 120, 240, 360],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="
          absolute
          -top-16
          -left-16
          h-[28rem]
          w-[28rem]
          rounded-full
          bg-gradient-to-tr
          from-cyan-400/10
          via-sky-400/12
          to-emerald-300/8
          blur-3xl
        "
      />

      {/* ========================================================
          4. Soft Sky Blob — Bottom Right
      ======================================================== */}

      <motion.div
        animate={{
          x: [0, -100, 30, 0],
          y: [0, -80, -30, 0],
          scale: [1, 1.35, 0.85, 1],
          rotate: [360, 240, 120, 0],
        }}
        transition={{
          duration: 22,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="
          absolute
          -bottom-24
          -right-24
          h-[32rem]
          w-[32rem]
          rounded-full
          bg-gradient-to-br
          from-sky-400/10
          via-cyan-400/8
          to-blue-300/8
          blur-3xl
        "
      />

      {/* ========================================================
          5. Center Soft Glow Orb
      ======================================================== */}

      <motion.div
        animate={{
          scale: [1, 1.4, 1],
          opacity: [0.18, 0.35, 0.18],
          x: [-30, 40, -30],
          y: [-40, 30, -40],
        }}
        transition={{
          duration: 16,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="
          absolute
          top-1/2
          left-1/2
          h-80
          w-80
          -translate-x-1/2
          -translate-y-1/2
          rounded-full
          bg-gradient-to-r
          from-sky-400/8
          via-cyan-400/10
          to-emerald-300/8
          blur-3xl
        "
      />

      {/* ========================================================
          6. Water Ripples
      ======================================================== */}

      {ripples.map((ripple, index) => (
        <div
          key={index}
          style={{
            top: ripple.top,
            left: ripple.left,
          }}
          className="
            absolute
            -translate-x-1/2
            -translate-y-1/2
          "
        >
          <motion.div
            animate={{
              scale: [0.1, 2.8],
              opacity: [0.45, 0],
            }}
            transition={{
              duration: 5.5,
              repeat: Infinity,
              delay: ripple.delay,
              ease: "easeOut",
            }}
            className="
              h-32
              w-32
              rounded-full
              border-2
              border-cyan-400/25
              blur-[0.5px]
            "
          />
        </div>
      ))}

      {/* ========================================================
          7. Floating Light Water Bubbles
      ======================================================== */}

      {bubbles.map((bubble, index) => (
        <motion.div
          key={index}
          initial={{
            y: "110vh",
            opacity: 0,
          }}
          animate={{
            y: "-10vh",
            x: [0, 25, -25, 10, 0],
            opacity: [0, 0.55, 0.55, 0],
            scale: [0.8, 1.15, 0.9, 1],
          }}
          transition={{
            duration: bubble.duration,
            repeat: Infinity,
            delay: bubble.delay,
            ease: "easeInOut",
          }}
          style={{
            left: bubble.left,
            width: `${bubble.size}px`,
            height: `${bubble.size}px`,
          }}
          className="
            absolute
            rounded-full
            border
            border-cyan-300/40
            bg-cyan-100/30
            backdrop-blur-md
            shadow-sm
            shadow-cyan-200/40
          "
        >
          {/* ====================================================
              Bubble Highlight
          ==================================================== */}

          <div
            className="
              absolute
              top-1
              left-1.5
              h-2
              w-2
              rounded-full
              bg-sky-300/70
              blur-[0.5px]
            "
          />
        </motion.div>
      ))}
    </div>
  );
}