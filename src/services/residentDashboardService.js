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
      currentMonthUsage: 19,

      // Current water bill
      currentBill: 217,

      // Current payment status
      billingStatus: "PAID",

      // No active water alert
      waterAlerts: "None",

      // Resident information
      firstName: "SANKET",
      lastName: "MAITY",

      apartmentName: "Yellow Moon",
      buildingName: "A1",
      householdName: "103",
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
        consumption: 25.88,
      },
      {
        month: "Feb-2026",
        consumption: 26.98,
      },
      {
        month: "Mar-2026",
        consumption: 17.24,
      },
      {
        month: "Apr-2026",
        consumption: 25.69,
      },
      {
        month: "May-2026",
        consumption: 37.36,
      },
      {
        month: "Jun-2026",
        consumption: 31.54,
      },
      {
        month: "Jul-2026",
        consumption: 19.0,
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
      totalBills: 1,

      paidBills: 1,

      pendingBills: 0,

      overdueBills: 0,

      totalAmount: 217,
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