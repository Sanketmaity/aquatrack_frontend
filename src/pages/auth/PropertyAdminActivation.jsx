import { useEffect, useState } from "react";
import { useSearchParams, useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ShieldCheck,
  Loader2,
  AlertCircle,
  CheckCircle2,
} from "lucide-react";

import { toast } from "../../components/ui/Toaster";

import {
  validateActivationToken,
  setPassword as setPasswordService,
} from "../../services/propertyAdminService";

import logo from "../../assets/logo.png";
import AnimatedBackground from "../../components/AnimatedBackground";
import LeftHero from "../../components/LeftHero";
import PasswordInput from "../../components/PasswordInput";
import LoadingButton from "../../components/LoadingButton";

export default function PropertyAdminActivation() {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  const navigate = useNavigate();

  // ============================================================
  // State
  // ============================================================

  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [error, setError] = useState("");

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);

  // ============================================================
  // Validate Activation Token
  // ============================================================

  useEffect(() => {
    async function validate() {
      try {
        const response = await validateActivationToken(token);

        setUser(response.data);
      } catch (err) {
        console.error("Activation validation failed:", err);

        const message =
          err?.response?.data?.message ||
          err?.response?.data?.error ||
          "Invalid or expired activation link.";

        setError(message);
      } finally {
        setLoading(false);
      }
    }

    if (token) {
      validate();
    } else {
      setLoading(false);
      setError("Activation token is missing.");
    }
  }, [token]);

  // ============================================================
  // Submit Password
  // ============================================================

  const handleSubmit = async (event) => {
    event?.preventDefault();

    // ----------------------------------------------------------
    // Empty Fields
    // ----------------------------------------------------------

    if (!password || !confirmPassword) {
      toast.error(
        "Missing Password",
        "Please fill in both password fields."
      );

      return;
    }

    // ----------------------------------------------------------
    // Password Match
    // ----------------------------------------------------------

    if (password !== confirmPassword) {
      toast.error(
        "Password Mismatch",
        "Password and confirm password do not match."
      );

      return;
    }

    try {
      setSubmitting(true);

      // --------------------------------------------------------
      // Activate Account
      // --------------------------------------------------------

      await setPasswordService({
        token,
        password,
        confirmPassword,
      });

      // --------------------------------------------------------
      // Success Toast
      // --------------------------------------------------------

      toast.success(
        "Account Activated",
        "Your Property Admin account has been activated successfully."
      );

      // --------------------------------------------------------
      // Redirect after toast
      // --------------------------------------------------------

      setTimeout(() => {
        navigate("/login");
      }, 1200);
    } catch (err) {
      console.error(
        "Account activation failed:",
        err
      );

      const message =
        err?.response?.data?.message ||
        err?.response?.data?.error ||
        "Failed to activate account. Please try again.";

      toast.error(
        "Activation Failed",
        message
      );
    } finally {
      setSubmitting(false);
    }
  };

  // ============================================================
  // Loading State
  // ============================================================

  if (loading) {
    return (
      <div
        className="
          relative
          flex
          min-h-screen
          items-center
          justify-center
          overflow-hidden
          bg-slate-50
          p-6
        "
      >
        <AnimatedBackground />

        <motion.div
          initial={{
            opacity: 0,
            y: 20,
            scale: 0.96,
          }}
          animate={{
            opacity: 1,
            y: 0,
            scale: 1,
          }}
          className="
            relative
            z-10
            w-full
            max-w-sm
            rounded-3xl
            border
            border-slate-200
            bg-white/95
            p-8
            text-center
            shadow-2xl
            shadow-slate-300/50
            backdrop-blur-xl
          "
        >
          <div
            className="
              mx-auto
              mb-4
              flex
              h-14
              w-14
              items-center
              justify-center
              rounded-2xl
              bg-cyan-50
              text-cyan-600
              shadow-sm
            "
          >
            <Loader2
              size={30}
              className="animate-spin"
            />
          </div>

          <h2
            className="
              text-lg
              font-extrabold
              text-slate-900
            "
          >
            Validating Activation
          </h2>

          <p
            className="
              mt-2
              text-sm
              font-medium
              text-slate-500
            "
          >
            Please wait while we verify your activation link.
          </p>
        </motion.div>
      </div>
    );
  }

  // ============================================================
  // Error State
  // ============================================================

  if (error) {
    return (
      <div
        className="
          relative
          flex
          min-h-screen
          items-center
          justify-center
          overflow-hidden
          bg-slate-50
          p-6
        "
      >
        <AnimatedBackground />

        <motion.div
          initial={{
            opacity: 0,
            y: 25,
            scale: 0.96,
          }}
          animate={{
            opacity: 1,
            y: 0,
            scale: 1,
          }}
          className="
            relative
            z-10
            w-full
            max-w-md
            rounded-3xl
            border
            border-rose-200
            bg-white/95
            p-8
            text-center
            shadow-2xl
            shadow-slate-300/50
            backdrop-blur-xl
          "
        >
          <div
            className="
              mx-auto
              mb-5
              flex
              h-16
              w-16
              items-center
              justify-center
              rounded-2xl
              border
              border-rose-200
              bg-rose-50
              text-rose-500
            "
          >
            <AlertCircle size={30} />
          </div>

          <h2
            className="
              text-2xl
              font-extrabold
              tracking-tight
              text-slate-900
            "
          >
            Activation Error
          </h2>

          <p
            className="
              mt-2
              text-sm
              leading-relaxed
              text-slate-500
            "
          >
            {error}
          </p>

          <Link
            to="/login"
            className="
              mt-6
              inline-flex
              w-full
              items-center
              justify-center
              rounded-xl
              bg-gradient-to-r
              from-sky-500
              via-cyan-500
              to-teal-400
              px-5
              py-3
              text-sm
              font-extrabold
              text-white
              shadow-lg
              shadow-cyan-200/50
              transition-all
              duration-300
              hover:shadow-xl
              hover:shadow-cyan-300/50
              active:scale-[0.98]
            "
          >
            ← Back to Login
          </Link>
        </motion.div>
      </div>
    );
  }

  // ============================================================
  // Main Activation Page
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
      <AnimatedBackground />

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
            Right Activation Section
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
          {/* Soft Light Aura */}

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
              Activation Card
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
            {/* Top Accent */}

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
              <div
                className="
                  mb-3
                  inline-flex
                  items-center
                  gap-1.5
                  rounded-full
                  border
                  border-emerald-200
                  bg-emerald-50
                  px-3
                  py-1
                  text-xs
                  font-semibold
                  text-emerald-700
                "
              >
                <CheckCircle2
                  size={13}
                  className="text-emerald-500"
                />

                <span>Link Verified</span>
              </div>

              <h1
                className="
                  text-3xl
                  font-extrabold
                  tracking-tight
                  text-slate-900
                "
              >
                Activate Account
              </h1>

              <p
                className="
                  mt-2
                  text-sm
                  leading-relaxed
                  text-slate-500
                "
              >
                Welcome{" "}
                <strong
                  className="
                    font-bold
                    text-cyan-600
                  "
                >
                  {user?.firstName}
                </strong>
                ! Set up your password to complete activation.
              </p>
            </div>

            {/* =================================================
                Form
            ================================================= */}

            <form
              onSubmit={handleSubmit}
              className="space-y-5"
            >
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
                  delay: 0.3,
                  duration: 0.5,
                }}
              >
                <PasswordInput
                  name="password"
                  value={password}
                  onChange={(e) =>
                    setPassword(e.target.value)
                  }
                  disabled={submitting}
                  placeholder="Create Password"
                />
              </motion.div>

              {/* Confirm Password */}

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
                  name="confirmPassword"
                  value={confirmPassword}
                  onChange={(e) =>
                    setConfirmPassword(e.target.value)
                  }
                  disabled={submitting}
                  placeholder="Confirm Password"
                />
              </motion.div>

              {/* Submit */}

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
                  delay: 0.5,
                }}
                className="pt-2"
              >
                <LoadingButton
                  loading={submitting}
                  text="Activate Account"
                />
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
                    256-Bit Encrypted Portal
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
                  © {new Date().getFullYear()} AquaTrack •
                  All Rights Reserved
                </p>
              </div>
            </form>
          </motion.div>
        </div>
      </div>
    </div>
  );
}