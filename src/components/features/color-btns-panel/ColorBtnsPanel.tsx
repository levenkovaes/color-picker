import React from "react";
import { useSelector } from "react-redux";

import { nanoid } from "@reduxjs/toolkit";

import { selectColors } from "../../../store/features/color-picker/colorPickerSlice";
import { ColorBtn } from "../color-btn/ColorBtn";

export const ColorBtnsPanel: React.FC = () => {
  const colors = useSelector(selectColors);
  return (
    <>
      {!!colors.length && (
        <div>
          {colors.map((color: string) => {
            return <ColorBtn key={nanoid()} $bgColor={color.toUpperCase()} />;
          })}
        </div>
      )}
    </>
  );
};
