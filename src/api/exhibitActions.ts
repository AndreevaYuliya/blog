import {
  CreateExhibitResponse,
  DeleteExhibitParams,
  DeleteExhibitResponse,
  GetExhibitResponse,
  GetExhibitsResponse,
} from "../types/ExhibitsApi";

import { EXHIBIT_BY_ID_URL, EXHIBITS_URL, MY_POSTS_URL } from "./constants";
import axiosInstance from "./axiosInstance";

export const getExhibits = async (
  page: number,
  limit: number,
): Promise<GetExhibitsResponse | null> => {
  const exhibitData = await axiosInstance.get<GetExhibitsResponse>(
    `${EXHIBITS_URL}?page=${page}&limit=${limit}`,
  );

  return exhibitData.data;
};

export const getExhibitById = async (
  id: string,
): Promise<GetExhibitResponse> => {
  const exhibitData = await axiosInstance.get<GetExhibitResponse>(
    EXHIBIT_BY_ID_URL(id),
  );

  return exhibitData.data;
};

export const getMyPosts = async (
  page: number,
  limit: number,
): Promise<GetExhibitsResponse | null> => {
  const token = localStorage.getItem("token");

  if (!token) {
    throw new Error("Not authenticated");
  }

  const exhibitData = await axiosInstance.get<GetExhibitsResponse>(
    `${MY_POSTS_URL}?page=${page}&limit=${limit}`,
  );

  return exhibitData.data;
};

export const createExhibit = async (
  formData: FormData,
): Promise<CreateExhibitResponse> => {
  const token = localStorage.getItem("token");

  if (!token) {
    throw new Error("Not authenticated");
  }

  const exhibitData = await axiosInstance.post<CreateExhibitResponse>(
    EXHIBITS_URL,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    },
  );

  return exhibitData.data;
};

export const deleteExhibit = async (params: DeleteExhibitParams) => {
  const token = localStorage.getItem("token");

  if (!token) {
    throw new Error("Not authenticated");
  }

  await axiosInstance.delete<DeleteExhibitResponse>(
    EXHIBIT_BY_ID_URL(params.id),
  );
};

