import {
    Home,
    Sparkles,
    Waves,
    ShieldCheck,
    ArrowUpRight,
} from "lucide-react";

export default function MyHouseholdHeader() {
    return (
        <section
            className="
                relative
                isolate
                overflow-hidden
                rounded-[28px]
                border
                border-slate-800/80
                bg-gradient-to-br
                from-[#061426]
                via-[#0A2945]
                to-[#075E73]
                px-6
                py-7
                shadow-2xl
                shadow-slate-900/15
                sm:px-8
                sm:py-8
                lg:px-10
                lg:py-9
            "
        >
            {/* ==================================================
                Background Glow
            ================================================== */}

            <div
                className="
                    pointer-events-none
                    absolute
                    -right-24
                    -top-28
                    h-80
                    w-80
                    rounded-full
                    bg-cyan-400/10
                    blur-3xl
                "
            />

            <div
                className="
                    pointer-events-none
                    absolute
                    -bottom-32
                    left-1/3
                    h-72
                    w-72
                    rounded-full
                    bg-blue-500/10
                    blur-3xl
                "
            />

            <div
                className="
                    pointer-events-none
                    absolute
                    bottom-0
                    left-0
                    h-32
                    w-full
                    bg-gradient-to-t
                    from-cyan-500/5
                    to-transparent
                "
            />

            {/* ==================================================
                Decorative Grid
            ================================================== */}

            <div
                className="
                    pointer-events-none
                    absolute
                    inset-0
                    opacity-[0.035]
                "
                style={{
                    backgroundImage: `
                        linear-gradient(
                            rgba(255,255,255,0.8) 1px,
                            transparent 1px
                        ),
                        linear-gradient(
                            90deg,
                            rgba(255,255,255,0.8) 1px,
                            transparent 1px
                        )
                    `,
                    backgroundSize: "34px 34px",
                }}
            />

            {/* ==================================================
                Large Decorative Water Icon
            ================================================== */}

            <div
                className="
                    pointer-events-none
                    absolute
                    -right-6
                    top-1/2
                    hidden
                    -translate-y-1/2
                    lg:block
                "
            >
                <div
                    className="
                        relative
                        flex
                        h-64
                        w-64
                        items-center
                        justify-center
                    "
                >
                    {/* Outer ring */}

                    <div
                        className="
                            absolute
                            inset-0
                            rounded-full
                            border
                            border-cyan-300/10
                        "
                    />

                    <div
                        className="
                            absolute
                            inset-8
                            rounded-full
                            border
                            border-cyan-300/10
                        "
                    />

                    <div
                        className="
                            absolute
                            inset-16
                            rounded-full
                            border
                            border-cyan-300/10
                        "
                    />

                    {/* Water waves */}

                    <Waves
                        size={180}
                        strokeWidth={1}
                        className="
                            text-cyan-200/10
                        "
                    />

                    <Home
                        size={72}
                        strokeWidth={1.2}
                        className="
                            absolute
                            text-white/[0.08]
                        "
                    />
                </div>
            </div>

            {/* ==================================================
                Top Accent
            ================================================== */}

            <div
                className="
                    absolute
                    inset-x-0
                    top-0
                    h-1
                    bg-gradient-to-r
                    from-blue-400
                    via-cyan-400
                    to-emerald-400
                "
            />

            {/* ==================================================
                Main Content
            ================================================== */}

            <div className="relative z-10">

                {/* ==================================================
                    Eyebrow
                ================================================== */}

                <div
                    className="
                        flex
                        flex-wrap
                        items-center
                        gap-2
                    "
                >
                    <span
                        className="
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
                            tracking-[0.18em]
                            text-cyan-100
                            backdrop-blur
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
                            border-emerald-300/20
                            bg-emerald-300/10
                            px-3
                            py-1.5
                            text-[10px]
                            font-semibold
                            text-emerald-100
                        "
                    >
                        <span
                            className="
                                h-1.5
                                w-1.5
                                animate-pulse
                                rounded-full
                                bg-emerald-400
                            "
                        />

                        Active Household
                    </span>
                </div>

                {/* ==================================================
                    Title Area
                ================================================== */}

                <div className="mt-6 max-w-2xl">

                    <div className="flex items-center gap-4">

                        {/* Main Icon */}

                        <div
                            className="
                                flex
                                h-14
                                w-14
                                shrink-0
                                items-center
                                justify-center
                                rounded-2xl
                                border
                                border-white/10
                                bg-white/10
                                text-cyan-200
                                shadow-lg
                                shadow-cyan-950/20
                                backdrop-blur
                                sm:h-16
                                sm:w-16
                            "
                        >
                            <Home
                                size={28}
                                strokeWidth={2}
                            />
                        </div>

                        <div>

                            <h1
                                className="
                                    text-3xl
                                    font-extrabold
                                    tracking-tight
                                    text-white
                                    sm:text-4xl
                                    lg:text-[42px]
                                "
                            >
                                My Household
                            </h1>

                            <div
                                className="
                                    mt-1.5
                                    flex
                                    items-center
                                    gap-2
                                "
                            >
                                <span
                                    className="
                                        h-1
                                        w-8
                                        rounded-full
                                        bg-cyan-400
                                    "
                                />

                                <span
                                    className="
                                        text-xs
                                        font-medium
                                        text-cyan-100/70
                                    "
                                >
                                    Your home. Your water. Your data.
                                </span>
                            </div>

                        </div>

                    </div>

                    {/* Description */}

                    <p
                        className="
                            mt-5
                            max-w-2xl
                            text-sm
                            leading-6
                            text-blue-100/70
                            sm:text-[15px]
                        "
                    >
                        View your household information, water
                        meter details, and registered household
                        members — all in one place.
                    </p>

                </div>

                {/* ==================================================
                    Bottom Information
                ================================================== */}

                <div
                    className="
                        mt-7
                        flex
                        flex-col
                        gap-3
                        sm:flex-row
                        sm:items-center
                        sm:justify-between
                    "
                >

                    {/* Secure Status */}

                    <div
                        className="
                            inline-flex
                            w-fit
                            items-center
                            gap-2.5
                            rounded-xl
                            border
                            border-white/10
                            bg-white/5
                            px-3.5
                            py-2.5
                            backdrop-blur
                        "
                    >
                        <div
                            className="
                                flex
                                h-7
                                w-7
                                items-center
                                justify-center
                                rounded-lg
                                bg-emerald-400/10
                                text-emerald-300
                            "
                        >
                            <ShieldCheck size={15} />
                        </div>

                        <div>

                            <p
                                className="
                                    text-[9px]
                                    font-bold
                                    uppercase
                                    tracking-[0.15em]
                                    text-white/40
                                "
                            >
                                Account Status
                            </p>

                            <p
                                className="
                                    mt-0.5
                                    text-xs
                                    font-semibold
                                    text-emerald-200
                                "
                            >
                                Household information secured
                            </p>

                        </div>
                    </div>

                    {/* Explore Indicator */}

                    <div
                        className="
                            hidden
                            items-center
                            gap-2
                            text-xs
                            font-medium
                            text-cyan-100/50
                            sm:flex
                        "
                    >
                        Explore household details

                        <span
                            className="
                                flex
                                h-7
                                w-7
                                items-center
                                justify-center
                                rounded-full
                                border
                                border-white/10
                                bg-white/5
                            "
                        >
                            <ArrowUpRight size={14} />
                        </span>
                    </div>

                </div>

            </div>
        </section>
    );
}