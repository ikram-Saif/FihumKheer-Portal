// store/projectsStore.js
import { create } from "zustand";
import { volunteerService } from "../services/resources";



const params = {
    "populate": "*"
}

export const useVolunteersStore = create((set) => ({
    volunteers: [],
    selectedVolunteer: null,
    isModalOpen: false,
    setSelectedVolunteer: (volunteer) => set({ selectedVolunteer: volunteer }),
    openModal: () => set({ isModalOpen: true }),
    closeModal: () => set({ isModalOpen: false }),
    fetchAllVolunteers: async () => {
        const token = localStorage.getItem("Token");
        console.log("DEBUG: fetchAllVolunteers initiated. Token exists:", !!token);

        const fetchParams = {
            "populate": "*"
        };

        try {
            const response = await volunteerService.getAll(fetchParams, token);
            console.log("DEBUG: fetchAllVolunteers success. Response data:", response);

            // Strapi usually returns { data: [...] }
            const data = response.data || response;
            set({ volunteers: Array.isArray(data) ? data : [] });
        } catch (error) {
            console.error("DEBUG: Failed to fetch volunteers.");
            if (error.response) {
                console.error("DEBUG: Server responded with status:", error.response.status);
                console.error("DEBUG: Server response body:", error.response.data);
            } else {
                console.error("DEBUG: Error message:", error.message);
            }
        }
    }
}));
