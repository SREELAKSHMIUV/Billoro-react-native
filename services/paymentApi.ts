import { api } from "./api";

import AsyncStorage
from "@react-native-async-storage/async-storage";

export const finalizePayment =
  async (
    invoiceId: string,
    paymentData: any
  ) => {

    const token =
      await AsyncStorage.getItem(
        "token"
      );

    console.log(
      "PAYMENT TOKEN:",
      token
    );

    const response =
      await api.post(
        `/v1/billing/invoices/${invoiceId}/finalize`,
        paymentData,
        {
          headers: {
            Authorization:
              `Bearer ${token}`,
          },
        }
      );

    return response.data;
};