import { loginPath } from "constants/urls";

import React, { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { getUserInfo } from "api/auth/user";

import { User } from "utils/types/user";

type AuthContextType = {
  isLoggedIn: boolean;
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
  authInfo: User | undefined;
  setAuthInfo: React.Dispatch<React.SetStateAction<User | undefined>>;
};

export const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export const AuthContextProvider = (props: React.PropsWithChildren) => {
  const { children } = props;

  const navigation = useNavigate();

  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [authInfo, setAuthInfo] = useState<User | undefined>(undefined);

  // コンポーネントがマウントされたとき(リロードしたときなど)にauthInfoを取得する
  useEffect(() => {
    (async () => {
      const userInfo = await getUserInfo();

      if (userInfo) {
        setAuthInfo(userInfo);
        setIsLoggedIn(true);
      } else {
        navigation(loginPath);
      }
    })();
  }, [navigation]);

  return (
    <>
      <AuthContext.Provider
        value={{
          isLoggedIn: isLoggedIn,
          setIsLoggedIn: setIsLoggedIn,
          authInfo: authInfo,
          setAuthInfo: setAuthInfo,
        }}
      >
        {children}
      </AuthContext.Provider>
    </>
  );
};
