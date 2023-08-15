import { apiClient } from "api/axios";

import { PostCard } from "utils/types/card";

interface NewCardReturnFormat {
  isSuccess: boolean;
  errorText: string;
}

// export const patchToChangeCard = async (id: number, body: PostCard) => {
//   const returnValue: NewCardReturnFormat = {
//     isSuccess: false,
//     errorText: "",
//   };
//   await apiClient
//     .patch(`cards/${id}/`, body)
//     .then((res) => {
//       console.log(res);
//       returnValue["isSuccess"] = true;
//     })
//     .catch((err) => {
//       console.log(err);
//       returnValue["errorText"] = err.response.data["non_field_errors"][0] ?? "";
//     });
//   return returnValue;
// };

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
