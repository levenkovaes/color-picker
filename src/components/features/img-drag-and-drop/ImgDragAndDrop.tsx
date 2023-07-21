import React, { useEffect, useRef } from "react";

import { SBtn } from "../../common/styled";
import { btnCss, SDropArea } from "./styled";

interface IImgDragAndDropProps {
  onUpload: (file: File) => void;
}

export const ImgDragAndDrop: React.FC<IImgDragAndDropProps> = ({
  onUpload,
}) => {
  const dropAreaRef = useRef(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    const dropArea: any = dropAreaRef.current;

    if (!dropArea) return;

    const handleDragOver = (e: DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
    };

    const handleDrop = (e: DragEvent) => {
      e.preventDefault();
      e.stopPropagation();

      const files: FileList | undefined = e.dataTransfer?.files;

      if (files && files.length) {
        onUpload(files[0]);
      }
    };

    dropArea.addEventListener("dragover", handleDragOver);
    dropArea.addEventListener("drop", handleDrop);

    return () => {
      dropArea.removeEventListener("dragover", handleDragOver);
      dropArea.removeEventListener("drop", handleDrop);
    };
  }, [onUpload]);

  return (
    <SDropArea ref={dropAreaRef}>
      <input
        onChange={(e) => {
          if (e.target.files) {
            onUpload(e.target.files[0]);
          }
        }}
        type="file"
        id="file"
        ref={inputRef}
        style={{ display: "none" }}
      />
      <p>
        <SBtn
          $additionalCss={btnCss}
          onClick={() => {
            inputRef.current?.click();
          }}
        >
          Choose a file
        </SBtn>
        <span> from your computer</span>
      </p>
      <p>or drag and drop it here</p>
    </SDropArea>
  );
};
