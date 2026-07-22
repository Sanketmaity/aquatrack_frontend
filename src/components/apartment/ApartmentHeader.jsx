import { Plus } from "lucide-react";

export default function ApartmentHeader({ onCreate }) {

    return (

        <div className="flex items-center justify-between">

            <div>

                <h1 className="text-3xl font-bold text-slate-900">

                    Apartments

                </h1>

                <p className="mt-2 text-slate-500">

                    Manage all apartment communities.

                </p>

            </div>

            <button
                onClick={onCreate}
                className="
                    flex
                    items-center
                    gap-2
                    rounded-xl
                    bg-blue-600
                    px-5
                    py-3
                    font-medium
                    text-white
                    transition
                    hover:bg-blue-700
                "
            >

                <Plus size={18} />

                Create Apartment

            </button>

        </div>

    );

}