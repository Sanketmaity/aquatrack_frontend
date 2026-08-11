import { motion } from "framer-motion";
import { FaTint, FaChartLine, FaBell } from "react-icons/fa";
import { Sparkles, ArrowUpRight } from "lucide-react";
import { useTranslation } from "react-i18next";

export default function Features() {
  const { t } = useTranslation();

  const features = [
    {
      icon: <FaTint size={26} />,
      title: t("features.card1Title"),
      tag: t("features.card1Tag"),
      desc: t("features.card1Desc"),
    },
    {
      icon: <FaChartLine size={26} />,
      title: t("features.card2Title"),
      tag: t("features.card2Tag"),
      desc: t("features.card2Desc"),
    },
    {
      icon: <FaBell size={26} />,
      title: t("features.card3Title"),
      tag: t("features.card3Tag"),
      desc: t("features.card3Desc"),
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
    <section className="relative overflow-hidden bg-slate-50 px-6 py-28 text-slate-900">

  {/* ============================================================
      Background Ambient Effects
  ============================================================ */}

  <div className="pointer-events-none absolute -top-40 left-1/2 h-[40rem] w-[40rem] -translate-x-1/2 rounded-full bg-cyan-400/10 blur-[120px]" />

  <div className="pointer-events-none absolute bottom-0 -left-20 h-96 w-96 rounded-full bg-sky-400/10 blur-[100px]" />


  <div className="relative z-10 mx-auto max-w-6xl">

    {/* ============================================================
        Section Header
    ============================================================ */}

    <div className="mx-auto max-w-2xl text-center">

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        className="
          mb-4
          inline-flex
          items-center
          gap-2
          rounded-full
          border
          border-cyan-200
          bg-cyan-50
          px-3.5
          py-1.5
          text-xs
          font-semibold
          uppercase
          tracking-wider
          text-cyan-700
        "
      >
        <Sparkles
          size={14}
          className="text-cyan-500"
        />

        <span>
          {t("features.badge")}
        </span>
      </motion.div>


      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="
          text-4xl
          font-extrabold
          tracking-tight
          text-slate-900
          md:text-5xl
        "
      >
        {t("features.heading")}{" "}

        <span
          className="
            bg-gradient-to-r
            from-sky-500
            via-cyan-500
            to-emerald-500
            bg-clip-text
            text-transparent
          "
        >
          AquaTrack
        </span>
      </motion.h2>


      <motion.p
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.1 }}
        className="
          mt-4
          text-lg
          leading-relaxed
          text-slate-600
        "
      >
        {t("features.subtitle")}
      </motion.p>

    </div>


    {/* ============================================================
        Feature Cards
    ============================================================ */}

    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      className="
        mt-16
        grid
        gap-8
        md:grid-cols-3
      "
    >

      {features.map((f, i) => (

        <motion.div
          key={i}
          variants={cardVariants}
          whileHover={{
            y: -8,
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
            flex
            flex-col
            justify-between
            overflow-hidden
            rounded-3xl
            border
            border-slate-200
            bg-white
            p-8
            shadow-lg
            shadow-slate-200/60
            transition-all
            duration-500
            hover:border-cyan-300
            hover:shadow-2xl
            hover:shadow-cyan-500/10
          "
        >

          {/* Ambient Card Glow */}

          <div
            className="
              pointer-events-none
              absolute
              -bottom-12
              -right-12
              h-36
              w-36
              rounded-full
              bg-cyan-100
              blur-2xl
              transition-all
              duration-500
              group-hover:bg-cyan-200
            "
          />


          <div>

            {/* ====================================================
                Icon + Arrow
            ==================================================== */}

            <div className="mb-6 flex items-center justify-between">

              <div
                className="
                  flex
                  h-14
                  w-14
                  items-center
                  justify-center
                  rounded-2xl
                  bg-gradient-to-tr
                  from-sky-500
                  to-cyan-500
                  text-white
                  shadow-lg
                  shadow-sky-500/25
                  transition-transform
                  duration-300
                  group-hover:rotate-6
                  group-hover:scale-110
                "
              >
                {f.icon}
              </div>


              <span
                className="
                  rounded-xl
                  border
                  border-slate-200
                  bg-slate-50
                  p-2
                  text-slate-400
                  transition-colors
                  group-hover:border-cyan-200
                  group-hover:bg-cyan-50
                  group-hover:text-cyan-600
                "
              >
                <ArrowUpRight size={18} />
              </span>

            </div>


            {/* ====================================================
                Tag
            ==================================================== */}

            <span
              className="
                mb-1
                inline-block
                font-mono
                text-[11px]
                font-semibold
                uppercase
                tracking-wider
                text-cyan-600
              "
            >
              {f.tag}
            </span>


            {/* ====================================================
                Title
            ==================================================== */}

            <h3
              className="
                text-2xl
                font-bold
                text-slate-900
                transition-colors
                group-hover:text-sky-600
              "
            >
              {f.title}
            </h3>


            {/* ====================================================
                Description
            ==================================================== */}

            <p
              className="
                mt-3
                text-sm
                leading-relaxed
                text-slate-600
              "
            >
              {f.desc}
            </p>

          </div>


          {/* ========================================================
              Card Footer
          ======================================================== */}

          <div
            className="
              mt-8
              flex
              items-center
              justify-between
              border-t
              border-slate-200
              pt-4
              text-xs
              text-slate-400
            "
          >

            <span>
              {t("features.engine")}
            </span>

            <span
              className="
                h-1.5
                w-1.5
                rounded-full
                bg-cyan-500
                group-hover:animate-ping
              "
            />

          </div>

        </motion.div>

      ))}

    </motion.div>

  </div>

</section>
  );
}