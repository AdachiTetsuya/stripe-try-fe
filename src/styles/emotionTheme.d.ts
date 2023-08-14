import { Theme as MuiTheme } from "@mui/material";

// Emotion Theme
// EmotionのThemeの型定義をMuiと同じにすることで、両方のThemeProviderにテーマを指定することができる
declare module "@emotion/react" {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  interface Theme extends MuiTheme {}
}
