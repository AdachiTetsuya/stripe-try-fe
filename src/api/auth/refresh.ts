import { authURL } from "constants/urls";

import axios from "axios";

export const postRefresh = async () => {
  await axios.post(
    `${authURL}token/refresh/`,
    {},
    {
      withCredentials: true,
    }
  );
};
