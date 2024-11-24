import { create } from "zustand";

const useProfileStore = create((set) => ({
  user: {
    username: "",
    email: "",
    avatarUrl: "",
    fullName: "",
    gender: "",
    phoneNumber: "",
  },
  setUser: (newUser) => set({ user: { ...newUser } }),
  updateUser: (key, value) =>
    set((state) => ({
      user: { ...state.user, [key]: value },
    })),
}));

export default useProfileStore;
