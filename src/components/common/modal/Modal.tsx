import { ReactNode } from "react";
import { FlattenSimpleInterpolation } from "styled-components";

import {
  SModal,
  SModalBody,
  SModalFooter,
  SModalHeader,
  SWrapper,
} from "./styled";

interface IModalProps {
  handleClick: () => void;
  isDisplaying: boolean;
  modalTitle: ReactNode;
  modalBody: ReactNode;
  modalFooter?: ReactNode;
  $additionalCss?: FlattenSimpleInterpolation;
}

export const Modal: React.FC<IModalProps> = ({
  handleClick,
  isDisplaying,
  modalTitle,
  modalBody,
  modalFooter,
  $additionalCss,
}) => {
  if (!isDisplaying) {
    return null;
  }

  return (
    <SWrapper onClick={handleClick}>
      <SModal
        $additionalCss={$additionalCss}
        onClick={(e) => e.stopPropagation()}
      >
        <SModalHeader>{modalTitle}</SModalHeader>
        <SModalBody>{modalBody}</SModalBody>
        {modalFooter && <SModalFooter>{modalFooter}</SModalFooter>}
      </SModal>
    </SWrapper>
  );
};
