import React from "react";

import { nanoid } from "@reduxjs/toolkit";

import { useAppSelector } from "../../../hooks/hooks";
import { selectColors } from "../../../store/features/color-picker/colorPickerSlice";
import { ColorBtn } from "../color-btn";
import { SColorBtnsPanel } from "./styled";

export const ColorBtnsPanel: React.FC = () => {
  const colors = useAppSelector(selectColors);
  return (
    <>
      {!!colors.length && (
        <SColorBtnsPanel>
          {colors.map((color: string) => {
            return <ColorBtn key={nanoid()} $bgColor={color.toUpperCase()} />;
          })}
        </SColorBtnsPanel>
      )}
    </>
  );
};
