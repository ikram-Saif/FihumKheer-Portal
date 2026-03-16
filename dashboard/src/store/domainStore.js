// store/projectsStore.js
import { create } from "zustand";
import { domainsServise } from "../services/resources";


const token = localStorage.getItem("Token")
const params = {
    "populate" :"*"
}

export const useDomainStore = create((set) => ({


    domains:[],
    fetchAllDomains: async()=>{

        try {
            const response = await domainsServise.getAll(params , token);
            set({ domains: response.data });
            console.log(response.data , "domains")
        } catch (error) {
            
        }

    }

    //fetchall vol

}));
