import React from "react";
import { Slide, toast } from "react-toastify";

import { Button } from "./styled";

interface IColorBtnProps {
  $bgColor: string;
}

export const ColorBtn: React.FC<IColorBtnProps> = ({ $bgColor }) => {
  const handleClick = () => {
    navigator.clipboard.writeText($bgColor);

    toast.success("Copied color: " + $bgColor, {
      position: "top-right",
      autoClose: 1000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      transition: Slide,
      theme: "light",
    });
  };
  return (
    <Button $bgColor={$bgColor} onClick={handleClick}>
      {$bgColor}
    </Button>
  );
};
