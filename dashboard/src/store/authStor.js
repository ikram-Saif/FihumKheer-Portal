import { create } from "zustand";

export const useAuthStore = create((set)=>({
    token: localStorage.getItem("Token") || null ,
    
    setToken: (jwt) => {
    localStorage.setItem("Token", jwt);
    set({ token: jwt });
  },
  clearToken: () => {
    localStorage.removeItem("Token");
    set({ token: null });
  },
  userRole: localStorage.getItem("role") || null,
  setRole: (role)=>{
        localStorage.setItem("role", role);
         set({userRole:role})}

}));