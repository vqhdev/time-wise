import { create } from 'zustand';

interface State {
  isLoading: boolean;
  latestLoading: number;
}
interface Actions {
  toggleLoading: () => void;
  setIsLoading: (isLoading: boolean) => void;
}
const initialState: State = {
  isLoading: false,
  latestLoading: 0,
};
const LOADING_DELAY = 500;
const setLoadingDelay = async ({
  latestLoading,
  isLoading,
}: Pick<State, 'isLoading' | 'latestLoading'>): Promise<void> => {
  if (isLoading) return;
  const diff = Date.now() - latestLoading;
  if (diff < LOADING_DELAY) {
    return new Promise<void>((resolve) => {
      setTimeout(resolve, LOADING_DELAY - diff);
    });
  }
};
export const useLoadingStore = create<State & Actions>((set, getState) => ({
  ...initialState,
  toggleLoading: () => {
    const { isLoading, latestLoading } = getState();
    const newLoading = !isLoading;
    setLoadingDelay({ isLoading: newLoading, latestLoading }).then(() => {
      set({
        isLoading: newLoading,
        latestLoading: newLoading ? Date.now() : 0,
      });
    });
  },
  setIsLoading: (isLoading: boolean) => {
    const { latestLoading } = getState();
    setLoadingDelay({ isLoading, latestLoading }).then(() => {
      set({ isLoading, latestLoading: isLoading ? Date.now() : 0 });
    });
  },
}));
