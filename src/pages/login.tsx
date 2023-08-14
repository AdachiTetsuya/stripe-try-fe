import { chapterPagePath } from "constants/urls";

import { Button, TextField } from "@mui/material";
import React, { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // TODO: どちらかに統一する
import { AuthContext } from "providers/authContextProvider";
import { postLoginInfo } from "api/auth/login";
import { getUserInfo } from "api/auth/user";
import { formContainerStyle, formGapStyle } from "styles/pages/login";

export default function Login() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [filledBoth, setFilledBoth] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);

  const { isLoggedIn, setIsLoggedIn, setAuthInfo } = useContext(AuthContext);

  const navigation = useNavigate();

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    if (e.target.value.length > 0 && password.length > 0) {
      setFilledBoth(true);
    } else {
      setFilledBoth(false);
    }
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
    if (e.target.value.length > 0 && email.length > 0) {
      setFilledBoth(true);
    } else {
      setFilledBoth(false);
    }
  };

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setFilledBoth(false);

    const isLoginSuccess = await postLoginInfo({
      email: email,
      password: password,
    });
    if (isLoginSuccess.isSuccess) {
      const userInfo = await getUserInfo();
      if (userInfo) {
        setAuthInfo(userInfo);
        setIsLoggedIn(true);
        navigation(chapterPagePath);
      }
    } else {
      setIsError(true);
    }
  };

  useEffect(() => {
    // ログイン済みのユーザはマイページに遷移させる
    if (isLoggedIn) {
      navigation(chapterPagePath);
    }
  }, [isLoggedIn]);

  return (
    <>
      <div>
        <h1>ログイン</h1>
        <div css={formContainerStyle}>
          <TextField label={"メールアドレス"} required={true} onChange={handleEmailChange} />
          <div css={formGapStyle}></div>
          <TextField
            label="パスワード"
            type={"text"}
            required={true}
            onChange={handlePasswordChange}
          />
          {isError && (
            <p>メールアドレスまたはパスワードが間違っているようです。もう一度入力してください。</p>
          )}
          <Button onClick={handleSubmit} disabled={!filledBoth}>
            ログイン
          </Button>
        </div>
      </div>
    </>
  );
}
