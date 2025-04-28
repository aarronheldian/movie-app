import { create } from "zustand";

type ActiveSection = {
  title: string;
  sectionId: string;
};

type ActiveSectionState = {
  activeSection: ActiveSection;
  setActiveSection: (section: ActiveSection) => void;
};

export const useActiveSectionStore = create<ActiveSectionState>((set) => ({
  activeSection: {
    title: "Meet Aron: The Magician 🎩",
    sectionId: "#section_profile",
  },
  setActiveSection: (section) => set({ activeSection: section }),
}));
