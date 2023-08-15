import { FormControl, MenuItem, Select, SelectChangeEvent } from "@mui/material";
import React from "react";

type CardExpirationProps = {
  handleExMonth: (event: SelectChangeEvent<string>, child: React.ReactNode) => void;
  defaultMonth: string;
  handleExYear: (event: SelectChangeEvent<string>, child: React.ReactNode) => void;
  defaultYear: string;
};

const CardExpirationField: React.FC<CardExpirationProps> = (props) => {
  const now = new Date();
  return (
    <>
      <div>
        <div>
          有効期限
          <span css={{ fontSize: 12, color: "#B00020", marginLeft: "10px" }}>必須</span>
        </div>
        <div>
          <FormControl fullWidth>
            <Select defaultValue={props.defaultMonth} onChange={props.handleExMonth}>
              {[...Array(12)]
                .map((_, i) => i + 1)
                .map((value) => (
                  <MenuItem key={value} value={value.toString()}>
                    {value.toString()}
                  </MenuItem>
                ))}
            </Select>
          </FormControl>
          <FormControl fullWidth>
            <Select defaultValue={props.defaultYear} onChange={props.handleExYear}>
              {[...Array(10)]
                .map((_, i) => now.getUTCFullYear() + i)
                .map((value) => (
                  <MenuItem key={value} value={value.toString()}>
                    {value.toString()}
                  </MenuItem>
                ))}
            </Select>
          </FormControl>
        </div>
      </div>
    </>
  );
};

export default CardExpirationField;
