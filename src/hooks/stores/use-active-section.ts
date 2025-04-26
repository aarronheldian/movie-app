import { create } from "zustand";

type ActiveSection = {
  title: string;
  sectionId: string;
};

type ActiveSectionState = {
  activeSection: ActiveSection;
  setActiveSection: (section: ActiveSection) => void;
  test: string;
  test2: string;
};

export const useActiveSectionStore = create<ActiveSectionState>((set) => ({
  activeSection: {
    title: "Meet Aron: The Magician 🎩",
    sectionId: "#section_profile",
  },
  test: "aron",
  test2: "heldian",
  setActiveSection: (section) => set({ activeSection: section }),
}));
