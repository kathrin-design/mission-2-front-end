import { create } from "zustand";

const loginStore = create((set, get) => ({
  userName: "",
  email: "",
  password: "",
  setUserName: (userName) => set({ userName }),
  setEmail: (email) => set({ email }),
  setPassword: (password) => set({ password }),
  login: () => {
    const { userName, email, password } = get();
    const storedUser = localStorage.getItem("userData");

    if (storedUser) {
      const {
        userName: storedUserName,
        email: storedEmail,
        password: storedPassword,
      } = JSON.parse(storedUser);

      if (
        userName === storedUserName &&
        email === storedEmail &&
        password === storedPassword
      ) {
        localStorage.setItem("isLoggedIn", "true");
        return true;
      }
    }

    return false;
  },
  logout: () => {
    set({
      userName: "",
      email: "",
      password: "",
    });
    localStorage.removeItem("isLoggedIn");
  },
}));

export default loginStore;
