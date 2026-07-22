import { Home, Users } from "lucide-react";

export default function DashboardSummaryCards({

    summary,

}) {

    const cards = [

        {
            title: "Total Households",
            value: summary?.totalHouseholds ?? 0,
            icon: Home,
            bg: "bg-blue-50",
            iconColor: "text-blue-600",
            textColor: "text-blue-700",
        },

        {
            title: "Total Residents",
            value: summary?.totalResidents ?? 0,
            icon: Users,
            bg: "bg-green-50",
            iconColor: "text-green-600",
            textColor: "text-green-700",
        },

    ];

    return (

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

            {cards.map((card) => {

                const Icon = card.icon;

                return (

                    <div
                        key={card.title}
                        className="
                            rounded-2xl
                            border
                            border-slate-200
                            bg-white
                            p-6
                            shadow-sm
                        "
                    >

                        <div className="flex items-center justify-between">

                            <div>

                                <p className="text-sm text-slate-500">

                                    {card.title}

                                </p>

                                <h2
                                    className={`mt-2 text-3xl font-bold ${card.textColor}`}
                                >

                                    {card.value}

                                </h2>

                            </div>

                            <div
                                className={`
                                    ${card.bg}
                                    rounded-xl
                                    p-3
                                `}
                            >

                                <Icon
                                    size={28}
                                    className={card.iconColor}
                                />

                            </div>

                        </div>

                    </div>

                );

            })}

        </div>

    );

}