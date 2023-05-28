import { styled } from "@mui/material/styles";
import Tab from "@mui/material/Tab";

export const AntTab = styled(Tab)(({ theme }) => ({
  textTransform: "none",
  //   minWidth: 0,
  //   [theme.breakpoints.up("sm")]: {
  //     minWidth: 0,
  //   },
  height:'42px',
  backgroundColor: "rgb(237 246 255)",
  fontSize: "14px",
  fontWeight: "400",
  borderRadius: "6px",
  color: "rgba(0, 0, 0, 0.85)",
  minWidth:'180px',
  minHeight:'42px',
  "&:hover": {
    opacity: 1,
  },
  "&.MuiTab-root": {
    color: "#0097ff",
  },
  "&.Mui-selected": {
    color: "#fff",
    backgroundColor: "rgb(0, 129, 241)",
  },
  '.MuiButtonBase-root.MuiTab-root': {
    height: '48px !important'
  }
}));
