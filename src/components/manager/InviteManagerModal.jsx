import { useEffect, useState } from "react";
import { X } from "lucide-react";

import { getApartments } from "../../services/apartmentService";
import { getBuildings } from "../../services/buildingService";

import { createManagerInvitation } from "../../services/managerInvitationService";

export default function InviteManagerModal({ onClose }) {

    // ==========================================
    // Form State
    // ==========================================

    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        apartmentId: "",
        buildingIds: []
    });

    // ==========================================
    // Master Data
    // ==========================================

    const [apartments, setApartments] = useState([]);
    const [buildings, setBuildings] = useState([]);

    // ==========================================
    // Loading State
    // ==========================================

    const [loadingApartments, setLoadingApartments] = useState(true);
    const [loadingBuildings, setLoadingBuildings] = useState(false);

    // ==========================================
    // Load Apartments
    // ==========================================

    useEffect(() => {
        loadApartments();
    }, []);

    async function loadApartments() {

    try {

        setLoadingApartments(true);

        const response = await getApartments();

        setApartments(response.data || []);

    } catch (error) {

        console.error("Failed to load apartments", error);

    } finally {

        setLoadingApartments(false);

    }

}

    // ==========================================
    // Load Buildings
    // ==========================================

    useEffect(() => {

        if (!formData.apartmentId) {

            setBuildings([]);

            return;

        }

        loadBuildings(formData.apartmentId);

    }, [formData.apartmentId]);

    async function loadBuildings(apartmentId) {

    try {

        setLoadingBuildings(true);

        const response = await getBuildings(apartmentId);

        setBuildings(response.data || []);

    } catch (error) {

        console.error("Failed to load buildings", error);

        setBuildings([]);

    } finally {

        setLoadingBuildings(false);

    }

}

    // ==========================================
    // Input Change
    // ==========================================

    function handleChange(event) {

        const { name, value } = event.target;

        if (name === "apartmentId") {

            setFormData(prev => ({
                ...prev,
                apartmentId: value,
                buildingIds: []
            }));

            return;

        }

        setFormData(prev => ({
            ...prev,
            [name]: value
        }));

    }

    // ==========================================
    // Building Selection
    // ==========================================

    function handleBuildingChange(buildingId) {

        setFormData(prev => {

            const selected = prev.buildingIds.includes(buildingId);

            return {

                ...prev,

                buildingIds: selected
                    ? prev.buildingIds.filter(id => id !== buildingId)
                    : [...prev.buildingIds, buildingId]

            };

        });

    }

    // ==========================================
    // Submit
    // ==========================================

    async function handleSubmit(event) {

    event.preventDefault();

    try {

        const response = await createManagerInvitation(formData);

        console.log(response);

        console.log("Manager invitation sent successfully.");

        onClose();

    } catch (error) {

        console.error(error);

        alert(
            error.response?.data?.message ||
            "Failed to send invitation."
        );

    }

}

const isFormValid =
    formData.firstName.trim() &&
    formData.email.trim() &&
    formData.phone.trim() &&
    formData.apartmentId &&
    formData.buildingIds.length > 0;

    // ==========================================
    // UI
    // ==========================================

  

    return (

        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">

            <div className="w-full max-w-3xl rounded-2xl bg-white shadow-2xl">

                {/* Header */}

                <div className="flex items-center justify-between border-b px-6 py-5">

                    <h2 className="text-xl font-semibold">
                        Invite Manager
                    </h2>

                    <button
                        onClick={onClose}
                        className="rounded-lg p-2 hover:bg-slate-100"
                    >
                        <X size={20} />
                    </button>

                </div>

                {/* Form */}

                <form
                    onSubmit={handleSubmit}
                    className="space-y-6 p-6"
                >

                    {/* Full Name */}
<div className="grid grid-cols-1 gap-6 md:grid-cols-2">
    <div>
    <label className="mb-2 block text-sm font-medium">
        First Name
    </label>

    <input
        type="text"
        name="firstName"
        value={formData.firstName}
        onChange={handleChange}
        placeholder="Enter first name"
        className="w-full rounded-lg border border-slate-300 px-4 py-3"
    />
</div>
<div>
    <label className="mb-2 block text-sm font-medium">
        Last Name
    </label>

    <input
        type="text"
        name="lastName"
        value={formData.lastName}
        onChange={handleChange}
        placeholder="Enter last name"
        className="w-full rounded-lg border border-slate-300 px-4 py-3"
    />
</div>
</div>
                   

                    {/* Email */}

                    <div>

                        <label className="mb-2 block text-sm font-medium">
                            Email Address
                        </label>

                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="Enter email"
                            className="w-full rounded-lg border px-4 py-3"
                        />

                    </div>

                    {/* Phone */}

                    <div>

                        <label className="mb-2 block text-sm font-medium">
                            Phone Number
                        </label>

                        <input
                            type="text"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            placeholder="Enter phone number"
                            className="w-full rounded-lg border px-4 py-3"
                        />

                    </div>

                    {/* ======================================
    Apartment
====================================== */}

                    <div>

                        <label className="mb-2 block text-sm font-medium">
                            Apartment
                        </label>

                        <select
                            name="apartmentId"
                            value={formData.apartmentId}
                            onChange={handleChange}
                            className="w-full rounded-lg border border-slate-300 px-4 py-3 focus:border-blue-500 focus:outline-none"
                        >

                            <option value="">
                                {loadingApartments
                                    ? "Loading Apartments..."
                                    : "Select Apartment"}
                            </option>

                            {apartments.map((apartment) => (

                                <option
                                    key={apartment.id}
                                    value={apartment.id}
                                >
                                    {apartment.apartmentName}
                                </option>

                            ))}

                        </select>

                    </div>

                    {/* ======================================
    Buildings
====================================== */}

                    {formData.apartmentId && (

                        <div>

                            <label className="mb-3 block text-sm font-medium">
                                Assign Buildings
                            </label>

                            <div className="rounded-xl border border-slate-200 p-4">

                                {loadingBuildings ? (

                                    <p className="text-sm text-slate-500">
                                        Loading buildings...
                                    </p>

                                ) : buildings.length === 0 ? (

                                    <p className="text-sm text-slate-500">
                                        No buildings available.
                                    </p>

                                ) : (

                                    <div className="grid grid-cols-1 gap-3 md:grid-cols-2">

                                        {buildings.map((building) => (

                                            <label
                                                key={building.id}
                                                className="flex items-center gap-3 rounded-lg border border-slate-200 p-3 transition hover:bg-slate-50"
                                            >

                                                <input
                                                    type="checkbox"
                                                    checked={formData.buildingIds.includes(building.id)}
                                                    onChange={() => handleBuildingChange(building.id)}
                                                    className="h-4 w-4"
                                                />

                                                <span className="text-sm font-medium text-slate-700">
                                                    {building.buildingName}
                                                </span>

                                            </label>

                                        ))}

                                    </div>

                                )}

                            </div>

                        </div>

                    )}

                    <div className="flex justify-end gap-3 border-t pt-6">

                        <button
        type="button"
        onClick={onClose}
        className="rounded-lg border border-slate-300 px-5 py-3 font-medium hover:bg-slate-100"
    >
        Cancel
    </button>

                        <button
    type="submit"
    disabled={!isFormValid}
    className={`rounded-lg px-6 py-3 font-medium text-white transition
        ${
            isFormValid
                ? "bg-sky-600 hover:bg-sky-700"
                : "cursor-not-allowed bg-slate-300"
        }`}
>
    Send Invitation
</button>
                    </div>

                </form>

            </div>

        </div>

    );

}
