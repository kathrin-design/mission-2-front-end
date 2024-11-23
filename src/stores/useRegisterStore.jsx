import { create } from "zustand";

const registerStore = create((set) => ({
  userName: "",
  email: "",
  gender: "",
  phoneNumber: "",
  password: "",
  confirmPassword: "",
  setUserName: (userName) => set(() => ({ userName })),
  setEmail: (email) => set(() => ({ email })),
  setGender: (gender) => set(() => ({ gender })),
  setPhoneNumber: (phoneNumber) => set(() => ({ phoneNumber })),
  setPassword: (password) => set(() => ({ password })),
  setConfirmPassword: (confirmPassword) => set(() => ({ confirmPassword })),
  saveToLocalStorage: () => {
    set((state) => {
      const userData = {
        userName: state.userName,
        email: state.email,
        gender: state.gender,
        phoneNumber: state.phoneNumber,
        password: state.password,
      };
      localStorage.setItem("userData", JSON.stringify(userData));
      return state;
    });
  },
}));

export default registerStore;
