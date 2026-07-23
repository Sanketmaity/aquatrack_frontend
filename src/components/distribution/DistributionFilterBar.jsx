export default function DistributionFilterBar({

    buildingId,

    setBuildingId,

    billingCycleId,

    setBillingCycleId,

    buildings,

    billingCycles,

    onGenerate

}) {

    return (

        <div className="rounded-2xl bg-white p-6 shadow-sm border border-gray-100">

            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">

                {/* Building */}

                <div>

                    <label className="mb-2 block text-sm font-medium text-gray-700">

                        Building

                    </label>

                    <select

                        value={buildingId}

                        onChange={(e) => setBuildingId(e.target.value)}

                        className="w-full rounded-xl border border-gray-300 px-4 py-2.5 focus:border-blue-500 focus:outline-none"

                    >

                        <option value="">

                            Select Building

                        </option>

                        {buildings.map((building) => (

                            <option

                                key={building.id}

                                value={building.id}

                            >

                                {building.buildingName}

                            </option>

                        ))}

                    </select>

                </div>

                {/* Billing Cycle */}

                <div>

                    <label className="mb-2 block text-sm font-medium text-gray-700">

                        Billing Cycle

                    </label>

                    <select

                        value={billingCycleId}

                        onChange={(e) => setBillingCycleId(e.target.value)}

                        className="w-full rounded-xl border border-gray-300 px-4 py-2.5 focus:border-blue-500 focus:outline-none"

                    >

                        <option value="">

                            Select Billing Cycle

                        </option>

                        {billingCycles.map((cycle) => (

                            <option

                                key={cycle.id}

                                value={cycle.id}

                            >

                                {cycle.cycleName}

                            </option>

                        ))}

                    </select>

                </div>

                {/* Generate Button */}

                <div className="flex items-end">

                    <button

                        onClick={onGenerate}

                        className="w-full rounded-xl bg-blue-600 px-5 py-2.5 text-white font-medium hover:bg-blue-700 transition"

                    >

                        Generate Distribution

                    </button>

                </div>

            </div>

        </div>

    );

}