import { motion } from "framer-motion";
import {
  Receipt,
  Clock3,
  CircleCheck,
  IndianRupee,
  ArrowUpRight,
} from "lucide-react";

export default function ResidentBillSummary({ billSummary = {} }) {
  const totalBills = Number(billSummary?.totalBills ?? 0);
  const paidBills = Number(billSummary?.paidBills ?? 0);
  const pendingBills = Number(billSummary?.pendingBills ?? 0);
  const totalAmount = Number(billSummary?.totalAmount ?? 0);

  const cards = [
    {
      title: "Total Bills",
      value: totalBills,
      icon: Receipt,
      description: "Generated water bills",
      iconStyle: "bg-blue-50 text-blue-600 border-blue-100",
      valueStyle: "text-slate-900",
    },
    {
      title: "Paid Bills",
      value: paidBills,
      icon: CircleCheck,
      description: "Successfully paid",
      iconStyle: "bg-emerald-50 text-emerald-600 border-emerald-100",
      valueStyle: "text-emerald-600",
    },
    {
      title: "Pending Bills",
      value: pendingBills,
      icon: Clock3,
      description: "Awaiting payment",
      iconStyle: "bg-amber-50 text-amber-600 border-amber-100",
      valueStyle: pendingBills > 0 ? "text-amber-600" : "text-slate-900",
    },
    {
      title: "Total Amount",
      value: `₹${totalAmount.toFixed(2)}`,
      icon: IndianRupee,
      description: "Total billed amount",
      iconStyle: "bg-violet-50 text-violet-600 border-violet-100",
      valueStyle: "text-violet-600",
    },
  ];

  const paidPercentage =
    totalBills > 0
      ? Math.min(Math.round((paidBills / totalBills) * 100), 100)
      : 0;

  return (
    <section className="space-y-5">
      {/* Section Header */}
      <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <div className="flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
              <Receipt size={20} />
            </div>

            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-blue-600">
                Billing Overview
              </p>

              <h2 className="text-xl font-bold tracking-tight text-slate-900">
                My Water Bills
              </h2>
            </div>
          </div>

          <p className="mt-2 text-sm text-slate-500">
            Track your generated bills, payments, and outstanding amount.
          </p>
        </div>

        {totalBills > 0 && (
          <div className="inline-flex w-fit items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-500 shadow-sm">
            <span className="h-2 w-2 rounded-full bg-emerald-500" />
            {paidPercentage}% bills paid
          </div>
        )}
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {cards.map((card, index) => {
          const Icon = card.icon;

          return (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.45,
                delay: index * 0.08,
                ease: [0.16, 1, 0.3, 1],
              }}
              whileHover={{
                y: -4,
                transition: {
                  type: "spring",
                  stiffness: 300,
                  damping: 20,
                },
              }}
              className="
                group
                relative
                overflow-hidden
                rounded-2xl
                border
                border-slate-200/80
                bg-white
                p-5
                shadow-sm
                shadow-slate-200/50
                transition-shadow
                duration-300
                hover:shadow-lg
                hover:shadow-slate-200/70
              "
            >
              {/* Ambient Glow */}
              <div
                className="
                  pointer-events-none
                  absolute
                  -right-10
                  -top-10
                  h-28
                  w-28
                  rounded-full
                  bg-blue-50
                  blur-2xl
                  opacity-0
                  transition-opacity
                  duration-500
                  group-hover:opacity-100
                "
              />

              <div className="relative flex items-start justify-between gap-4">
                {/* Content */}
                <div className="min-w-0">
                  <p className="text-sm font-medium text-slate-500">
                    {card.title}
                  </p>

                  <motion.p
                    key={card.value}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`mt-2 text-3xl font-extrabold tracking-tight ${card.valueStyle}`}
                  >
                    {card.value}
                  </motion.p>

                  <p className="mt-1 text-xs font-medium text-slate-400">
                    {card.description}
                  </p>
                </div>

                {/* Icon */}
                <div
                  className={`
                    flex
                    h-12
                    w-12
                    shrink-0
                    items-center
                    justify-center
                    rounded-xl
                    border
                    transition-transform
                    duration-300
                    group-hover:scale-105
                    ${card.iconStyle}
                  `}
                >
                  <Icon size={22} />
                </div>
              </div>

              {/* Bottom Indicator */}
              <div className="relative mt-5 flex items-center justify-between border-t border-slate-100 pt-3">
                <span className="text-[11px] font-semibold uppercase tracking-wide text-slate-400">
                  AquaTrack Billing
                </span>

                <ArrowUpRight
                  size={15}
                  className="text-slate-300 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-blue-500"
                />
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Payment Progress */}
      {totalBills > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35, duration: 0.45 }}
          className="
            rounded-2xl
            border
            border-slate-200/80
            bg-white
            p-5
            shadow-sm
            shadow-slate-200/40
          "
        >
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm font-semibold text-slate-800">
                Payment Progress
              </p>

              <p className="mt-1 text-xs text-slate-500">
                {paidBills} of {totalBills} bills have been paid.
              </p>
            </div>

            <span className="text-sm font-bold text-blue-600">
              {paidPercentage}%
            </span>
          </div>

          <div className="mt-4 h-2 overflow-hidden rounded-full bg-slate-100">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${paidPercentage}%` }}
              transition={{
                delay: 0.5,
                duration: 0.8,
                ease: "easeOut",
              }}
              className="
                h-full
                rounded-full
                bg-gradient-to-r
                from-blue-500
                via-cyan-500
                to-emerald-500
              "
            />
          </div>

          {pendingBills > 0 && (
            <div className="mt-3 flex items-center gap-2 text-xs font-medium text-amber-600">
              <Clock3 size={14} />
              {pendingBills} bill{pendingBills !== 1 ? "s" : ""} pending payment
            </div>
          )}
        </motion.div>
      )}
    </section>
  );
}