import * as React from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import Button from "@mui/material/Button";

import { styled } from "@mui/material/styles";
import { PropTypes } from "@mui/material";
type ButtonProps = {
  name: string;
  backgroundColor?: string;
  color?: string;
  backgroundColorHover?: string;
  icon?: React.ReactNode;
  onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
};

const ButtonCustom = (props: ButtonProps) => {
  const { backgroundColor, color, backgroundColorHover, icon, onClick, name } =
    props;

  const ColorButton = styled(Button)(({}) => ({
    backgroundColor: backgroundColor,
    boxShadow: "none",
    color: color,
    textTransform: "none",
    "&:hover": {
      boxShadow: "none",
      backgroundColor: backgroundColorHover,
    },
  }));
  // const StyledIcon = styled(icon as any)({
  //   fill:'red'
  // });
  return (
    <ColorButton
      variant="contained"
      onClick={onClick}
      startIcon={icon}
    >
      {name}
    </ColorButton>
  );
};

export default ButtonCustom;