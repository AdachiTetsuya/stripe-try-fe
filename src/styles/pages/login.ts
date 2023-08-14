import { css } from "@emotion/react";

export const mainStyle = css({
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-start",
  width: "480px",
  flex: "none",
  flexGrow: "0",
});

export const formContainerStyle = css({
  width: "100%",
  marginTop: "10px",
  display: "flex",
  flexDirection: "column",
});

export const formGapStyle = css({
  height: "43px",
});

export const itemContainer = css({
  marginTop: "12px",
});

export const labelContainerStyle = css({
  display: "flex",
  alignItems: "center",
  gap: "8px",
});

export const passwordBoxWrapperStyle = css({
  position: "relative",
});

export const visibilityIconStyle = css({
  position: "absolute",
  top: "16px",
  right: "12px",

  "&:hover": {
    cursor: "pointer",
  },
});
