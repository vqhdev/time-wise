import { create } from 'zustand';
import { isDarkMode } from '@/utils/storage.ts';

interface State {
  isDark: boolean;
}
interface Actions {
  toggleDarkMode: () => void;
  setDarkMode: (isDark: boolean) => void;
}
const initialState: State = {
  isDark: false,
};
export const useIsDarkStore = create<State & Actions>((set) => ({
  ...initialState,
  toggleDarkMode: () =>
    set((state) => {
      isDarkMode.setValue(!state.isDark);
      return { isDark: !state.isDark };
    }),
  setDarkMode: async (isDark) => {
    await isDarkMode.setValue(isDark);
    set({ isDark });
  },
}));
