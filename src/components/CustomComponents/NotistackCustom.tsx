import { enqueueSnackbar, closeSnackbar, useSnackbar } from "notistack";
import IconButton from "@mui/material/IconButton";
import { ReactComponent as Clear } from "@/assets/image/Clear.svg";

export const NotistackCustom = (
  variant: "error" | "default" | "success" | "warning" | "info" | undefined,
  message: string,
  closeSnackbar: (key?: string | number) => void
) => {
  
  enqueueSnackbar(message, {
    variant,
    action: (key) => (
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={() => closeSnackbar(key)}
      >
        <Clear />
      </IconButton>
    ),
  });
};
