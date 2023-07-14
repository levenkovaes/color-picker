import { useSelector } from "react-redux";

import { nanoid } from "@reduxjs/toolkit";

import {
  selectColors,
  selectImg,
} from "../../../store/features/color-picker/colorPickerSlice";
import { SH1 } from "../../common/styled";
import { ColorBtn } from "../../features/color-btn/ColorBtn";
import { ColorPickerCanvas } from "../../features/color-picker-canvas/ColorPickerCanvas";

export const ColorPicker = () => {
  const img = useSelector(selectImg);
  const colors = useSelector(selectColors);

  return (
    <>
      <SH1>Color Picker</SH1>
      {img && (
        <>
          {!!colors.length && (
            <div>
              {colors.map((color: string) => {
                return (
                  <ColorBtn key={nanoid()} $bgColor={color.toUpperCase()} />
                );
              })}
            </div>
          )}
          <ColorPickerCanvas />
        </>
      )}
    </>
  );
};
