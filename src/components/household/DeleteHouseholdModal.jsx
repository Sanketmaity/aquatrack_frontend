import { Trash2, X } from "lucide-react";
import { useState } from "react";
import householdService from "../../services/householdService";

export default function DeleteHouseholdModal({

    open,
    household,
    onClose,
    onSuccess

}) {

    const [loading, setLoading] = useState(false);

    if (!open || !household) return null;

    const handleDelete = async () => {

        try {

            setLoading(true);

            await householdService.deleteHousehold(

                household.floorId,

                household.id

            );

            onSuccess();

            onClose();

        } catch (error) {

            console.error(error);

        } finally {

            setLoading(false);

        }

    };

    return (

        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">

            <div className="w-full max-w-md rounded-2xl bg-white shadow-xl">

                {/* Header */}

                <div className="flex items-center justify-between border-b px-6 py-4">

                    <div className="flex items-center gap-2">

                        <Trash2 className="text-red-600" size={22} />

                        <h2 className="text-lg font-semibold">

                            Delete Household

                        </h2>

                    </div>

                    <button
                        onClick={onClose}
                        className="rounded-lg p-2 hover:bg-gray-100"
                    >
                        <X size={18} />
                    </button>

                </div>

                {/* Body */}

                <div className="p-6">

                    <p className="text-gray-600">

                        Are you sure you want to delete
                        household

                        <span className="font-semibold">

                            {" "}{household.houseNumber}

                        </span>

                        ?

                    </p>

                    <p className="mt-2 text-sm text-red-500">

                        This action cannot be undone.

                    </p>

                </div>

                {/* Footer */}

                <div className="flex justify-end gap-3 border-t px-6 py-4">

                    <button
                        onClick={onClose}
                        className="rounded-lg border px-5 py-2 hover:bg-gray-50"
                    >
                        Cancel
                    </button>

                    <button

                        onClick={handleDelete}

                        disabled={loading}

                        className="rounded-lg bg-red-600 px-5 py-2 text-white hover:bg-red-700 disabled:opacity-50"

                    >

                        {loading

                            ? "Deleting..."

                            : "Delete"}

                    </button>

                </div>

            </div>

        </div>

    );

}