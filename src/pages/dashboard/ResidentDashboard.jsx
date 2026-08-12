import { useCallback, useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  AlertCircle,
  Building2,
  Home,
  RefreshCw,
  Sparkles,
  UserRound,
} from "lucide-react";

import DashboardLayout from "../../components/ui/DashboardLayout";

import ResidentDashboardSummaryCards from "../../components/resident/ResidentDashboardSummaryCards";
import ResidentConsumptionChart from "../../components/resident/ResidentConsumptionChart";
import ResidentBillSummary from "../../components/resident/ResidentBillSummary";
import ResidentRecentBillsTable from "../../components/resident/ResidentRecentBillsTable";

// Update this import if your service is located elsewhere.
import {
  getResidentDashboardSummary,
  getResidentMonthlyConsumption,
  getResidentBillSummary,
  getResidentRecentBills,
} from "../../services/residentDashboardService";

export default function ResidentDashboard() {
  // ============================================================
  // State
  // ============================================================

  const [dashboard, setDashboard] = useState({
    summary: {
      currentMonthUsage: 0,
      currentBill: 0,
      billingStatus: "PENDING",
      waterAlerts: "None",
    },

    monthlyConsumption: [],

    billSummary: {
      totalBills: 0,
      paidBills: 0,
      pendingBills: 0,
      totalAmount: 0,
    },

    recentBills: [],

    resident: {
      firstName: "",
      lastName: "",
      apartmentName: "--",
      buildingName: "--",
      householdName: "--",
    },
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // ============================================================
  // Load Dashboard
  // ============================================================

  const loadDashboard = useCallback(async () => {
    try {
      setLoading(true);
      setError("");

      const [
        summaryResponse,
        consumptionResponse,
        billSummaryResponse,
        recentBillsResponse,
      ] = await Promise.all([
        getResidentDashboardSummary(),
        getResidentMonthlyConsumption(),
        getResidentBillSummary(),
        getResidentRecentBills(),
      ]);

      const summary = summaryResponse?.data ?? {};
      const monthlyConsumption =
        consumptionResponse?.data ?? [];
      const billSummary =
        billSummaryResponse?.data ?? {};
      const recentBills =
        recentBillsResponse?.data ?? [];

      setDashboard({
        summary: {
          currentMonthUsage:
            summary?.currentMonthUsage ?? 0,

          currentBill:
            summary?.currentBill ?? 0,

          billingStatus:
            summary?.billingStatus ?? "PENDING",

          waterAlerts:
            summary?.waterAlerts ?? "None",
        },

        monthlyConsumption: Array.isArray(
          monthlyConsumption
        )
          ? monthlyConsumption
          : [],

        billSummary: {
          totalBills:
            billSummary?.totalBills ?? 0,

          paidBills:
            billSummary?.paidBills ?? 0,

          pendingBills:
            billSummary?.pendingBills ?? 0,

          totalAmount:
            billSummary?.totalAmount ?? 0,
        },

        recentBills: Array.isArray(recentBills)
          ? recentBills
          : [],

        resident: {
          firstName:
            summary?.firstName ??
            summary?.resident?.firstName ??
            "",

          lastName:
            summary?.lastName ??
            summary?.resident?.lastName ??
            "",

          apartmentName:
            summary?.apartmentName ??
            summary?.resident?.apartmentName ??
            "--",

          buildingName:
            summary?.buildingName ??
            summary?.resident?.buildingName ??
            "--",

          householdName:
            summary?.householdName ??
            summary?.resident?.householdName ??
            "--",
        },
      });
    } catch (err) {
      console.error(
        "Resident dashboard error:",
        err
      );

      setError(
        err?.response?.data?.message ||
          err?.response?.data?.error ||
          "Failed to load resident dashboard data."
      );
    } finally {
      setLoading(false);
    }
  }, []);

  // ============================================================
  // Initial Load
  // ============================================================

  useEffect(() => {
    loadDashboard();
  }, [loadDashboard]);

  // ============================================================
  // Loading Skeleton
  // ============================================================

  if (loading) {
    return (
      <DashboardLayout>
        <div className="mx-auto max-w-7xl space-y-8">
          {/* Header Skeleton */}

          <div className="border-b border-slate-200 pb-5">
            <div className="h-7 w-64 animate-pulse rounded-lg bg-slate-200" />

            <div className="mt-3 h-4 w-96 max-w-full animate-pulse rounded bg-slate-100" />
          </div>

          {/* Summary Skeleton */}

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
            {[1, 2, 3, 4].map((item) => (
              <div
                key={item}
                className="
                  h-40
                  animate-pulse
                  rounded-2xl
                  border
                  border-slate-200
                  bg-white
                  p-5
                "
              >
                <div className="flex justify-between">
                  <div className="space-y-3">
                    <div className="h-4 w-28 rounded bg-slate-200" />
                    <div className="h-8 w-20 rounded bg-slate-200" />
                  </div>

                  <div className="h-12 w-12 rounded-xl bg-slate-100" />
                </div>

                <div className="mt-5 h-3 w-36 rounded bg-slate-100" />
              </div>
            ))}
          </div>

          {/* Content Skeleton */}

          <div className="grid gap-6 xl:grid-cols-[1.5fr_1fr]">
            <div className="h-[430px] animate-pulse rounded-2xl bg-white border border-slate-200" />

            <div className="h-[430px] animate-pulse rounded-2xl bg-white border border-slate-200" />
          </div>
        </div>
      </DashboardLayout>
    );
  }

  // ============================================================
  // Error Screen
  // ============================================================

  if (error) {
    return (
      <DashboardLayout>
        <div className="mx-auto max-w-7xl">
          <motion.div
            initial={{
              opacity: 0,
              y: -10,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            className="
              rounded-2xl
              border
              border-red-200
              bg-red-50
              p-6
            "
          >
            <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-start gap-3">
                <div
                  className="
                    flex
                    h-10
                    w-10
                    shrink-0
                    items-center
                    justify-center
                    rounded-xl
                    bg-red-100
                    text-red-600
                  "
                >
                  <AlertCircle size={21} />
                </div>

                <div>
                  <h2 className="font-bold text-red-900">
                    Dashboard Update Error
                  </h2>

                  <p className="mt-1 text-sm text-red-700">
                    {error}
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={loadDashboard}
                className="
                  inline-flex
                  items-center
                  justify-center
                  gap-2
                  rounded-xl
                  bg-red-600
                  px-4
                  py-2.5
                  text-sm
                  font-semibold
                  text-white
                  transition
                  hover:bg-red-700
                  active:scale-95
                "
              >
                <RefreshCw size={16} />
                Retry
              </button>
            </div>
          </motion.div>
        </div>
      </DashboardLayout>
    );
  }

  // ============================================================
  // Resident Name
  // ============================================================

  const residentName =
    `${dashboard.resident.firstName} ${dashboard.resident.lastName}`.trim();

  // ============================================================
  // UI
  // ============================================================

  return (
    <DashboardLayout>
      <div className="mx-auto max-w-7xl space-y-8 pb-8">

        {/* ======================================================
            Header
        ====================================================== */}

        <motion.div
          initial={{
            opacity: 0,
            y: -12,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.4,
          }}
          className="
            flex
            flex-col
            gap-5
            border-b
            border-slate-200
            pb-6
            sm:flex-row
            sm:items-end
            sm:justify-between
          "
        >
          <div>
            <div className="mb-2 flex flex-wrap items-center gap-2">
              <span
                className="
                  inline-flex
                  items-center
                  gap-1.5
                  rounded-full
                  border
                  border-cyan-200
                  bg-cyan-50
                  px-2.5
                  py-1
                  text-[11px]
                  font-bold
                  uppercase
                  tracking-wide
                  text-cyan-700
                "
              >
                <Sparkles size={12} />
                Resident Portal
              </span>

              <span
                className="
                  inline-flex
                  items-center
                  gap-1.5
                  rounded-full
                  border
                  border-emerald-200
                  bg-emerald-50
                  px-2.5
                  py-1
                  text-[11px]
                  font-semibold
                  text-emerald-700
                "
              >
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                Water Monitoring Active
              </span>
            </div>

            <h1 className="text-3xl font-extrabold tracking-tight text-slate-900">
              Resident Dashboard
            </h1>

            <p className="mt-2 max-w-2xl text-sm leading-relaxed text-slate-500">
              Welcome back
              {residentName
                ? `, ${residentName}`
                : ""}.
              Here's an overview of your water
              consumption and billing.
            </p>
          </div>

          {/* Refresh */}

          <button
            type="button"
            onClick={loadDashboard}
            disabled={loading}
            className="
              inline-flex
              items-center
              justify-center
              gap-2
              rounded-xl
              border
              border-slate-200
              bg-white
              px-4
              py-2.5
              text-sm
              font-semibold
              text-slate-700
              shadow-sm
              transition
              hover:border-blue-200
              hover:bg-blue-50
              hover:text-blue-600
              active:scale-95
              disabled:cursor-not-allowed
              disabled:opacity-60
            "
          >
            <RefreshCw
              size={16}
              className={
                loading
                  ? "animate-spin"
                  : ""
              }
            />

            Refresh
          </button>
        </motion.div>

        {/* ======================================================
            Summary Cards
        ====================================================== */}

        <ResidentDashboardSummaryCards
          summary={dashboard.summary}
        />

        {/* ======================================================
            Consumption + Resident Information
        ====================================================== */}

        <div className="grid gap-6 xl:grid-cols-[1.45fr_0.75fr]">

          {/* Consumption Chart */}

          <ResidentConsumptionChart
            monthlyConsumption={
              dashboard.monthlyConsumption
            }
          />

          {/* Resident Information */}

          <motion.section
            initial={{
              opacity: 0,
              y: 15,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.45,
              delay: 0.15,
            }}
            className="
              rounded-2xl
              border
              border-slate-200/80
              bg-white
              p-6
              shadow-sm
              shadow-slate-200/50
            "
          >
            <div className="flex items-center gap-3">
              <div
                className="
                  flex
                  h-11
                  w-11
                  items-center
                  justify-center
                  rounded-xl
                  border
                  border-blue-100
                  bg-blue-50
                  text-blue-600
                "
              >
                <UserRound size={21} />
              </div>

              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-blue-600">
                  My Profile
                </p>

                <h2 className="mt-1 text-xl font-bold text-slate-900">
                  Resident Information
                </h2>
              </div>
            </div>

            <div className="mt-6 space-y-4">

              {/* Resident */}

              <InfoRow
                icon={UserRound}
                label="Resident"
                value={
                  residentName || "--"
                }
              />

              {/* Apartment */}

              <InfoRow
                icon={Building2}
                label="Apartment"
                value={
                  dashboard.resident
                    .apartmentName || "--"
                }
              />

              {/* Building */}

              <InfoRow
                icon={Building2}
                label="Building"
                value={
                  dashboard.resident
                    .buildingName || "--"
                }
              />

              {/* Household */}

              <InfoRow
                icon={Home}
                label="Household"
                value={
                  dashboard.resident
                    .householdName || "--"
                }
              />
            </div>
          </motion.section>
        </div>

        {/* ======================================================
            Billing Summary
        ====================================================== */}

        <ResidentBillSummary
          billSummary={
            dashboard.billSummary
          }
        />

        {/* ======================================================
            Recent Bills
        ====================================================== */}

        <ResidentRecentBillsTable
          bills={dashboard.recentBills}
          loading={false}
          onViewBill={(bill) => {
            console.log(
              "View resident bill:",
              bill
            );
          }}
          onPayBill={(bill) => {
            console.log(
              "Pay resident bill:",
              bill
            );
          }}
        />
      </div>
    </DashboardLayout>
  );
}

// ============================================================
// Info Row
// ============================================================

function InfoRow({
  icon: Icon,
  label,
  value,
}) {
  return (
    <div
      className="
        flex
        items-center
        gap-3
        rounded-xl
        border
        border-slate-100
        bg-slate-50/70
        p-3
      "
    >
      <div
        className="
          flex
          h-9
          w-9
          shrink-0
          items-center
          justify-center
          rounded-lg
          bg-white
          text-slate-500
          shadow-sm
        "
      >
        <Icon size={17} />
      </div>

      <div className="min-w-0">
        <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-400">
          {label}
        </p>

        <p className="mt-0.5 truncate text-sm font-bold text-slate-800">
          {value}
        </p>
      </div>
    </div>
  );
}