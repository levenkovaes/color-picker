import { useState } from "react";

import { useAppDispatch, useAppSelector } from "../../../hooks/hooks";
import {
  selectImg,
  setImg,
} from "../../../store/features/color-picker/colorPickerSlice";
import { CloseBtn } from "../../common/close-btn";
import { Modal } from "../../common/modal";
import { SBtnTab, SGeneralBtn, SH1, STabWraper } from "../../common/styled";
import { ColorBtnsPanel } from "../../features/color-btns-panel";
import { ColorPickerCanvas } from "../../features/color-picker-canvas";
import { ImgDragAndDrop } from "../../features/img-drag-and-drop";
import { LinkForm } from "../../features/link-form";
import { btnCss, modalCss } from "./styled";
import { ModalTabEnum, ModeEnum } from "./types";

export const ColorPicker: React.FC = () => {
  const dispatch = useAppDispatch();
  const img = useAppSelector(selectImg);

  const [mode, setMode] = useState<ModeEnum>(ModeEnum.Theme);
  const [isModalDisplaying, setIsModalDisplaying] = useState<boolean>(false);
  const [selectedTab, setSelectedTab] = useState<ModalTabEnum>(
    ModalTabEnum.File
  );

  const toggleModal = () => {
    setIsModalDisplaying((prev) => !prev);
  };

  const onUpload = (file: File) => {
    dispatch(setImg(file));
    toggleModal();
  };

  return (
    <>
      <SH1>Color Picker</SH1>
      {img && (
        <>
          <STabWraper>
            <SBtnTab
              onClick={() => setMode(ModeEnum.Theme)}
              $active={mode === ModeEnum.Theme}
            >
              Extract Theme
            </SBtnTab>
            <SBtnTab
              onClick={() => setMode(ModeEnum.Random)}
              $active={mode === ModeEnum.Random}
            >
              Get random
            </SBtnTab>
          </STabWraper>
          <ColorBtnsPanel />
          <ColorPickerCanvas mode={mode} />
          <SGeneralBtn onClick={toggleModal} $additionalCss={btnCss}>
            Upload image
          </SGeneralBtn>
          {isModalDisplaying && (
            <Modal
              $additionalCss={modalCss}
              modalTitle={
                <>
                  <STabWraper>
                    <SBtnTab
                      onClick={() => setSelectedTab(ModalTabEnum.File)}
                      $active={selectedTab === ModalTabEnum.File}
                    >
                      Choose a file
                    </SBtnTab>
                    <SBtnTab
                      onClick={() => setSelectedTab(ModalTabEnum.Link)}
                      $active={selectedTab === ModalTabEnum.Link}
                    >
                      Paste a link
                    </SBtnTab>
                  </STabWraper>
                  <CloseBtn handleClick={toggleModal} />
                </>
              }
              modalBody={
                selectedTab === "file" ? (
                  <ImgDragAndDrop onUpload={onUpload} />
                ) : (
                  <LinkForm handleClose={toggleModal} />
                )
              }
              handleClick={toggleModal}
              isDisplaying={isModalDisplaying}
            />
          )}
        </>
      )}
    </>
  );
};
