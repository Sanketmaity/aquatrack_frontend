export default function DistributionTable({

    distribution,

    loading

}) {

    if (loading) {

        return (

            <div className="rounded-2xl bg-white p-10 text-center shadow-sm">

                <p className="text-gray-500">

                    Generating consumption distribution...

                </p>

            </div>

        );

    }

    if (!distribution.length) {

        return (

            <div className="rounded-2xl bg-white p-10 text-center shadow-sm">

                <p className="text-gray-500">

                    No distribution data available.

                </p>

            </div>

        );

    }

    return (

        <div className="overflow-hidden rounded-2xl bg-white shadow-sm">

            <div className="overflow-x-auto">

                <table className="min-w-full">

                    <thead className="bg-gray-100">

                        <tr>

                            <th className="px-6 py-4 text-left text-sm font-semibold">

                                House No

                            </th>

                            <th className="px-6 py-4 text-left text-sm font-semibold">

                                Resident

                            </th>

                            <th className="px-6 py-4 text-right text-sm font-semibold">

                                Usage (KL)

                            </th>

                            <th className="px-6 py-4 text-right text-sm font-semibold">

                                Usage %

                            </th>

                            <th className="px-6 py-4 text-right text-sm font-semibold">

                                Water Charge

                            </th>

                        </tr>

                    </thead>

                    <tbody>

                        {distribution.map((item) => (

                            <tr

                                key={item.householdId}

                                className="border-t hover:bg-gray-50"

                            >

                                <td className="px-6 py-4 font-medium">

                                    {item.householdNumber}

                                </td>

                                <td className="px-6 py-4">

                                    {item.residentName}

                                </td>

                                <td className="px-6 py-4 text-right">

                                    {item.usageKL}

                                </td>

                                <td className="px-6 py-4 text-right">

                                    {item.usagePercentage}%

                                </td>

                                <td className="px-6 py-4 text-right font-semibold text-green-600">

                                    ₹ {Number(item.chargeAmount).toFixed(2)}

                                </td>

                            </tr>

                        ))}

                    </tbody>

                </table>

            </div>

        </div>

    );

}