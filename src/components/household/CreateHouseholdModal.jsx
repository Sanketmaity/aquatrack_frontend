import { useState } from "react";
import { X } from "lucide-react";

import HouseholdForm from "./HouseholdForm";
import householdService from "../../services/householdService";

export default function CreateHouseholdModal({

    open,
    onClose,
    onSuccess

}) {

    const initialState = {

        buildingId: "",
        floorId: "",

        houseNumber: "",
        meterNumber: "",

        status: "ACTIVE"

    };

    const [formData, setFormData] =
        useState(initialState);

    const [errors, setErrors] =
        useState({});

    const [loading, setLoading] =
        useState(false);

    if (!open) return null;

    // ==========================
    // Validation
    // ==========================

    const validate = () => {

        const newErrors = {};

        if (!formData.buildingId)
            newErrors.buildingId = "Building is required.";

        if (!formData.floorId)
            newErrors.floorId = "Floor is required.";

        if (!formData.houseNumber.trim())
            newErrors.houseNumber = "House Number is required.";

        if (!formData.meterNumber.trim())
            newErrors.meterNumber = "Meter Number is required.";

        setErrors(newErrors);

        return Object.keys(newErrors).length === 0;

    };

    // ==========================
    // Submit
    // ==========================

    const handleSubmit = async () => {

        if (!validate()) return;

        try {

            setLoading(true);

            await householdService.createHousehold(

                formData.floorId,

                {

                    houseNumber: formData.houseNumber,

                    meterNumber: formData.meterNumber,

                    status: formData.status

                }

            );

            setFormData(initialState);

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

            <div className="w-full max-w-2xl rounded-2xl bg-white shadow-xl">

                {/* Header */}

                <div className="flex items-center justify-between border-b px-6 py-4">

                    <h2 className="text-xl font-semibold">

                        Create Household

                    </h2>

                    <button
                        onClick={onClose}
                        className="rounded-lg p-2 hover:bg-gray-100"
                    >
                        <X size={20}/>
                    </button>

                </div>

                {/* Body */}

                <div className="p-6">

                    <HouseholdForm

                        formData={formData}

                        setFormData={setFormData}

                        errors={errors}

                    />

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

                        onClick={handleSubmit}

                        disabled={loading}

                        className="rounded-lg bg-blue-600 px-5 py-2 text-white hover:bg-blue-700 disabled:opacity-50"

                    >

                        {loading

                            ? "Creating..."

                            : "Create Household"}

                    </button>

                </div>

            </div>

        </div>

    );

}