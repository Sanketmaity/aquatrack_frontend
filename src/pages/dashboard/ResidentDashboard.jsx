import { useCallback, useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
    AlertCircle,
    ArrowRight,
    Building2,
    CheckCircle2,
    Droplets,
    Home,
    RefreshCw,
    ShieldCheck,
    Sparkles,
    UserRound,
    Waves,
} from "lucide-react";

import DashboardLayout from "../../components/ui/DashboardLayout";

import ResidentDashboardSummaryCards from "../../components/resident/ResidentDashboardSummaryCards";
import ResidentConsumptionChart from "../../components/resident/ResidentConsumptionChart";
import ResidentBillSummary from "../../components/resident/ResidentBillSummary";
import ResidentRecentBillsTable from "../../components/resident/ResidentRecentBillsTable";

import {
    getResidentDashboardSummary,
    getResidentMonthlyConsumption,
    getResidentBillSummary,
    getResidentRecentBills,
} from "../../services/residentDashboardService";


// ============================================================
// Default Dashboard State
// ============================================================

const DEFAULT_DASHBOARD = {
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
};


// ============================================================
// Component
// ============================================================

export default function ResidentDashboard() {

    // ============================================================
    // State
    // ============================================================

    const [dashboard, setDashboard] =
        useState(DEFAULT_DASHBOARD);

    const [loading, setLoading] =
        useState(true);

    const [refreshing, setRefreshing] =
        useState(false);

    const [error, setError] =
        useState("");


    // ============================================================
    // Load Dashboard
    // ============================================================

    const loadDashboard = useCallback(
        async (isRefresh = false) => {

            try {

                if (isRefresh) {
                    setRefreshing(true);
                } else {
                    setLoading(true);
                }

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


                const summary =
                    summaryResponse?.data ?? {};

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
                            summary?.billingStatus ??
                            "PENDING",

                        waterAlerts:
                            summary?.waterAlerts ??
                            "None",
                    },


                    monthlyConsumption:
                        Array.isArray(monthlyConsumption)
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


                    recentBills:
                        Array.isArray(recentBills)
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
                setRefreshing(false);

            }

        },
        []
    );


    // ============================================================
    // Initial Load
    // ============================================================

    useEffect(() => {

        loadDashboard(false);

    }, [loadDashboard]);


    // ============================================================
    // Resident Information
    // ============================================================

    const residentName = useMemo(() => {

        return `${dashboard.resident.firstName} ${dashboard.resident.lastName}`
            .trim();

    }, [
        dashboard.resident.firstName,
        dashboard.resident.lastName,
    ]);


    const firstName =
        dashboard.resident.firstName ||
        "Resident";


    // ============================================================
    // Loading Screen
    // ============================================================

    if (loading) {

        return (
            <DashboardLayout>

                <ResidentDashboardSkeleton />

            </DashboardLayout>
        );
    }


    // ============================================================
    // Error Screen
    // ============================================================

    if (error) {

        return (
            <DashboardLayout>

                <ResidentDashboardError
                    error={error}
                    onRetry={() => loadDashboard(false)}
                />

            </DashboardLayout>
        );
    }


    // ============================================================
    // UI
    // ============================================================

    return (

        <DashboardLayout>

            <main className="mx-auto max-w-7xl space-y-8 pb-10">

                {/* ==================================================
                    HERO
                ================================================== */}

                <ResidentHero
                    firstName={firstName}
                    buildingName={
                        dashboard.resident.buildingName
                    }
                    householdName={
                        dashboard.resident.householdName
                    }
                    refreshing={refreshing}
                    onRefresh={() =>
                        loadDashboard(true)
                    }
                />


                {/* ==================================================
                    WATER SNAPSHOT
                ================================================== */}

                <section>

                    <DashboardSectionHeading
                        eyebrow="Overview"
                        title="Your Water Snapshot"
                        description="A quick overview of your current water activity."
                    />

                    <div className="mt-5">

                        <ResidentDashboardSummaryCards
                            summary={dashboard.summary}
                        />

                    </div>

                </section>


                {/* ==================================================
                    CONSUMPTION + PROFILE
                ================================================== */}

                <section>

                    <DashboardSectionHeading
                        eyebrow="Insights"
                        title="Consumption & Household"
                        description="Monitor your usage and household information."
                    />

                    <div className="
                        mt-5
                        grid
                        gap-6
                        xl:grid-cols-[1.55fr_0.75fr]
                    ">

                        {/* Consumption */}

                        <motion.div
                            initial={{
                                opacity: 0,
                                y: 18,
                            }}
                            animate={{
                                opacity: 1,
                                y: 0,
                            }}
                            transition={{
                                duration: 0.45,
                            }}
                        >

                            <ResidentConsumptionChart
                                monthlyConsumption={
                                    dashboard.monthlyConsumption
                                }
                            />

                        </motion.div>


                        {/* Profile */}

                        <ResidentProfileCard
                            resident={
                                dashboard.resident
                            }
                            residentName={
                                residentName
                            }
                        />

                    </div>

                </section>


                {/* ==================================================
                    BILLING
                ================================================== */}

                <section>

                    <DashboardSectionHeading
                        eyebrow="Payments"
                        title="Billing Overview"
                        description="Track your bills and payment progress."
                    />

                    <div className="mt-5">

                        <ResidentBillSummary
                            billSummary={
                                dashboard.billSummary
                            }
                        />

                    </div>

                </section>


                {/* ==================================================
                    RECENT BILLS
                ================================================== */}

                <section>

                    <DashboardSectionHeading
                        eyebrow="History"
                        title="Recent Bills"
                        description="Your latest generated water bills."
                    />

                    <div className="mt-5">

                        <ResidentRecentBillsTable
                            bills={
                                dashboard.recentBills
                            }
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

                </section>


                {/* ==================================================
                    SECURITY FOOTER
                ================================================== */}

                <DashboardSecurityFooter />

            </main>

        </DashboardLayout>
    );
}


// ============================================================
// HERO
// ============================================================

function ResidentHero({
    firstName,
    buildingName,
    householdName,
    refreshing,
    onRefresh,
}) {

    return (

        <motion.section
            initial={{
                opacity: 0,
                y: -18,
            }}
            animate={{
                opacity: 1,
                y: 0,
            }}
            transition={{
                duration: 0.5,
                ease: "easeOut",
            }}
            className="
                relative
                overflow-hidden
                rounded-[28px]
                bg-gradient-to-br
                from-[#071A2F]
                via-[#0B3152]
                to-[#087A91]
                px-6
                py-7
                shadow-2xl
                shadow-slate-900/10
                sm:px-8
                sm:py-9
                lg:px-10
                lg:py-10
            "
        >

            {/* ==================================================
                Decorative Background
            ================================================== */}

            <div className="
                pointer-events-none
                absolute
                -right-24
                -top-28
                h-80
                w-80
                rounded-full
                bg-cyan-300/10
                blur-3xl
            " />

            <div className="
                pointer-events-none
                absolute
                -bottom-36
                left-1/3
                h-80
                w-80
                rounded-full
                bg-blue-400/10
                blur-3xl
            " />

            <div className="
                pointer-events-none
                absolute
                right-8
                top-1/2
                hidden
                -translate-y-1/2
                text-white/5
                lg:block
            ">

                <Waves size={240} />

            </div>


            {/* ==================================================
                Content
            ================================================== */}

            <div className="relative">

                {/* Badges */}

                <div className="
                    flex
                    flex-wrap
                    items-center
                    gap-2
                ">

                    <span className="
                        inline-flex
                        items-center
                        gap-1.5
                        rounded-full
                        border
                        border-cyan-300/20
                        bg-cyan-300/10
                        px-3
                        py-1.5
                        text-[10px]
                        font-bold
                        uppercase
                        tracking-[0.14em]
                        text-cyan-100
                        backdrop-blur
                    ">

                        <Sparkles size={12} />

                        Resident Portal

                    </span>


                    <span className="
                        inline-flex
                        items-center
                        gap-1.5
                        rounded-full
                        border
                        border-emerald-300/20
                        bg-emerald-300/10
                        px-3
                        py-1.5
                        text-[10px]
                        font-semibold
                        text-emerald-100
                        backdrop-blur
                    ">

                        <span className="
                            h-1.5
                            w-1.5
                            animate-pulse
                            rounded-full
                            bg-emerald-400
                        " />

                        System Active

                    </span>

                </div>


                {/* Greeting */}

                <div className="mt-6 max-w-2xl">

                    <p className="
                        text-sm
                        font-medium
                        text-cyan-100/80
                    ">
                        Welcome back
                    </p>


                    <h1 className="
                        mt-1
                        text-3xl
                        font-extrabold
                        tracking-tight
                        text-white
                        sm:text-4xl
                        lg:text-[42px]
                    ">

                        Hello, {firstName}

                    </h1>


                    <p className="
                        mt-3
                        max-w-xl
                        text-sm
                        leading-6
                        text-blue-100/75
                        sm:text-base
                    ">

                        Stay informed about your household's
                        water consumption, bills and payments —
                        all from one simple dashboard.

                    </p>

                </div>


                {/* Bottom Row */}

                <div className="
                    mt-8
                    flex
                    flex-col
                    gap-4
                    sm:flex-row
                    sm:items-center
                    sm:justify-between
                ">

                    {/* Location */}

                    <div className="
                        flex
                        flex-wrap
                        gap-2
                    ">

                        <HeroInfoPill
                            icon={Building2}
                            value={buildingName}
                        />

                        <HeroInfoPill
                            icon={Home}
                            value={householdName}
                        />

                    </div>


                    {/* Refresh */}

                    <button
                        type="button"
                        onClick={onRefresh}
                        disabled={refreshing}
                        className="
                            inline-flex
                            items-center
                            justify-center
                            gap-2
                            rounded-xl
                            border
                            border-white/15
                            bg-white/10
                            px-4
                            py-2.5
                            text-sm
                            font-semibold
                            text-white
                            shadow-sm
                            backdrop-blur
                            transition-all
                            duration-200
                            hover:bg-white/15
                            active:scale-[0.97]
                            disabled:cursor-not-allowed
                            disabled:opacity-60
                        "
                    >

                        <RefreshCw
                            size={15}
                            className={
                                refreshing
                                    ? "animate-spin"
                                    : ""
                            }
                        />

                        {refreshing
                            ? "Refreshing..."
                            : "Refresh Data"}

                    </button>

                </div>

            </div>

        </motion.section>
    );
}


// ============================================================
// HERO INFO PILL
// ============================================================

function HeroInfoPill({
    icon: Icon,
    value,
}) {

    return (

        <span className="
            inline-flex
            max-w-full
            items-center
            gap-2
            rounded-xl
            border
            border-white/10
            bg-white/10
            px-3.5
            py-2.5
            text-xs
            font-medium
            text-white
            backdrop-blur
        ">

            <Icon
                size={14}
                className="shrink-0 text-cyan-300"
            />

            <span className="truncate">
                {value || "--"}
            </span>

        </span>
    );
}


// ============================================================
// SECTION HEADING
// ============================================================

function DashboardSectionHeading({
    eyebrow,
    title,
    description,
}) {

    return (

        <div className="
            flex
            flex-col
            gap-1
            sm:flex-row
            sm:items-end
            sm:justify-between
        ">

            <div>

                <div className="
                    flex
                    items-center
                    gap-2
                ">

                    <span className="
                        h-1.5
                        w-1.5
                        rounded-full
                        bg-cyan-500
                    " />

                    <p className="
                        text-[10px]
                        font-bold
                        uppercase
                        tracking-[0.2em]
                        text-cyan-600
                    ">

                        {eyebrow}

                    </p>

                </div>


                <h2 className="
                    mt-1
                    text-xl
                    font-bold
                    tracking-tight
                    text-slate-900
                    sm:text-2xl
                ">

                    {title}

                </h2>

            </div>


            <p className="
                max-w-lg
                text-xs
                leading-5
                text-slate-400
                sm:text-right
                sm:text-sm
            ">

                {description}

            </p>

        </div>
    );
}


// ============================================================
// PROFILE CARD
// ============================================================

function ResidentProfileCard({
    resident,
    residentName,
}) {

    return (

        <motion.section
            initial={{
                opacity: 0,
                y: 18,
            }}
            animate={{
                opacity: 1,
                y: 0,
            }}
            transition={{
                duration: 0.45,
                delay: 0.08,
            }}
            className="
                relative
                overflow-hidden
                rounded-2xl
                border
                border-slate-200
                bg-white
                p-6
                shadow-sm
                shadow-slate-200/50
            "
        >

            {/* Accent */}

            <div className="
                absolute
                inset-x-0
                top-0
                h-1
                bg-gradient-to-r
                from-blue-500
                via-cyan-500
                to-emerald-500
            " />


            {/* Header */}

            <div className="
                flex
                items-center
                justify-between
                gap-3
            ">

                <div className="
                    flex
                    items-center
                    gap-3
                ">

                    <div className="
                        flex
                        h-11
                        w-11
                        shrink-0
                        items-center
                        justify-center
                        rounded-xl
                        bg-blue-50
                        text-blue-600
                    ">

                        <UserRound size={21} />

                    </div>


                    <div>

                        <p className="
                            text-[10px]
                            font-bold
                            uppercase
                            tracking-[0.18em]
                            text-blue-600
                        ">

                            My Profile

                        </p>


                        <h2 className="
                            mt-0.5
                            text-lg
                            font-bold
                            text-slate-900
                        ">

                            Household Details

                        </h2>

                    </div>

                </div>


                <span className="
                    inline-flex
                    items-center
                    gap-1.5
                    rounded-full
                    border
                    border-emerald-100
                    bg-emerald-50
                    px-2.5
                    py-1
                    text-[10px]
                    font-bold
                    text-emerald-700
                ">

                    <CheckCircle2 size={11} />

                    ACTIVE

                </span>

            </div>


            {/* Identity */}

            <div className="
                mt-6
                overflow-hidden
                rounded-2xl
                border
                border-blue-100
                bg-gradient-to-br
                from-slate-50
                via-blue-50/60
                to-cyan-50/60
                p-4
            ">

                <div className="
                    flex
                    items-center
                    gap-3
                ">

                    <div className="
                        flex
                        h-12
                        w-12
                        shrink-0
                        items-center
                        justify-center
                        rounded-full
                        bg-gradient-to-br
                        from-blue-600
                        to-cyan-500
                        text-sm
                        font-bold
                        text-white
                        shadow-lg
                        shadow-blue-500/20
                    ">

                        {getInitials(
                            residentName
                        )}

                    </div>


                    <div className="min-w-0">

                        <p className="
                            truncate
                            text-base
                            font-bold
                            text-slate-900
                        ">

                            {residentName ||
                                "Resident"}

                        </p>


                        <p className="
                            mt-0.5
                            text-xs
                            text-slate-500
                        ">

                            AquaTrack Resident

                        </p>

                    </div>

                </div>

            </div>


            {/* Information */}

            <div className="
                mt-5
                space-y-2.5
            ">

                <ProfileRow
                    icon={Building2}
                    label="Apartment"
                    value={
                        resident.apartmentName
                    }
                />

                <ProfileRow
                    icon={Building2}
                    label="Building"
                    value={
                        resident.buildingName
                    }
                />

                <ProfileRow
                    icon={Home}
                    label="Household"
                    value={
                        resident.householdName
                    }
                />

            </div>


            {/* Footer */}

            <div className="
                mt-5
                flex
                items-center
                gap-2
                border-t
                border-slate-100
                pt-4
                text-xs
                text-slate-400
            ">

                <ShieldCheck
                    size={14}
                    className="text-emerald-500"
                />

                Household information is protected.

            </div>

        </motion.section>
    );
}


// ============================================================
// PROFILE ROW
// ============================================================

function ProfileRow({
    icon: Icon,
    label,
    value,
}) {

    return (

        <div className="
            group
            flex
            items-center
            gap-3
            rounded-xl
            border
            border-slate-100
            bg-slate-50/60
            px-3
            py-3
            transition-all
            duration-200
            hover:border-blue-100
            hover:bg-blue-50/50
        ">

            <div className="
                flex
                h-8
                w-8
                shrink-0
                items-center
                justify-center
                rounded-lg
                bg-white
                text-slate-500
                shadow-sm
                transition
                group-hover:text-blue-600
            ">

                <Icon size={15} />

            </div>


            <div className="min-w-0 flex-1">

                <p className="
                    text-[10px]
                    font-bold
                    uppercase
                    tracking-wide
                    text-slate-400
                ">

                    {label}

                </p>


                <p className="
                    mt-0.5
                    truncate
                    text-sm
                    font-semibold
                    text-slate-800
                ">

                    {value || "--"}

                </p>

            </div>


            <ArrowRight
                size={14}
                className="
                    shrink-0
                    text-slate-300
                    transition
                    group-hover:translate-x-0.5
                    group-hover:text-blue-400
                "
            />

        </div>
    );
}


// ============================================================
// SECURITY FOOTER
// ============================================================

function DashboardSecurityFooter() {

    return (

        <div className="
            flex
            flex-col
            items-center
            justify-center
            gap-2
            border-t
            border-slate-100
            pt-6
            text-center
            sm:flex-row
        ">

            <div className="
                flex
                h-7
                w-7
                items-center
                justify-center
                rounded-lg
                bg-emerald-50
                text-emerald-600
            ">

                <ShieldCheck size={14} />

            </div>


            <p className="
                text-xs
                text-slate-400
            ">

                Your AquaTrack information is securely managed.

            </p>

        </div>
    );
}


// ============================================================
// LOADING SKELETON
// ============================================================

function ResidentDashboardSkeleton() {

    return (

        <div className="
            mx-auto
            max-w-7xl
            space-y-8
            pb-10
        ">

            {/* Hero */}

            <div className="
                h-[290px]
                animate-pulse
                rounded-[28px]
                bg-slate-200
            " />


            {/* Summary */}

            <div className="
                grid
                grid-cols-1
                gap-5
                sm:grid-cols-2
                xl:grid-cols-4
            ">

                {[1, 2, 3, 4].map(
                    (item) => (

                        <div
                            key={item}
                            className="
                                h-40
                                animate-pulse
                                rounded-2xl
                                border
                                border-slate-200
                                bg-white
                            "
                        />

                    )
                )}

            </div>


            {/* Main */}

            <div className="
                grid
                gap-6
                xl:grid-cols-[1.55fr_0.75fr]
            ">

                <div className="
                    h-[430px]
                    animate-pulse
                    rounded-2xl
                    border
                    border-slate-200
                    bg-white
                " />

                <div className="
                    h-[430px]
                    animate-pulse
                    rounded-2xl
                    border
                    border-slate-200
                    bg-white
                " />

            </div>


            {/* Billing */}

            <div className="
                h-56
                animate-pulse
                rounded-2xl
                border
                border-slate-200
                bg-white
            " />

        </div>
    );
}


// ============================================================
// ERROR SCREEN
// ============================================================

function ResidentDashboardError({
    error,
    onRetry,
}) {

    return (

        <div className="
            mx-auto
            max-w-7xl
        ">

            <motion.div
                initial={{
                    opacity: 0,
                    y: 10,
                }}
                animate={{
                    opacity: 1,
                    y: 0,
                }}
                className="
                    overflow-hidden
                    rounded-3xl
                    border
                    border-red-200
                    bg-white
                    shadow-sm
                "
            >

                <div className="
                    h-1
                    bg-gradient-to-r
                    from-red-500
                    to-rose-500
                " />


                <div className="
                    p-7
                    sm:p-8
                ">

                    <div className="
                        flex
                        flex-col
                        gap-6
                        sm:flex-row
                        sm:items-center
                        sm:justify-between
                    ">

                        <div className="
                            flex
                            items-start
                            gap-4
                        ">

                            <div className="
                                flex
                                h-12
                                w-12
                                shrink-0
                                items-center
                                justify-center
                                rounded-2xl
                                bg-red-50
                                text-red-600
                            ">

                                <AlertCircle
                                    size={23}
                                />

                            </div>


                            <div>

                                <h2 className="
                                    text-lg
                                    font-bold
                                    text-slate-900
                                ">

                                    Unable to load dashboard

                                </h2>


                                <p className="
                                    mt-1.5
                                    max-w-xl
                                    text-sm
                                    leading-6
                                    text-slate-500
                                ">

                                    {error}

                                </p>

                            </div>

                        </div>


                        <button
                            type="button"
                            onClick={onRetry}
                            className="
                                inline-flex
                                shrink-0
                                items-center
                                justify-center
                                gap-2
                                rounded-xl
                                bg-slate-900
                                px-5
                                py-3
                                text-sm
                                font-semibold
                                text-white
                                transition
                                hover:bg-slate-800
                                active:scale-[0.97]
                            "
                        >

                            <RefreshCw size={16} />

                            Try Again

                        </button>

                    </div>

                </div>

            </motion.div>

        </div>
    );
}


// ============================================================
// INITIALS
// ============================================================

function getInitials(name) {

    if (!name) {
        return "R";
    }

    return name
        .split(" ")
        .filter(Boolean)
        .slice(0, 2)
        .map(
            (part) =>
                part
                    .charAt(0)
                    .toUpperCase()
        )
        .join("");
}