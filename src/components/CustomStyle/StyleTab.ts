import { styled } from "@mui/material/styles";
import Tab from "@mui/material/Tab";

export const AntTab = styled(Tab)(({ theme }) => ({
  textTransform: "none",
  //   minWidth: 0,
  //   [theme.breakpoints.up("sm")]: {
  //     minWidth: 0,
  //   },
  backgroundColor: "rgb(237 246 255)",
  fontSize: "14px",
  fontWeight: "400",
  marginRight: theme.spacing(1),
  borderRadius: "6px",
  color: "rgba(0, 0, 0, 0.85)",
  minWidth:'180px',
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
}));
