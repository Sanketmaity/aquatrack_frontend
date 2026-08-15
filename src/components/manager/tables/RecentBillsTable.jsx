import { Receipt, CalendarDays, Home, IndianRupee } from "lucide-react";

export default function RecentBillsTable({
    data = [],
    loading = false,
}) {
    // ==========================================
    // Helpers
    // ==========================================

    const getAmount = (bill) => {
        return (
            bill.amount ??
            bill.totalAmount ??
            bill.totalBillAmount ??
            bill.billAmount ??
            bill.total ??
            0
        );
    };

    const getStatus = (bill) => {
        return (
            bill.status ??
            bill.paymentStatus ??
            bill.billStatus ??
            "PENDING"
        )
            .toString()
            .toUpperCase();
    };

    const getHouseNumber = (bill) => {
        return (
            bill.houseNumber ??
            bill.house_number ??
            bill.house ??
            "—"
        );
    };

    const getInvoiceNumber = (bill) => {
        return (
            bill.invoiceNumber ??
            bill.invoice_number ??
            bill.invoice ??
            "—"
        );
    };

    const getDueDate = (bill) => {
        return bill.dueDate ?? bill.due_date ?? null;
    };

    const formatAmount = (amount) => {
        const numericAmount = Number(amount);

        if (Number.isNaN(numericAmount)) {
            return "₹0.00";
        }

        return new Intl.NumberFormat("en-IN", {
            style: "currency",
            currency: "INR",
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
        }).format(numericAmount);
    };

    const formatDate = (date) => {
        if (!date) {
            return "—";
        }

        const parsedDate = new Date(date);

        if (Number.isNaN(parsedDate.getTime())) {
            return date;
        }

        return new Intl.DateTimeFormat("en-IN", {
            day: "2-digit",
            month: "short",
            year: "numeric",
        }).format(parsedDate);
    };

    const getStatusStyles = (status) => {
        switch (status) {
            case "PAID":
                return {
                    wrapper:
                        "bg-emerald-50 text-emerald-700 ring-emerald-200",
                    dot: "bg-emerald-500",
                    label: "Paid",
                };

            case "PENDING":
                return {
                    wrapper:
                        "bg-amber-50 text-amber-700 ring-amber-200",
                    dot: "bg-amber-500",
                    label: "Pending",
                };

            case "OVERDUE":
                return {
                    wrapper:
                        "bg-red-50 text-red-700 ring-red-200",
                    dot: "bg-red-500",
                    label: "Overdue",
                };

            case "CANCELLED":
                return {
                    wrapper:
                        "bg-slate-100 text-slate-600 ring-slate-200",
                    dot: "bg-slate-400",
                    label: "Cancelled",
                };

            default:
                return {
                    wrapper:
                        "bg-slate-100 text-slate-600 ring-slate-200",
                    dot: "bg-slate-400",
                    label: status
                        ? status.charAt(0) + status.slice(1).toLowerCase()
                        : "Unknown",
                };
        }
    };

    // ==========================================
    // Loading State
    // ==========================================

    if (loading) {
        return (
            <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
                {/* Header */}
                <div className="border-b border-slate-200 px-6 py-5">
                    <div className="h-5 w-32 animate-pulse rounded bg-slate-200" />
                    <div className="mt-2 h-4 w-56 animate-pulse rounded bg-slate-100" />
                </div>

                {/* Rows */}
                <div className="divide-y divide-slate-100">
                    {[1, 2, 3, 4, 5].map((item) => (
                        <div
                            key={item}
                            className="flex items-center gap-6 px-6 py-5"
                        >
                            <div className="h-10 w-40 animate-pulse rounded bg-slate-100" />
                            <div className="h-8 w-24 animate-pulse rounded bg-slate-100" />
                            <div className="ml-auto h-8 w-24 animate-pulse rounded bg-slate-100" />
                            <div className="h-8 w-28 animate-pulse rounded bg-slate-100" />
                            <div className="h-7 w-20 animate-pulse rounded-full bg-slate-100" />
                        </div>
                    ))}
                </div>
            </div>
        );
    }

    // ==========================================
    // Empty State
    // ==========================================

    if (!data.length) {
        return (
            <div className="rounded-2xl border border-slate-200 bg-white px-6 py-16 text-center shadow-sm">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-50">
                    <Receipt
                        size={30}
                        className="text-blue-500"
                    />
                </div>

                <h3 className="mt-5 text-lg font-bold text-slate-900">
                    No Bills Found
                </h3>

                <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-500">
                    Generated water bills will appear here once billing
                    cycles are completed.
                </p>
            </div>
        );
    }

    // ==========================================
    // UI
    // ==========================================

    return (
        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
            {/* ==========================================
                Header
            ========================================== */}

            <div className="flex flex-col gap-2 border-b border-slate-200 px-6 py-5 sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <div className="flex items-center gap-2">
                        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-50">
                            <Receipt
                                size={18}
                                className="text-blue-600"
                            />
                        </div>

                        <h2 className="text-lg font-bold text-slate-900">
                            Recent Bills
                        </h2>
                    </div>

                    <p className="mt-2 text-sm text-slate-500">
                        Latest generated water bills
                    </p>
                </div>

                <div className="rounded-lg bg-slate-50 px-3 py-2 text-xs font-medium text-slate-500">
                    {data.length} {data.length === 1 ? "Bill" : "Bills"}
                </div>
            </div>

            {/* ==========================================
                Table
            ========================================== */}

            <div className="overflow-x-auto">
                <table className="min-w-[850px] w-full">
                    <thead>
                        <tr className="border-b border-slate-200 bg-slate-50/80">
                            <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                                Invoice
                            </th>

                            <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                                House
                            </th>

                            <th className="px-6 py-4 text-right text-xs font-semibold uppercase tracking-wider text-slate-500">
                                Amount
                            </th>

                            <th className="px-6 py-4 text-center text-xs font-semibold uppercase tracking-wider text-slate-500">
                                Due Date
                            </th>

                            <th className="px-6 py-4 text-center text-xs font-semibold uppercase tracking-wider text-slate-500">
                                Status
                            </th>
                        </tr>
                    </thead>

                    <tbody className="divide-y divide-slate-100">
                        {data.map((bill, index) => {
                            const status = getStatus(bill);
                            const statusStyle =
                                getStatusStyles(status);

                            return (
                                <tr
                                    key={
                                        bill.id ??
                                        bill.invoiceNumber ??
                                        bill.invoice_number ??
                                        index
                                    }
                                    className="group transition-colors hover:bg-blue-50/40"
                                >
                                    {/* Invoice */}
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-slate-100 text-slate-500 transition-colors group-hover:bg-blue-100 group-hover:text-blue-600">
                                                <Receipt size={17} />
                                            </div>

                                            <div>
                                                <p className="font-semibold text-slate-900">
                                                    {getInvoiceNumber(
                                                        bill
                                                    )}
                                                </p>

                                                <p className="mt-0.5 text-xs text-slate-400">
                                                    Water Bill
                                                </p>
                                            </div>
                                        </div>
                                    </td>

                                    {/* House */}
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-2">
                                            <Home
                                                size={16}
                                                className="text-slate-400"
                                            />

                                            <span className="font-medium text-slate-700">
                                                {getHouseNumber(
                                                    bill
                                                )}
                                            </span>
                                        </div>
                                    </td>

                                    {/* Amount */}
                                    <td className="px-6 py-4 text-right">
                                        <div className="inline-flex items-center gap-1 font-bold text-slate-900">
                                            <IndianRupee
                                                size={15}
                                                strokeWidth={2.5}
                                            />

                                            <span>
                                                {formatAmount(
                                                    getAmount(
                                                        bill
                                                    )
                                                ).replace(
                                                    "₹",
                                                    ""
                                                )}
                                            </span>
                                        </div>
                                    </td>

                                    {/* Due Date */}
                                    <td className="px-6 py-4 text-center">
                                        <div className="inline-flex items-center gap-2 text-sm font-medium text-slate-600">
                                            <CalendarDays
                                                size={15}
                                                className="text-slate-400"
                                            />

                                            <span>
                                                {formatDate(
                                                    getDueDate(
                                                        bill
                                                    )
                                                )}
                                            </span>
                                        </div>
                                    </td>

                                    {/* Status */}
                                    <td className="px-6 py-4 text-center">
                                        <span
                                            className={`
                                                inline-flex
                                                items-center
                                                gap-2
                                                rounded-full
                                                px-3
                                                py-1.5
                                                text-xs
                                                font-semibold
                                                ring-1
                                                ring-inset
                                                ${statusStyle.wrapper}
                                            `}
                                        >
                                            <span
                                                className={`
                                                    h-1.5
                                                    w-1.5
                                                    rounded-full
                                                    ${statusStyle.dot}
                                                `}
                                            />

                                            {statusStyle.label}
                                        </span>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>

            {/* ==========================================
                Footer
            ========================================== */}

            <div className="border-t border-slate-100 bg-slate-50/50 px-6 py-3">
                <p className="text-xs text-slate-400">
                    Showing the latest generated water bills
                </p>
            </div>
        </div>
    );
}