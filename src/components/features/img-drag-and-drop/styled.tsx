import styled, { css } from "styled-components";

export const SDropArea = styled.div<{ $isDragging: boolean }>`
  width: 100%;
  height: 100%;
  padding: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-flow: column nowrap;
  color: var(--grey);
  border: 1px dashed
    ${(props) => (props.$isDragging ? "var(--purple)" : "var(--grey)")};
  border-radius: 5px;

  background-color: ${(props) =>
    props.$isDragging ? "var(--light-purple)" : "transparent"};
`;

export const btnCss = css`
  color: var(--green);
`;
