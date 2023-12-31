import { apiClient } from "api/axios";

import { PostCard } from "utils/types/card";

interface NewCardReturnFormat {
  isSuccess: boolean;
  errorText: string;
}

export const createCard = async (body: PostCard) => {
  const returnValue: NewCardReturnFormat = {
    isSuccess: false,
    errorText: "",
  };
  await apiClient
    .post(`cards/`, body)
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
