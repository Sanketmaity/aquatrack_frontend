import { useState } from "react";
import { Lock, Eye, EyeOff } from "lucide-react";
import { useTranslation } from "react-i18next";

export default function PasswordInput({
  value,
  onChange,
  disabled,
  name = "password",
}) {
  const { t } = useTranslation();
  const [showPassword, setShowPassword] = useState(false);

  const isPasswordConfirmation =
    name === "newPassword" || name === "confirmPassword";

  return (
    <div className="space-y-1.5">

      {/* ============================================================
          Label
      ============================================================ */}

      <label
        htmlFor={name}
        className="
          block
          text-xs
          font-semibold
          uppercase
          tracking-wider
          text-slate-600
        "
      >
        {isPasswordConfirmation
          ? t("auth.newPassword")
          : t("auth.passwordLabel")}
      </label>

      {/* ============================================================
          Input Wrapper
      ============================================================ */}

      <div className="relative group">

        {/* Password Icon */}

        <Lock
          size={18}
          className="
            absolute
            left-3.5
            top-1/2
            -translate-y-1/2
            text-slate-400
            transition-colors
            duration-200
            group-focus-within:text-cyan-500
          "
        />

        {/* Password Input */}

        <input
          id={name}
          type={showPassword ? "text" : "password"}
          name={name}
          value={value}
          onChange={onChange}
          disabled={disabled}
          placeholder="••••••••"
          required
          autoComplete={
            isPasswordConfirmation
              ? "new-password"
              : "current-password"
          }
          className="
            w-full
            rounded-xl
            border
            border-slate-200
            bg-white
            py-3
            pl-10
            pr-11
            text-sm
            font-medium
            text-slate-900
            placeholder-slate-400
            outline-none
            shadow-sm
            shadow-slate-200/40
            transition-all
            duration-300

            hover:border-slate-300

            focus:border-cyan-400
            focus:bg-white
            focus:ring-4
            focus:ring-cyan-500/10
            focus:shadow-md
            focus:shadow-cyan-500/10

            disabled:cursor-not-allowed
            disabled:bg-slate-50
            disabled:text-slate-400
            disabled:opacity-70
          "
        />

        {/* ========================================================
            Show / Hide Password
        ======================================================== */}

        <button
          type="button"
          onClick={() => setShowPassword((prev) => !prev)}
          disabled={disabled}
          aria-label={
            showPassword
              ? "Hide password"
              : "Show password"
          }
          className="
            absolute
            right-3.5
            top-1/2
            -translate-y-1/2
            rounded-lg
            p-1
            text-slate-400
            transition-all
            duration-200

            hover:bg-cyan-50
            hover:text-cyan-600

            focus:outline-none
            focus:ring-2
            focus:ring-cyan-500/20

            disabled:cursor-not-allowed
            disabled:opacity-50
          "
        >
          {showPassword ? (
            <EyeOff size={18} />
          ) : (
            <Eye size={18} />
          )}
        </button>

      </div>
    </div>
  );
}