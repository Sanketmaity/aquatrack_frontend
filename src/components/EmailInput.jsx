import { Mail } from "lucide-react";
import { useTranslation } from "react-i18next";

export default function EmailInput({
  value,
  onChange,
  disabled,
  name = "email",
}) {
  const { t } = useTranslation();

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
        {t("auth.emailLabel")}
      </label>

      {/* ============================================================
          Input Wrapper
      ============================================================ */}

      <div className="relative group">

        {/* Email Icon */}

        <Mail
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

        {/* Email Input */}

        <input
          id={name}
          type="email"
          name={name}
          value={value}
          onChange={onChange}
          disabled={disabled}
          placeholder="name@company.com"
          required
          autoComplete="email"
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
            text-slate-900
            placeholder-slate-400
            outline-none
            transition-all
            duration-300
            shadow-sm
            shadow-slate-200/40

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

      </div>
    </div>
  );
}