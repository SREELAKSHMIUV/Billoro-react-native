import { api } from "./api";

import AsyncStorage
from "@react-native-async-storage/async-storage";

export const createInvoice =
  async (invoiceData: any) => {

    const token =
      await AsyncStorage.getItem(
        "token"
      );

    console.log(
      "TOKEN:",
      token
    );

    const response =
      await api.post(
        "/v1/billing/invoices/draft",
        invoiceData,
        {
          headers: {
            Authorization:
              `Bearer ${token}`,
          },
        }
      );

    return response.data;
};

/* ADD THIS BELOW */

export const getInvoices =
  async (
    page = 1,
    pageSize = 50,
    search = ""
  ) => {

    const token =
      await AsyncStorage.getItem(
        "token"
      );

    const response =
      await api.get(
        "/v1/billing/invoices",
        {
          params: {
            page,
            page_size: pageSize,
            q: search,
          },

          headers: {
            Authorization:
              `Bearer ${token}`,
          },
        }
      );

    return response.data;
};

export const getInvoiceDetails =
  async (invoiceId: string) => {

    const token =
      await AsyncStorage.getItem(
        "token"
      );

    const response =
      await api.get(
        `/v1/invoices/${invoiceId}`,
        {
          headers: {
            Authorization:
              `Bearer ${token}`,
          },
        }
      );

    return response.data;
};
export const deleteInvoice = async (
  invoiceId: string
) => {

  const token =
    await AsyncStorage.getItem(
      "token"
    );

  const response =
    await api.delete(
      `/v1/billing/invoices/${invoiceId}`,
      {
        headers: {
          Authorization:
            `Bearer ${token}`,
        },
      }
    );

  return response.data;
};