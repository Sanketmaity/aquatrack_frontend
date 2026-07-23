import { useEffect, useState } from "react";

import DashboardLayout from "../../components/ui/DashboardLayout";

import DistributionHeader from "../../components/distribution/DistributionHeader";
import DistributionFilterBar from "../../components/distribution/DistributionFilterBar";
import DistributionTable from "../../components/distribution/DistributionTable";

import distributionService from "../../services/distributionService";
import householdService from "../../services/householdService";
import * as billingCycleService from "../../services/billingCycleService";

export default function ConsumptionDistributionList() {

    // ==========================================
    // State
    // ==========================================

    const [buildingId, setBuildingId] = useState("");

    const [billingCycleId, setBillingCycleId] = useState("");

    const [buildings, setBuildings] = useState([]);

    const [billingCycles, setBillingCycles] = useState([]);

    const [distribution, setDistribution] = useState([]);

    const [loading, setLoading] = useState(false);

    // ==========================================
    // Load Buildings
    // ==========================================

    useEffect(() => {

        loadBuildings();

    }, []);

    const loadBuildings = async () => {

        try {

            const response =
                await householdService.getManagerBuildings();

            setBuildings(response);

        } catch (error) {

            console.error(error);

        }

    };

    // ==========================================
    // Load Billing Cycles
    // ==========================================

    useEffect(() => {

        if (buildingId) {

            loadBillingCycles();

        }

    }, [buildingId]);

    const loadBillingCycles = async () => {

        try {

            const response =
                await billingCycleService
                    .getBillingCyclesByBuilding(buildingId);

            setBillingCycles(response);

        } catch (error) {

            console.error(error);

        }

    };

    // ==========================================
    // Generate Distribution
    // ==========================================

    const handleGenerate = async () => {

        if (!buildingId || !billingCycleId) {

            alert("Please select Building and Billing Cycle.");

            return;

        }

        try {

            setLoading(true);

            const response =
                await distributionService
                    .getConsumptionDistribution(
                        buildingId,
                        billingCycleId
                    );

            setDistribution(response);

        } catch (error) {

            console.error(error);

            alert("Failed to generate distribution.");

        } finally {

            setLoading(false);

        }

    };

    return (

        <DashboardLayout>

            <div className="space-y-6">

                <DistributionHeader />

                <DistributionFilterBar

                    buildingId={buildingId}
                    setBuildingId={setBuildingId}

                    billingCycleId={billingCycleId}
                    setBillingCycleId={setBillingCycleId}

                    buildings={buildings}
                    billingCycles={billingCycles}

                    onGenerate={handleGenerate}

                />

                <DistributionTable

                    distribution={distribution}

                    loading={loading}

                />

            </div>

        </DashboardLayout>

    );

}