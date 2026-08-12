import { motion } from "framer-motion";
import {
  ReceiptText,
  CalendarDays,
  Droplets,
  IndianRupee,
  CheckCircle2,
  Clock3,
  AlertTriangle,
  ArrowUpRight,
  FileText,
} from "lucide-react";

export default function ResidentRecentBillsTable({
  bills = [],
  loading = false,
  onViewBill,
  onPayBill,
}) {
  // ============================================================
  // Helpers
  // ============================================================

  const getStatusConfig = (status) => {
    const normalizedStatus = String(status || "")
      .trim()
      .toUpperCase();

    switch (normalizedStatus) {
      case "PAID":
        return {
          label: "Paid",
          className:
            "bg-emerald-50 text-emerald-700 border-emerald-200",
          icon: CheckCircle2,
        };

      case "OVERDUE":
        return {
          label: "Overdue",
          className:
            "bg-red-50 text-red-700 border-red-200",
          icon: AlertTriangle,
        };

      case "PENDING":
      case "UNPAID":
        return {
          label: "Pending",
          className:
            "bg-amber-50 text-amber-700 border-amber-200",
          icon: Clock3,
        };

      default:
        return {
          label: status || "Unknown",
          className:
            "bg-slate-50 text-slate-600 border-slate-200",
          icon: Clock3,
        };
    }
  };

  const formatAmount = (amount) => {
    const value = Number(amount ?? 0);

    return `₹${value.toFixed(2)}`;
  };

  const formatDate = (date) => {
    if (!date) {
      return "-";
    }

    const parsedDate = new Date(date);

    if (Number.isNaN(parsedDate.getTime())) {
      return date;
    }

    return parsedDate.toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  const getBillNumber = (bill) => {
    return (
      bill?.billNumber ||
      bill?.billNo ||
      bill?.invoiceNumber ||
      bill?.id ||
      "-"
    );
  };

  const getBillingPeriod = (bill) => {
    if (bill?.billingPeriod) {
      return bill.billingPeriod;
    }

    if (bill?.month) {
      return bill.month;
    }

    if (bill?.billingMonth) {
      return bill.billingMonth;
    }

    if (bill?.fromDate && bill?.toDate) {
      return `${formatDate(bill.fromDate)} - ${formatDate(
        bill.toDate
      )}`;
    }

    return "-";
  };

  const getConsumption = (bill) => {
    const value = Number(
      bill?.consumption ??
        bill?.waterConsumption ??
        bill?.totalConsumption ??
        bill?.unitsConsumed ??
        0
    );

    return `${value.toFixed(2)} KL`;
  };

  const getAmount = (bill) => {
    return Number(
      bill?.amount ??
        bill?.totalAmount ??
        bill?.billAmount ??
        0
    );
  };

  const getStatus = (bill) => {
    return (
      bill?.paymentStatus ||
      bill?.billStatus ||
      bill?.status ||
      "PENDING"
    );
  };

  // ============================================================
  // Loading State
  // ============================================================

  if (loading) {
    return (
      <section
        className="
          overflow-hidden
          rounded-2xl
          border
          border-slate-200
          bg-white
          shadow-sm
        "
      >
        <div className="border-b border-slate-200 p-6">
          <div className="h-5 w-40 animate-pulse rounded bg-slate-200" />
          <div className="mt-2 h-3 w-64 animate-pulse rounded bg-slate-100" />
        </div>

        <div className="space-y-4 p-6">
          {[1, 2, 3, 4].map((item) => (
            <div
              key={item}
              className="
                grid
                grid-cols-2
                gap-4
                rounded-xl
                border
                border-slate-100
                p-4
                md:grid-cols-6
              "
            >
              {Array.from({ length: 6 }).map((_, index) => (
                <div
                  key={index}
                  className="h-4 animate-pulse rounded bg-slate-100"
                />
              ))}
            </div>
          ))}
        </div>
      </section>
    );
  }

  // ============================================================
  // Empty State
  // ============================================================

  if (!Array.isArray(bills) || bills.length === 0) {
    return (
      <section
        className="
          rounded-2xl
          border
          border-slate-200
          bg-white
          p-8
          shadow-sm
        "
      >
        <div className="flex flex-col items-center justify-center py-10 text-center">
          <div
            className="
              flex
              h-14
              w-14
              items-center
              justify-center
              rounded-2xl
              border
              border-blue-100
              bg-blue-50
              text-blue-500
            "
          >
            <ReceiptText size={27} />
          </div>

          <h3 className="mt-4 text-lg font-bold text-slate-900">
            No Bills Found
          </h3>

          <p className="mt-2 max-w-md text-sm leading-relaxed text-slate-500">
            Your generated water bills will appear here once
            billing is completed for your household.
          </p>
        </div>
      </section>
    );
  }

  // ============================================================
  // UI
  // ============================================================

  return (
    <section
      className="
        overflow-hidden
        rounded-2xl
        border
        border-slate-200/80
        bg-white
        shadow-sm
        shadow-slate-200/50
      "
    >
      {/* ========================================================
          Header
      ======================================================== */}

      <div
        className="
          flex
          flex-col
          gap-4
          border-b
          border-slate-200
          p-6
          sm:flex-row
          sm:items-center
          sm:justify-between
        "
      >
        <div className="flex items-center gap-3">
          <div
            className="
              flex
              h-11
              w-11
              items-center
              justify-center
              rounded-xl
              border
              border-blue-100
              bg-blue-50
              text-blue-600
            "
          >
            <ReceiptText size={21} />
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-blue-600">
              Billing History
            </p>

            <h2 className="mt-1 text-xl font-bold tracking-tight text-slate-900">
              Recent Water Bills
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              View your latest water bills and payment status.
            </p>
          </div>
        </div>

        <div
          className="
            inline-flex
            w-fit
            items-center
            gap-2
            rounded-full
            border
            border-slate-200
            bg-slate-50
            px-3
            py-1.5
            text-xs
            font-semibold
            text-slate-500
          "
        >
          <FileText size={13} />
          {bills.length} bill{bills.length !== 1 ? "s" : ""}
        </div>
      </div>

      {/* ========================================================
          Desktop Table
      ======================================================== */}

      <div className="hidden overflow-x-auto md:block">
        <table className="min-w-full">
          <thead>
            <tr className="border-b border-slate-200 bg-slate-50/80">
              <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wide text-slate-500">
                Bill
              </th>

              <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wide text-slate-500">
                Billing Period
              </th>

              <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wide text-slate-500">
                Consumption
              </th>

              <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wide text-slate-500">
                Amount
              </th>

              <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wide text-slate-500">
                Due Date
              </th>

              <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wide text-slate-500">
                Status
              </th>

              <th className="px-6 py-4 text-right text-xs font-bold uppercase tracking-wide text-slate-500">
                Action
              </th>
            </tr>
          </thead>

          <tbody>
            {bills.map((bill, index) => {
              const status = getStatus(bill);
              const statusConfig = getStatusConfig(status);
              const StatusIcon = statusConfig.icon;

              const normalizedStatus = String(status)
                .toUpperCase();

              const isPayable =
                normalizedStatus === "PENDING" ||
                normalizedStatus === "UNPAID" ||
                normalizedStatus === "OVERDUE";

              return (
                <motion.tr
                  key={bill?.id ?? index}
                  initial={{
                    opacity: 0,
                    y: 8,
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                  }}
                  transition={{
                    delay: index * 0.05,
                    duration: 0.3,
                  }}
                  className="
                    border-b
                    border-slate-100
                    transition-colors
                    last:border-b-0
                    hover:bg-slate-50/70
                  "
                >
                  {/* Bill */}

                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div
                        className="
                          flex
                          h-9
                          w-9
                          shrink-0
                          items-center
                          justify-center
                          rounded-lg
                          bg-slate-100
                          text-slate-500
                        "
                      >
                        <ReceiptText size={17} />
                      </div>

                      <div>
                        <p className="text-sm font-bold text-slate-800">
                          {getBillNumber(bill)}
                        </p>

                        <p className="mt-0.5 text-[11px] text-slate-400">
                          Water Bill
                        </p>
                      </div>
                    </div>
                  </td>

                  {/* Billing Period */}

                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2 text-sm text-slate-600">
                      <CalendarDays
                        size={15}
                        className="text-slate-400"
                      />

                      {getBillingPeriod(bill)}
                    </div>
                  </td>

                  {/* Consumption */}

                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2 text-sm font-semibold text-slate-700">
                      <Droplets
                        size={15}
                        className="text-cyan-500"
                      />

                      {getConsumption(bill)}
                    </div>
                  </td>

                  {/* Amount */}

                  <td className="px-6 py-4">
                    <div className="flex items-center gap-1 text-sm font-bold text-slate-900">
                      <IndianRupee size={14} />
                      {getAmount(bill).toFixed(2)}
                    </div>
                  </td>

                  {/* Due Date */}

                  <td className="px-6 py-4 text-sm text-slate-600">
                    {formatDate(
                      bill?.dueDate ||
                        bill?.paymentDueDate
                    )}
                  </td>

                  {/* Status */}

                  <td className="px-6 py-4">
                    <span
                      className={`
                        inline-flex
                        items-center
                        gap-1.5
                        rounded-full
                        border
                        px-2.5
                        py-1
                        text-[11px]
                        font-bold
                        ${statusConfig.className}
                      `}
                    >
                      <StatusIcon size={12} />
                      {statusConfig.label}
                    </span>
                  </td>

                  {/* Action */}

                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      {onViewBill && (
                        <button
                          type="button"
                          onClick={() => onViewBill(bill)}
                          className="
                            inline-flex
                            items-center
                            gap-1.5
                            rounded-lg
                            border
                            border-slate-200
                            bg-white
                            px-3
                            py-2
                            text-xs
                            font-semibold
                            text-slate-600
                            transition
                            hover:border-blue-200
                            hover:bg-blue-50
                            hover:text-blue-600
                          "
                        >
                          View
                          <ArrowUpRight size={13} />
                        </button>
                      )}

                      {isPayable && onPayBill && (
                        <button
                          type="button"
                          onClick={() => onPayBill(bill)}
                          className="
                            rounded-lg
                            bg-blue-600
                            px-3
                            py-2
                            text-xs
                            font-bold
                            text-white
                            shadow-sm
                            shadow-blue-500/20
                            transition
                            hover:bg-blue-700
                            active:scale-95
                          "
                        >
                          Pay Now
                        </button>
                      )}
                    </div>
                  </td>
                </motion.tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* ========================================================
          Mobile Cards
      ======================================================== */}

      <div className="space-y-3 p-4 md:hidden">
        {bills.map((bill, index) => {
          const status = getStatus(bill);
          const statusConfig = getStatusConfig(status);
          const StatusIcon = statusConfig.icon;

          const normalizedStatus = String(status)
            .toUpperCase();

          const isPayable =
            normalizedStatus === "PENDING" ||
            normalizedStatus === "UNPAID" ||
            normalizedStatus === "OVERDUE";

          return (
            <motion.div
              key={bill?.id ?? index}
              initial={{
                opacity: 0,
                y: 10,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                delay: index * 0.05,
              }}
              className="
                rounded-xl
                border
                border-slate-200
                bg-slate-50/50
                p-4
              "
            >
              {/* Mobile Header */}

              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div
                    className="
                      flex
                      h-10
                      w-10
                      shrink-0
                      items-center
                      justify-center
                      rounded-xl
                      bg-blue-50
                      text-blue-600
                    "
                  >
                    <ReceiptText size={18} />
                  </div>

                  <div>
                    <p className="text-sm font-bold text-slate-900">
                      {getBillNumber(bill)}
                    </p>

                    <p className="text-xs text-slate-500">
                      {getBillingPeriod(bill)}
                    </p>
                  </div>
                </div>

                <span
                  className={`
                    inline-flex
                    items-center
                    gap-1
                    rounded-full
                    border
                    px-2
                    py-1
                    text-[10px]
                    font-bold
                    ${statusConfig.className}
                  `}
                >
                  <StatusIcon size={11} />
                  {statusConfig.label}
                </span>
              </div>

              {/* Mobile Details */}

              <div className="mt-4 grid grid-cols-2 gap-3">
                <div className="rounded-lg bg-white p-3">
                  <p className="text-[10px] font-semibold uppercase tracking-wide text-slate-400">
                    Consumption
                  </p>

                  <p className="mt-1 text-sm font-bold text-slate-800">
                    {getConsumption(bill)}
                  </p>
                </div>

                <div className="rounded-lg bg-white p-3">
                  <p className="text-[10px] font-semibold uppercase tracking-wide text-slate-400">
                    Amount
                  </p>

                  <p className="mt-1 text-sm font-bold text-slate-800">
                    {formatAmount(getAmount(bill))}
                  </p>
                </div>

                <div className="rounded-lg bg-white p-3">
                  <p className="text-[10px] font-semibold uppercase tracking-wide text-slate-400">
                    Due Date
                  </p>

                  <p className="mt-1 text-sm font-bold text-slate-800">
                    {formatDate(
                      bill?.dueDate ||
                        bill?.paymentDueDate
                    )}
                  </p>
                </div>

                <div className="rounded-lg bg-white p-3">
                  <p className="text-[10px] font-semibold uppercase tracking-wide text-slate-400">
                    Bill Date
                  </p>

                  <p className="mt-1 text-sm font-bold text-slate-800">
                    {formatDate(
                      bill?.billDate ||
                        bill?.generatedAt ||
                        bill?.createdAt
                    )}
                  </p>
                </div>
              </div>

              {/* Mobile Actions */}

              <div className="mt-4 flex gap-2">
                {onViewBill && (
                  <button
                    type="button"
                    onClick={() => onViewBill(bill)}
                    className="
                      flex-1
                      rounded-lg
                      border
                      border-slate-200
                      bg-white
                      px-3
                      py-2.5
                      text-xs
                      font-bold
                      text-slate-600
                      transition
                      hover:border-blue-200
                      hover:bg-blue-50
                      hover:text-blue-600
                    "
                  >
                    View Bill
                  </button>
                )}

                {isPayable && onPayBill && (
                  <button
                    type="button"
                    onClick={() => onPayBill(bill)}
                    className="
                      flex-1
                      rounded-lg
                      bg-blue-600
                      px-3
                      py-2.5
                      text-xs
                      font-bold
                      text-white
                      shadow-sm
                      transition
                      hover:bg-blue-700
                      active:scale-95
                    "
                  >
                    Pay Now
                  </button>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}