import { create } from "zustand";

export const useAuthStore = create((set)=>({
    token: localStorage.getItem("Token") || null ,
    
    setToken: (jwt) => {
    localStorage.setItem("Token", jwt);
    set({ token: jwt });
  },
    logout: () => {
    localStorage.removeItem("Token");
    localStorage.removeItem("role");
    set({ token: null, userRole: null });
  },
  userRole: localStorage.getItem("role") || null,
  setRole: (role)=>{
        localStorage.setItem("role", role);
         set({userRole:role})}

}));