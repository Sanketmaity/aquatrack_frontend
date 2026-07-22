import { Link } from "react-router-dom";
import { Home, Users } from "lucide-react";

export default function ManagerOverview({

    summary,

}) {

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

            <div className="flex items-center justify-between">

                <div>

                    <h2 className="text-xl font-bold">

                        Manager Overview

                    </h2>

                    <p className="mt-1 text-slate-500">

                        Summary of your assigned households and residents

                    </p>

                </div>

                <Home
                    size={32}
                    className="text-blue-600"
                />

            </div>

            <div className="mt-8 grid grid-cols-2 gap-4">

                <div className="rounded-xl bg-slate-50 p-4">

                    <p className="text-sm text-slate-500">

                        Total Households

                    </p>

                    <h3 className="mt-2 text-3xl font-bold">

                        {summary?.totalHouseholds ?? 0}

                    </h3>

                </div>

                <div className="rounded-xl bg-blue-50 p-4">

                    <p className="text-sm text-blue-700">

                        Total Residents

                    </p>

                    <h3 className="mt-2 text-3xl font-bold text-blue-700">

                        {summary?.totalResidents ?? 0}

                    </h3>

                </div>

            </div>

            <div className="mt-6 flex gap-4">

                <Link
                    to="/manager/households"
                    className="
                        inline-flex
                        items-center
                        gap-2
                        rounded-lg
                        bg-blue-600
                        px-5
                        py-3
                        text-white
                        hover:bg-blue-700
                    "
                >

                    <Home size={18} />

                    Households

                </Link>

                <Link
                    to="/manager/residents"
                    className="
                        inline-flex
                        items-center
                        gap-2
                        rounded-lg
                        bg-green-600
                        px-5
                        py-3
                        text-white
                        hover:bg-green-700
                    "
                >

                    <Users size={18} />

                    Residents

                </Link>

            </div>

        </div>

    );

}