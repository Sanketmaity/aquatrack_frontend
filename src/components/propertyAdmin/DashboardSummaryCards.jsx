import {
    Building2,
    Building,
    Home,
    UserCog,
    Users,
} from "lucide-react";

import StatCard from "../dashboard/StatCard";

export default function DashboardSummaryCards({ summary }) {

    if (!summary) return null;

    return (

        <div
            className="
                grid
                gap-6
                sm:grid-cols-2
                xl:grid-cols-5
            "
        >

            <StatCard
                title="Apartments"
                value={summary.totalApartments}
                icon={Building2}
                color="blue"
            />

            <StatCard
                title="Buildings"
                value={summary.totalBuildings}
                icon={Building}
                color="green"
            />

            <StatCard
                title="Households"
                value={summary.totalHouseholds}
                icon={Home}
                color="yellow"
            />

            <StatCard
                title="Managers"
                value={summary.totalManagers}
                icon={UserCog}
                color="purple"
            />

            <StatCard
                title="Residents"
                value={summary.totalResidents}
                icon={Users}
                color="red"
            />

        </div>

    );

}