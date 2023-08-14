import { authClient } from "api/axios";

interface LoginFormat {
  email: string;
  password: string;
}

interface LoginReturnFormat {
  isSuccess: boolean;
  token: string;
}

export const postLoginInfo = async (body: LoginFormat): Promise<LoginReturnFormat> => {
  const returnValue: LoginReturnFormat = {
    isSuccess: false,
    token: "",
  };
  await authClient
    .post(`login/`, body)
    .then((response) => {
      console.log(response);
      returnValue["isSuccess"] = true;
      returnValue["token"] = response.data["access_token"];
    })
    .catch((err) => console.log(err));
  return returnValue;
};
