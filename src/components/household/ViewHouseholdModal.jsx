import { X } from "lucide-react";

export default function ViewHouseholdModal({

    open,
    household,
    onClose

}) {

    if (!open || !household) return null;

    const Row = ({ label, value }) => (

        <div className="grid grid-cols-2 gap-4 border-b py-3">

            <span className="font-medium text-gray-600">

                {label}

            </span>

            <span className="text-gray-900">

                {value || "-"}

            </span>

        </div>

    );

    return (

        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">

            <div className="w-full max-w-xl rounded-2xl bg-white shadow-xl">

                {/* Header */}

                <div className="flex items-center justify-between border-b px-6 py-4">

                    <h2 className="text-xl font-semibold">

                        Household Details

                    </h2>

                    <button
                        onClick={onClose}
                        className="rounded-lg p-2 hover:bg-gray-100"
                    >
                        <X size={20} />
                    </button>

                </div>

                {/* Body */}

                <div className="space-y-1 p-6">

                    <Row
                        label="House Number"
                        value={household.houseNumber}
                    />

                    <Row
                        label="Meter Number"
                        value={household.meterNumber}
                    />

                    <Row
                        label="Apartment"
                        value={household.apartmentName}
                    />

                    <Row
                        label="Building"
                        value={household.buildingName}
                    />

                    <Row
                        label="Floor"
                        value={household.floorName}
                    />

                    <Row
                        label="Residents"
                        value={household.totalResidents}
                    />

                    <Row
                        label="Status"
                        value={household.status}
                    />

                    <Row
                        label="Created By"
                        value={household.createdBy}
                    />

                    <Row
                        label="Created At"
                        value={household.createdAt}
                    />

                    <Row
                        label="Last Updated By"
                        value={household.updatedBy}
                    />

                    <Row
                        label="Last Updated At"
                        value={household.updatedAt}
                    />

                </div>

                {/* Footer */}

                <div className="flex justify-end border-t px-6 py-4">

                    <button
                        onClick={onClose}
                        className="rounded-lg bg-blue-600 px-5 py-2 text-white hover:bg-blue-700"
                    >
                        Close
                    </button>

                </div>

            </div>

        </div>

    );

}