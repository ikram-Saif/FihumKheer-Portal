import { create } from "zustand";
import { projectsService } from "../services/resources";

export const useProjectStore = create((set) => ({
  projects: [],
  selectedProject: null,
  isModalOpen: false,
  setSelectedProject: (project) => set({ selectedProject: project }),
  openModal: () => set({ isModalOpen: true }),
  closeModal: () => set({ isModalOpen: false }),
  fetchAllProjects: async () => {
    const token = localStorage.getItem("Token");
    try {
      const response = await projectsService.getAll({ "populate": "*" }, token);
      const data = response.data || response;
      set({ projects: Array.isArray(data) ? data : [] });
    } catch (error) {
      console.error("Failed to fetch projects:", error);
    }
  }
}));
