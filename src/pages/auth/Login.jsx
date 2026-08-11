import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ShieldCheck } from "lucide-react";
import { useTranslation } from "react-i18next";
import { toast } from "../../components/ui/Toaster";

import logo from "../../assets/logo.png";
import AnimatedBackground from "../../components/AnimatedBackground";
import LeftHero from "../../components/LeftHero";
import EmailInput from "../../components/EmailInput";
import PasswordInput from "../../components/PasswordInput";
import LoadingButton from "../../components/LoadingButton";

import { login } from "../../services/authService";

export default function Login() {
  const navigate = useNavigate();
  const { t } = useTranslation();

  // ============================================================
  // State
  // ============================================================

  const [loading, setLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  // ============================================================
  // Handle Input Change
  // ============================================================

  const handleChange = (event) => {
    setFormData((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };

  // ============================================================
  // Handle Login
  // ============================================================

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      setLoading(true);

      console.log("LOGIN START");

      const response = await login(formData);

      console.log("LOGIN RESPONSE:", response);

      const auth = response.data;

      localStorage.setItem("token", auth.token);
      localStorage.setItem("role", auth.role);
      localStorage.setItem("email", auth.email);

      toast.success(
        "Login Successful",
        "Welcome back to AquaTrack."
      );

      switch (auth.role) {
        case "SUPER_ADMIN":
          navigate("/admin/dashboard");
          break;

        case "PROPERTY_ADMIN":
          navigate("/property/dashboard");
          break;

        case "MANAGER":
          navigate("/manager/dashboard");
          break;

        case "RESIDENT":
          navigate("/resident/dashboard");
          break;

        default:
          navigate("/login");
      }
    } catch (error) {
      console.error("LOGIN ERROR:", error);

      const message =
        error?.response?.data?.message ||
        error?.response?.data?.error ||
        error?.message ||
        "Authentication failed. Please try again.";

      console.log("ERROR MESSAGE:", message);

      toast.error(
        "Login Failed",
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
        selection:bg-cyan-500
        selection:text-white
      "
    >
      {/* ========================================================
          Animated Background
      ======================================================== */}

      <AnimatedBackground />

      <div className="relative z-10 grid min-h-screen md:grid-cols-2">

        {/* ======================================================
            Left Hero
        ====================================================== */}

        <LeftHero />

        {/* ======================================================
            Right Login Section
        ====================================================== */}

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

          {/* Soft Aqua Aura */}

          <div
            className="
              pointer-events-none
              absolute
              h-96
              w-96
              rounded-full
              bg-cyan-400/10
              blur-3xl
            "
          />

          {/* ====================================================
              Login Card
          ==================================================== */}

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
              bg-white
              p-8
              text-slate-900
              shadow-xl
              shadow-slate-200/60
              transition-all
              duration-500
              sm:p-10
            "
          >

            {/* ==================================================
                Top Gradient Highlight
            ================================================== */}

            <div
              className="
                absolute
                top-0
                left-0
                right-0
                h-1
                bg-gradient-to-r
                from-sky-500
                via-cyan-500
                to-teal-400
              "
            />

            {/* ==================================================
                Logo
            ================================================== */}

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

              {/* Logo Glow */}

              <div
                className="
                  pointer-events-none
                  absolute
                  h-20
                  w-20
                  rounded-full
                  bg-cyan-400/10
                  blur-xl
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

            {/* ==================================================
                Heading
            ================================================== */}

            <div className="mb-8 text-center">

              <h1
                className="
                  text-3xl
                  font-extrabold
                  tracking-tight
                  text-slate-900
                "
              >
                {t("auth.welcomeBack")}
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
                {t("auth.welcomeSubtitle")}
              </p>

            </div>

            {/* ==================================================
                Login Form
            ================================================== */}

            <form
              onSubmit={handleSubmit}
              className="space-y-5"
            >

              {/* Email */}

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

              {/* Password */}

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
                  delay: 0.4,
                  duration: 0.5,
                }}
              >
                <PasswordInput
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  disabled={loading}
                />
              </motion.div>

              {/* ==================================================
                  Remember Me + Forgot Password
              ================================================== */}

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
                className="
                  flex
                  items-center
                  justify-between
                  pt-1
                "
              >

                <label
                  className="
                    group
                    flex
                    cursor-pointer
                    select-none
                    items-center
                    gap-2
                    text-sm
                    text-slate-600
                  "
                >

                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(event) =>
                      setRememberMe(event.target.checked)
                    }
                    className="
                      h-4
                      w-4
                      cursor-pointer
                      rounded
                      border-slate-300
                      bg-white
                      text-cyan-500
                      accent-cyan-500
                      transition
                      focus:ring-2
                      focus:ring-cyan-500/20
                    "
                  />

                  <span
                    className="
                      transition-colors
                      group-hover:text-slate-900
                    "
                  >
                    {t("auth.rememberMe")}
                  </span>

                </label>

                <Link
                  to="/forgot-password"
                  className="
                    text-sm
                    font-semibold
                    text-cyan-600
                    transition-colors
                    hover:text-cyan-700
                    hover:underline
                  "
                >
                  {t("auth.forgotPassword")}
                </Link>

              </motion.div>

              {/* ==================================================
                  Submit Button
              ================================================== */}

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
                  delay: 0.6,
                }}
                className="pt-2"
              >
                <LoadingButton
                  loading={loading}
                  text={t("auth.loginButton")}
                />
              </motion.div>

              {/* ==================================================
                  Security Status
              ================================================== */}

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
                      rounded-full
                      bg-emerald-500
                      animate-pulse
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