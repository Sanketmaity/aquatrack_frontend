import api from "../api/axios";

/**
 * ==========================================
 * Manager Dashboard Service
 * ==========================================
 */

export const getManagerDashboard = async () => {

    const response = await api.get("/manager/dashboard");

    return response.data;

};