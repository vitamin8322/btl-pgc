import * as React from "react";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Typography from "@mui/material/Typography";
import { useState } from "react";
import ButtonCustom from "./ButtonCustom";

export interface DialogTitleProps {
  id: string;
  children?: React.ReactNode;
  onClose: () => void;
}

function CustomDialogTitle(props: DialogTitleProps) {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
}

interface PropDialog {
  isOpen: boolean;
  button: JSX.Element;
  onClick?: () => void;
  title: string;
  content?: string
}

const CustomizedDialogs = (props: PropDialog) => {
  const { isOpen, button, onClick, title, content } = props;
  const [open, setOpen] = useState(isOpen);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    // onClick
    setOpen(false);
  };

  return (
    <div>
      {React.cloneElement(button, {
        onClick: () => {
          handleClickOpen();
          // onClick();
        },
      })}
      <Dialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <CustomDialogTitle id="customized-dialog-title" onClose={handleClose}>
          {title}
        </CustomDialogTitle>
        {content && <DialogContent dividers>
          <Typography>{content}</Typography>
        </DialogContent>}
        <DialogActions className="dialog__custom">
          <Button autoFocus className="no" onClick={handleClose}>
            No
          </Button>
          <Button
            autoFocus
            className="yes"
            onClick={() => {
              handleClose();
              onClick && onClick();
            }}
          >
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default CustomizedDialogs;
