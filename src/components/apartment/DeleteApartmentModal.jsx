import { Trash2, X } from "lucide-react";
import { deleteApartment } from "../../services/apartmentService";

export default function DeleteApartmentModal({

    open,

    apartment,

    onClose,

    onSuccess,

}) {

    if (!open || !apartment) return null;

    async function handleDelete() {

        try {

            await deleteApartment(apartment.id);

            onSuccess();

            onClose();

        } catch (error) {

            console.error(error);

            alert(

                error.response?.data?.message ||

                "Failed to delete apartment."

            );

        }

    }

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
                    max-w-md
                    rounded-2xl
                    bg-white
                    shadow-2xl
                "
            >

                {/* Header */}

                <div className="flex items-center justify-between border-b p-6">

                    <div className="flex items-center gap-3">

                        <div className="rounded-full bg-red-100 p-3">

                            <Trash2
                                size={24}
                                className="text-red-600"
                            />

                        </div>

                        <div>

                            <h2 className="text-xl font-bold">

                                Delete Apartment

                            </h2>

                            <p className="text-sm text-slate-500">

                                This action cannot be undone.

                            </p>

                        </div>

                    </div>

                    <button
                        onClick={onClose}
                        className="rounded-lg p-2 hover:bg-slate-100"
                    >

                        <X size={20} />

                    </button>

                </div>

                {/* Body */}

                <div className="p-6">

                    <p className="text-slate-600">

                        Are you sure you want to delete this apartment?

                    </p>

                    <div
                        className="
                            mt-5
                            rounded-xl
                            border
                            bg-slate-50
                            p-4
                        "
                    >

                        <p className="font-semibold">

                            {apartment.apartmentName}

                        </p>

                        <p className="mt-1 text-sm text-slate-500">

                            {apartment.city}, {apartment.state}

                        </p>

                    </div>

                </div>

                {/* Footer */}

                <div
                    className="
                        flex
                        justify-end
                        gap-4
                        border-t
                        p-6
                    "
                >

                    <button
                        onClick={onClose}
                        className="
                            rounded-xl
                            border
                            px-6
                            py-3
                            hover:bg-slate-50
                        "
                    >

                        Cancel

                    </button>

                    <button
                        onClick={handleDelete}
                        className="
                            rounded-xl
                            bg-red-600
                            px-6
                            py-3
                            text-white
                            hover:bg-red-700
                        "
                    >

                        Delete Apartment

                    </button>

                </div>

            </div>

        </div>

    );

}