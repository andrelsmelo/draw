import { create } from 'zustand';

interface HoverState {
    disableHover: boolean;
    toggleDisableHover: () => void;
}

const useHoverStore = create<HoverState>((set) => ({
    disableHover: false,
    toggleDisableHover: () => set((state) => ({ disableHover: !state.disableHover })),
}));

export default useHoverStore;
