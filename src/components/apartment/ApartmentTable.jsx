import {
    Eye,
    Pencil,
    Trash2,
} from "lucide-react";

export default function ApartmentTable({

    apartments,

    loading,

    onView,

    onEdit,

    onDelete,

}) {

    // ==========================================
    // Loading
    // ==========================================

    if (loading) {

        return (

            <div className="rounded-2xl bg-white p-8 shadow-sm">

                <p className="text-slate-500">

                    Loading apartments...

                </p>

            </div>

        );

    }

    // ==========================================
    // Empty State
    // ==========================================

    if (!apartments.length) {

        return (

            <div className="rounded-2xl bg-white p-12 text-center shadow-sm">

                <h3 className="text-lg font-semibold text-slate-700">

                    No Apartments Found

                </h3>

                <p className="mt-2 text-slate-500">

                    Create your first apartment to get started.

                </p>

            </div>

        );

    }

    // ==========================================
    // Table
    // ==========================================

    return (

        <div className="overflow-hidden rounded-2xl bg-white shadow-sm">

            <table className="min-w-full">

                <thead className="bg-slate-50">

                    <tr>

                        <th className="px-6 py-4 text-left text-sm font-semibold">

                            Apartment

                        </th>

                        <th className="px-6 py-4 text-left text-sm font-semibold">

                            City

                        </th>

                        <th className="px-6 py-4 text-left text-sm font-semibold">

                            State

                        </th>

                        <th className="px-6 py-4 text-center text-sm font-semibold">

                            Buildings

                        </th>

                        <th className="px-6 py-4 text-center text-sm font-semibold">

                            Actions

                        </th>

                    </tr>

                </thead>

                <tbody>

                    {apartments.map((apartment) => (

                        <tr
                            key={apartment.id}
                            className="border-t hover:bg-slate-50 transition-colors"
                        >

                            <td className="px-6 py-4">

                                <p className="font-medium text-slate-800">

                                    {apartment.apartmentName}

                                </p>

                            </td>

                            <td className="px-6 py-4 text-slate-600">

                                {apartment.city}

                            </td>

                            <td className="px-6 py-4 text-slate-600">

                                {apartment.state}

                            </td>

                            <td className="px-6 py-4 text-center font-semibold text-slate-800">

                                {apartment.totalBuildings}

                            </td>

                            <td className="px-6 py-4">

                                <div className="flex justify-center gap-3">

                                    <button
                                        onClick={() => onView(apartment)}
                                        className="rounded-lg p-2 text-blue-600 transition hover:bg-blue-50 hover:text-blue-700"
                                        title="View"
                                    >

                                        <Eye size={18} />

                                    </button>

                                    <button
                                        onClick={() => onEdit(apartment)}
                                        className="rounded-lg p-2 text-green-600 transition hover:bg-green-50 hover:text-green-700"
                                        title="Edit"
                                    >

                                        <Pencil size={18} />

                                    </button>

                                    <button
                                        onClick={() => onDelete(apartment)}
                                        className="rounded-lg p-2 text-red-600 transition hover:bg-red-50 hover:text-red-700"
                                        title="Delete"
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

    );

}