// store/projectsStore.js
import { create } from "zustand";

export const useProjectStore = create((set) => ({
  selectedProject: null,
  isModalOpen: false,
  setSelectedProject: (project) => set({ selectedProject: project }),
  openModal: () => set({ isModalOpen: true }),
  closeModal: () => set({ isModalOpen: false }),
}));
