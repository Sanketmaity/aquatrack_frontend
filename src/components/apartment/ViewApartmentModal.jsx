import { useEffect, useState } from "react";
import { X, Building2, MapPin, Home } from "lucide-react";

import { getApartmentById } from "../../services/apartmentService";

export default function ViewApartmentModal({

    open,

    apartmentId,

    onClose,

}) {

    // ==========================================
    // State
    // ==========================================

    const [apartment, setApartment] = useState(null);

    const [loading, setLoading] = useState(false);

    const [error, setError] = useState("");

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

            setError("");

            const response =
                await getApartmentById(apartmentId);

            setApartment(response.data);

        }

        catch (error) {

            console.error(error);

            setError(

                error.response?.data?.message ||

                "Failed to load apartment."

            );

        }

        finally {

            setLoading(false);

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
                    shadow-2xl
                "
            >

                {/* ====================================== */}
                {/* Header */}
                {/* ====================================== */}

                <div
                    className="
                        flex
                        items-center
                        justify-between
                        border-b
                        p-6
                    "
                >

                    <div>

                        <h2 className="text-2xl font-bold">

                            Apartment Details

                        </h2>

                        <p className="mt-1 text-slate-500">

                            View apartment information

                        </p>

                    </div>

                    <button
                        onClick={onClose}
                        className="rounded-lg p-2 hover:bg-slate-100"
                    >

                        <X size={22} />

                    </button>

                </div>

                {/* ====================================== */}
                {/* Body */}
                {/* ====================================== */}

                <div className="p-8">

                    {loading && (

                        <p>

                            Loading...

                        </p>

                    )}

                    {error && (

                        <p className="text-red-600">

                            {error}

                        </p>

                    )}

                    {!loading && apartment && (

                        <div className="grid gap-6 md:grid-cols-2">

                            <InfoCard
                                icon={Building2}
                                title="Apartment Name"
                                value={apartment.apartmentName}
                            />

                            <InfoCard
                                icon={Home}
                                title="Total Buildings"
                                value={apartment.totalBuildings}
                            />

                            <InfoCard
                                icon={MapPin}
                                title="City"
                                value={apartment.city}
                            />

                            <InfoCard
                                icon={MapPin}
                                title="State"
                                value={apartment.state}
                            />

                            <InfoCard
                                icon={MapPin}
                                title="Pincode"
                                value={apartment.pincode}
                            />

                            <InfoCard
                                icon={MapPin}
                                title="Address Line 1"
                                value={apartment.addressLine1}
                            />

                            <InfoCard
                                icon={MapPin}
                                title="Address Line 2"
                                value={

                                    apartment.addressLine2 ||

                                    "-"

                                }
                            />

                        </div>

                    )}

                </div>

                {/* ====================================== */}
                {/* Footer */}
                {/* ====================================== */}

                <div
                    className="
                        flex
                        justify-end
                        border-t
                        p-6
                    "
                >

                    <button
                        onClick={onClose}
                        className="
                            rounded-xl
                            bg-slate-900
                            px-6
                            py-3
                            text-white
                        "
                    >

                        Close

                    </button>

                </div>

            </div>

        </div>

    );

}

// ==========================================
// Info Card
// ==========================================

function InfoCard({

    icon: Icon,

    title,

    value,

}) {

    return (

        <div
            className="
                rounded-xl
                border
                border-slate-200
                p-5
            "
        >

            <div className="flex items-center gap-3">

                <Icon
                    size={20}
                    className="text-blue-600"
                />

                <span className="text-sm text-slate-500">

                    {title}

                </span>

            </div>

            <p className="mt-3 text-lg font-semibold">

                {value}

            </p>

        </div>

    );

}