import { useEffect, useState } from "react";
import { useSearchParams, useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ShieldCheck,
  Loader2,
  AlertCircle,
  CheckCircle2,
  Building,
  Home,
} from "lucide-react";

import { toast } from "../../components/ui/Toaster";

import residentInvitationService from "../../services/residentInvitationService";

import logo from "../../assets/logo.png";
import AnimatedBackground from "../../components/AnimatedBackground";
import LeftHero from "../../components/LeftHero";
import PasswordInput from "../../components/PasswordInput";
import LoadingButton from "../../components/LoadingButton";

export default function ResidentActivation() {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");

  const navigate = useNavigate();

  // ============================================================
  // State
  // ============================================================

  const [loading, setLoading] = useState(true);
  const [resident, setResident] = useState(null);
  const [error, setError] = useState("");

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);

  // ============================================================
  // Validate Invitation Token
  // ============================================================

  useEffect(() => {
    let isMounted = true;

    async function validate() {
      try {
        const response =
          await residentInvitationService.getActivationDetails(token);

        if (isMounted) {
          setResident(response.data);
        }
      } catch (err) {
        console.error(
          "Resident invitation validation error:",
          err
        );

        if (isMounted) {
          setError(
            err?.response?.data?.message ||
              err?.response?.data?.error ||
              "Invalid or expired activation link."
          );
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    if (token) {
      validate();
    } else {
      setLoading(false);
      setError("Activation token is missing.");
    }

    return () => {
      isMounted = false;
    };
  }, [token]);

  // ============================================================
  // Submit Handler
  // ============================================================

  const handleSubmit = async (event) => {
    event?.preventDefault();

    // ==========================================================
    // Validate Password Fields
    // ==========================================================

    if (!password || !confirmPassword) {
      toast.error(
        "Missing Password",
        "Please fill in both password fields."
      );

      return;
    }

    // ==========================================================
    // Validate Password Match
    // ==========================================================

    if (password !== confirmPassword) {
      toast.error(
        "Password Mismatch",
        "Password and confirm password do not match."
      );

      return;
    }

    try {
      setSubmitting(true);

      // ========================================================
      // Activate Resident Account
      // ========================================================

      await residentInvitationService.activateResident({
        invitationToken: token,
        password,
        confirmPassword,
      });

      // ========================================================
      // Success Toast
      // ========================================================

      toast.success(
        "Account Activated",
        "Your resident account has been activated successfully."
      );

      // ========================================================
      // Clear Password Fields
      // ========================================================

      setPassword("");
      setConfirmPassword("");

      // ========================================================
      // Redirect To Login
      // ========================================================

      setTimeout(() => {
        navigate("/login");
      }, 1200);
    } catch (err) {
      console.error(
        "Resident activation error:",
        err
      );

      const message =
        err?.response?.data?.message ||
        err?.response?.data?.error ||
        "Failed to activate your resident account.";

      // ========================================================
      // Error Toast
      // ========================================================

      toast.error(
        "Activation Failed",
        message
      );
    } finally {
      setSubmitting(false);
    }
  };

  // ============================================================
  // Loading Screen
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
          {/* Loading Icon */}

          <div
            className="
              mx-auto
              mb-5
              flex
              h-14
              w-14
              items-center
              justify-center
              rounded-2xl
              bg-cyan-50
              text-cyan-600
              ring-1
              ring-cyan-100
            "
          >
            <Loader2
              size={28}
              className="animate-spin"
            />
          </div>

          {/* Loading Title */}

          <h2
            className="
              text-lg
              font-extrabold
              text-slate-900
            "
          >
            Verifying Invitation
          </h2>

          {/* Loading Description */}

          <p
            className="
              mt-2
              text-sm
              leading-relaxed
              text-slate-500
            "
          >
            Please wait while we validate your resident
            activation link.
          </p>

          {/* Loading Progress */}

          <div
            className="
              mx-auto
              mt-5
              h-1.5
              w-32
              overflow-hidden
              rounded-full
              bg-slate-100
            "
          >
            <motion.div
              animate={{
                x: ["-100%", "100%"],
              }}
              transition={{
                duration: 1.2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="
                h-full
                w-1/2
                rounded-full
                bg-gradient-to-r
                from-sky-500
                via-cyan-500
                to-teal-400
              "
            />
          </div>
        </motion.div>
      </div>
    );
  }

  // ============================================================
  // Error Screen
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
          transition={{
            duration: 0.5,
          }}
          className="
            relative
            z-10
            w-full
            max-w-md
            overflow-hidden
            rounded-3xl
            border
            border-red-200
            bg-white/95
            p-8
            text-center
            shadow-2xl
            shadow-slate-300/50
            backdrop-blur-xl
          "
        >
          {/* Error Accent */}

          <div
            className="
              absolute
              left-0
              right-0
              top-0
              h-1
              bg-gradient-to-r
              from-red-400
              via-rose-500
              to-orange-400
            "
          />

          {/* Error Icon */}

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
              border-red-100
              bg-red-50
              text-red-500
            "
          >
            <AlertCircle size={30} />
          </div>

          {/* Error Title */}

          <h2
            className="
              text-2xl
              font-extrabold
              text-slate-900
            "
          >
            Activation Error
          </h2>

          {/* Error Message */}

          <p
            className="
              mt-3
              text-sm
              leading-relaxed
              text-slate-500
            "
          >
            {error}
          </p>

          {/* Back To Login */}

          <Link
            to="/login"
            className="
              mt-7
              inline-flex
              w-full
              items-center
              justify-center
              rounded-xl
              bg-gradient-to-r
              from-sky-500
              via-cyan-500
              to-teal-500
              px-5
              py-3
              text-sm
              font-bold
              text-white
              shadow-lg
              shadow-cyan-500/20
              transition-all
              duration-200
              hover:-translate-y-0.5
              hover:shadow-xl
              hover:shadow-cyan-500/25
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
  // Main Activation View
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
          Light Animated Background
      ====================================================== */}

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
            {/* =================================================
                Top Gradient Highlight
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

            <div className="mb-6 text-center">
              {/* Verification Badge */}

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
                  font-bold
                  text-emerald-700
                "
              >
                <CheckCircle2 size={13} />

                <span>
                  Resident Invitation Verified
                </span>
              </div>

              {/* Title */}

              <h1
                className="
                  text-3xl
                  font-extrabold
                  tracking-tight
                  text-slate-900
                "
              >
                Activate Resident Portal
              </h1>

              {/* Welcome */}

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
                    text-cyan-700
                  "
                >
                  {resident?.firstName}{" "}
                  {resident?.lastName}
                </strong>
                !
              </p>
            </div>

            {/* =================================================
                Resident Assignment Details
            ================================================= */}

            <motion.div
              initial={{
                opacity: 0,
                y: 10,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                delay: 0.25,
              }}
              className="
                mb-6
                space-y-2
                rounded-2xl
                border
                border-slate-200
                bg-slate-50
                p-4
                text-xs
              "
            >
              {/* Apartment */}

              <div
                className="
                  flex
                  items-center
                  gap-2
                  text-slate-600
                "
              >
                <Building
                  size={16}
                  className="text-cyan-600"
                />

                <span className="text-slate-500">
                  Apartment:
                </span>

                <span
                  className="
                    font-bold
                    text-slate-900
                  "
                >
                  {resident?.apartmentName || "N/A"}
                </span>
              </div>

              {/* House / Flat */}

              <div
                className="
                  flex
                  items-center
                  gap-2
                  border-t
                  border-slate-200
                  pt-2
                  text-slate-600
                "
              >
                <Home
                  size={16}
                  className="text-cyan-600"
                />

                <span className="text-slate-500">
                  House / Flat No:
                </span>

                <span
                  className="
                    font-bold
                    text-cyan-700
                  "
                >
                  {resident?.houseNumber || "N/A"}
                </span>
              </div>
            </motion.div>

            {/* =================================================
                Activation Form
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
                  {" "}All Rights Reserved
                </p>
              </div>
            </form>
          </motion.div>
        </div>
      </div>
    </div>
  );
}