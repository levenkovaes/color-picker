import styled, { FlattenSimpleInterpolation } from "styled-components";

export const SWrapper = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: #0000007f;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const SModal = styled.div<{
  $additionalCss?: FlattenSimpleInterpolation;
}>`
  background-color: var(--light-grey);
  padding: 20px;
  width: 80%;
  max-width: 760px;

  ${(props) => props.$additionalCss}
`;

export const SModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: start;
  padding: 10px 10px 10px;
`;

export const SModalBody = styled.div`
  padding: 16px 10px 20px;
  color: var(--grey);
`;

export const SModalFooter = styled.div`
  display: flex;
  justify-content: center;
  padding: 14px 10px 10px;
`;
