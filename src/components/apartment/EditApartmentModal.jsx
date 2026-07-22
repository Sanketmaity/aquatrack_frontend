import { useEffect, useState } from "react";

import {
    getApartmentById,
    updateApartment,
} from "../../services/apartmentService";

export default function EditApartmentModal({

    open,

    apartmentId,

    onClose,

    onSuccess,

}) {

    // ==========================================
    // State
    // ==========================================

    const [loading, setLoading] = useState(false);

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
    // Load Apartment
    // ==========================================

    useEffect(() => {

        if (open && apartmentId) {

            loadApartment();

        }

    }, [open, apartmentId]);

    // ==========================================
    // Fetch Apartment
    // ==========================================

    async function loadApartment() {

        try {

            setLoading(true);

            const response =
                await getApartmentById(apartmentId);

            const apartment = response.data;

            setFormData({

                apartmentName:
                    apartment.apartmentName,

                addressLine1:
                    apartment.addressLine1,

                addressLine2:
                    apartment.addressLine2 || "",

                city:
                    apartment.city,

                state:
                    apartment.state,

                pincode:
                    apartment.pincode,

                totalHouseholds:
                    apartment.totalHouseholds,

            });

        }

        catch (error) {

            console.error(error);

        }

        finally {

            setLoading(false);

        }

    }

    // ==========================================
    // Handle Change
    // ==========================================

    function handleChange(event) {

        const { name, value } = event.target;

        setFormData(previous => ({

            ...previous,

            [name]: value,

        }));

    }

    // ==========================================
    // Submit
    // ==========================================

    async function handleSubmit(event) {

        event.preventDefault();

        try {

            await updateApartment(

                apartmentId,

                {

                    apartmentName:
                        formData.apartmentName,

                    addressLine1:
                        formData.addressLine1,

                    addressLine2:
                        formData.addressLine2,

                    city:
                        formData.city,

                    state:
                        formData.state,

                    pincode:
                        formData.pincode,

                    totalHouseholds:
                        Number(
                            formData.totalHouseholds
                        ),

                }

            );

            onSuccess();

            onClose();

        }

        catch (error) {

            console.error(error);

            alert(

                error.response?.data?.message ||

                "Failed to update apartment."

            );

        }

    }

    if (!open) return null;

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

                    <h2 className="text-2xl font-bold">

                        Edit Apartment

                    </h2>

                    <button
                        onClick={onClose}
                        className="text-2xl"
                    >

                        ×

                    </button>

                </div>

                {loading ? (

                    <div className="py-16 text-center">

                        Loading...

                    </div>

                ) : (

                    <form
                        onSubmit={handleSubmit}
                        className="mt-8 space-y-6"
                    >

                        <div className="grid gap-6 md:grid-cols-2">

                            <div>

                                <label className="mb-2 block">

                                    Apartment Name

                                </label>

                                <input
                                    type="text"
                                    name="apartmentName"
                                    value={formData.apartmentName}
                                    onChange={handleChange}
                                    className="w-full rounded-xl border p-3"
                                />

                            </div>

                            <div>

                                <label className="mb-2 block">

                                    Total Households

                                </label>

                                <input
                                    type="number"
                                    name="totalHouseholds"
                                    value={formData.totalHouseholds}
                                    onChange={handleChange}
                                    className="w-full rounded-xl border p-3"
                                />

                            </div>

                        </div>

                        <div>

                            <label className="mb-2 block">

                                Address Line 1

                            </label>

                            <input
                                type="text"
                                name="addressLine1"
                                value={formData.addressLine1}
                                onChange={handleChange}
                                className="w-full rounded-xl border p-3"
                            />

                        </div>

                        <div>

                            <label className="mb-2 block">

                                Address Line 2

                            </label>

                            <input
                                type="text"
                                name="addressLine2"
                                value={formData.addressLine2}
                                onChange={handleChange}
                                className="w-full rounded-xl border p-3"
                            />

                        </div>

                        <div className="grid gap-6 md:grid-cols-3">

                            <div>

                                <label className="mb-2 block">

                                    City

                                </label>

                                <input
                                    type="text"
                                    name="city"
                                    value={formData.city}
                                    onChange={handleChange}
                                    className="w-full rounded-xl border p-3"
                                />

                            </div>

                            <div>

                                <label className="mb-2 block">

                                    State

                                </label>

                                <input
                                    type="text"
                                    name="state"
                                    value={formData.state}
                                    onChange={handleChange}
                                    className="w-full rounded-xl border p-3"
                                />

                            </div>

                            <div>

                                <label className="mb-2 block">

                                    Pincode

                                </label>

                                <input
                                    type="text"
                                    name="pincode"
                                    value={formData.pincode}
                                    onChange={handleChange}
                                    className="w-full rounded-xl border p-3"
                                />

                            </div>

                        </div>

                        <div className="flex justify-end gap-4 pt-6">

                            <button
                                type="button"
                                onClick={onClose}
                                className="rounded-xl border px-6 py-3"
                            >

                                Cancel

                            </button>

                            <button
                                type="submit"
                                className="
                                    rounded-xl
                                    bg-blue-600
                                    px-6
                                    py-3
                                    text-white
                                    hover:bg-blue-700
                                "
                            >

                                Update Apartment

                            </button>

                        </div>

                    </form>

                )}

            </div>

        </div>

    );

}