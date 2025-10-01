import { create } from "zustand"

export const useAppStore = create((set) => ({
  isLoggedIn: false,
  needsOnboarding: true,
  user: null,
  token: null,
  
  login: (data) => set({ 
    isLoggedIn: true, 
    user: data?.user || null,
    token: data?.token || null,
    needsOnboarding: !data?.user?.isOnboardingComplete 
  }),
  logout: () => set({ 
    isLoggedIn: false, 
    needsOnboarding: true, 
    user: null, 
    token: null 
  }),
  completeOnboarding: (userData) => set({ 
    needsOnboarding: false, 
    user: { ...userData, isOnboardingComplete: true } 
  }),
  setUser: (user) => set({ user }),
}))