import { create } from "zustand";

const useProjectPageStore = create((set) => ({
  activeProject: null,
  activeProjectResearches: null,
  loadingDialogOpen: false,
  updateActiveProject: (project) => set({ activeProject: project }),
  updateActiveProjectResearches: (researches) => set({ activeProjectResearches: researches }),
  openloadingDialog: () => set({ loadingDialogOpen: true }),
  closeloadingDialog: () => set({ loadingDialogOpen: false }),
}));

export default useProjectPageStore;
