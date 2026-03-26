import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { Context } from "../main";
import * as api from "../api";

export const useAuth = () => {
  const { isAuthorized, setIsAuthorized, user, setUser } = useContext(Context);
  const navigateTo = useNavigate();

  const login = async (payload) => {
    const { data } = await api.loginUser(payload);
    toast.success(data.message);
    setIsAuthorized(true);
  };

  const register = async (payload) => {
    const { data } = await api.registerUser(payload);
    toast.success(data.message);
    setIsAuthorized(true);
  };

  const logout = async () => {
    try {
      const { data } = await api.logoutUser();
      toast.success(data.message);
      setIsAuthorized(false);
      navigateTo("/login");
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  return { isAuthorized, user, login, register, logout };
};
