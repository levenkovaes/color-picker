import {
  SModal,
  SModalBody,
  SModalFooter,
  SModalHeader,
  SWrapper,
} from "./styled";
import { IModalProps } from "./types";

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
