import React, { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";

import { SBtn } from "../../common/styled";
import { btnCss, SDropArea } from "./styled";
import { IImgDragAndDropProps } from "./types";

export const ImgDragAndDrop: React.FC<IImgDragAndDropProps> = ({
  onUpload,
}) => {
  const dropAreaRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [isDragging, setIsDragging] = useState<boolean>(false);

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

      setIsDragging(false);

      const files: FileList | undefined = e.dataTransfer?.files;

      if (files && files.length) {
        const firstImgIndex = Array.from(files).findIndex((file) =>
          file.type.startsWith("image")
        );

        if (firstImgIndex === -1) {
          toast.error("No image has been selected", {
            progress: undefined,
          });
          return;
        }

        if (files.length > 1) {
          toast.error(
            Array.from(files).some((file) => !file.type.startsWith("image"))
              ? "Only an image can be uploaded"
              : "Only one image can be uploaded",
            {
              progress: undefined,
            }
          );
          toast.success("First image has been uploaded", {
            progress: undefined,
          });
        }

        onUpload(files[firstImgIndex]);
      }
    };

    let counter = 0;

    const handleDragEnter = (e: DragEvent) => {
      e.preventDefault();
      e.stopPropagation();

      counter++;
      setIsDragging(true);
    };

    const handleDragLeave = (e: DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      counter--;

      if (counter === 0) {
        setIsDragging(false);
      }
    };

    dropArea.addEventListener("dragover", handleDragOver);
    dropArea.addEventListener("drop", handleDrop);
    dropArea.addEventListener("dragenter", handleDragEnter);
    dropArea.addEventListener("dragleave", handleDragLeave);

    return () => {
      dropArea.removeEventListener("dragover", handleDragOver);
      dropArea.removeEventListener("drop", handleDrop);
      dropArea.removeEventListener("dragenter", handleDragEnter);
      dropArea.removeEventListener("dragleave", handleDragLeave);
    };
  }, [onUpload]);

  return (
    <SDropArea ref={dropAreaRef} $isDragging={isDragging}>
      <input
        name="imageFile"
        accept="image/*"
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
