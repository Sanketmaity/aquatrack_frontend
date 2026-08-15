import {
    Building2,
    CheckCircle2,
    Hash,
    Home,
    Layers3,
    MapPinned,
    Sparkles,
    Users,
} from "lucide-react";

export default function HouseholdInfoCard({
    household,
}) {
    // ==========================================
    // Safe Values
    // ==========================================

    const houseNumber =
        household?.houseNumber ?? "-";

    const apartmentName =
        household?.apartmentName ?? "-";

    const buildingName =
        household?.buildingName ?? "-";

    const floorName =
        household?.floorName ?? "-";

    const status =
        household?.householdStatus ??
        household?.status ??
        "UNKNOWN";

    const householdId =
        household?.householdId ??
        household?.id ??
        "-";

    const totalResidents =
        household?.totalResidents ??
        household?.residentCount ??
        null;

    const normalizedStatus =
        String(status).toUpperCase();

    const isOccupied =
        normalizedStatus === "OCCUPIED";

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
                    from-blue-500
                    via-cyan-500
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
                                bg-blue-50
                                text-blue-600
                                ring-1
                                ring-inset
                                ring-blue-100
                            "
                        >
                            <Home
                                size={23}
                                strokeWidth={2.2}
                            />
                        </div>

                        {/* Heading */}

                        <div>

                            <div
                                className="
                                    flex
                                    items-center
                                    gap-2
                                "
                            >
                                <p
                                    className="
                                        text-[10px]
                                        font-bold
                                        uppercase
                                        tracking-[0.18em]
                                        text-cyan-600
                                    "
                                >
                                    My Household
                                </p>

                                <Sparkles
                                    size={12}
                                    className="text-amber-500"
                                />
                            </div>

                            <h2
                                className="
                                    mt-0.5
                                    text-lg
                                    font-bold
                                    tracking-tight
                                    text-slate-900
                                "
                            >
                                Household Information
                            </h2>

                            <p
                                className="
                                    mt-0.5
                                    text-xs
                                    text-slate-500
                                "
                            >
                                Your registered household details
                            </p>

                        </div>

                    </div>


                    {/* ======================================
                        Status
                    ====================================== */}

                    <StatusBadge
                        status={normalizedStatus}
                        isOccupied={isOccupied}
                    />

                </div>


                {/* ==========================================
                    HOUSE NUMBER — DARK FEATURE
                ========================================== */}

                <div
                    className="
                        relative
                        mt-6
                        overflow-hidden
                        rounded-2xl
                        border
                        border-slate-800
                        bg-gradient-to-br
                        from-[#061426]
                        via-[#0A2945]
                        to-[#075E73]
                        p-5
                        shadow-xl
                        shadow-slate-900/10
                    "
                >

                    {/* Background glow */}

                    <div
                        className="
                            pointer-events-none
                            absolute
                            -right-12
                            -top-16
                            h-40
                            w-40
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
                            h-36
                            w-36
                            rounded-full
                            bg-blue-500/10
                            blur-3xl
                        "
                    />

                    <div
                        className="
                            relative
                            flex
                            flex-col
                            gap-5
                            sm:flex-row
                            sm:items-center
                            sm:justify-between
                        "
                    >

                        {/* House Number */}

                        <div>

                            <p
                                className="
                                    text-[9px]
                                    font-bold
                                    uppercase
                                    tracking-[0.2em]
                                    text-white/40
                                "
                            >
                                House Number
                            </p>

                            <div
                                className="
                                    mt-2
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
                                        items-center
                                        justify-center
                                        rounded-xl
                                        border
                                        border-white/10
                                        bg-white/10
                                        text-cyan-200
                                    "
                                >
                                    <Home size={19} />
                                </div>

                                <h3
                                    className="
                                        text-3xl
                                        font-extrabold
                                        tracking-tight
                                        text-white
                                    "
                                >
                                    {houseNumber}
                                </h3>

                            </div>

                        </div>


                        {/* Household ID */}

                        <div
                            className="
                                flex
                                items-center
                                gap-3
                                rounded-xl
                                border
                                border-white/10
                                bg-white/5
                                px-3
                                py-2.5
                            "
                        >

                            <div
                                className="
                                    flex
                                    h-8
                                    w-8
                                    items-center
                                    justify-center
                                    rounded-lg
                                    bg-white/10
                                    text-cyan-200
                                "
                            >
                                <Hash size={15} />
                            </div>

                            <div>

                                <p
                                    className="
                                        text-[9px]
                                        font-bold
                                        uppercase
                                        tracking-[0.15em]
                                        text-white/35
                                    "
                                >
                                    Household ID
                                </p>

                                <p
                                    className="
                                        mt-0.5
                                        font-mono
                                        text-xs
                                        font-semibold
                                        text-white/80
                                    "
                                >
                                    {householdId}
                                </p>

                            </div>

                        </div>

                    </div>

                </div>


                {/* ==========================================
                    Information Grid
                ========================================== */}

                <div
                    className="
                        mt-5
                        grid
                        grid-cols-1
                        gap-3
                        sm:grid-cols-2
                    "
                >

                    <InfoItem
                        icon={Building2}
                        label="Apartment"
                        value={apartmentName}
                    />

                    <InfoItem
                        icon={Building2}
                        label="Building"
                        value={buildingName}
                    />

                    <InfoItem
                        icon={Layers3}
                        label="Floor"
                        value={floorName}
                    />

                    {totalResidents !== null && (
                        <InfoItem
                            icon={Users}
                            label="Residents"
                            value={totalResidents}
                        />
                    )}

                </div>


                {/* ==========================================
                    Bottom Status
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
                    "
                >

                    <CheckCircle2
                        size={14}
                        className={
                            isOccupied
                                ? "text-emerald-500"
                                : "text-slate-400"
                        }
                    />

                    <span
                        className="
                            text-xs
                            text-slate-400
                        "
                    >
                        {isOccupied
                            ? "This household is currently occupied."
                            : `Household status is currently ${normalizedStatus.toLowerCase()}.`}
                    </span>

                </div>

            </div>

        </section>
    );
}


// ============================================================
// Status Badge
// ============================================================

function StatusBadge({
    status,
    isOccupied,
}) {

    const isVacant =
        status === "VACANT";

    const styles = isOccupied
        ? {
              wrapper:
                  "border-emerald-100 bg-emerald-50 text-emerald-700",
              dot: "bg-emerald-500",
          }
        : isVacant
        ? {
              wrapper:
                  "border-amber-100 bg-amber-50 text-amber-700",
              dot: "bg-amber-500",
          }
        : {
              wrapper:
                  "border-slate-200 bg-slate-50 text-slate-600",
              dot: "bg-slate-400",
          };

    const label =
        status === "UNKNOWN"
            ? "Unknown"
            : status.charAt(0) +
              status.slice(1).toLowerCase();

    return (
        <span
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
                ${styles.wrapper}
            `}
        >

            <span
                className={`
                    h-1.5
                    w-1.5
                    rounded-full
                    ${styles.dot}
                `}
            />

            <CheckCircle2
                size={13}
            />

            {label}

        </span>
    );
}


// ============================================================
// Information Item
// ============================================================

function InfoItem({
    icon: Icon,
    label,
    value,
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
                bg-slate-50/70
                p-4
                transition-all
                duration-200
                hover:border-blue-100
                hover:bg-blue-50/50
                hover:shadow-sm
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
                    group-hover:bg-blue-50
                    group-hover:text-blue-600
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
                        text-[9px]
                        font-bold
                        uppercase
                        tracking-[0.14em]
                        text-slate-400
                    "
                >
                    {label}
                </p>

                <p
                    className="
                        mt-1
                        truncate
                        text-sm
                        font-bold
                        text-slate-800
                    "
                >
                    {value || "-"}
                </p>

            </div>

        </div>
    );
}