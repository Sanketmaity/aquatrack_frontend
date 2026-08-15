import {
    Droplets,
    Trophy,
    Medal,
    TrendingUp,
    Home,
    Building2,
} from "lucide-react";

export default function TopConsumersTable({
    data = [],
    loading = false,
}) {
    // ==========================================
    // Helpers
    // ==========================================

    const getNumber = (...values) => {
        for (const value of values) {
            if (
                value !== undefined &&
                value !== null &&
                value !== ""
            ) {
                const number = Number(value);

                if (!Number.isNaN(number)) {
                    return number;
                }
            }
        }

        return 0;
    };

    // ==========================================
    // Normalize Data
    // ==========================================

    const normalizedData = data.map((item, index) => {
        const consumption = getNumber(
            item?.waterConsumption,
            item?.consumption,
            item?.consumptionKL,
            item?.consumptionKl,
            item?.waterUsage,
            item?.usage,
            item?.totalConsumption,
            item?.consumedWater
        );

        const houseNumber =
            item?.houseNumber ??
            item?.houseNo ??
            item?.house ??
            item?.household?.houseNumber ??
            "-";

        const buildingName =
            item?.buildingName ??
            item?.building ??
            item?.building?.name ??
            item?.household?.buildingName ??
            "-";

        return {
            ...item,
            id: item?.id ?? item?.householdId ?? index,
            houseNumber,
            buildingName,
            waterConsumption: consumption,
        };
    });

    // ==========================================
    // Sort Highest Consumption First
    // ==========================================

    const sortedData = [...normalizedData].sort(
        (a, b) =>
            b.waterConsumption - a.waterConsumption
    );

    // ==========================================
    // Maximum Consumption
    // Used for progress bars
    // ==========================================

    const maxConsumption =
        sortedData.length > 0
            ? Math.max(
                  ...sortedData.map(
                      (item) => item.waterConsumption
                  )
              )
            : 0;

    // ==========================================
    // Rank Styles
    // ==========================================

    const getRankStyle = (index) => {
        switch (index) {
            case 0:
                return {
                    wrapper:
                        "bg-amber-50 text-amber-700 ring-amber-200",
                    icon: "text-amber-500",
                };

            case 1:
                return {
                    wrapper:
                        "bg-slate-100 text-slate-600 ring-slate-200",
                    icon: "text-slate-500",
                };

            case 2:
                return {
                    wrapper:
                        "bg-orange-50 text-orange-700 ring-orange-200",
                    icon: "text-orange-500",
                };

            default:
                return {
                    wrapper:
                        "bg-slate-50 text-slate-500 ring-slate-200",
                    icon: "text-slate-400",
                };
        }
    };

    const getRankIcon = (index) => {
        if (index === 0) {
            return <Trophy size={15} strokeWidth={2.5} />;
        }

        if (index === 1 || index === 2) {
            return <Medal size={15} strokeWidth={2.5} />;
        }

        return (
            <span className="text-xs font-bold">
                {index + 1}
            </span>
        );
    };

    // ==========================================
    // Loading
    // ==========================================

    if (loading) {
        return (
            <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
                {/* Header */}
                <div className="border-b border-slate-200 px-6 py-5">
                    <div className="flex items-center gap-3">
                        <div className="h-10 w-10 animate-pulse rounded-xl bg-slate-100" />

                        <div className="space-y-2">
                            <div className="h-5 w-44 animate-pulse rounded bg-slate-200" />

                            <div className="h-3.5 w-64 animate-pulse rounded bg-slate-100" />
                        </div>
                    </div>
                </div>

                {/* Rows */}
                <div className="divide-y divide-slate-100">
                    {[1, 2, 3, 4, 5].map((item) => (
                        <div
                            key={item}
                            className="px-6 py-5"
                        >
                            <div className="flex items-center gap-4">
                                <div className="h-9 w-9 animate-pulse rounded-full bg-slate-100" />

                                <div className="min-w-0 flex-1">
                                    <div className="h-4 w-24 animate-pulse rounded bg-slate-100" />

                                    <div className="mt-2 h-3 w-20 animate-pulse rounded bg-slate-100" />

                                    <div className="mt-3 h-2 w-full animate-pulse rounded-full bg-slate-100" />
                                </div>

                                <div className="h-5 w-20 animate-pulse rounded bg-slate-100" />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        );
    }

    // ==========================================
    // Empty State
    // ==========================================

    if (!sortedData.length) {
        return (
            <div className="rounded-3xl border border-slate-200 bg-white px-6 py-16 text-center shadow-sm">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-cyan-50">
                    <Droplets
                        size={30}
                        className="text-cyan-500"
                    />
                </div>

                <h3 className="mt-5 text-lg font-bold text-slate-900">
                    No Consumption Data
                </h3>

                <p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-slate-500">
                    Water consumption records will appear here
                    once household meter readings are available.
                </p>
            </div>
        );
    }

    // ==========================================
    // UI
    // ==========================================

    return (
        <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
            {/* ==========================================
                Header
            ========================================== */}

            <div className="flex flex-col gap-4 border-b border-slate-200 px-6 py-5 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-center gap-3">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-cyan-50 text-cyan-600">
                        <Droplets
                            size={21}
                            strokeWidth={2.2}
                        />
                    </div>

                    <div>
                        <h2 className="text-lg font-bold tracking-tight text-slate-900">
                            Top Water Consumers
                        </h2>

                        <p className="mt-1 text-sm text-slate-500">
                            Households with the highest water usage
                        </p>
                    </div>
                </div>

                {/* Summary */}
                <div className="flex items-center gap-2 rounded-xl bg-slate-50 px-3.5 py-2.5">
                    <TrendingUp
                        size={16}
                        className="text-cyan-600"
                    />

                    <div>
                        <p className="text-xs font-medium text-slate-400">
                            Households
                        </p>

                        <p className="text-sm font-bold text-slate-800">
                            {sortedData.length}
                        </p>
                    </div>
                </div>
            </div>

            {/* ==========================================
                Table Header
            ========================================== */}

            <div className="hidden border-b border-slate-100 bg-slate-50/70 px-6 py-3 md:grid md:grid-cols-[80px_1.2fr_1fr_1.8fr_120px] md:items-center md:gap-4">
                <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                    Rank
                </div>

                <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                    House
                </div>

                <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                    Building
                </div>

                <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                    Consumption Level
                </div>

                <div className="text-right text-[11px] font-bold uppercase tracking-wider text-slate-400">
                    Usage
                </div>
            </div>

            {/* ==========================================
                Consumer Rows
            ========================================== */}

            <div className="divide-y divide-slate-100">
                {sortedData.map((item, index) => {
                    const rankStyle =
                        getRankStyle(index);

                    const percentage =
                        maxConsumption > 0
                            ? Math.min(
                                  100,
                                  (item.waterConsumption /
                                      maxConsumption) *
                                      100
                              )
                            : 0;

                    return (
                        <div
                            key={item.id}
                            className="
                                group
                                px-6
                                py-5
                                transition-all
                                duration-200
                                hover:bg-cyan-50/30
                            "
                        >
                            <div className="grid items-center gap-4 md:grid-cols-[80px_1.2fr_1fr_1.8fr_120px]">
                                {/* ==================================
                                    Rank
                                ================================== */}

                                <div className="flex items-center">
                                    <div
                                        className={`
                                            flex
                                            h-9
                                            w-9
                                            items-center
                                            justify-center
                                            rounded-full
                                            ring-1
                                            ring-inset
                                            ${rankStyle.wrapper}
                                        `}
                                    >
                                        <span
                                            className={
                                                rankStyle.icon
                                            }
                                        >
                                            {getRankIcon(index)}
                                        </span>
                                    </div>
                                </div>

                                {/* ==================================
                                    House
                                ================================== */}

                                <div className="flex items-center gap-3">
                                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-slate-500 transition-colors group-hover:bg-cyan-50 group-hover:text-cyan-600">
                                        <Home size={18} />
                                    </div>

                                    <div className="min-w-0">
                                        <p className="truncate font-bold text-slate-900">
                                            {item.houseNumber}
                                        </p>

                                        <p className="mt-0.5 text-xs text-slate-400">
                                            Household
                                        </p>
                                    </div>
                                </div>

                                {/* ==================================
                                    Building
                                ================================== */}

                                <div className="flex items-center gap-2 text-sm">
                                    <Building2
                                        size={16}
                                        className="shrink-0 text-slate-400"
                                    />

                                    <span className="truncate font-medium text-slate-600">
                                        {item.buildingName}
                                    </span>
                                </div>

                                {/* ==================================
                                    Consumption Progress
                                ================================== */}

                                <div className="min-w-0">
                                    <div className="mb-2 flex items-center justify-between">
                                        <span className="text-xs font-medium text-slate-400">
                                            Usage level
                                        </span>

                                        <span className="text-xs font-semibold text-slate-500">
                                            {percentage.toFixed(0)}%
                                        </span>
                                    </div>

                                    <div className="h-2 w-full overflow-hidden rounded-full bg-slate-100">
                                        <div
                                            className="
                                                h-full
                                                rounded-full
                                                bg-gradient-to-r
                                                from-cyan-400
                                                to-blue-500
                                                transition-all
                                                duration-500
                                            "
                                            style={{
                                                width: `${percentage}%`,
                                            }}
                                        />
                                    </div>
                                </div>

                                {/* ==================================
                                    Usage
                                ================================== */}

                                <div className="text-right">
                                    <p className="text-base font-bold text-cyan-700">
                                        {item.waterConsumption.toFixed(
                                            2
                                        )}
                                    </p>

                                    <p className="mt-0.5 text-xs font-medium text-slate-400">
                                        KL
                                    </p>
                                </div>
                            </div>

                            {/* Mobile Consumption */}
                            <div className="mt-4 md:hidden">
                                <div className="mb-2 flex items-center justify-between">
                                    <span className="text-xs font-medium text-slate-400">
                                        Consumption level
                                    </span>

                                    <span className="text-sm font-bold text-cyan-700">
                                        {item.waterConsumption.toFixed(
                                            2
                                        )}{" "}
                                        KL
                                    </span>
                                </div>

                                <div className="h-2 w-full overflow-hidden rounded-full bg-slate-100">
                                    <div
                                        className="h-full rounded-full bg-gradient-to-r from-cyan-400 to-blue-500"
                                        style={{
                                            width: `${percentage}%`,
                                        }}
                                    />
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* ==========================================
                Footer
            ========================================== */}

            <div className="border-t border-slate-100 bg-slate-50/50 px-6 py-3">
                <div className="flex items-center justify-between">
                    <p className="text-xs text-slate-400">
                        Ranked by water consumption
                    </p>

                    <div className="flex items-center gap-1.5 text-xs font-medium text-cyan-600">
                        <Droplets size={13} />
                        Water Usage
                    </div>
                </div>
            </div>
        </div>
    );
}