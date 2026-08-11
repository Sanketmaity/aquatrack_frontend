import { useState } from "react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import {
  Building,
  User,
  Mail,
  Phone,
  Building2,
  MapPin,
  Sparkles,
  ArrowRight,
  Loader2,
  Droplets,
  ArrowLeft,
} from "lucide-react";

import { registerProperty } from "../services/propertyRegistrationService";
import { toast } from "../components/ui/Toaster";

import AnimatedBackground from "../components/AnimatedBackground";

export default function RegisterApartment() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  // ============================================================
  // State
  // ============================================================

  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    companyName: "",
    contactPersonName: "",
    email: "",
    phone: "",
    propertyType: "APARTMENT",
    numberOfApartments: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
  });

  // ============================================================
  // Input Change
  // ============================================================

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // ============================================================
  // Reset Form
  // ============================================================

  const resetForm = () => {
    setFormData({
      companyName: "",
      contactPersonName: "",
      email: "",
      phone: "",
      propertyType: "APARTMENT",
      numberOfApartments: "",
      address: "",
      city: "",
      state: "",
      pincode: "",
    });
  };

  // ============================================================
  // Submit
  // ============================================================

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (loading) {
      return;
    }

    try {
      setLoading(true);

      // ========================================================
      // API Request
      // ========================================================

      const response = await registerProperty(formData);

      console.log(
        "AquaTrack property registration:",
        response
      );

      // ========================================================
      // Success Toast
      // ========================================================

      toast.success(
        "Registration Successful",
        response?.message ||
          "Your property has been registered successfully."
      );

      // ========================================================
      // Reset Form
      // ========================================================

      resetForm();

      // ========================================================
      // Redirect To Home
      // ========================================================

      setTimeout(() => {
        navigate("/");
      }, 1200);
    } catch (error) {
      console.error(
        "AquaTrack property registration failed:",
        error
      );

      // ========================================================
      // Error Message
      // ========================================================

      const message =
        error?.response?.data?.message ||
        error?.response?.data?.error ||
        error?.message ||
        "Registration failed. Please try again.";

      // ========================================================
      // Error Toast
      // ========================================================

      toast.error(
        "Registration Failed",
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
        flex
        min-h-screen
        items-center
        justify-center
        overflow-hidden
        bg-slate-50
        px-4
        py-12
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
          Main Registration Card
      ====================================================== */}

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
          z-10
          w-full
          max-w-3xl
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
          sm:p-10
        "
      >
        {/* ====================================================
            Top Gradient Accent
        ==================================================== */}

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

        {/* ====================================================
            Back To Home
        ==================================================== */}

        <div className="mb-6">
          <Link
            to="/"
            className="
              group
              inline-flex
              items-center
              gap-1.5
              rounded-lg
              px-2
              py-1
              text-xs
              font-semibold
              text-slate-500
              transition-all
              duration-200
              hover:bg-sky-50
              hover:text-sky-600
            "
          >
            <ArrowLeft
              size={14}
              className="
                transition-transform
                duration-200
                group-hover:-translate-x-1
              "
            />

            <span>
              {t("common.backToHome")}
            </span>
          </Link>
        </div>

        {/* ====================================================
            Header
        ==================================================== */}

        <div className="mb-8 text-center">
          {/* Logo */}

          <motion.div
            initial={{
              opacity: 0,
              scale: 0.8,
            }}
            animate={{
              opacity: 1,
              scale: 1,
            }}
            transition={{
              duration: 0.5,
            }}
            className="
              mx-auto
              mb-4
              flex
              h-14
              w-14
              items-center
              justify-center
              rounded-2xl
              bg-gradient-to-tr
              from-sky-500
              via-cyan-500
              to-teal-400
              text-white
              shadow-lg
              shadow-cyan-300/40
            "
          >
            <Droplets size={28} />
          </motion.div>

          {/* Badge */}

          <div
            className="
              mb-2
              inline-flex
              items-center
              gap-1.5
              rounded-full
              border
              border-cyan-200
              bg-cyan-50
              px-3
              py-1
              text-xs
              font-semibold
              text-cyan-700
            "
          >
            <Sparkles
              size={13}
              className="text-cyan-500"
            />

            <span>
              {t("register.badge")}
            </span>
          </div>

          {/* Title */}

          <h1
            className="
              text-3xl
              font-extrabold
              tracking-tight
              text-slate-900
              sm:text-4xl
            "
          >
            {t("register.title")}
          </h1>

          {/* Subtitle */}

          <p
            className="
              mx-auto
              mt-2
              max-w-md
              text-sm
              leading-relaxed
              text-slate-500
            "
          >
            {t("register.subtitle")}
          </p>
        </div>

        {/* ====================================================
            Registration Form
        ==================================================== */}

        <form
          onSubmit={handleSubmit}
          className="space-y-5"
        >
          {/* ==================================================
              Company + Contact
          ================================================== */}

          <div className="grid gap-4 sm:grid-cols-2">
            <FormInput
              icon={<Building size={18} />}
              label={t("register.companyName")}
              name="companyName"
              placeholder="e.g. Skyline Residency"
              value={formData.companyName}
              onChange={handleChange}
              disabled={loading}
              required
            />

            <FormInput
              icon={<User size={18} />}
              label={t("register.contactPerson")}
              name="contactPersonName"
              placeholder="e.g. Alex Mercer"
              value={formData.contactPersonName}
              onChange={handleChange}
              disabled={loading}
              required
            />
          </div>

          {/* ==================================================
              Email + Phone
          ================================================== */}

          <div className="grid gap-4 sm:grid-cols-2">
            <FormInput
              icon={<Mail size={18} />}
              label={t("register.officialEmail")}
              type="email"
              name="email"
              placeholder="admin@skyline.com"
              value={formData.email}
              onChange={handleChange}
              disabled={loading}
              required
            />

            <FormInput
              icon={<Phone size={18} />}
              label={t("register.phoneNumber")}
              type="tel"
              name="phone"
              placeholder="+91 98765 43210"
              value={formData.phone}
              onChange={handleChange}
              disabled={loading}
              required
            />
          </div>

          {/* ==================================================
              Property Type + Apartment Count
          ================================================== */}

          <div className="grid gap-4 sm:grid-cols-2">
            {/* Property Type */}

            <div className="space-y-1.5">
              <label
                className="
                  block
                  text-xs
                  font-semibold
                  uppercase
                  tracking-wider
                  text-slate-600
                "
              >
                {t("register.propertyType")}
              </label>

              <div className="relative group">
                <Building2
                  size={18}
                  className="
                    absolute
                    left-3.5
                    top-1/2
                    z-10
                    -translate-y-1/2
                    text-slate-400
                    transition-colors
                    group-focus-within:text-cyan-500
                  "
                />

                <select
                  name="propertyType"
                  value={formData.propertyType}
                  onChange={handleChange}
                  disabled={loading}
                  className="
                    w-full
                    cursor-pointer
                    appearance-none
                    rounded-xl
                    border
                    border-slate-200
                    bg-white
                    py-3
                    pl-10
                    pr-4
                    text-sm
                    font-medium
                    text-slate-800
                    outline-none
                    transition-all
                    duration-300
                    hover:border-slate-300
                    focus:border-cyan-400
                    focus:ring-4
                    focus:ring-cyan-500/10
                    disabled:cursor-not-allowed
                    disabled:bg-slate-50
                    disabled:opacity-60
                  "
                >
                  <option value="APARTMENT">
                    {t("register.apartment")}
                  </option>

                  <option value="VILLA">
                    {t("register.villa")}
                  </option>

                  <option value="GATED_COMMUNITY">
                    {t("register.gatedCommunity")}
                  </option>
                </select>
              </div>
            </div>

            {/* Apartment Count */}

            <FormInput
              icon={<Building2 size={18} />}
              label={t("register.numberOfApartments")}
              type="number"
              min="1"
              step="1"
              name="numberOfApartments"
              placeholder="e.g. 150"
              value={formData.numberOfApartments}
              onChange={handleChange}
              disabled={loading}
              required
            />
          </div>

          {/* ==================================================
              Address
          ================================================== */}

          <div className="space-y-1.5">
            <label
              className="
                block
                text-xs
                font-semibold
                uppercase
                tracking-wider
                text-slate-600
              "
            >
              {t("register.address")}
            </label>

            <div className="relative group">
              <MapPin
                size={18}
                className="
                  absolute
                  left-3.5
                  top-4
                  text-slate-400
                  transition-colors
                  group-focus-within:text-cyan-500
                "
              />

              <textarea
                name="address"
                placeholder="Street address, landmark, area details..."
                value={formData.address}
                onChange={handleChange}
                disabled={loading}
                rows={3}
                required
                className="
                  w-full
                  resize-none
                  rounded-xl
                  border
                  border-slate-200
                  bg-white
                  py-3
                  pl-10
                  pr-4
                  text-sm
                  font-medium
                  text-slate-800
                  placeholder-slate-400
                  outline-none
                  transition-all
                  duration-300
                  hover:border-slate-300
                  focus:border-cyan-400
                  focus:ring-4
                  focus:ring-cyan-500/10
                  disabled:cursor-not-allowed
                  disabled:bg-slate-50
                  disabled:opacity-60
                "
              />
            </div>
          </div>

          {/* ==================================================
              City + State + Pincode
          ================================================== */}

          <div className="grid gap-4 sm:grid-cols-3">
            <FormInput
              icon={<MapPin size={18} />}
              label={t("register.city")}
              name="city"
              placeholder="e.g. Mumbai"
              value={formData.city}
              onChange={handleChange}
              disabled={loading}
              required
            />

            <FormInput
              icon={<MapPin size={18} />}
              label={t("register.state")}
              name="state"
              placeholder="e.g. Maharashtra"
              value={formData.state}
              onChange={handleChange}
              disabled={loading}
              required
            />

            <FormInput
              icon={<MapPin size={18} />}
              label={t("register.pincode")}
              name="pincode"
              placeholder="400001"
              value={formData.pincode}
              onChange={handleChange}
              disabled={loading}
              required
            />
          </div>

          {/* ==================================================
              Submit Button
          ================================================== */}

          <div className="pt-3">
            <motion.button
              type="submit"
              whileHover={{
                scale: loading ? 1 : 1.01,
              }}
              whileTap={{
                scale: loading ? 1 : 0.98,
              }}
              disabled={loading}
              className="
                group
                relative
                flex
                w-full
                items-center
                justify-center
                gap-2
                rounded-xl
                bg-gradient-to-r
                from-sky-500
                via-cyan-500
                to-teal-400
                px-6
                py-4
                font-extrabold
                text-white
                shadow-lg
                shadow-cyan-300/40
                transition-all
                duration-300
                hover:shadow-xl
                hover:shadow-cyan-300/50
                disabled:cursor-not-allowed
                disabled:opacity-60
              "
            >
              {loading ? (
                <>
                  <Loader2
                    size={18}
                    className="animate-spin"
                  />

                  <span>
                    {t("register.submitting")}
                  </span>
                </>
              ) : (
                <>
                  <span>
                    {t("register.submit")}
                  </span>

                  <ArrowRight
                    size={18}
                    className="
                      transition-transform
                      duration-300
                      group-hover:translate-x-1
                    "
                  />
                </>
              )}
            </motion.button>
          </div>

          {/* ==================================================
              Disclaimer
          ================================================== */}

          <p
            className="
              pt-2
              text-center
              text-[11px]
              font-medium
              text-slate-400
            "
          >
            {t("register.disclaimer")}
          </p>
        </form>
      </motion.div>
    </div>
  );
}

// ============================================================
// Reusable Light Theme Form Input
// ============================================================

function FormInput({
  icon,
  label,
  type = "text",
  name,
  placeholder,
  value,
  onChange,
  disabled,
  required,
  min,
  step,
}) {
  return (
    <div className="space-y-1.5">
      <label
        className="
          block
          text-xs
          font-semibold
          uppercase
          tracking-wider
          text-slate-600
        "
      >
        {label}
      </label>

      <div className="relative group">
        <span
          className="
            absolute
            left-3.5
            top-1/2
            z-10
            -translate-y-1/2
            text-slate-400
            transition-colors
            duration-200
            group-focus-within:text-cyan-500
          "
        >
          {icon}
        </span>

        <input
          type={type}
          name={name}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          disabled={disabled}
          required={required}
          min={min}
          step={step}
          className="
            w-full
            rounded-xl
            border
            border-slate-200
            bg-white
            py-3
            pl-10
            pr-4
            text-sm
            font-medium
            text-slate-800
            placeholder-slate-400
            outline-none
            transition-all
            duration-300
            hover:border-slate-300
            focus:border-cyan-400
            focus:ring-4
            focus:ring-cyan-500/10
            disabled:cursor-not-allowed
            disabled:bg-slate-50
            disabled:opacity-60
          "
        />
      </div>
    </div>
  );
}