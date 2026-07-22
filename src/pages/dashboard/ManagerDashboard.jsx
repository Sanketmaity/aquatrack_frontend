import { useEffect, useState } from "react";

import DashboardLayout from "../../components/ui/DashboardLayout";

import DashboardSummaryCards from "../../components/manager/DashboardSummaryCards";
import DashboardQuickActions from "../../components/manager/DashboardQuickActions";

import { getManagerDashboard } from "../../services/managerDashboardService";

export default function ManagerDashboard() {

    // ==========================================
    // State
    // ==========================================

    const [summary, setSummary] = useState(null);

    const [loading, setLoading] = useState(true);

    const [error, setError] = useState("");

    // ==========================================
    // Initial Load
    // ==========================================

    useEffect(() => {

        loadDashboard();

    }, []);

    // ==========================================
    // Load Dashboard
    // ==========================================

    async function loadDashboard() {

        try {

            setLoading(true);

            setError("");

            const response =
                await getManagerDashboard();

            console.log(
                "Manager Dashboard Summary:",
                response
            );

            setSummary(response);

        } catch (error) {

            console.error(error);

            setError(

                error.response?.data?.message ||

                "Failed to load dashboard."

            );

        } finally {

            setLoading(false);

        }

    }

    // ==========================================
    // UI
    // ==========================================

    return (

        <DashboardLayout>

            <div className="space-y-8">

                {/* ======================================
                    Page Header
                ====================================== */}

                <div>

                    <h1 className="text-3xl font-bold text-slate-800">

                        Manager Dashboard

                    </h1>

                    <p className="mt-2 text-slate-500">

                        Welcome back! Monitor your assigned households and residents from one place.

                    </p>

                </div>

                {/* ======================================
                    Loading
                ====================================== */}

                {loading && (

                    <div className="rounded-2xl bg-white p-8 shadow-sm">

                        <p className="text-slate-500">

                            Loading dashboard...

                        </p>

                    </div>

                )}

                {/* ======================================
                    Error
                ====================================== */}

                {!loading && error && (

                    <div
                        className="
                            rounded-2xl
                            border
                            border-red-200
                            bg-red-50
                            p-6
                        "
                    >

                        <p className="font-medium text-red-600">

                            {error}

                        </p>

                    </div>

                )}

                {/* ======================================
                    Dashboard Content
                ====================================== */}

                {!loading && !error && summary && (

                    <>
                        <DashboardSummaryCards
                            summary={summary}
                        />

                        <DashboardQuickActions />
                    </>

                )}

            </div>

        </DashboardLayout>

    );

}