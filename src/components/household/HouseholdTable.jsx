import {
    Eye,
    Pencil,
    Trash2
} from "lucide-react";

export default function HouseholdTable({

    households,
    loading,

    onView,
    onEdit,
    onDelete

}) {

    // ==========================================
    // Loading
    // ==========================================

    if (loading) {

        return (

            <div className="rounded-xl border bg-white p-10 text-center">

                <p className="text-gray-500">
                    Loading households...
                </p>

            </div>

        );

    }

    // ==========================================
    // Table
    // ==========================================

    return (

        <div className="overflow-hidden rounded-xl border bg-white shadow-sm">

            <div className="overflow-x-auto">

                <table className="min-w-full">

                    <thead className="bg-gray-50">

                        <tr className="text-left">

                            <th className="px-6 py-4 text-sm font-semibold text-gray-700">
                                House No
                            </th>

                            <th className="px-6 py-4 text-sm font-semibold text-gray-700">
                                Meter No
                            </th>

                            <th className="px-6 py-4 text-sm font-semibold text-gray-700">
                                Apartment
                            </th>

                            <th className="px-6 py-4 text-sm font-semibold text-gray-700">
                                Building
                            </th>

                            <th className="px-6 py-4 text-sm font-semibold text-gray-700">
                                Floor
                            </th>

                            <th className="px-6 py-4 text-sm font-semibold text-gray-700">
                                Residents
                            </th>

                            <th className="px-6 py-4 text-sm font-semibold text-gray-700">
                                Status
                            </th>

                            <th className="px-6 py-4 text-center text-sm font-semibold text-gray-700">
                                Actions
                            </th>

                        </tr>

                    </thead>

                    <tbody>

                        {households.map((household) => (

                            <tr
                                key={household.id}
                                className="border-t hover:bg-gray-50 transition"
                            >

                                <td className="px-6 py-4 font-medium text-gray-900">
                                    {household.houseNumber}
                                </td>

                                <td className="px-6 py-4 text-gray-600">
                                    {household.meterNumber}
                                </td>

                                <td className="px-6 py-4 text-gray-600">
                                    {household.apartmentName}
                                </td>

                                <td className="px-6 py-4 text-gray-600">
                                    {household.buildingName}
                                </td>

                                <td className="px-6 py-4 text-gray-600">
                                    {household.floorName}
                                </td>

                                <td className="px-6 py-4 text-center text-gray-600">
                                    {household.totalResidents}
                                </td>

                                <td className="px-6 py-4">

                                    <span
                                        className={`
                                            inline-flex
                                            rounded-full
                                            px-3
                                            py-1
                                            text-xs
                                            font-semibold
                                            ${
                                                household.status === "ACTIVE"
                                                    ? "bg-green-100 text-green-700"
                                                    : "bg-red-100 text-red-700"
                                            }
                                        `}
                                    >
                                        {household.status}
                                    </span>

                                </td>

                                <td className="px-6 py-4">

                                    <div className="flex justify-center gap-2">

                                        <button
                                            onClick={() => onView(household)}
                                            className="rounded-lg p-2 text-blue-600 hover:bg-blue-50"
                                        >
                                            <Eye size={18} />
                                        </button>

                                        <button
                                            onClick={() => onEdit(household)}
                                            className="rounded-lg p-2 text-amber-600 hover:bg-amber-50"
                                        >
                                            <Pencil size={18} />
                                        </button>

                                        <button
                                            onClick={() => onDelete(household)}
                                            className="rounded-lg p-2 text-red-600 hover:bg-red-50"
                                        >
                                            <Trash2 size={18} />
                                        </button>

                                    </div>

                                </td>

                            </tr>

                        ))}

                    </tbody>

                </table>

            </div>

        </div>

    );

}