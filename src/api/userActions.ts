import {
  RegisterUserParams,
  RegisterUserResponse,
  LogInUserParams,
  LogInUserResponse,
  GetUserResponse,
} from "../types/UserApi";

import { LOGIN_URL, REGISTER_URL, USER_PROFILE_URL } from "./constants";
import axiosInstance from "./axiosInstance";

export const registerUser = async (
  params: RegisterUserParams,
): Promise<RegisterUserResponse> => {
  const userData = await axiosInstance.post(REGISTER_URL, params);

  return userData.data;
};

export const logInUser = async (
  params: LogInUserParams,
): Promise<LogInUserResponse> => {
  const userData = await axiosInstance.post(LOGIN_URL, params);

  if (userData.data.access_token) {
    localStorage.setItem("token", userData.data.access_token);
  }

  return userData.data;
};

export const getUser = async (): Promise<GetUserResponse | null> => {
  const token = localStorage.getItem("token");

  if (!token) {
    throw new Error("Not authenticated");
  }

  const userData = await axiosInstance.get<GetUserResponse>(USER_PROFILE_URL);

  return userData.data;
};

