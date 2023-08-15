import { TextField } from "@mui/material";
import React from "react";

type CardSecCodeProps = {
  handleSecCode: React.ChangeEventHandler<HTMLInputElement>;
};

const CardSecCodeField: React.FC<CardSecCodeProps> = (props) => {
  return (
    <>
      <TextField
        label="セキュリティコード"
        required={true}
        onChange={props.handleSecCode}
        inputProps={{ maxLength: 4 }}
        type={"text"}
      />
    </>
  );
};

export default CardSecCodeField;
