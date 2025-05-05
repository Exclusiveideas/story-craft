import { create } from "zustand";

const useDashboardStore = create((set) => ({
  userProjects: [],
  updateUserProjects: (projects) => set({ userProjects: projects }),
}));

export default useDashboardStore;
