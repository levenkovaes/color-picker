import styled from "styled-components";

export const SCanvas = styled.canvas<{
  alt: string;
  width: number;
  height: number;
}>`
  /* margin: 40px 0 0; */
  /* border: solid 1px var(--dark-green);
  background-color: var(--white); */
  z-index: -1;
  position: absolute;
  top: 0;
  left: 0;
`;
