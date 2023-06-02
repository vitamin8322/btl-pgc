import * as React from "react";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";

type ButtonProps = {
  name: string;
  backgroundColor?: string;
  color?: string;
  backgroundColorHover?: string;
  icon?: React.ReactNode;
  onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  disabled?: boolean
};

const ButtonCustom = (props: ButtonProps) => {
  const { backgroundColor, color, backgroundColorHover, icon, onClick, name, disabled } =
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
  return (
    <ColorButton
      variant="contained"
      onClick={onClick}
      startIcon={icon}
      disabled={disabled}
    >
      {name}
    </ColorButton>
  );
};

export default ButtonCustom;
