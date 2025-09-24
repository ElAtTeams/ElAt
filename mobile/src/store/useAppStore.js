import { create } from "zustand"

export const useAppStore = create((set) => ({
  isLoggedIn: false,
  needsOnboarding: true,
  user: null,
  
  login: () => set({ isLoggedIn: true, needsOnboarding: true }),
  logout: () => set({ isLoggedIn: false, needsOnboarding: true, user: null }),
  completeOnboarding: (userData) => set({ needsOnboarding: false, user: userData }),
  setUser: (user) => set({ user }),
}))