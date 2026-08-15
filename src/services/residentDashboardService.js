// ============================================================
// AquaTrack - Resident Dashboard Service
// ============================================================
// Temporary frontend data source.
//
// These values are based on the current resident meter/bill
// data available in the AquaTrack UI.
//
// Later, these functions can be replaced with real API calls
// without changing the dashboard components.
// ============================================================


// ============================================================
// Dashboard Summary
// ============================================================

export async function getResidentDashboardSummary() {
  return {
    data: {
      // Current July-2026 meter consumption
      currentMonthUsage: 14,

      // Current water bill
      currentBill: 516,

      // Current payment status
      billingStatus: "PENDING",

      // No active water alert
      waterAlerts: "Bill Pending",

      // Resident information
      firstName: "SANKET",
      lastName: "MAITY",

      apartmentName: "Green Valley Residency",
      buildingName: "A BLOCK",
      householdName: "A-001",
    },
  };
}


// ============================================================
// Monthly Water Consumption
// ============================================================

export async function getResidentMonthlyConsumption() {
  return {
    data: [
      {
        month: "Jan-2026",
        consumption: 14.00,
      },
      {
        month: "Feb-2026",
        consumption: 20.00,
      },
      {
        month: "Mar-2026",
        consumption: 16.00,
      },
      {
        month: "Apr-2026",
        consumption: 22.00,
      },
      {
        month: "May-2026",
        consumption: 18.00,
      },
      {
        month: "Jun-2026",
        consumption: 18.00,
      },
      {
        month: "Jul-2026",
        consumption: 20.00,
      },
      {
        month: "Aug-2026",
        consumption: 14.00,
      },
    ],
  };
}


// ============================================================
// Bill Summary
// ============================================================

export async function getResidentBillSummary() {
  return {
    data: {
      totalBills: 8,

      paidBills: 2,

      pendingBills: 6,

      overdueBills: 0,

      totalAmount: 5094,
    },
  };
}


// ============================================================
// Recent Bills
// ============================================================

export async function getResidentRecentBills() {
  return {
    data: [
      {
        invoiceNumber: "WB-3-3-1785362071961",

        billingCycle: "July-2026",

        usage: 19,

        totalAmount: 217,

        dueDate: "2026-07-31",

        status: "PAID",
      },
    ],
  };
}