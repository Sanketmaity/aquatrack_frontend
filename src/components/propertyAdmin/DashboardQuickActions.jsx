import { useNavigate } from "react-router-dom";

import {
    Plus,
    Building2,
    Building,
    UserCog,
} from "lucide-react";

export default function DashboardQuickActions() {

    const navigate = useNavigate();

    const actions = [

        {
            title: "Create Apartment",
            description: "Register a new apartment community",
            icon: Building2,
            color: "bg-blue-500",
            onClick: () => navigate("/property/apartments/create"),
        },

        {
            title: "Create Building",
            description: "Add a building to an apartment",
            icon: Building,
            color: "bg-green-500",
            onClick: () => navigate("/property/buildings/create"),
        },

        {
            title: "Invite Manager",
            description: "Create and invite a property manager",
            icon: UserCog,
            color: "bg-purple-500",
            onClick: () => navigate("/property/managers/create"),
        },

    ];

    return (

        <div className="rounded-2xl bg-white p-6 shadow-sm">

            <div className="mb-6">

                <h2 className="text-xl font-semibold text-slate-800">

                    Quick Actions

                </h2>

                <p className="mt-1 text-sm text-slate-500">

                    Frequently used actions for Property Admin.

                </p>

            </div>

            <div className="grid gap-5 md:grid-cols-3">

                {actions.map((action) => {

                    const Icon = action.icon;

                    return (

                        <button
                            key={action.title}
                            onClick={action.onClick}
                            className="
                                rounded-xl
                                border
                                border-slate-200
                                p-5
                                text-left
                                transition-all
                                hover:border-blue-300
                                hover:shadow-lg
                            "
                        >

                            <div
                                className={`
                                    ${action.color}
                                    mb-4
                                    flex
                                    h-12
                                    w-12
                                    items-center
                                    justify-center
                                    rounded-xl
                                    text-white
                                `}
                            >

                                <Icon size={22} />

                            </div>

                            <h3 className="font-semibold text-slate-800">

                                {action.title}

                            </h3>

                            <p className="mt-2 text-sm text-slate-500">

                                {action.description}

                            </p>

                            <div className="mt-4 flex items-center text-blue-600">

                                <Plus size={16} />

                                <span className="ml-2 text-sm font-medium">

                                    Open

                                </span>

                            </div>

                        </button>

                    );

                })}

            </div>

        </div>

    );

}