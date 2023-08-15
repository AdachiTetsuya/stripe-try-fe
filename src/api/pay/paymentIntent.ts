import { apiClient } from "api/axios";

import { PaymentIntentCreate } from "utils/types/paymentIntent";

interface ReturnValue {
  isSuccess: boolean;
  clientSecret: string;
  errorText?: string;
}

export const createPaymentIntent = async (body: PaymentIntentCreate) => {
  const returnValue: ReturnValue = {
    isSuccess: false,
    clientSecret: "",
  };
  await apiClient
    .post(`payment-intent/`, body)
    .then((res) => {
      console.log(res);
      returnValue["clientSecret"] = res.data["client_secret"];
      returnValue["isSuccess"] = true;
    })
    .catch((err) => {
      console.log(err);
      returnValue["errorText"] = err.response.data["non_field_errors"][0] ?? "";
    });
  return returnValue;
};
