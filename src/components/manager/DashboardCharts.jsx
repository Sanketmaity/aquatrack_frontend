import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
} from "recharts";

const chartColors = ["#0ea5e9", "#22c55e", "#f97316"];

export default function DashboardCharts({ summary }) {
  const householdCount = summary?.totalHouseholds ?? 0;
  const residentCount = summary?.totalResidents ?? 0;
  const averageResidentsPerHousehold = householdCount
    ? Number((residentCount / householdCount).toFixed(1))
    : 0;

  const pieData = [
    { name: "Households", value: householdCount },
    { name: "Residents", value: residentCount },
  ];

  const barData = [
    { label: "Households", value: householdCount },
    { label: "Residents", value: residentCount },
    { label: "Avg / Household", value: averageResidentsPerHousehold },
  ];

  return (
    <div className="grid gap-6 xl:grid-cols-[1.3fr_1fr]">
      <section className="rounded-3xl border border-slate-200/80 bg-white/80 p-6 shadow-sm shadow-slate-200/50">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-6">
          <div>
            <p className="text-sm font-semibold text-slate-500 uppercase tracking-[0.24em]">
              Building Insights
            </p>
            <h2 className="mt-2 text-2xl font-bold text-slate-900">
              Operational distribution
            </h2>
          </div>
          <div className="rounded-2xl bg-slate-100 px-4 py-2 text-sm font-semibold text-slate-600">
            Updated from live summary
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <div className="h-72 rounded-3xl bg-slate-50 p-4 shadow-inner">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  innerRadius={48}
                  outerRadius={88}
                  paddingAngle={4}
                  stroke="transparent"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={entry.name} fill={chartColors[index % chartColors.length]} />
                  ))}
                </Pie>
                <Tooltip
                  formatter={(value) => [value, "Count"]}
                  cursor={{ fill: "rgba(15, 23, 42, 0.08)" }}
                />
              </PieChart>
            </ResponsiveContainer>
            <div className="mt-4 grid grid-cols-2 gap-3 px-2 text-sm text-slate-600">
              {pieData.map((item, index) => (
                <div key={item.name} className="rounded-2xl bg-white px-3 py-2 shadow-sm border border-slate-200/80">
                  <div className="flex items-center gap-2 text-slate-500">
                    <span
                      className="h-2.5 w-2.5 rounded-full"
                      style={{ backgroundColor: chartColors[index % chartColors.length] }}
                    />
                    {item.name}
                  </div>
                  <p className="mt-2 text-lg font-semibold text-slate-900">{item.value}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-3xl border border-slate-200/80 bg-slate-50 p-4">
            <div className="mb-4">
              <p className="text-sm font-semibold text-slate-500 uppercase tracking-[0.24em]">
                Executive summary
              </p>
              <h3 className="mt-2 text-lg font-bold text-slate-900">
                Headcount and occupancy trend
              </h3>
            </div>

            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={barData} margin={{ top: 16, right: 8, left: -10, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" vertical={false} />
                  <XAxis dataKey="label" tickLine={false} axisLine={false} tick={{ fill: "#475569", fontSize: 12 }} />
                  <YAxis tickLine={false} axisLine={false} tick={{ fill: "#475569", fontSize: 12 }} />
                  <Tooltip cursor={{ fill: "rgba(15, 23, 42, 0.06)" }} />
                  <Legend verticalAlign="top" height={24} wrapperStyle={{ paddingBottom: 8 }} />
                  <Bar dataKey="value" fill="#0ea5e9" radius={[12, 12, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
