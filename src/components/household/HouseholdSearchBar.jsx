import { Search } from "lucide-react";

export default function HouseholdSearchBar({
    search,
    setSearch
}) {

    return (

        <div className="flex items-center justify-between">

            <div className="relative w-full max-w-md">

                <Search
                    size={18}
                    className="
                        absolute
                        left-3
                        top-1/2
                        -translate-y-1/2
                        text-gray-400
                    "
                />

                <input
                    type="text"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search by house number, meter, building..."
                    className="
                        w-full
                        rounded-xl
                        border
                        border-gray-300
                        bg-white
                        py-3
                        pl-10
                        pr-4
                        outline-none
                        transition
                        focus:border-blue-500
                        focus:ring-2
                        focus:ring-blue-100
                    "
                />

            </div>

        </div>

    );

}