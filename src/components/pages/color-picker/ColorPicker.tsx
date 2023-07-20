import { useState } from "react";
import { useSelector } from "react-redux";

import { nanoid } from "@reduxjs/toolkit";

import {
  selectColors,
  selectImg,
} from "../../../store/features/color-picker/colorPickerSlice";
import { CloseBtn } from "../../common/close-btn/CloseBtn";
import { Modal } from "../../common/modal/Modal";
import { SBtnTab, SGeneralBtn, SH1 } from "../../common/styled";
import { ColorBtn } from "../../features/color-btn/ColorBtn";
import { ColorPickerCanvas } from "../../features/color-picker-canvas/ColorPickerCanvas";
import { LinkForm } from "../../features/link-form/LinkForm";
import { btnCss, modalCss } from "./styled";

export const ColorPicker = () => {
  const img = useSelector(selectImg);
  const colors = useSelector(selectColors);
  const [isModalDisplaying, setIsModalDisplaying] = useState(false);
  const [selectedTab, setSelectedTab] = useState("file");

  const handleModalClick = () => {
    setIsModalDisplaying((prev) => !prev);
  };

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
          <SGeneralBtn onClick={handleModalClick} $additionalCss={btnCss}>
            Upload image
          </SGeneralBtn>
          {isModalDisplaying && (
            <Modal
              $additionalCss={modalCss}
              modalTitle={
                <>
                  <div>
                    <SBtnTab
                      onClick={() => setSelectedTab("file")}
                      $active={selectedTab === "file"}
                    >
                      Choose a file
                    </SBtnTab>
                    <SBtnTab
                      onClick={() => setSelectedTab("link")}
                      $active={selectedTab === "link"}
                    >
                      Paste a link
                    </SBtnTab>
                  </div>
                  <CloseBtn handleClick={handleModalClick} />
                </>
              }
              modalBody={
                selectedTab === "file" ? (
                  <p>
                    Choose a file from your computer //Drag and Drop Your File
                  </p>
                ) : (
                  <LinkForm handleClose={handleModalClick} />
                )
              }
              handleClick={handleModalClick}
              isDisplaying={isModalDisplaying}
            />
          )}
        </>
      )}
    </>
  );
};
