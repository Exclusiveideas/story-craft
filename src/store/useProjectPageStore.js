import { create } from "zustand";

const useProjectPageStore = create((set) => ({
  activeProject: null,
  loadingDialogOpen: false,
  updateActiveProject: (project) => set({ activeProject: project }),
  openloadingDialog: () => set({ loadingDialogOpen: true }),
  closeloadingDialog: () => set({ loadingDialogOpen: false }),
}));

export default useProjectPageStore;
