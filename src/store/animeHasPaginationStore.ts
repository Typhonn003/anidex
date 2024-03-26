import { create } from "zustand";

interface useAnimeStoreProps {
  animeName: string;
  searchAnimeName: string;
  currentPage: number;
  lastPage: number;
  setAnimeName: (value: string) => void;
  setSearchAnimeName: (value: string) => void;
  setCurrentPage: (value: number) => void;
  setLastPage: (value: number) => void;
}

const useAnimeStore = create<useAnimeStoreProps>((set) => ({
  animeName: "",
  searchAnimeName: "",
  currentPage: 1,
  lastPage: 0,
  setAnimeName: (value) => set(() => ({ animeName: value })),
  setSearchAnimeName: (value) => set(() => ({ searchAnimeName: value })),
  setCurrentPage: (value) => set(() => ({ currentPage: value })),
  setLastPage: (value) => set(() => ({ lastPage: value })),
}));

export default useAnimeStore;
