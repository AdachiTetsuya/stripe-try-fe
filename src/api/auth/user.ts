import { authClient } from "api/axios";

import { User } from "utils/types/user";

export const getUserInfo = async (): Promise<User | null> => {
  let userInfo: User | null = null;
  await authClient
    .get(`user/`, {
      withCredentials: true,
    })
    .then((response) => {
      const { pk, email, first_name, last_name } = response.data;
      userInfo = {
        pk,
        email,
        firstName: first_name,
        lastName: last_name,
      };
    })
    .catch((err) => {
      console.log(err);
    });
  return userInfo;
};
