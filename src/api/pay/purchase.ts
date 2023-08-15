import { apiClient } from "api/axios";
import { PostPurchase } from "utils/types/purcahse";

interface PurchasetReturnFormat {
  isSuccess: boolean;
  errorText: string;
}

export const createPurchase = async (body: PostPurchase) => {
  const returnValue: PurchasetReturnFormat = {
    isSuccess: false,
    errorText: "",
  };
  await apiClient
    .post(`purchase/`, body)
    .then((res) => {
      console.log(res);
      returnValue["isSuccess"] = true;
    })
    .catch((err) => {
      console.log(err);
      returnValue["errorText"] = err.response.data["non_field_errors"][0] ?? "";
    });
  return returnValue;
};
