import { Button, SelectChangeEvent, TextField } from "@mui/material";
import React, { useState, useContext } from "react";
import CardExpirationField from "components/payment/cardExpirationField";
import CardSecCodeField from "components/payment/secCodeField";
import { createCard } from "api/pay/card";
import { AuthContext } from "providers/authContextProvider";

export default function ResisterCardPage() {
  const now = new Date();
  const defaultYear = now.getFullYear().toString();
  const defaultMonth = now.getMonth().toString();

  const { authInfo } = useContext(AuthContext);

  const [cardNumber, setCardNumber] = useState<string>("");
  const [exYear, setExYear] = useState<string>(defaultYear);
  const [exMonth, setExMonth] = useState<string>(defaultMonth);
  const [secCode, setSecCode] = useState<string>("");
  const [holderName, setHolderName] = useState<string>("");
  const [filled, setFilled] = useState<boolean>(false);

  const [error, setError] = useState<string>("");

  const setIsAllFilled = (
    holderName: string,
    cardNumber: string,
    exYear: string,
    exMonth: string,
    secCode: string
  ) => {
    const fieldList = [holderName, cardNumber, exYear, exMonth, secCode];
    if (fieldList.every((value: string) => value.length > 0)) {
      setFilled(true);
    } else {
      setFilled(false);
    }
  };

  const handleCardNumber = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCardNumber(e.target.value);
    setIsAllFilled(holderName, e.target.value, exYear, exMonth, secCode);
  };

  const handleHolderName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setHolderName(e.target.value);
    setIsAllFilled(e.target.value, cardNumber, exYear, exMonth, secCode);
  };

  const handleExYear = (e: SelectChangeEvent<string>) => {
    setExYear(e.target.value);
    setIsAllFilled(holderName, cardNumber, e.target.value, exMonth, secCode);
  };

  const handleExMonth = (e: SelectChangeEvent<string>) => {
    setExMonth(e.target.value);
    setIsAllFilled(holderName, cardNumber, exYear, e.target.value, secCode);
  };

  const handleSecCode = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSecCode(e.target.value);
    setIsAllFilled(holderName, cardNumber, exYear, exMonth, e.target.value);
  };

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    // 新しいカードを作る場合
    let errorText = "";
    let isResisterSuccess = false;
    const responseData = await createCard({
      card_full_number: cardNumber,
      ex_month: exMonth,
      ex_year: exYear.substring(2, 4),
      card_number: cardNumber.substring(12, 16),
      sec_code: secCode,
      holder_name: holderName,
      user: authInfo!.pk,
    });
    isResisterSuccess = responseData.isSuccess;
    errorText = responseData.errorText;
    if (!isResisterSuccess) {
      setError(errorText);
      setFilled(false);
    }
  };

  return (
    <div>
      <p>カードの登録画面</p>

      <TextField
        label="カード番号"
        required={true}
        onChange={handleCardNumber}
        inputProps={{ maxLength: 16 }}
      />
      <TextField label="カード名義" required={true} onChange={handleHolderName} />
      <CardExpirationField
        handleExMonth={handleExMonth}
        handleExYear={handleExYear}
        defaultMonth={defaultMonth}
        defaultYear={defaultYear}
      />
      <CardSecCodeField handleSecCode={handleSecCode} />
      <div>
        <Button onClick={handleSubmit} disabled={!filled}>
          有料会員に登録する
        </Button>
      </div>
      <div>
        <div>{error}</div>
      </div>
    </div>
  );
}
