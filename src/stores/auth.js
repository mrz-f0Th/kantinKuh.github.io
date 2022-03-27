import { defineStore } from "pinia
import AuthService from "../services/auth.service"

const user = JSON.parse(localStorage.getItem(user))
const initialState = user 


export const useAuthStore = defineStore({
  id: "auth",
  state: () => {
    return {
      user: {}
    }
  },
  actions: {
    async login(data) {

    }
  }
})
