import { Plus } from "lucide-react";

export default function HouseholdHeader({
    onCreate
}) {

    return (

        <div className="flex items-center justify-between">

            <div>

                <h1 className="text-3xl font-bold text-gray-900">
                    Households
                </h1>

                <p className="mt-1 text-gray-500">
                    Manage all households assigned to your buildings.
                </p>

            </div>

            <button
                onClick={onCreate}
                className="
                    inline-flex
                    items-center
                    gap-2
                    rounded-xl
                    bg-blue-600
                    px-5
                    py-3
                    text-white
                    font-medium
                    hover:bg-blue-700
                    transition
                "
            >
                <Plus size={18} />

                Add Household

            </button>

        </div>

    );

}