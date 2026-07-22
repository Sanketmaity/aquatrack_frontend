import { useState } from "react";
import { createApartment } from "../../services/apartmentService";

export default function CreateApartmentModal({

    open,

    onClose,

    onSuccess,

}) {

    // ==========================================
    // State
    // ==========================================

    const [formData, setFormData] = useState({

        apartmentName: "",
        addressLine1: "",
        addressLine2: "",
        city: "",
        state: "",
        pincode: "",
        totalHouseholds: "",

    });

    // ==========================================
    // Handle Input Change
    // ==========================================

    function handleChange(event) {

        const { name, value } = event.target;

        setFormData((previous) => ({

            ...previous,

            [name]: value,

        }));

    }

    // ==========================================
    // Submit Form
    // ==========================================

    async function handleSubmit(event) {

        event.preventDefault();

        try {

            await createApartment({

                apartmentName: formData.apartmentName,
                addressLine1: formData.addressLine1,
                addressLine2: formData.addressLine2,
                city: formData.city,
                state: formData.state,
                pincode: formData.pincode,
                totalHouseholds: Number(formData.totalHouseholds),

            });

            setFormData({

                apartmentName: "",
                addressLine1: "",
                addressLine2: "",
                city: "",
                state: "",
                pincode: "",
                totalHouseholds: "",

            });

            if (onSuccess) {

                onSuccess();

            }

            onClose();

        } catch (error) {

            console.error(error);

            alert(

                error.response?.data?.message ||

                "Failed to create apartment."

            );

        }

    }

    // ==========================================
    // Close Modal
    // ==========================================

    if (!open) return null;

    // ==========================================
    // UI
    // ==========================================

    return (

        <div
            className="
                fixed
                inset-0
                z-50
                flex
                items-center
                justify-center
                bg-black/40
            "
        >

            <div
                className="
                    w-full
                    max-w-3xl
                    rounded-2xl
                    bg-white
                    p-8
                    shadow-2xl
                "
            >

                <div className="flex items-center justify-between">

                    <h2 className="text-2xl font-bold text-slate-800">

                        Create Apartment

                    </h2>

                    <button
                        onClick={onClose}
                        className="text-2xl text-slate-500"
                    >
                        ×
                    </button>

                </div>

                <p className="mt-2 text-slate-500">

                    Register a new apartment community.

                </p>

                <form
                    onSubmit={handleSubmit}
                    className="mt-8 space-y-6"
                >

                    <div className="grid gap-6 md:grid-cols-2">

                        <div>

                            <label className="mb-2 block font-medium">

                                Apartment Name

                            </label>

                            <input
                                type="text"
                                name="apartmentName"
                                value={formData.apartmentName}
                                onChange={handleChange}
                                className="w-full rounded-xl border border-slate-300 p-3"
                                required
                            />

                        </div>


                    </div>

                    <div>

                        <label className="mb-2 block font-medium">

                            Address Line 1

                        </label>

                        <input
                            type="text"
                            name="addressLine1"
                            value={formData.addressLine1}
                            onChange={handleChange}
                            className="w-full rounded-xl border border-slate-300 p-3"
                            required
                        />

                    </div>

                    <div>

                        <label className="mb-2 block font-medium">

                            Address Line 2

                        </label>

                        <input
                            type="text"
                            name="addressLine2"
                            value={formData.addressLine2}
                            onChange={handleChange}
                            className="w-full rounded-xl border border-slate-300 p-3"
                        />

                    </div>

                    <div className="grid gap-6 md:grid-cols-3">

                        <div>

                            <label className="mb-2 block font-medium">

                                City

                            </label>

                            <input
                                type="text"
                                name="city"
                                value={formData.city}
                                onChange={handleChange}
                                className="w-full rounded-xl border border-slate-300 p-3"
                                required
                            />

                        </div>

                        <div>

                            <label className="mb-2 block font-medium">

                                State

                            </label>

                            <input
                                type="text"
                                name="state"
                                value={formData.state}
                                onChange={handleChange}
                                className="w-full rounded-xl border border-slate-300 p-3"
                                required
                            />

                        </div>

                        <div>

                            <label className="mb-2 block font-medium">

                                Pincode

                            </label>

                            <input
                                type="text"
                                name="pincode"
                                value={formData.pincode}
                                onChange={handleChange}
                                className="w-full rounded-xl border border-slate-300 p-3"
                                required
                            />

                        </div>

                    </div>

                    <div className="flex justify-end gap-4 pt-6">

                        <button
                            type="button"
                            onClick={onClose}
                            className="rounded-xl border border-slate-300 px-6 py-3"
                        >

                            Cancel

                        </button>

                        <button
                            type="submit"
                            className="rounded-xl bg-blue-600 px-6 py-3 text-white hover:bg-blue-700"
                        >

                            Create Apartment

                        </button>

                    </div>

                </form>

            </div>

        </div>

    );

}