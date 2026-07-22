import { Link } from "react-router-dom";
import { Home, Users } from "lucide-react";

export default function DashboardQuickActions() {

    const actions = [

        {
            title: "Manage Households",
            description: "View all assigned households",
            icon: Home,
            path: "/manager/households",
            color: "bg-blue-600 hover:bg-blue-700",
        },

        {
            title: "Manage Residents",
            description: "View and invite residents",
            icon: Users,
            path: "/manager/residents",
            color: "bg-green-600 hover:bg-green-700",
        },

    ];

    return (

        <div
            className="
                rounded-2xl
                border
                border-slate-200
                bg-white
                p-6
                shadow-sm
            "
        >

            <h2 className="text-xl font-bold">

                Quick Actions

            </h2>

            <p className="mt-1 text-slate-500">

                Frequently used manager operations.

            </p>

            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">

                {actions.map((action) => {

                    const Icon = action.icon;

                    return (

                        <Link
                            key={action.title}
                            to={action.path}
                            className={`
                                ${action.color}
                                rounded-xl
                                p-5
                                text-white
                                transition
                            `}
                        >

                            <Icon size={28} />

                            <h3 className="mt-4 text-lg font-semibold">

                                {action.title}

                            </h3>

                            <p className="mt-1 text-sm text-white/80">

                                {action.description}

                            </p>

                        </Link>

                    );

                })}

            </div>

        </div>

    );

}