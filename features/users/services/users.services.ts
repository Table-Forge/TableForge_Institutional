import type { TSelectOptions } from "@/components/select/select.interfaces";
import { api } from "@/features/api";
import type { IAuthUser } from "@/features/auth/schemas/auth.schema";

const ENDPOINT = "/users";

export const UserService = {
  getById: async (id: number): Promise<IAuthUser> => {
    const { data } = await api.get(`${ENDPOINT}/${id}`);
    return data;
  },

  updateProfile: async (data: {
    nickname: string;
    birthDate: string;
    gender: string;
  }) => {
    const { data: result } = await api.put(`${ENDPOINT}/profile`, data);
    return result;
  },

  getGenderEnum: async (): Promise<TSelectOptions[]> => {
    const { data } = await api.get(`${ENDPOINT}/enums/user-gender`);
    return data;
  },
  getStatusEnum: async (): Promise<TSelectOptions[]> => {
    const { data } = await api.get(`${ENDPOINT}/enums/user-status`);
    return data;
  },
  getDeliveryMethodEnum: async (): Promise<TSelectOptions[]> => {
    const { data } = await api.get(`${ENDPOINT}/enums/delivery-method`);
    return data;
  },
  getTypeEnum: async (): Promise<TSelectOptions[]> => {
    const { data } = await api.get(`${ENDPOINT}/enums/user-type`);
    return data;
  },
  getDocumentTypeEnum: async (): Promise<TSelectOptions[]> => {
    const { data } = await api.get(`${ENDPOINT}/enums/document-type`);
    return data;
  },
};
