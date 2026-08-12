import {
  ResponsiveContainer,
  AreaChart,
  Area,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";
import { Droplets, TrendingUp } from "lucide-react";

export default function ResidentConsumptionChart({
  monthlyConsumption = [],
}) {
  // ============================================================
  // Normalize API Data
  // ============================================================

  const data = Array.isArray(monthlyConsumption)
    ? monthlyConsumption.map((item) => ({
        month:
          item?.month ||
          item?.billingMonth ||
          item?.period ||
          "-",

        consumption: Number(
          item?.totalConsumption ??
            item?.consumption ??
            item?.usage ??
            0
        ),
      }))
    : [];

  // ============================================================
  // Calculate Summary
  // ============================================================

  const totalConsumption = data.reduce(
    (total, item) => total + item.consumption,
    0
  );

  const averageConsumption = data.length
    ? totalConsumption / data.length
    : 0;

  const latestConsumption =
    data.length > 0
      ? data[data.length - 1].consumption
      : 0;

  // ============================================================
  // Empty State
  // ============================================================

  if (data.length === 0) {
    return (
      <section
        className="
          rounded-2xl
          border
          border-slate-200
          bg-white
          p-6
          shadow-sm
          shadow-slate-200/60
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
              border-cyan-100
              bg-cyan-50
              text-cyan-600
            "
          >
            <Droplets size={21} />
          </div>

          <div>
            <h2 className="text-lg font-bold text-slate-900">
              Monthly Water Consumption
            </h2>

            <p className="text-sm text-slate-500">
              Track your household water usage over time.
            </p>
          </div>
        </div>

        <div
          className="
            mt-6
            flex
            min-h-[280px]
            items-center
            justify-center
            rounded-xl
            border
            border-dashed
            border-slate-200
            bg-slate-50
          "
        >
          <div className="text-center">
            <Droplets
              size={36}
              className="mx-auto text-slate-300"
            />

            <h3 className="mt-3 text-sm font-semibold text-slate-700">
              No consumption data available
            </h3>

            <p className="mt-1 text-xs text-slate-500">
              Water consumption data will appear here once
              meter readings are recorded.
            </p>
          </div>
        </div>
      </section>
    );
  }

  // ============================================================
  // Custom Tooltip
  // ============================================================

  const CustomTooltip = ({ active, payload, label }) => {
    if (!active || !payload?.length) {
      return null;
    }

    const value = Number(payload[0]?.value ?? 0);

    return (
      <div
        className="
          rounded-xl
          border
          border-slate-200
          bg-white
          px-4
          py-3
          shadow-lg
          shadow-slate-200/60
        "
      >
        <p className="text-xs font-semibold text-slate-500">
          {label}
        </p>

        <div className="mt-1 flex items-center gap-2">
          <span className="h-2.5 w-2.5 rounded-full bg-cyan-500" />

          <span className="text-sm font-bold text-slate-900">
            {value.toFixed(2)} KL
          </span>
        </div>
      </div>
    );
  };

  // ============================================================
  // UI
  // ============================================================

  return (
    <section
      className="
        rounded-2xl
        border
        border-slate-200
        bg-white
        p-6
        shadow-sm
        shadow-slate-200/60
      "
    >
      {/* ======================================================
          Header
      ====================================================== */}

      <div
        className="
          flex
          flex-col
          gap-4
          sm:flex-row
          sm:items-center
          sm:justify-between
        "
      >
        <div className="flex items-center gap-3">
          <div
            className="
              flex
              h-11
              w-11
              shrink-0
              items-center
              justify-center
              rounded-xl
              border
              border-cyan-100
              bg-cyan-50
              text-cyan-600
            "
          >
            <Droplets size={21} />
          </div>

          <div>
            <h2 className="text-lg font-bold text-slate-900">
              Monthly Water Consumption
            </h2>

            <p className="text-sm text-slate-500">
              Your household water usage history.
            </p>
          </div>
        </div>

        {/* Latest Usage */}

        <div
          className="
            flex
            items-center
            gap-3
            rounded-xl
            border
            border-cyan-100
            bg-cyan-50/70
            px-4
            py-2.5
          "
        >
          <TrendingUp
            size={17}
            className="text-cyan-600"
          />

          <div>
            <p className="text-[10px] font-semibold uppercase tracking-wide text-slate-500">
              Latest Usage
            </p>

            <p className="text-sm font-bold text-cyan-700">
              {latestConsumption.toFixed(2)} KL
            </p>
          </div>
        </div>
      </div>

      {/* ======================================================
          Chart
      ====================================================== */}

      <div className="mt-6 h-[320px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={data}
            margin={{
              top: 10,
              right: 10,
              left: -10,
              bottom: 5,
            }}
          >
            <defs>
              <linearGradient
                id="residentConsumptionGradient"
                x1="0"
                y1="0"
                x2="0"
                y2="1"
              >
                <stop
                  offset="0%"
                  stopColor="#06B6D4"
                  stopOpacity={0.28}
                />

                <stop
                  offset="100%"
                  stopColor="#06B6D4"
                  stopOpacity={0.03}
                />
              </linearGradient>
            </defs>

            <CartesianGrid
              strokeDasharray="3 3"
              stroke="#E2E8F0"
              vertical={false}
            />

            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
              tick={{
                fill: "#64748B",
                fontSize: 12,
              }}
              dy={8}
            />

            <YAxis
              tickLine={false}
              axisLine={false}
              tick={{
                fill: "#64748B",
                fontSize: 12,
              }}
              tickFormatter={(value) =>
                `${value} KL`
              }
            />

            <Tooltip
              content={<CustomTooltip />}
              cursor={{
                stroke: "#06B6D4",
                strokeWidth: 1,
                strokeDasharray: "4 4",
              }}
            />

            <Area
              type="monotone"
              dataKey="consumption"
              stroke="#06B6D4"
              strokeWidth={3}
              fill="url(#residentConsumptionGradient)"
              dot={{
                r: 4,
                fill: "#FFFFFF",
                stroke: "#06B6D4",
                strokeWidth: 2,
              }}
              activeDot={{
                r: 6,
                fill: "#06B6D4",
                stroke: "#FFFFFF",
                strokeWidth: 2,
              }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* ======================================================
          Bottom Statistics
      ====================================================== */}

      <div
        className="
          mt-5
          grid
          grid-cols-1
          gap-3
          sm:grid-cols-3
        "
      >
        {/* Total */}

        <div
          className="
            rounded-xl
            border
            border-slate-200
            bg-slate-50
            px-4
            py-3
          "
        >
          <p className="text-xs font-medium text-slate-500">
            Total Consumption
          </p>

          <p className="mt-1 text-lg font-bold text-slate-900">
            {totalConsumption.toFixed(2)} KL
          </p>
        </div>

        {/* Average */}

        <div
          className="
            rounded-xl
            border
            border-slate-200
            bg-slate-50
            px-4
            py-3
          "
        >
          <p className="text-xs font-medium text-slate-500">
            Average / Month
          </p>

          <p className="mt-1 text-lg font-bold text-slate-900">
            {averageConsumption.toFixed(2)} KL
          </p>
        </div>

        {/* Months */}

        <div
          className="
            rounded-xl
            border
            border-slate-200
            bg-slate-50
            px-4
            py-3
          "
        >
          <p className="text-xs font-medium text-slate-500">
            Recorded Months
          </p>

          <p className="mt-1 text-lg font-bold text-slate-900">
            {data.length}
          </p>
        </div>
      </div>
    </section>
  );
}