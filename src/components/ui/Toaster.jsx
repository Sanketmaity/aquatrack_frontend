import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import {
  AlertCircle,
  CheckCircle2,
  Info,
  X,
} from "lucide-react";

// ============================================================
// Configuration
// ============================================================

const MAX_TOASTS = 5;

const DEFAULT_DURATION = 4000;

// ============================================================
// Toast Context
// ============================================================

const ToastContext = createContext(null);

// ============================================================
// Global Toast Listener
// ============================================================

let toastListener = null;

// ============================================================
// Imperative Toast API
// ============================================================

export const toast = {
  success(title, message, duration = DEFAULT_DURATION) {
    toastListener?.({
      type: "success",
      title,
      message,
      duration,
    });
  },

  error(title, message, duration = DEFAULT_DURATION) {
    toastListener?.({
      type: "error",
      title,
      message,
      duration,
    });
  },

  info(title, message, duration = DEFAULT_DURATION) {
    toastListener?.({
      type: "info",
      title,
      message,
      duration,
    });
  },

  dismiss(id) {
    window.dispatchEvent(
      new CustomEvent("aquatrack:toast:dismiss", {
        detail: { id },
      })
    );
  },
};

// ============================================================
// Toast Provider
// ============================================================

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);

  const timersRef = useRef(new Map());

  // ==========================================================
  // Remove Toast
  // ==========================================================

  const removeToast = useCallback((id) => {
    setToasts((current) =>
      current.filter((toastItem) => toastItem.id !== id)
    );

    const timer = timersRef.current.get(id);

    if (timer) {
      clearTimeout(timer);
      timersRef.current.delete(id);
    }
  }, []);

  // ==========================================================
  // Add Toast
  // ==========================================================

  const addToast = useCallback(
    (toastData) => {
      const id =
        typeof crypto !== "undefined" &&
        crypto.randomUUID
          ? crypto.randomUUID()
          : `${Date.now()}-${Math.random()
              .toString(36)
              .slice(2)}`;

      const duration =
        toastData.duration ?? DEFAULT_DURATION;

      const newToast = {
        id,
        type: toastData.type ?? "info",
        title: toastData.title ?? "Notification",
        message: toastData.message ?? "",
        duration,
      };

      setToasts((current) => [
        newToast,
        ...current,
      ].slice(0, MAX_TOASTS));

      if (duration > 0) {
        const timer = setTimeout(() => {
          removeToast(id);
        }, duration);

        timersRef.current.set(id, timer);
      }

      return id;
    },
    [removeToast]
  );

  // ==========================================================
  // Global Listener
  // ==========================================================

  useEffect(() => {
    toastListener = addToast;

    return () => {
      if (toastListener === addToast) {
        toastListener = null;
      }
    };
  }, [addToast]);

  // ==========================================================
  // Cleanup Timers
  // ==========================================================

  useEffect(() => {
    return () => {
      timersRef.current.forEach((timer) => {
        clearTimeout(timer);
      });

      timersRef.current.clear();
    };
  }, []);

  // ==========================================================
  // Context Value
  // ==========================================================

  const contextValue = useMemo(
    () => ({
      toasts,
      addToast,
      removeToast,
    }),
    [toasts, addToast, removeToast]
  );

  // ==========================================================
  // UI
  // ==========================================================

  return (
    <ToastContext.Provider value={contextValue}>
      {children}

      <div
        className="
          pointer-events-none
          fixed
          inset-x-0
          top-4
          z-[99999]
          flex
          justify-end
          px-4
          sm:right-4
          sm:left-auto
          sm:w-[420px]
          sm:px-0
        "
        aria-live="polite"
        aria-atomic="true"
      >
        <div className="flex w-full flex-col gap-3">
          {toasts.map((toastItem) => (
            <ToastItem
              key={toastItem.id}
              toast={toastItem}
              onClose={removeToast}
            />
          ))}
        </div>
      </div>
    </ToastContext.Provider>
  );
}

// ============================================================
// Toast Item
// ============================================================

function ToastItem({ toast: toastItem, onClose }) {
  const {
    id,
    type,
    title,
    message,
    duration,
  } = toastItem;

  // ==========================================================
  // Configuration
  // ==========================================================

  const config = {
    success: {
      icon: CheckCircle2,
      iconColor: "text-emerald-600 dark:text-emerald-400",
      iconBackground:
        "bg-emerald-50 dark:bg-emerald-500/10",
      border:
        "border-emerald-200 dark:border-emerald-500/30",
      progress: "bg-emerald-500",
      title:
        "text-slate-900 dark:text-white",
      message:
        "text-slate-500 dark:text-slate-400",
      role: "status",
    },

    error: {
      icon: AlertCircle,
      iconColor: "text-red-600 dark:text-red-400",
      iconBackground:
        "bg-red-50 dark:bg-red-500/10",
      border:
        "border-red-200 dark:border-red-500/30",
      progress: "bg-red-500",
      title:
        "text-slate-900 dark:text-white",
      message:
        "text-slate-500 dark:text-slate-400",
      role: "alert",
    },

    info: {
      icon: Info,
      iconColor: "text-cyan-600 dark:text-cyan-400",
      iconBackground:
        "bg-cyan-50 dark:bg-cyan-500/10",
      border:
        "border-cyan-200 dark:border-cyan-500/30",
      progress: "bg-cyan-500",
      title:
        "text-slate-900 dark:text-white",
      message:
        "text-slate-500 dark:text-slate-400",
      role: "status",
    },
  };

  const currentConfig =
    config[type] ?? config.info;

  const Icon = currentConfig.icon;

  // ==========================================================
  // UI
  // ==========================================================

  return (
    <div
      role={currentConfig.role}
      className={`
        pointer-events-auto
        relative
        w-full
        overflow-hidden
        rounded-2xl
        border
        ${currentConfig.border}

        bg-white/95
        dark:bg-slate-900/95

        shadow-[0_18px_45px_rgba(15,23,42,0.12)]
        dark:shadow-[0_18px_45px_rgba(0,0,0,0.35)]

        backdrop-blur-xl

        animate-[aquatrack-toast-in_0.35s_cubic-bezier(0.16,1,0.3,1)]

        transition-all
        duration-200

        hover:-translate-y-0.5
        hover:shadow-[0_22px_50px_rgba(15,23,42,0.16)]
      `}
    >
      <div className="flex items-start gap-3 p-4">

        {/* Icon */}

        <div
          className={`
            flex
            h-10
            w-10
            shrink-0
            items-center
            justify-center
            rounded-xl
            ${currentConfig.iconBackground}
          `}
        >
          <Icon
            size={20}
            strokeWidth={2.2}
            className={currentConfig.iconColor}
          />
        </div>

        {/* Content */}

        <div className="min-w-0 flex-1 pt-0.5">

          <p
            className={`
              text-sm
              font-bold
              leading-5
              ${currentConfig.title}
            `}
          >
            {title}
          </p>

          {message && (
            <p
              className={`
                mt-1
                text-xs
                leading-5
                ${currentConfig.message}
              `}
            >
              {message}
            </p>
          )}

        </div>

        {/* Close */}

        <button
          type="button"
          onClick={() => onClose(id)}
          className="
            shrink-0
            rounded-lg
            p-1.5
            text-slate-400
            transition
            hover:bg-slate-100
            hover:text-slate-700
            dark:hover:bg-slate-800
            dark:hover:text-slate-200
          "
          aria-label="Close notification"
        >
          <X size={15} />
        </button>

      </div>

      {/* Progress */}

      {duration > 0 && (
        <div className="absolute inset-x-0 bottom-0 h-0.5 overflow-hidden">
          <div
            className={`
              h-full
              w-full
              origin-left
              ${currentConfig.progress}
              animate-[aquatrack-toast-progress_linear_forwards]
            `}
            style={{
              animationDuration: `${duration}ms`,
            }}
          />
        </div>
      )}
    </div>
  );
}

// ============================================================
// React Hook
// ============================================================

export function useToast() {
  const context = useContext(ToastContext);

  if (!context) {
    throw new Error(
      "useToast must be used within a ToastProvider."
    );
  }

  return context;
}

// ============================================================
// Global Animation Styles
// ============================================================

if (typeof document !== "undefined") {
  const styleId = "aquatrack-toast-styles";

  if (!document.head.querySelector(`[data-${styleId}]`)) {
    const style = document.createElement("style");

    style.setAttribute(`data-${styleId}`, "true");

    style.innerHTML = `
      @keyframes aquatrack-toast-in {
        from {
          opacity: 0;
          transform: translateY(-14px) scale(0.96);
        }

        to {
          opacity: 1;
          transform: translateY(0) scale(1);
        }
      }

      @keyframes aquatrack-toast-progress {
        from {
          transform: scaleX(1);
        }

        to {
          transform: scaleX(0);
        }
      }
    `;

    document.head.appendChild(style);
  }
}