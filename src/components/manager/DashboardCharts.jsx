import {
  ResponsiveContainer,
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

import {
  Droplets,
  Building2,
  CreditCard,
  Receipt,
  IndianRupee,
  TrendingUp,
} from "lucide-react";

// ======================================================
// AquaTrack Chart Palette
// ======================================================

const COLORS = {
  primary: "#0EA5E9",
  secondary: "#06B6D4",
  success: "#10B981",
  warning: "#F59E0B",
  danger: "#EF4444",
  purple: "#8B5CF6",
  slate: "#64748B",
};

const PAYMENT_COLORS = [
  COLORS.success,
  COLORS.warning,
];

const BILL_COLORS = [
  COLORS.success,
  COLORS.warning,
  COLORS.danger,
];

// ======================================================
// Custom Tooltip
// ======================================================

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) {
    return null;
  }

  return (
    <div
      className="
        min-w-[150px]

        rounded-xl

        border
        border-slate-200

        bg-white/95
        backdrop-blur-xl

        px-4
        py-3

        shadow-xl
        shadow-slate-900/10

        dark:border-slate-700
        dark:bg-slate-900/95
      "
    >
      {label && (
        <p className="mb-2 text-xs font-semibold text-slate-500 dark:text-slate-400">
          {label}
        </p>
      )}

      {payload.map((item) => (
        <div
          key={item.dataKey}
          className="flex items-center justify-between gap-5"
        >
          <div className="flex items-center gap-2">
            <span
              className="h-2.5 w-2.5 rounded-full"
              style={{
                backgroundColor: item.color,
              }}
            />

            <span className="text-xs font-medium text-slate-600 dark:text-slate-300">
              {item.name || item.dataKey}
            </span>
          </div>

          <span className="text-sm font-bold text-slate-900 dark:text-white">
            {typeof item.value === "number"
              ? item.value.toLocaleString()
              : item.value}
          </span>
        </div>
      ))}
    </div>
  );
};

// ======================================================
// Chart Card
// ======================================================

const ChartCard = ({
  title,
  subtitle,
  icon: Icon,
  iconClassName = "bg-sky-50 text-sky-600 dark:bg-sky-500/10 dark:text-sky-400",
  action,
  children,
  className = "",
}) => {
  return (
    <section
      className={`
        group

        overflow-hidden

        rounded-3xl

        border
        border-slate-200/80

        bg-white

        shadow-sm

        transition-all
        duration-300

        hover:-translate-y-0.5
        hover:shadow-lg
        hover:shadow-slate-200/50

        dark:border-slate-800
        dark:bg-slate-900
        dark:hover:shadow-black/20

        ${className}
      `}
    >
      {/* Header */}

      <div
        className="
          flex
          items-center
          justify-between

          border-b
          border-slate-100

          px-5
          py-4

          dark:border-slate-800

          sm:px-6
        "
      >
        <div className="flex min-w-0 items-center gap-3">

          <div
            className={`
              flex
              h-11
              w-11
              shrink-0
              items-center
              justify-center

              rounded-xl

              transition-transform
              duration-300

              group-hover:scale-105

              ${iconClassName}
            `}
          >
            <Icon size={20} strokeWidth={2.2} />
          </div>

          <div className="min-w-0">

            <h2
              className="
                truncate

                text-sm
                font-bold
                text-slate-900

                sm:text-base

                dark:text-white
              "
            >
              {title}
            </h2>

            {subtitle && (
              <p
                className="
                  mt-0.5

                  truncate

                  text-[11px]
                  font-medium
                  text-slate-400

                  sm:text-xs
                "
              >
                {subtitle}
              </p>
            )}

          </div>
        </div>

        {action}
      </div>

      {/* Chart */}

      <div className="h-[320px] p-4 sm:h-[350px] sm:p-5">
        {children}
      </div>
    </section>
  );
};

// ======================================================
// Empty Chart State
// ======================================================

const EmptyChart = ({ message = "No data available" }) => {
  return (
    <div
      className="
        flex
        h-full
        flex-col
        items-center
        justify-center

        rounded-2xl

        border
        border-dashed
        border-slate-200

        bg-slate-50/70

        dark:border-slate-700
        dark:bg-slate-800/30
      "
    >
      <div
        className="
          mb-3
          flex
          h-12
          w-12
          items-center
          justify-center

          rounded-2xl

          bg-slate-100

          text-slate-400

          dark:bg-slate-800
          dark:text-slate-500
        "
      >
        <Droplets size={21} />
      </div>

      <p className="text-sm font-semibold text-slate-600 dark:text-slate-300">
        {message}
      </p>

      <p className="mt-1 text-xs text-slate-400">
        Data will appear here when available
      </p>
    </div>
  );
};

// ======================================================
// Donut Center
// ======================================================

const DonutCenter = ({ total, label }) => {
  return (
    <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">

      <span className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
        {total.toLocaleString()}
      </span>

      <span className="mt-0.5 text-[10px] font-semibold uppercase tracking-wider text-slate-400">
        {label}
      </span>

    </div>
  );
};

// ======================================================
// Donut Legend
// ======================================================

const DonutLegend = ({ data, colors }) => {
  return (
    <div className="mt-3 flex flex-wrap justify-center gap-x-5 gap-y-2">

      {data.map((item, index) => (
        <div
          key={item.name}
          className="flex items-center gap-2"
        >
          <span
            className="h-2.5 w-2.5 rounded-full"
            style={{
              backgroundColor: colors[index],
            }}
          />

          <span className="text-xs font-medium text-slate-500 dark:text-slate-400">
            {item.name}
          </span>

          <span className="text-xs font-bold text-slate-800 dark:text-slate-200">
            {item.value}
          </span>
        </div>
      ))}

    </div>
  );
};

// ======================================================
// Dashboard Charts
// ======================================================

export default function DashboardCharts({
  monthlyConsumption = [],
  buildingUsage = [],
  paymentStatus,
  billStatus,
  revenueTrend = [],
}) {
  // ====================================================
  // Payment Data
  // ====================================================

  const paymentData = [
    {
      name: "Paid",
      value: paymentStatus?.paidBills ?? 0,
    },
    {
      name: "Pending",
      value: paymentStatus?.pendingBills ?? 0,
    },
  ];

  // ====================================================
  // Bill Data
  // ====================================================

  const billData = [
    {
      name: "Paid",
      value: billStatus?.paid ?? 0,
    },
    {
      name: "Pending",
      value: billStatus?.pending ?? 0,
    },
    {
      name: "Overdue",
      value: billStatus?.overdue ?? 0,
    },
  ];

  // ====================================================
  // Totals
  // ====================================================

  const paymentTotal = paymentData.reduce(
    (total, item) => total + item.value,
    0
  );

  const billTotal = billData.reduce(
    (total, item) => total + item.value,
    0
  );

  // ====================================================
  // Render
  // ====================================================

  return (
    <div className="space-y-6">

      {/* ==================================================
          Row 1
      ================================================== */}

      <ChartCard
        title="Monthly Water Consumption"
        subtitle="Water consumption trend across the property"
        icon={Droplets}
        iconClassName="
          bg-sky-50
          text-sky-600
          dark:bg-sky-500/10
          dark:text-sky-400
        "
        action={
          <span
            className="
              hidden
              rounded-full

              bg-emerald-50

              px-3
              py-1

              text-[10px]
              font-bold
              uppercase
              tracking-wide

              text-emerald-600

              sm:inline-flex

              dark:bg-emerald-500/10
              dark:text-emerald-400
            "
          >
            Live Data
          </span>
        }
      >
        {monthlyConsumption.length === 0 ? (
          <EmptyChart />
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={monthlyConsumption}
              margin={{
                top: 10,
                right: 8,
                left: -20,
                bottom: 0,
              }}
            >
              <defs>

                <linearGradient
                  id="consumptionGradient"
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="1"
                >
                  <stop
                    offset="0%"
                    stopColor={COLORS.primary}
                    stopOpacity={0.35}
                  />

                  <stop
                    offset="100%"
                    stopColor={COLORS.primary}
                    stopOpacity={0.02}
                  />
                </linearGradient>

              </defs>

              <CartesianGrid
                stroke="#E2E8F0"
                strokeDasharray="4 6"
                vertical={false}
              />

              <XAxis
                dataKey="month"
                axisLine={false}
                tickLine={false}
                tick={{
                  fill: "#94A3B8",
                  fontSize: 11,
                }}
                dy={8}
              />

              <YAxis
                axisLine={false}
                tickLine={false}
                tick={{
                  fill: "#94A3B8",
                  fontSize: 11,
                }}
              />

              <Tooltip
                content={<CustomTooltip />}
                cursor={{
                  stroke: "#CBD5E1",
                  strokeDasharray: "4 4",
                }}
              />

              <Area
                type="monotone"
                dataKey="totalConsumption"
                name="Consumption"
                stroke={COLORS.primary}
                strokeWidth={3}
                fill="url(#consumptionGradient)"
                activeDot={{
                  r: 6,
                  strokeWidth: 3,
                  stroke: "#FFFFFF",
                }}
              />
            </AreaChart>
          </ResponsiveContainer>
        )}
      </ChartCard>

      {/* ==================================================
          Row 2
      ================================================== */}

      <div className="grid gap-6 lg:grid-cols-2">

        {/* Building Usage */}

        <ChartCard
          title="Building Water Usage"
          subtitle="Consumption comparison by building"
          icon={Building2}
          iconClassName="
            bg-violet-50
            text-violet-600
            dark:bg-violet-500/10
            dark:text-violet-400
          "
        >
          {buildingUsage.length === 0 ? (
            <EmptyChart message="No building usage data" />
          ) : (
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={buildingUsage}
                margin={{
                  top: 10,
                  right: 5,
                  left: -20,
                  bottom: 0,
                }}
                barCategoryGap="25%"
              >
                <CartesianGrid
                  stroke="#E2E8F0"
                  strokeDasharray="4 6"
                  vertical={false}
                />

                <XAxis
                  dataKey="buildingName"
                  axisLine={false}
                  tickLine={false}
                  tick={{
                    fill: "#94A3B8",
                    fontSize: 11,
                  }}
                  dy={8}
                />

                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tick={{
                    fill: "#94A3B8",
                    fontSize: 11,
                  }}
                />

                <Tooltip
                  content={<CustomTooltip />}
                  cursor={{
                    fill: "rgba(14,165,233,0.04)",
                  }}
                />

                <Bar
                  dataKey="totalConsumption"
                  name="Consumption"
                  fill={COLORS.primary}
                  radius={[10, 10, 4, 4]}
                  maxBarSize={48}
                />
              </BarChart>
            </ResponsiveContainer>
          )}
        </ChartCard>

        {/* Payment Status */}

        <ChartCard
          title="Payment Status"
          subtitle="Current payment collection overview"
          icon={CreditCard}
          iconClassName="
            bg-emerald-50
            text-emerald-600
            dark:bg-emerald-500/10
            dark:text-emerald-400
          "
        >
          {paymentTotal === 0 ? (
            <EmptyChart message="No payment records" />
          ) : (
            <div className="relative h-full">

              <ResponsiveContainer width="100%" height="85%">
                <PieChart>
                  <Pie
                    data={paymentData}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    innerRadius={75}
                    outerRadius={105}
                    paddingAngle={5}
                    cornerRadius={8}
                    stroke="none"
                  >
                    {paymentData.map((entry, index) => (
                      <Cell
                        key={entry.name}
                        fill={PAYMENT_COLORS[index]}
                      />
                    ))}
                  </Pie>

                  <Tooltip content={<CustomTooltip />} />
                </PieChart>
              </ResponsiveContainer>

              <DonutCenter
                total={paymentTotal}
                label="Payments"
              />

              <DonutLegend
                data={paymentData}
                colors={PAYMENT_COLORS}
              />

            </div>
          )}
        </ChartCard>

      </div>

      {/* ==================================================
          Row 3
      ================================================== */}

      <div className="grid gap-6 lg:grid-cols-2">

        {/* Bill Status */}

        <ChartCard
          title="Bill Status"
          subtitle="Current billing cycle overview"
          icon={Receipt}
          iconClassName="
            bg-amber-50
            text-amber-600
            dark:bg-amber-500/10
            dark:text-amber-400
          "
        >
          {billTotal === 0 ? (
            <EmptyChart message="No billing records" />
          ) : (
            <div className="relative h-full">

              <ResponsiveContainer width="100%" height="85%">
                <PieChart>
                  <Pie
                    data={billData}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    innerRadius={75}
                    outerRadius={105}
                    paddingAngle={5}
                    cornerRadius={8}
                    stroke="none"
                  >
                    {billData.map((entry, index) => (
                      <Cell
                        key={entry.name}
                        fill={BILL_COLORS[index]}
                      />
                    ))}
                  </Pie>

                  <Tooltip content={<CustomTooltip />} />
                </PieChart>
              </ResponsiveContainer>

              <DonutCenter
                total={billTotal}
                label="Bills"
              />

              <DonutLegend
                data={billData}
                colors={BILL_COLORS}
              />

            </div>
          )}
        </ChartCard>

        {/* Revenue Trend */}

        <ChartCard
          title="Revenue Trend"
          subtitle="Monthly water billing revenue"
          icon={IndianRupee}
          iconClassName="
            bg-cyan-50
            text-cyan-600
            dark:bg-cyan-500/10
            dark:text-cyan-400
          "
          action={
            <div
              className="
                flex
                items-center
                gap-1.5

                rounded-full

                bg-emerald-50

                px-3
                py-1

                text-[10px]
                font-bold

                text-emerald-600

                dark:bg-emerald-500/10
                dark:text-emerald-400
              "
            >
              <TrendingUp size={12} />

              Revenue
            </div>
          }
        >
          {revenueTrend.length === 0 ? (
            <EmptyChart message="No revenue data" />
          ) : (
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={revenueTrend}
                margin={{
                  top: 10,
                  right: 8,
                  left: -20,
                  bottom: 0,
                }}
              >
                <defs>

                  <linearGradient
                    id="revenueGradient"
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <stop
                      offset="0%"
                      stopColor={COLORS.success}
                      stopOpacity={0.3}
                    />

                    <stop
                      offset="100%"
                      stopColor={COLORS.success}
                      stopOpacity={0.02}
                    />
                  </linearGradient>

                </defs>

                <CartesianGrid
                  stroke="#E2E8F0"
                  strokeDasharray="4 6"
                  vertical={false}
                />

                <XAxis
                  dataKey="month"
                  axisLine={false}
                  tickLine={false}
                  tick={{
                    fill: "#94A3B8",
                    fontSize: 11,
                  }}
                  dy={8}
                />

                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tick={{
                    fill: "#94A3B8",
                    fontSize: 11,
                  }}
                />

                <Tooltip
                  content={<CustomTooltip />}
                  cursor={{
                    stroke: "#CBD5E1",
                    strokeDasharray: "4 4",
                  }}
                />

                <Area
                  type="monotone"
                  dataKey="revenue"
                  name="Revenue"
                  stroke={COLORS.success}
                  strokeWidth={3}
                  fill="url(#revenueGradient)"
                  activeDot={{
                    r: 6,
                    strokeWidth: 3,
                    stroke: "#FFFFFF",
                  }}
                />
              </AreaChart>
            </ResponsiveContainer>
          )}
        </ChartCard>

      </div>

    </div>
  );
}