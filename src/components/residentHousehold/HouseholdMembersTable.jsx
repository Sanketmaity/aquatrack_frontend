import {
    Mail,
    Phone,
    Users,
    UserRound,
    ShieldCheck,
    CircleCheck,
} from "lucide-react";

export default function HouseholdMembersTable({
    members = [],
}) {

    // ==========================================
    // Helpers
    // ==========================================

    const getInitials = (member) => {

        const first =
            member?.firstName?.charAt(0) || "";

        const last =
            member?.lastName?.charAt(0) || "";

        return `${first}${last}`.toUpperCase() || "R";
    };


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
                                bg-gradient-to-br
                                from-blue-50
                                to-cyan-50
                                text-blue-600
                                ring-1
                                ring-inset
                                ring-blue-100
                            "
                        >
                            <Users
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
                                Household
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
                                Household Members
                            </h2>

                            <p
                                className="
                                    mt-0.5
                                    text-xs
                                    text-slate-500
                                "
                            >
                                Residents currently assigned to this household.
                            </p>

                        </div>

                    </div>


                    {/* ======================================
                        Member Count
                    ====================================== */}

                    <div
                        className="
                            inline-flex
                            w-fit
                            items-center
                            gap-2
                            rounded-full
                            border
                            border-blue-100
                            bg-blue-50
                            px-3.5
                            py-1.5
                            text-xs
                            font-bold
                            text-blue-700
                        "
                    >

                        <Users size={14} />

                        {members.length}{" "}
                        Member
                        {members.length !== 1
                            ? "s"
                            : ""}

                    </div>

                </div>


                {/* ==========================================
                    Members
                ========================================== */}

                <div className="mt-6">

                    {members.length === 0 ? (

                        <EmptyState />

                    ) : (

                        <div
                            className="
                                overflow-hidden
                                rounded-2xl
                                border
                                border-slate-200
                            "
                        >

                            {/* ==================================
                                Desktop Table
                            ================================== */}

                            <div className="hidden md:block">

                                <table className="min-w-full">

                                    <thead>

                                        <tr
                                            className="
                                                border-b
                                                border-slate-200
                                                bg-slate-50/80
                                            "
                                        >

                                            <th
                                                className="
                                                    px-5
                                                    py-4
                                                    text-left
                                                    text-[10px]
                                                    font-bold
                                                    uppercase
                                                    tracking-[0.14em]
                                                    text-slate-400
                                                "
                                            >
                                                Resident
                                            </th>

                                            <th
                                                className="
                                                    px-5
                                                    py-4
                                                    text-left
                                                    text-[10px]
                                                    font-bold
                                                    uppercase
                                                    tracking-[0.14em]
                                                    text-slate-400
                                                "
                                            >
                                                Email
                                            </th>

                                            <th
                                                className="
                                                    px-5
                                                    py-4
                                                    text-left
                                                    text-[10px]
                                                    font-bold
                                                    uppercase
                                                    tracking-[0.14em]
                                                    text-slate-400
                                                "
                                            >
                                                Phone
                                            </th>

                                            <th
                                                className="
                                                    px-5
                                                    py-4
                                                    text-center
                                                    text-[10px]
                                                    font-bold
                                                    uppercase
                                                    tracking-[0.14em]
                                                    text-slate-400
                                                "
                                            >
                                                Status
                                            </th>

                                        </tr>

                                    </thead>


                                    <tbody>

                                        {members.map(
                                            (member, index) => (

                                                <tr
                                                    key={
                                                        member.residentId ??
                                                        member.id ??
                                                        index
                                                    }
                                                    className="
                                                        border-b
                                                        border-slate-100
                                                        last:border-0
                                                        transition
                                                        duration-200
                                                        hover:bg-blue-50/40
                                                    "
                                                >

                                                    {/* Resident */}

                                                    <td className="px-5 py-4">

                                                        <div
                                                            className="
                                                                flex
                                                                items-center
                                                                gap-3
                                                            "
                                                        >

                                                            <Avatar
                                                                initials={getInitials(
                                                                    member
                                                                )}
                                                            />

                                                            <div>

                                                                <p
                                                                    className="
                                                                        font-semibold
                                                                        text-slate-900
                                                                    "
                                                                >
                                                                    {
                                                                        member.firstName
                                                                    }{" "}
                                                                    {
                                                                        member.lastName
                                                                    }
                                                                </p>

                                                                <p
                                                                    className="
                                                                        mt-0.5
                                                                        text-xs
                                                                        text-slate-400
                                                                    "
                                                                >
                                                                    Resident
                                                                </p>

                                                            </div>

                                                        </div>

                                                    </td>


                                                    {/* Email */}

                                                    <td className="px-5 py-4">

                                                        <div
                                                            className="
                                                                flex
                                                                items-center
                                                                gap-2.5
                                                                text-sm
                                                                text-slate-600
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
                                                                    bg-blue-50
                                                                    text-blue-500
                                                                "
                                                            >
                                                                <Mail
                                                                    size={15}
                                                                />
                                                            </div>

                                                            <span className="break-all">
                                                                {
                                                                    member.email ||
                                                                    "-"
                                                                }
                                                            </span>

                                                        </div>

                                                    </td>


                                                    {/* Phone */}

                                                    <td className="px-5 py-4">

                                                        <div
                                                            className="
                                                                flex
                                                                items-center
                                                                gap-2.5
                                                                text-sm
                                                                text-slate-600
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
                                                                    bg-emerald-50
                                                                    text-emerald-500
                                                                "
                                                            >
                                                                <Phone
                                                                    size={15}
                                                                />
                                                            </div>

                                                            <span>
                                                                {
                                                                    member.phone ||
                                                                    "-"
                                                                }
                                                            </span>

                                                        </div>

                                                    </td>


                                                    {/* Status */}

                                                    <td className="px-5 py-4 text-center">

                                                        <StatusBadge
                                                            member={member}
                                                        />

                                                    </td>

                                                </tr>

                                            )
                                        )}

                                    </tbody>

                                </table>

                            </div>


                            {/* ==================================
                                Mobile Cards
                            ================================== */}

                            <div
                                className="
                                    divide-y
                                    divide-slate-100
                                    md:hidden
                                "
                            >

                                {members.map(
                                    (member, index) => (

                                        <div
                                            key={
                                                member.residentId ??
                                                member.id ??
                                                index
                                            }
                                            className="
                                                p-4
                                                transition
                                                hover:bg-slate-50
                                            "
                                        >

                                            <div
                                                className="
                                                    flex
                                                    items-start
                                                    justify-between
                                                    gap-3
                                                "
                                            >

                                                <div
                                                    className="
                                                        flex
                                                        min-w-0
                                                        items-center
                                                        gap-3
                                                    "
                                                >

                                                    <Avatar
                                                        initials={getInitials(
                                                            member
                                                        )}
                                                    />

                                                    <div className="min-w-0">

                                                        <p
                                                            className="
                                                                truncate
                                                                font-semibold
                                                                text-slate-900
                                                            "
                                                        >
                                                            {
                                                                member.firstName
                                                            }{" "}
                                                            {
                                                                member.lastName
                                                            }
                                                        </p>

                                                        <p
                                                            className="
                                                                mt-0.5
                                                                text-xs
                                                                text-slate-400
                                                            "
                                                        >
                                                            Resident
                                                        </p>

                                                    </div>

                                                </div>


                                                <StatusBadge
                                                    member={member}
                                                />

                                            </div>


                                            <div
                                                className="
                                                    mt-4
                                                    space-y-2
                                                "
                                            >

                                                <ContactRow
                                                    icon={Mail}
                                                    value={
                                                        member.email
                                                    }
                                                />

                                                <ContactRow
                                                    icon={Phone}
                                                    value={
                                                        member.phone
                                                    }
                                                />

                                            </div>

                                        </div>

                                    )
                                )}

                            </div>

                        </div>

                    )}

                </div>


                {/* ==========================================
                    Footer
                ========================================== */}

                {members.length > 0 && (

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

                        <ShieldCheck
                            size={14}
                            className="text-emerald-500"
                        />

                        <p
                            className="
                                text-xs
                                text-slate-400
                            "
                        >
                            Household member information is securely managed.
                        </p>

                    </div>

                )}

            </div>

        </section>
    );
}


// ============================================================
// Avatar
// ============================================================

function Avatar({
    initials,
}) {
    return (
        <div
            className="
                flex
                h-10
                w-10
                shrink-0
                items-center
                justify-center
                rounded-xl
                bg-gradient-to-br
                from-blue-600
                to-cyan-500
                text-xs
                font-bold
                text-white
                shadow-sm
                shadow-blue-500/20
            "
        >
            {initials}
        </div>
    );
}


// ============================================================
// Status Badge
// ============================================================

function StatusBadge({
    member,
}) {

    const isActive =
        member?.isActive ??
        member?.active ??
        true;

    return (
        <span
            className={`
                inline-flex
                items-center
                gap-1.5
                rounded-full
                border
                px-2.5
                py-1
                text-[10px]
                font-bold
                ${
                    isActive
                        ? "border-emerald-100 bg-emerald-50 text-emerald-700"
                        : "border-slate-200 bg-slate-50 text-slate-500"
                }
            `}
        >

            <span
                className={`
                    h-1.5
                    w-1.5
                    rounded-full
                    ${
                        isActive
                            ? "bg-emerald-500"
                            : "bg-slate-400"
                    }
                `}
            />

            {isActive
                ? "Active"
                : "Inactive"}

        </span>
    );
}


// ============================================================
// Contact Row
// ============================================================

function ContactRow({
    icon: Icon,
    value,
}) {
    return (
        <div
            className="
                flex
                items-center
                gap-2.5
                rounded-xl
                bg-slate-50
                px-3
                py-2.5
            "
        >

            <Icon
                size={15}
                className="shrink-0 text-slate-400"
            />

            <span
                className="
                    min-w-0
                    truncate
                    text-xs
                    text-slate-600
                "
            >
                {value || "-"}
            </span>

        </div>
    );
}


// ============================================================
// Empty State
// ============================================================

function EmptyState() {

    return (
        <div
            className="
                flex
                flex-col
                items-center
                justify-center
                rounded-2xl
                border
                border-dashed
                border-slate-200
                bg-slate-50/60
                px-6
                py-14
                text-center
            "
        >

            <div
                className="
                    flex
                    h-14
                    w-14
                    items-center
                    justify-center
                    rounded-2xl
                    bg-blue-50
                    text-blue-400
                "
            >
                <Users size={25} />
            </div>

            <h3
                className="
                    mt-4
                    text-sm
                    font-bold
                    text-slate-800
                "
            >
                No household members
            </h3>

            <p
                className="
                    mt-1.5
                    max-w-sm
                    text-xs
                    leading-5
                    text-slate-400
                "
            >
                There are currently no residents assigned
                to this household.
            </p>

        </div>
    );
}