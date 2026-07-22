import { useEffect, useState } from "react";
import householdService from "../../services/householdService";

export default function HouseholdForm({

    formData,
    setFormData,
    errors = {}

}) {

    const [buildings, setBuildings] = useState([]);
    const [floors, setFloors] = useState([]);
    const [loadingBuildings, setLoadingBuildings] = useState(false);
    const [loadingFloors, setLoadingFloors] = useState(false);
// ==========================================
// Load Buildings
// ==========================================

useEffect(() => {
    loadBuildings();
}, []);

const loadBuildings = async () => {

    console.log("🚀 loadBuildings() called");

    try {

        setLoadingBuildings(true);

        const response = await householdService.getManagerBuildings();

        console.log("✅ API Response:", response);
        console.log("✅ Is Array:", Array.isArray(response));

        setBuildings(response);

    } catch (error) {

        console.error("❌ Load Buildings Error:", error);

    } finally {

        setLoadingBuildings(false);

    }

};

// Debug log (runs every render)
console.log("Buildings State:", buildings);

// ==========================================
// Load Floors
// ==========================================

useEffect(() => {

    if (!formData.buildingId) {

        setFloors([]);
        return;

    }

    loadFloors(formData.buildingId);

}, [formData.buildingId]);

const loadFloors = async (buildingId) => {

    try {

        setLoadingFloors(true);

        const response = await householdService.getManagerFloors(buildingId);

        console.log("✅ Floors Response:", response);

        setFloors(response);

    } catch (error) {

        console.error("❌ Load Floors Error:", error);

    } finally {

        setLoadingFloors(false);

    }

};
    // ==========================================
    // Input Change
    // ==========================================

    const handleChange = (e) => {

        const { name, value } = e.target;

        if (name === "buildingId") {

            setFormData({

                ...formData,

                buildingId: value,

                floorId: ""

            });

            return;

        }

        setFormData({

            ...formData,

            [name]: value

        });

    };

    console.log("Buildings:", buildings);
console.log("Selected Building ID:", formData.buildingId);
console.log("Type:", typeof formData.buildingId);

if (buildings.length > 0) {
    console.log("Option ID:", buildings[0].id);
    console.log("Option Type:", typeof buildings[0].id);
}

    return (

        <div className="space-y-5">

            {/* Building */}

           {/* ========================================== */}
{/* Building */}
{/* ========================================== */}

<div>

    <label className="mb-2 block text-sm font-medium">
        Building
    </label>

    {console.log("Current Select Value:", String(formData.buildingId ?? ""))}

    <select
        name="buildingId"
        value={String(formData.buildingId ?? "")}
        onChange={handleChange}
        disabled={loadingBuildings}
        className="w-full rounded-lg border px-3 py-2"
    >

        <option value="">
            Select Building
        </option>

        {buildings.map((building) => {

            console.log(
                "Option:",
                String(building.id),
                "Matches:",
                String(building.id) === String(formData.buildingId)
            );

            return (
                <option
                    key={building.id}
                    value={String(building.id)}
                >
                    {building.buildingName}
                </option>
            );

        })}

    </select>

    {errors.buildingId && (
        <p className="mt-1 text-sm text-red-500">
            {errors.buildingId}
        </p>
    )}

</div>

{/* ========================================== */}
{/* Floor */}
{/* ========================================== */}

<div>

    <label className="mb-2 block text-sm font-medium">
        Floor
    </label>

    <select
        name="floorId"
        value={String(formData.floorId ?? "")}
        onChange={handleChange}
        disabled={!formData.buildingId || loadingFloors}
        className="w-full rounded-lg border px-3 py-2"
    >

        <option value="">
            Select Floor
        </option>

        {floors.map((floor) => (
            <option
                key={floor.id}
                value={String(floor.id)}
            >
                {floor.floorName}
            </option>
        ))}

    </select>

    {errors.floorId && (
        <p className="mt-1 text-sm text-red-500">
            {errors.floorId}
        </p>
    )}

</div>

                

            {/* House Number */}

            <div>

                <label className="mb-2 block text-sm font-medium">

                    House Number

                </label>

                <input
                    type="text"
                    name="houseNumber"
                    value={formData.houseNumber}
                    onChange={handleChange}
                    className="w-full rounded-lg border px-3 py-2"
                />

                {errors.houseNumber && (

                    <p className="mt-1 text-sm text-red-500">

                        {errors.houseNumber}

                    </p>

                )}

            </div>

            {/* Meter Number */}

            <div>

                <label className="mb-2 block text-sm font-medium">

                    Meter Number

                </label>

                <input
                    type="text"
                    name="meterNumber"
                    value={formData.meterNumber}
                    onChange={handleChange}
                    className="w-full rounded-lg border px-3 py-2"
                />

                {errors.meterNumber && (

                    <p className="mt-1 text-sm text-red-500">

                        {errors.meterNumber}

                    </p>

                )}

            </div>

            {/* Status */}

            <div>

                <label className="mb-2 block text-sm font-medium">

                    Status

                </label>

                <select
                    name="status"
                    value={formData.status}
                    onChange={handleChange}
                    className="w-full rounded-lg border px-3 py-2"
                >

                    <option value="ACTIVE">

                        ACTIVE

                    </option>

                    <option value="INACTIVE">

                        INACTIVE

                    </option>

                </select>

            </div>

        </div>

    );

}