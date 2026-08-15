import {
    Activity,
    CheckCircle2,
    Gauge,
    Hash,
    Radio,
    ShieldCheck,
    Waves,
} from "lucide-react";

export default function WaterMeterCard({
    household,
}) {
    // ==========================================
    // Safe Values
    // ==========================================

    const meterNumber =
        household?.meterNumber ?? "-";

    const hasMeter =
        meterNumber !== "-" &&
        meterNumber !== "" &&
        meterNumber !== null;

    // ==========================================
    // UI
    // ==========================================

    return (
        <section
            className="
                relative
                overflow-hidden
                rounded-3xl
                border
                border-slate-200
                bg-white
                shadow-sm
                shadow-slate-200/50
            "
        >
            {/* ==========================================
                Top Accent
            ========================================== */}

            <div
                className="
                    absolute
                    inset-x-0
                    top-0
                    h-1
                    bg-gradient-to-r
                    from-cyan-400
                    via-blue-500
                    to-emerald-400
                "
            />

            <div className="p-6 sm:p-7">

                {/* ==========================================
                    Header
                ========================================== */}

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

                        {/* Icon */}

                        <div
                            className="
                                flex
                                h-12
                                w-12
                                shrink-0
                                items-center
                                justify-center
                                rounded-2xl
                                bg-gradient-to-br
                                from-cyan-50
                                to-blue-50
                                text-cyan-600
                                ring-1
                                ring-inset
                                ring-cyan-100
                            "
                        >
                            <Gauge
                                size={23}
                                strokeWidth={2.2}
                            />
                        </div>

                        {/* Heading */}

                        <div>

                            <p
                                className="
                                    text-[10px]
                                    font-bold
                                    uppercase
                                    tracking-[0.18em]
                                    text-cyan-600
                                "
                            >
                                Water Management
                            </p>

                            <h2
                                className="
                                    mt-0.5
                                    text-lg
                                    font-bold
                                    tracking-tight
                                    text-slate-900
                                "
                            >
                                Water Meter
                            </h2>

                            <p
                                className="
                                    mt-0.5
                                    text-xs
                                    text-slate-500
                                "
                            >
                                Meter assigned to your household
                            </p>

                        </div>
                    </div>

                    {/* ======================================
                        Connection Status
                    ====================================== */}

                    <div
                        className={`
                            inline-flex
                            w-fit
                            items-center
                            gap-2
                            rounded-full
                            border
                            px-3
                            py-1.5
                            text-xs
                            font-bold
                            ${
                                hasMeter
                                    ? "border-emerald-100 bg-emerald-50 text-emerald-700"
                                    : "border-amber-100 bg-amber-50 text-amber-700"
                            }
                        `}
                    >

                        <span
                            className={`
                                h-1.5
                                w-1.5
                                rounded-full
                                ${
                                    hasMeter
                                        ? "animate-pulse bg-emerald-500"
                                        : "bg-amber-500"
                                }
                            `}
                        />

                        {hasMeter
                            ? "Meter Active"
                            : "Meter Not Assigned"}

                    </div>
                </div>

                {/* ==========================================
                    Meter Display
                ========================================== */}

                <div
                    className="
                        relative
                        mt-6
                        overflow-hidden
                        rounded-2xl
                        border
                        border-slate-800/80
                        bg-gradient-to-br
                        from-[#071A2F]
                        via-[#0A2945]
                        to-[#087A91]
                        p-6
                        shadow-xl
                        shadow-slate-900/10
                    "
                >

                    {/* Background glow */}

                    <div
                        className="
                            pointer-events-none
                            absolute
                            -right-16
                            -top-20
                            h-48
                            w-48
                            rounded-full
                            bg-cyan-400/10
                            blur-3xl
                        "
                    />

                    <div
                        className="
                            pointer-events-none
                            absolute
                            -bottom-20
                            left-1/3
                            h-40
                            w-40
                            rounded-full
                            bg-blue-400/10
                            blur-3xl
                        "
                    />

                    {/* Decorative waves */}

                    <div
                        className="
                            pointer-events-none
                            absolute
                            right-3
                            top-1/2
                            -translate-y-1/2
                            text-white/[0.04]
                        "
                    >
                        <Waves
                            size={150}
                            strokeWidth={1}
                        />
                    </div>

                    <div className="relative">

                        {/* Small label */}

                        <div
                            className="
                                flex
                                items-center
                                gap-2
                            "
                        >
                            <Radio
                                size={13}
                                className={
                                    hasMeter
                                        ? "text-cyan-300"
                                        : "text-slate-400"
                                }
                            />

                            <span
                                className="
                                    text-[10px]
                                    font-bold
                                    uppercase
                                    tracking-[0.18em]
                                    text-white/50
                                "
                            >
                                Assigned Meter
                            </span>
                        </div>

                        {/* Meter Number */}

                        <div
                            className="
                                mt-3
                                flex
                                items-center
                                gap-3
                            "
                        >
                            <div
                                className="
                                    flex
                                    h-10
                                    w-10
                                    shrink-0
                                    items-center
                                    justify-center
                                    rounded-xl
                                    border
                                    border-white/10
                                    bg-white/10
                                    text-cyan-200
                                "
                            >
                                <Hash
                                    size={19}
                                />
                            </div>

                            <p
                                className="
                                    break-all
                                    font-mono
                                    text-2xl
                                    font-bold
                                    tracking-wide
                                    text-white
                                    sm:text-3xl
                                "
                            >
                                {meterNumber}
                            </p>
                        </div>

                        {/* Status */}

                        <div
                            className="
                                mt-5
                                flex
                                items-center
                                gap-2
                                text-xs
                                text-blue-100/60
                            "
                        >
                            <CheckCircle2
                                size={14}
                                className={
                                    hasMeter
                                        ? "text-emerald-300"
                                        : "text-slate-400"
                                }
                            />

                            {hasMeter
                                ? "This meter is assigned to your household."
                                : "No water meter is currently assigned."}

                        </div>

                    </div>
                </div>

                {/* ==========================================
                    Meter Information
                ========================================== */}

                <div
                    className="
                        mt-4
                        grid
                        grid-cols-1
                        gap-3
                        sm:grid-cols-2
                    "
                >

                    <MeterInfoItem
                        icon={Hash}
                        label="Meter Number"
                        value={meterNumber}
                    />

                    <MeterInfoItem
                        icon={Activity}
                        label="Meter Status"
                        value={
                            hasMeter
                                ? "Active"
                                : "Not Assigned"
                        }
                        valueClass={
                            hasMeter
                                ? "text-emerald-600"
                                : "text-amber-600"
                        }
                    />

                </div>

                {/* ==========================================
                    Security Footer
                ========================================== */}

                <div
                    className="
                        mt-5
                        flex
                        items-center
                        gap-2
                        border-t
                        border-slate-100
                        pt-4
                        text-xs
                        text-slate-400
                    "
                >
                    <ShieldCheck
                        size={14}
                        className="text-emerald-500"
                    />

                    Water meter information is securely managed.

                </div>

            </div>
        </section>
    );
}


// ============================================================
// Meter Info Item
// ============================================================

function MeterInfoItem({
    icon: Icon,
    label,
    value,
    valueClass = "text-slate-800",
}) {
    return (
        <div
            className="
                group
                flex
                items-center
                gap-3
                rounded-2xl
                border
                border-slate-100
                bg-slate-50/60
                p-4
                transition-all
                duration-200
                hover:border-cyan-100
                hover:bg-cyan-50/50
            "
        >
            {/* Icon */}

            <div
                className="
                    flex
                    h-10
                    w-10
                    shrink-0
                    items-center
                    justify-center
                    rounded-xl
                    bg-white
                    text-slate-500
                    shadow-sm
                    transition
                    duration-200
                    group-hover:bg-cyan-50
                    group-hover:text-cyan-600
                "
            >
                <Icon
                    size={17}
                    strokeWidth={2}
                />
            </div>

            {/* Content */}

            <div className="min-w-0">

                <p
                    className="
                        text-[10px]
                        font-bold
                        uppercase
                        tracking-[0.12em]
                        text-slate-400
                    "
                >
                    {label}
                </p>

                <p
                    className={`
                        mt-1
                        truncate
                        text-sm
                        font-bold
                        ${valueClass}
                    `}
                >
                    {value || "-"}
                </p>

            </div>
        </div>
    );
}