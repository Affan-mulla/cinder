import { create } from 'zustand'
import { persist } from 'zustand/middleware'

type UserInfo = {
  id: string
  name: string
  email: string
  avatar_url: string | null
  slug: string
  session_id: string
  studio_id : string
}

interface UserState {
  user: UserInfo
  setUser: (user: UserInfo) => void
  clearUser: () => void
  hasHydrated: boolean
  setHasHydrated: (status: boolean) => void
}

const defaultUser: UserInfo = {
  id: '',
  name: '',
  email: '',
  avatar_url: null,
  slug: '',
  session_id: '',
  studio_id : ''
}

const useUserStore = create<UserState>()(
  persist(
    (set, get) => ({
      user: defaultUser,
      setUser: (user) => set({ user }),
      clearUser: () => set({ user: defaultUser }),
      hasHydrated: false,
      setHasHydrated: (status) => set({ hasHydrated: status }),
    }),
    {
      name: 'user-store',
      partialize: (state) => ({
        ...state,
        user: {
          ...state.user,
          session_id: undefined,
        },
      }),
      onRehydrateStorage: () => (state) => {
        state?.setHasHydrated(true);
      },
    }
  )
);


export default useUserStore
