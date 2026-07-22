import {
    MoreVertical,
    Mail,
    Phone,
    Building2,
} from "lucide-react";

export default function ManagerTable({

    managers = [],

    loading = false,

}) {

    // ==========================================
    // Loading
    // ==========================================

    if (loading) {

        return (

            <div className="rounded-2xl border border-slate-200 bg-white p-12 text-center shadow-sm">

                <p className="text-slate-500">

                    Loading managers...

                </p>

            </div>

        );

    }

    // ==========================================
    // Empty State
    // ==========================================

    if (managers.length === 0) {

        return (

            <div className="rounded-2xl border border-slate-200 bg-white p-12 text-center shadow-sm">

                <Building2
                    size={52}
                    className="mx-auto text-slate-300"
                />

                <h3 className="mt-5 text-xl font-semibold text-slate-800">

                    No Managers Found

                </h3>

                <p className="mt-2 text-sm text-slate-500">

                    Invite your first manager to manage buildings,
                    residents and water operations.

                </p>

            </div>

        );

    }

    // ==========================================
    // UI
    // ==========================================

    return (

        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">

            <table className="min-w-full">

                <thead className="bg-slate-50">

                    <tr>

                        <th className="px-6 py-4 text-left text-sm font-semibold text-slate-600">

                            Manager

                        </th>

                        <th className="px-6 py-4 text-left text-sm font-semibold text-slate-600">

                            Contact

                        </th>

                        <th className="px-6 py-4 text-left text-sm font-semibold text-slate-600">

                            Apartment

                        </th>

                        <th className="px-6 py-4 text-left text-sm font-semibold text-slate-600">

                            Buildings

                        </th>

                        <th className="px-6 py-4 text-left text-sm font-semibold text-slate-600">

                            Status

                        </th>

                        <th className="px-6 py-4 text-left text-sm font-semibold text-slate-600">

                            Invited On

                        </th>

                        <th className="px-6 py-4 text-right text-sm font-semibold text-slate-600">

                            Actions

                        </th>

                    </tr>

                </thead>

                <tbody>

                    {managers.map((manager) => (

                        <tr
                            key={manager.id}
                            className="border-t hover:bg-slate-50"
                        >

                            {/* Manager */}

                            <td className="px-6 py-5">

                                <div className="font-semibold text-slate-800">

                                    {manager.firstName} {manager.lastName}

                                </div>

                            </td>

                            {/* Contact */}

                            <td className="px-6 py-5">

                                <div className="space-y-2">

                                    <div className="flex items-center gap-2 text-sm text-slate-600">

                                        <Mail size={15} />

                                        {manager.email}

                                    </div>

                                    <div className="flex items-center gap-2 text-sm text-slate-600">

                                        <Phone size={15} />

                                        {manager.phone}

                                    </div>

                                </div>

                            </td>

                            {/* Apartment */}

                            <td className="px-6 py-5">

                                {manager.apartmentName}

                            </td>

                           {/* Buildings */}

<td className="px-6 py-5">

    <div className="flex flex-wrap gap-2">

        {manager.buildings?.map((building) => (

            <span
                key={building.id}
                className="rounded-lg bg-slate-100 px-2 py-1 text-xs font-medium text-slate-700"
            >

                {building.buildingName}

            </span>

        ))}

    </div>

</td>

                            {/* Status */}

                            <td className="px-6 py-5">

                                {manager.status === "PENDING" && (

                                    <span className="rounded-full bg-yellow-100 px-3 py-1 text-xs font-semibold text-yellow-700">

                                        Pending

                                    </span>

                                )}

                                {manager.status === "ACTIVATED" && (

                                    <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700">

                                        Active

                                    </span>

                                )}

                            </td>

                            {/* Invited On */}

                            <td className="px-6 py-5 text-sm text-slate-500">

                                {manager.createdAt
                                    ? new Date(manager.createdAt).toLocaleDateString()
                                    : "-"}

                            </td>

                            {/* Actions */}

                            <td className="px-6 py-5 text-right">

                                <button
                                    className="rounded-lg p-2 transition hover:bg-slate-100"
                                >

                                    <MoreVertical size={18} />

                                </button>

                            </td>

                        </tr>

                    ))}

                </tbody>

            </table>

        </div>

    );

}