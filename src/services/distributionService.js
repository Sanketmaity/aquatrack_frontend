import api from "../api/axios";

const BASE_URL = "/manager/distribution";

const distributionService = {

    // ==========================================
    // Get Consumption Distribution
    // ==========================================

    getConsumptionDistribution: async (

        buildingId,

        billingCycleId

    ) => {

        const response = await api.get(

            `${BASE_URL}/${buildingId}/${billingCycleId}`

        );

        return response.data;

    }

};

export default distributionService;