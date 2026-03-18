import { create } from "zustand";
import { domainsServise } from "../services/resources";

export const useDomainStore = create((set) => ({
    domains: [],
    fetchAllDomains: async () => {
        const token = localStorage.getItem("Token");
        console.log("DEBUG: fetchAllDomains initiated. Token exists:", !!token);
        
        const fetchParams = {
            "populate": "*"
        };
        
        try {
            const response = await domainsServise.getAll(fetchParams, token);
            console.log("DEBUG: fetchAllDomains success. Response data:", response);
            
            const data = response.data || response;
            set({ domains: Array.isArray(data) ? data : [] });
        } catch (error) {
            console.error("DEBUG: Failed to fetch domains.");
            if (error.response) {
                console.error("DEBUG: Server responded with status:", error.response.status);
                console.error("DEBUG: Server response body:", error.response.data);
            } else {
                console.error("DEBUG: Error message:", error.message);
            }
        }
    }
}));
