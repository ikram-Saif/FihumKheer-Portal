// store/projectsStore.js
import { create } from "zustand";
import { volunteerService } from "../services/resources";



const params = {
    "populate" : "*"
}

const token = localStorage.getItem("Token")


export const useVolunteersStore = create((set) => ({


    volunteers:[],
    fetchAllVolunteers: async()=>{

        try {
            const response = await volunteerService.getAll(params , token);
            set({ volunteers: response.data });
        } catch (error) {
            
        }

    }

    //fetchall vol

}));
