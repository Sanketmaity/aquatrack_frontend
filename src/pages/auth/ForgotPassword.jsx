import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ShieldCheck, ArrowLeft } from "lucide-react";
import { useTranslation } from "react-i18next";

import { toast } from "../../components/ui/Toaster";
import { forgotPassword } from "../../services/authService";

import logo from "../../assets/logo.png";
import AnimatedBackground from "../../components/AnimatedBackground";
import LeftHero from "../../components/LeftHero";
import EmailInput from "../../components/EmailInput";
import LoadingButton from "../../components/LoadingButton";

export default function ForgotPassword() {
  const { t } = useTranslation();

  // ============================================================
  // State
  // ============================================================

  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
  });

  // ============================================================
  // Input Change
  // ============================================================

  const handleChange = (event) => {
    setFormData((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };

  // ============================================================
  // Submit
  // ============================================================

  const handleSubmit = async (event) => {
    event.preventDefault();

    // ----------------------------------------------------------
    // Client-side validation
    // ----------------------------------------------------------

    if (!formData.email.trim()) {
      toast.error(
        "Email Required",
        "Please enter your registered email address."
      );
      return;
    }

    try {
      setLoading(true);

      const response = await forgotPassword(
        formData.email.trim()
      );

      // --------------------------------------------------------
      // Success Toast
      // --------------------------------------------------------

      toast.success(
        "Reset Link Sent",
        response?.message ||
          "Password reset link has been sent to your email."
      );

      // --------------------------------------------------------
      // Clear Form
      // --------------------------------------------------------

      setFormData({
        email: "",
      });
    } catch (error) {
      console.error(
        "Forgot password error:",
        error
      );

      // --------------------------------------------------------
      // Error Message
      // --------------------------------------------------------

      const message =
        error?.response?.data?.message ||
        error?.response?.data?.error ||
        "Failed to send password reset link. Please try again.";

      // --------------------------------------------------------
      // Error Toast
      // --------------------------------------------------------

      toast.error(
        "Password Reset Failed",
        message
      );
    } finally {
      setLoading(false);
    }
  };

  // ============================================================
  // UI
  // ============================================================

  return (
    <div
      className="
        relative
        min-h-screen
        overflow-hidden
        bg-slate-50
        text-slate-900
        selection:bg-cyan-500
        selection:text-white
      "
    >
      {/* ======================================================
          Animated Light Background
      ====================================================== */}

      <AnimatedBackground />

      {/* ======================================================
          Main Layout
      ====================================================== */}

      <div
        className="
          relative
          z-10
          grid
          min-h-screen
          lg:grid-cols-2
        "
      >
        {/* ====================================================
            Left Hero
        ==================================================== */}

        <LeftHero />

        {/* ====================================================
            Right Form Section
        ==================================================== */}

        <div
          className="
            relative
            flex
            items-center
            justify-center
            p-6
            sm:p-10
          "
        >
          {/* ==================================================
              Soft Light Aura
          ================================================== */}

          <div
            className="
              pointer-events-none
              absolute
              -z-10
              h-96
              w-96
              rounded-full
              bg-cyan-200/40
              blur-3xl
              animate-pulse
            "
          />

          {/* ==================================================
              Forgot Password Card
          ================================================== */}

          <motion.div
            initial={{
              opacity: 0,
              y: 30,
              scale: 0.96,
            }}
            animate={{
              opacity: 1,
              y: 0,
              scale: 1,
            }}
            transition={{
              duration: 0.7,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="
              relative
              w-full
              max-w-md
              overflow-hidden
              rounded-3xl
              border
              border-slate-200
              bg-white/95
              p-8
              text-slate-900
              shadow-2xl
              shadow-slate-300/50
              backdrop-blur-xl
              transition-all
              duration-500
              sm:p-10
            "
          >
            {/* =================================================
                Top Gradient Accent
            ================================================= */}

            <div
              className="
                absolute
                left-0
                right-0
                top-0
                h-1
                bg-gradient-to-r
                from-sky-500
                via-cyan-500
                to-teal-400
              "
            />

            {/* =================================================
                Logo
            ================================================= */}

            <motion.div
              initial={{
                scale: 0.8,
                opacity: 0,
              }}
              animate={{
                scale: 1,
                opacity: 1,
              }}
              transition={{
                delay: 0.2,
                duration: 0.5,
              }}
              className="
                relative
                mb-6
                flex
                flex-col
                items-center
              "
            >
              {/* Logo Aura */}

              <div
                className="
                  pointer-events-none
                  absolute
                  h-20
                  w-20
                  rounded-full
                  bg-cyan-200/50
                  blur-xl
                  animate-pulse
                "
              />

              <img
                src={logo}
                alt="AquaTrack"
                className="
                  relative
                  z-10
                  h-20
                  w-20
                  object-contain
                  drop-shadow-lg
                  transition-transform
                  duration-300
                  hover:scale-105
                "
              />
            </motion.div>

            {/* =================================================
                Heading
            ================================================= */}

            <div className="mb-8 text-center">
              <h1
                className="
                  text-3xl
                  font-extrabold
                  tracking-tight
                  text-slate-900
                "
              >
                {t("auth.forgotTitle")}
              </h1>

              <p
                className="
                  mx-auto
                  mt-2.5
                  max-w-xs
                  text-sm
                  leading-relaxed
                  text-slate-500
                "
              >
                {t("auth.forgotSubtitle")}
              </p>
            </div>

            {/* =================================================
                Form
            ================================================= */}

            <form
              onSubmit={handleSubmit}
              className="space-y-6"
            >
              {/* =================================================
                  Email Input
              ================================================= */}

              <motion.div
                initial={{
                  x: 20,
                  opacity: 0,
                }}
                animate={{
                  x: 0,
                  opacity: 1,
                }}
                transition={{
                  delay: 0.3,
                  duration: 0.5,
                }}
              >
                <EmailInput
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  disabled={loading}
                />
              </motion.div>

              {/* =================================================
                  Submit Button
              ================================================= */}

              <motion.div
                initial={{
                  y: 20,
                  opacity: 0,
                }}
                animate={{
                  y: 0,
                  opacity: 1,
                }}
                transition={{
                  delay: 0.4,
                }}
                className="pt-2"
              >
                <LoadingButton
                  loading={loading}
                  text={t("auth.sendResetLink")}
                />
              </motion.div>

              {/* =================================================
                  Back To Login
              ================================================= */}

              <motion.div
                initial={{
                  opacity: 0,
                }}
                animate={{
                  opacity: 1,
                }}
                transition={{
                  delay: 0.5,
                }}
                className="pt-1 text-center"
              >
                <Link
                  to="/login"
                  className="
                    group
                    inline-flex
                    items-center
                    gap-2
                    rounded-lg
                    px-2
                    py-1
                    text-sm
                    font-semibold
                    text-cyan-600
                    transition-colors
                    duration-200
                    hover:bg-cyan-50
                    hover:text-cyan-700
                  "
                >
                  <ArrowLeft
                    size={16}
                    className="
                      transition-transform
                      duration-300
                      group-hover:-translate-x-1
                    "
                  />

                  <span>
                    {t("auth.backToLogin")}
                  </span>
                </Link>
              </motion.div>

              {/* =================================================
                  Security Footer
              ================================================= */}

              <div
                className="
                  border-t
                  border-slate-200
                  pt-4
                  text-center
                "
              >
                <div
                  className="
                    flex
                    items-center
                    justify-center
                    gap-1.5
                    text-[11px]
                    font-medium
                    text-slate-500
                  "
                >
                  <span
                    className="
                      h-2
                      w-2
                      animate-pulse
                      rounded-full
                      bg-emerald-500
                    "
                  />

                  <ShieldCheck
                    size={13}
                    className="text-emerald-500"
                  />

                  <span>
                    {t("common.securityBadge")}
                  </span>
                </div>

                <p
                  className="
                    mt-1
                    text-[11px]
                    font-medium
                    text-slate-400
                  "
                >
                  © {new Date().getFullYear()} AquaTrack •{" "}
                  {t("common.rightsReserved")}
                </p>
              </div>
            </form>
          </motion.div>
        </div>
      </div>
    </div>
  );
}