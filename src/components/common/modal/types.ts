import { ReactNode } from "react";
import { FlattenSimpleInterpolation } from "styled-components";

export interface IModalProps {
  handleClick: () => void;
  isDisplaying: boolean;
  modalTitle: ReactNode;
  modalBody: ReactNode;
  modalFooter?: ReactNode;
  $additionalCss?: FlattenSimpleInterpolation;
}
